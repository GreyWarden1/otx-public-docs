---
title: "otX.markets Authentication Matrix"
---

# otX.markets Authentication Matrix

This document defines which API endpoints require authentication and which are public.

## Authentication Overview

- **Authentication Method**: JWT tokens issued after wallet signature verification
- **Token Storage**: Blacklist maintained in Supabase for logout/revocation
- **Auth Header**: `Authorization: Bearer <jwt_token>`

## Authentication Matrix

### 🔐 Auth Routes
| Endpoint | Method | Auth Required | Purpose |
|----------|--------|---------------|---------|
| `/auth/nonce` | POST | ❌ No | Generate nonce for wallet auth |
| `/auth/verify` | POST | ❌ No | Verify signature and issue JWT |
| `/auth/logout` | POST | ✅ Yes | Blacklist JWT token |

### 📈 Market Routes  
| Endpoint | Method | Auth Required | Purpose |
|----------|--------|---------------|---------|
| `/markets/` | POST | ✅ Yes | Create market (admin/deployer only) |
| `/markets/` | GET | ❌ No | List markets (public) |
| `/markets/{id}` | GET | ❌ No | Get market details (public) |
| `/markets/{id}/stats` | GET | ❌ No | Get market statistics (public) |

### 💰 Offer Routes
| Endpoint | Method | Auth Required | Purpose |
|----------|--------|---------------|---------|
| `/offers/prepare` | POST | ✅ Yes | Build create offer transaction |
| `/offers/{id}/fill/prepare` | POST | ✅ Yes | Build fill offer transaction |
| `/offers/{id}/cancel/prepare` | POST | ✅ Yes | Build cancel offer transaction |
| `/offers/{id}/default/prepare` | POST | ✅ Yes | Build claim default transaction |
| `/offers/{id}/settle` | POST | ✅ Yes | Settle offer (admin only) |
| `/offers/` | GET | ⚠️ **Conditional** | List offers (see below) |
| `/offers/{id}` | GET | ❌ No | Get offer details (public) |
| `/offers/{id}/settlement` | GET | ❌ No | Get settlement info (public) |
| `/offers/{id}/proof` | GET | ❌ No | Get settlement proof (public) |

#### Conditional Authentication: `/offers/` List Endpoint

The offers list endpoint uses **conditional authentication**:

- **Public Access** (no auth): `GET /offers/` - basic listing without private filters
- **Private Access** (auth required): `GET /offers/?maker=0x123` or `GET /offers/?taker=0x456`

**Logic**: Authentication is only required when using `maker` or `taker` filter parameters.

### 🔧 System Routes
| Endpoint | Method | Auth Required | Purpose |
|----------|--------|---------------|---------|
| `/health` | GET | ❌ No | Health check (monitoring) |
| `/health/detailed` | GET | ❌ No | Detailed health (monitoring) |
| `/api/v1/stats` | GET | ❌ No | Global statistics (public) |
| `/debug/state` | GET | ❌ No | Debug state (development) |
| `/` | GET | ❌ No | Welcome page |

## Security Rules

### 1. Read-Only API Principle
- API layer never mutates blockchain state directly
- All state changes go through `services/blockchain.py` transaction builders
- Frontend signs and submits transactions

### 2. JWT Blacklist
- Logout immediately blacklists JWT tokens in Supabase
- Blacklist persists across backend restarts  
- Expired tokens are automatically cleaned up

### 3. Admin-Only Operations
- Market creation: Only deployer account can create markets
- Offer settlement: Only authorized admin can settle offers
- These require valid JWT + proper account verification

### 4. Transaction Builders
- All `/prepare` endpoints require authentication
- They build unsigned transactions for wallet signing
- No private keys are exposed to the API layer

## Testing

### Blacklist Durability Test
```bash
# 1. Login and get token
POST /auth/nonce → /auth/verify

# 2. Access protected endpoint - should work
GET /offers/?maker=0x123 (with auth header)

# 3. Logout
POST /auth/logout (with auth header)

# 4. Try same request - should get 401
GET /offers/?maker=0x123 (with same auth header) → 401

# 5. Public access should still work
GET /offers/ (no auth) → 200
```

### Builder Authentication Test
```bash
# After logout, transaction builders should fail
POST /offers/prepare (with blacklisted token) → 401
POST /markets/ (with blacklisted token) → 401
```

## Common Issues

### Missing Authentication
- **Symptom**: Endpoints return 200 when they should return 401 after logout
- **Cause**: Missing `current_user: UserInfo = Depends(get_current_user)` parameter
- **Fix**: Add authentication dependency to endpoint

### Blacklist Not Working  
- **Symptom**: Tokens work after logout
- **Cause**: Missing `.execute()` on Supabase queries
- **Fix**: Ensure all database operations call `.execute()`

### Over-Authentication
- **Symptom**: Public endpoints require authentication
- **Cause**: Adding auth to endpoints that should be public
- **Fix**: Review matrix above for which endpoints should be public

## Architecture Constraints

1. **Single Web3 Instance**: Use global `blockchain_service` only
2. **No Blocking Calls**: Wrap all Web3 RPC calls in `asyncio.to_thread()`
3. **No Direct State Mutation**: API routes never call contract functions directly
4. **Persistent Blacklist**: Use Supabase, not in-memory storage
5. **Connection Headers**: Use `Connection: close` for HyperEVM compatibility 