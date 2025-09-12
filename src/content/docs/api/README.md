---
title: "otX.markets API Documentation"
---

# otX.markets API Documentation

## Overview

The otX.markets API provides access to the OTC trading platform built on HyperEVM. This document covers API endpoints, authentication, error handling, and best practices for frontend integration.

## Base URL

```
https://api.otx.markets/v1
```

## Authentication

All authenticated endpoints require a JWT token obtained through wallet-based authentication:

1. **Get Nonce**
   ```http
   POST /auth/nonce
   Content-Type: application/json
   
   {
     "address": "0x..."
   }
   ```
   Response:
   ```json
   {
     "nonce": "...",
     "message": "Sign this message to authenticate: ..."
   }
   ```

2. **Verify Signature**
   ```http
   POST /auth/verify
   Content-Type: application/json
   
   {
     "address": "0x...",
     "signature": "0x...",
     "nonce": "..."
   }
   ```
   Response:
   ```json
   {
     "token": "JWT_TOKEN",
     "expires_in": 3600
   }
   ```

3. **Using the Token**
   ```http
   GET /api/protected-endpoint
   Authorization: Bearer JWT_TOKEN
   ```

## Real-Time Updates

The data flow is: Goldsky Subgraph → Goldsky Pipeline → Supabase (mirror.*) → public views → Frontend Realtime.

- Indexed on-chain events (Offer, Trade, Market) are written by Goldsky Pipeline into `mirror.*` tables in Supabase.
- The backend maintains derived aggregates (e.g., `public.orderbook_levels`) and exposes read-only public views for the frontend.
- Frontend behavior: fetch an initial snapshot from Supabase public views, then subscribe to Supabase Realtime to receive updates. Do not poll backend endpoints for market data.

## Error Handling

All errors follow a standard format:

```json
{
  "detail": "Error message",
  "code": "ERROR_CODE",
  "data": { /* Additional error context */ }
}
```

Common error codes:
- `INVALID_ADDRESS`: Invalid Ethereum address
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests

## Endpoints

### User Positions

```http
GET /api/users/{address}/positions
```

Returns a comprehensive summary of a user's positions across all markets. This is the primary endpoint for building user-facing dashboards.

**Query Parameters:**
- `address`: The user's wallet address.

**Response:**
```json
{
  "positions": [
    {
      "role": "MAKER",
      "market_id": 1,
      "points_locked": "1000",
      "collateral_locked": "500",
      "points_filled": "200",
      "collateral_filled": "100",
      "points_settled": "0",
      "tge_claimed": "0"
    },
    {
      "role": "TAKER",
      "market_id": 2,
      "points_bought": "300",
      "collateral_spent": "150",
      "points_settled": "300",
      "tge_claimed": "300"
    }
  ]
}
```

### Markets

```http
GET /api/markets
```

Lists all available markets.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `is_active`: Filter by active status (true/false)

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Project X",
      "points_identifier": "PRJ-X",
      "collateral_token": "0x...",
      "is_active": true,
      "creator": "0x...",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "page": 1,
  "limit": 20,
  "total": 50,
  "pages": 3
}
```

### Offers

```http
POST /api/offers/v3/create
```

Prepares an unsigned transaction to create a new offer. The frontend is responsible for getting this transaction signed by the user's wallet and broadcasting it.

**Request:**
```json
{
  "market_id": 1,
  "offer_type": "SELL",
  "points_amount": "1000",
  "price_per_point": "0.5"
}
```

**Response (Unsigned Transaction):**
```json
{
  "to": "0x...",
  "data": "0x...",
  "value": "0",
  "gas_limit": 200000
}
```

### Offer Fills

```http
POST /api/offers/v3/{offer_id}/fill
```

Prepares an unsigned transaction to fill an existing offer.

**Request:**
```json
{
  "points_amount": "500"
}
```

**Response (Unsigned Transaction):**
```json
{
  "to": "0x...",
  "data": "0x...",
  "value": "0",
  "gas_limit": 150000
}
```

### Offer Statistics

```http
GET /api/offers/v3/{offer_id}/stats
```

Retrieves statistics for a specific offer.

**Response:**
```json
{
  "total_fills": 5,
  "points_filled": "500",
  "points_remaining": "500",
  "fill_percentage": 50
}
```

### Escrow

#### Get User Collateral

```http
GET /api/escrow/v3/collateral/{user_address}
```

Retrieves a user's USDC collateral balance from the EscrowVault.

**Response:**
```json
{
  "balance": "1000000000"
}
```

#### Get TGE Token Balance

```http
GET /api/escrow/v3/tge-balance/{token_address}
```

Retrieves the total balance of a specific TGE token held by the EscrowVault.

**Response:**
```json
{
  "balance": "5000000000000000000000"
}
```

### Settlement

#### Get TGE Deposit Info

```http
GET /api/settlement/v3/{market_id}/deposit-info/{offer_id}
```

Retrieves TGE deposit information for a specific offer.

**Response:**
```json
{
  "seller": "0x...",
  "tge_amount_required": "1000000000000000000000",
  "tge_amount_deposited": "1000000000000000000000",
  "status": 1,
  "deposited_at": 1678901234
}
```

#### Get Settlement Stats

```http
GET /api/settlement/v3/{market_id}/stats
```

Retrieves settlement statistics for a specific market.

**Response:**
```json
{
  "total_offers": 10,
  "settled_offers": 8,
  "defaulted_offers": 2,
  "total_tge_distributed": "8000000000000000000000",
  "total_fees_collected": "16000000000000000000"
}
```

#### Process Defaults

```http
POST /api/settlement/v3/{market_id}/process-defaults
```

Prepares an unsigned transaction to process settlement defaults for a market. Admin only.

**Request:**
```json
{
  "defaulted_offer_ids": [1, 2, 3]
}
```

**Response (Unsigned Transaction):**
```json
{
  "to": "0x...",
  "data": "0x...",
  "value": "0",
  "gas_limit": 300000
}
```

## Rate Limiting


- Public endpoints: 100 requests per minute
- Authenticated endpoints: 300 requests per minute
- Responses include rate limit headers:
  ```
  X-RateLimit-Limit: 300
  X-RateLimit-Remaining: 299
  X-RateLimit-Reset: 1678901234
  ```

## Best Practices

1. **Client-Side State Management**
   - Use a state management library (e.g., Redux, Zustand) to handle positions, markets, and offers.
   - Poll the `/users/{address}/positions` endpoint to keep user data synchronized.

2. **Error Handling**
   - Implement exponential backoff for rate limits (`429` responses).
   - Handle API errors gracefully and provide user feedback.

3. **Transaction Handling**
   - Always verify transaction parameters client-side before prompting the user to sign.
   - Implement proper nonce management if the client is sending multiple transactions in quick succession.
   - Monitor transaction status on the client-side to provide feedback (pending, confirmed, failed).

## Monitoring

The following endpoints provide system status:

```http
GET /health
GET /metrics
GET /health/ready
GET /health/live
```

Use these to monitor:
- Block processing status
- API response times
- System component health

## Support

For API support or to report issues:
- GitHub Issues: [otX.markets/issues](https://github.com/otx-markets/issues)
- Discord: [otX.markets Discord](https://discord.gg/otx-markets)
- Email: api@otx.markets 