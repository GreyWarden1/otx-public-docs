---
title: "Frontend Integration Guide"
---

# Frontend Integration Guide

This guide covers best practices and patterns for integrating your frontend application with the otX.markets backend.

## Architecture Overview

otX.markets realtime data path:

1. **Realtime via Supabase**
   - Goldsky Subgraph → Goldsky Pipeline → Supabase `mirror.*` tables.
   - Backend maintains derived `public.*` views/tables (e.g., `public.orderbook_levels`).
   - Frontend loads an initial snapshot from `public.*` and subscribes to Supabase Realtime for updates. Do not poll backend for market/orderbook state.

2. **Non-Custodial Design**
   - All endpoints that create blockchain transactions (e.g., creating an offer) return an **unsigned transaction object**.
   - The frontend is responsible for getting this transaction signed by the user's wallet (e.g., MetaMask) and then broadcasting it to the network.
   - Transaction status monitoring (pending, confirmed, failed) should be handled client-side.

## Getting Started

### 1. Authentication Flow

```typescript
import { ethers } from 'ethers';

class AuthService {
  private token: string | null = null;
  
  async authenticate(provider: ethers.providers.Web3Provider): Promise<void> {
    // Get user's address
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    
    // Get nonce
    const nonceResponse = await fetch('/api/auth/nonce', {
      method: 'POST',
      body: JSON.stringify({ address })
    });
    const { nonce, message } = await nonceResponse.json();
    
    // Sign message
    const signature = await signer.signMessage(message);
    
    // Verify and get token
    const authResponse = await fetch('/api/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ address, signature, nonce })
    });
    const { token } = await authResponse.json();
    
    this.token = token;
  }
  
  getAuthHeaders(): Headers {
    return new Headers({
      'Authorization': `Bearer ${this.token}`
    });
  }
}
```

### 2. Position Tracking

```typescript
interface Position {
  role: 'MAKER' | 'TAKER' | 'HOLDER';
  marketId?: number;
  tokenId?: number;
  pointsLocked?: string;
  collateralLocked?: string;
  // ... other fields
}

class PositionTracker {
  private positions: Position[] = [];
  private pollInterval: number = 15000; // Default 15s
  
  async updatePositions(address: string): Promise<void> {
    const headers = authService.getAuthHeaders();
    
    const response = await fetch(`/api/users/${address}/positions`, {
      headers
    });
    
    const data = await response.json();
    this.positions = data.positions;
  }
  
  startPolling(address: string): void {
    setInterval(() => this.updatePositions(address), this.pollInterval);
  }
}
```

### 3. Transaction Management

```typescript
interface UnsignedTx {
  to: string;
  data: string;
  value: string;
  gasLimit?: number;
}

class TransactionManager {
  private provider: ethers.providers.Web3Provider;
  
  async createOffer(params: CreateOfferParams): Promise<string> {
    // Get unsigned transaction from the backend
    const response = await fetch('/api/offers/v3/create', {
      method: 'POST',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(params)
    });
    
    const unsignedTx: UnsignedTx = await response.json();
    
    // Sign and send transaction using the user's wallet
    const signer = this.provider.getSigner();
    const tx = await signer.sendTransaction({
      to: unsignedTx.to,
      data: unsignedTx.data,
      value: unsignedTx.value,
      gasLimit: unsignedTx.gasLimit
    });
    
    // Wait for confirmation
    await tx.wait(1);
    return tx.hash;
  }
}
```

## Error Handling

### 1. API Errors

```typescript
class ApiError extends Error {
  constructor(
    public code: string,
    public detail: string,
    public data?: any
  ) {
    super(detail);
  }
}

async function handleApiResponse(response: Response): Promise<any> {
  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(error.code, error.detail, error.data);
  }
  return response.json();
}
```

### 2. Rate Limiting

```typescript
class RateLimitHandler {
  private retryCount: number = 0;
  
  async handleResponse(response: Response): Promise<void> {
    if (response.status === 429) {
      const resetTime = parseInt(response.headers.get('X-RateLimit-Reset') || '0');
      const delay = Math.min(
        Math.pow(2, this.retryCount) * 1000,
        30000 // Max 30s delay
      );
      this.retryCount++;
      await new Promise(resolve => setTimeout(resolve, delay));
      throw new Error('Rate limited - retrying');
    }
    this.retryCount = 0;
  }
}
```

## Caching Strategy

Given the polling-based nature of the application, a simple time-based or state-based caching mechanism is effective.

```typescript
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class SimpleCache<T> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private ttl: number = 10000; // 10 seconds

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry || (Date.now() - entry.timestamp > this.ttl)) {
      return null;
    }
    return entry.data;
  }
  
  invalidate(key: string): void {
    this.cache.delete(key);
  }
}
```

## Performance Optimization

1. **Batch Updates**
   - The `/api/users/{address}/positions` endpoint is designed to provide a comprehensive snapshot, minimizing the need for multiple client-side requests.
   - Use this endpoint as the primary driver for UI updates.

2. **Conditional Requests**
   - While the backend no longer uses ETag headers for polling, ensure your client-side caching prevents re-rendering if the fetched data has not changed.

3. **Error Recovery**
   - Implement exponential backoff for failed API requests.
   - Cache the last known good state to provide a better user experience during temporary API or network issues.
   - Provide fallback UI elements when data cannot be fetched.

## Monitoring

1. **Health Checks**
   ```typescript
   async function checkSystemHealth(): Promise<boolean> {
     try {
       const response = await fetch('/health');
       const health = await response.json();
       return health.status === 'ok';
     } catch {
       return false;
     }
   }
   ```

## Common Patterns

1. **Position Updates**
   - Poll the `/users/{address}/positions` endpoint every 10-15 seconds.
   - Use the response to update a central state store (e.g., Redux).
   - Your UI components should react to changes in this store.

2. **Market Data**
   - Fetch market lists and details on page load.
   - Cache this data aggressively as it changes infrequently.
   - Re-fetch only on user action (e.g., page refresh) or after a longer cache expiry.

3. **Transaction Flow**
   - **Step 1:** Call the appropriate backend endpoint (e.g., `/api/offers/v3/create`) to get the unsigned transaction payload.
   - **Step 2:** Prompt the user to sign the transaction with their wallet.
   - **Step 3:** Send the signed transaction to the blockchain.
   - **Step 4:** Monitor the transaction on the client side for confirmation.
   - **Step 5:** Update the UI optimistically (e.g., show a "pending" state) and then confirm the change once the transaction is finalized.

## Support

For integration support:
- Technical Documentation: [/docs/api/README.md](/docs/api/README.md)
- Discord: [otX.markets Discord](https://discord.gg/otx-markets)
- Email: developers@otx.markets 