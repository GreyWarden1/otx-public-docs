---
title: "Smart Contract Integration Guide"
---

# Smart Contract Integration Guide

## Overview

This guide explains how to interact with the otX.markets smart contracts through our backend API. The system follows a non-custodial design where the backend only prepares unsigned transactions, and users must sign and submit them using their own wallets.

## Transaction Flow

1. **Authentication**
   ```typescript
   // 1. Get nonce for signing
   POST /api/v1/auth/nonce
   {
     "address": "0x..."  // Your wallet address
   }
   
   // 2. Sign message with your wallet
   const message = response.message;
   const signature = await wallet.signMessage(message);
   
   // 3. Get JWT token
   POST /api/v1/auth/verify
   {
     "address": "0x...",
     "nonce": response.nonce,
     "signature": signature
   }
   ```

2. **Creating Transactions**
   All transaction-creating endpoints return an unsigned transaction object:
   ```typescript
   interface TxPayload {
     to: string;           // Contract address
     data: string;         // Encoded function call
     value: string;        // ETH value (usually "0")
     chainId: number;      // HyperEVM chain ID
     gas: number;         // Gas limit
     nonce: number;       // Transaction nonce
     maxFeePerGas?: number;      // EIP-1559 max fee
     maxPriorityFeePerGas?: number;  // EIP-1559 priority fee (0 on HyperEVM)
   }
   ```

3. **HyperEVM Specifics**
   - Chain ID: ${settings.chain_id}
   - EIP-1559: Required
   - `maxPriorityFeePerGas`: Must be 0
   - Gas limits:
     - Minimum: 21,000
     - Maximum: 1,000,000
   - Base fee:
     - Minimum: 0.1 Gwei
     - Maximum: 500 Gwei

## Example: Creating a Market

```typescript
// 1. Get unsigned transaction
const response = await fetch("/api/v1/markets", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${jwt}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: "Test Market",
    points_identifier: "TEST-2025-Q1"
  })
});

const unsignedTx = await response.json();

// 2. Sign transaction with your wallet
const signedTx = await wallet.signTransaction(unsignedTx);

// 3. Submit transaction to HyperEVM
const tx = await wallet.sendTransaction(signedTx);
```

## Example: Creating an Offer

```typescript
// 1. Get unsigned transaction
const response = await fetch("/api/v1/offers/v3/create", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${jwt}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    market_id: 1,
    offer_type: 0,  // 0 = BuyPoints, 1 = SellPoints
    points_amount: "1000000000",  // 1000 points with 6 decimals
    price_per_point: "1000000"    // 1 USDC per point (6 decimals)
  })
});

const unsignedTx = await response.json();

// 2. Sign transaction with your wallet
const signedTx = await wallet.signTransaction(unsignedTx);

// 3. Submit transaction to HyperEVM
const tx = await wallet.sendTransaction(signedTx);
```

## Example: Filling an Offer

```typescript
// 1. Get unsigned transaction
const response = await fetch(`/api/v1/offers/${offerId}/fill`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${jwt}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    points_amount: "500000000"  // 500 points with 6 decimals
  })
});

const unsignedTx = await response.json();

// 2. Sign transaction with your wallet
const signedTx = await wallet.signTransaction(unsignedTx);

// 3. Submit transaction to HyperEVM
const tx = await wallet.sendTransaction(signedTx);
```

## Example: Settlement Flow

```typescript
// 1. Bulk deposit TGE tokens
const depositResponse = await fetch(`/api/v1/settlement/${marketId}/bulk-deposit`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${jwt}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    offer_ids: [1, 2, 3]  // Your offers that need TGE tokens
  })
});

const depositTx = await depositResponse.json();
await wallet.signAndSendTransaction(depositTx);

// 2. Claim TGE tokens (as a buyer)
const claimResponse = await fetch(`/api/v1/settlement/${marketId}/claim`, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${jwt}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    total_amount: "1000000000000000000",  // 1 TGE token (18 decimals)
    merkle_proof: ["0x...", "0x..."]      // Merkle proof from backend
  })
});

const claimTx = await claimResponse.json();
await wallet.signAndSendTransaction(claimTx);
```

## Error Handling

All transaction-creating endpoints validate the transaction payload and return detailed error messages:

```typescript
// Example error response
{
  "detail": "Transaction payload validation failed",
  "errors": {
    "gas": "Gas limit too high (maximum 1000000)",
    "maxPriorityFeePerGas": "maxPriorityFeePerGas must be 0 on HyperEVM"
  }
}
```

## Best Practices

1. **Gas Estimation**
   - The backend provides conservative gas estimates
   - Always check if your wallet's gas estimation differs significantly
   - Stay within HyperEVM's gas limits

2. **Transaction Ordering**
   - Use the provided `nonce` from the transaction payload
   - Handle transaction replacement (speedup/cancel) in your wallet

3. **Error Recovery**
   - Always check transaction receipts
   - Use the `/api/v1/debug/state` endpoint to verify system status
   - Monitor indexer lag for real-time updates

4. **Security**
   - Never share your private keys
   - Always verify transaction data before signing
   - Check contract addresses match the deployment

