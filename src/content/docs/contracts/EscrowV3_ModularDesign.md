---
title: "EscrowV3 Modular Architecture Design"
---

# EscrowV3 Modular Architecture Design

## Problem
EscrowV2 never actually holds TGE tokens - it only redistributes USDC collateral based on off-chain delivery verification. Users buy USDC-backed promises, not actual tokens.

## Solution
Five-module architecture implementing true token escrow with constant-time settlement regardless of participant count.

---

## Sanity Check vs Core Requirements

✅ **Symmetrical Collateral** - Both sellers and buyers lock equal USDC amount (`points_amount * price * collateral_rate`)

✅ **Points are Off-Chain** - EscrowV3 doesn't track points, only trades them as IOUs with USDC backing

✅ **TGE Token per Market** - MarketRegistryV3 stores individual TGE token address for each market

✅ **Three Market Phases** - Trading → Settlement → Closure with proper phase transitions

✅ **24-Hour Settlement Window** - Configurable settlement duration in MarketRegistryV3

✅ **Seller Must Deliver or Lose Collateral** - SettlementEngineV3 enforces TGE deposit requirement

✅ **Extreme Scalability** - Supports 1 sell offer with 1500+ buyers through partial fills

✅ **Merkle Tree Integration** - SettlementEngineV3 maintains Merkle proof verification

✅ **Partial Fill Support** - OrderBookV3 redesigned for unlimited partial fills per offer

✅ **DEX-like Interface** - On-chain offers support limit/market order execution

---

## Architecture

### Module 1: EscrowVaultV3
**Purpose:** Token custody and transfers

**Core Functions:**
- Lock/unlock USDC collateral (symmetrical: `points_amount * price * collateral_rate`)
- Hold TGE tokens deposited by sellers during settlement
- Execute transfers only when authorized by other modules
- Pause functionality in emergencies

### Module 2: OrderBookV3
**Purpose:** Trading with unlimited partial fills

**Key Changes from V2:**
- One offer can serve unlimited buyers (vs single taker limit)
- Fill tracking with array of Fill structs per offer
- Clear BuyPoints/SellPoints semantics (no maker/taker confusion)
- Offer cancellation support

**Fill Structure:**
```solidity
struct Fill {
    uint256 offerId;
    address taker;
    uint256 amount;        // points purchased
    uint256 collateral;    // USDC locked
    uint256 timestamp;
}
```

### Module 3: MarketRegistryV3
**Purpose:** Market configuration and lifecycle

**Three Phases:**
1. **Trading** - Create/fill offers, TGE token unknown
2. **Settlement** - TGE token announced, sellers deposit tokens, buyers claim
3. **Closure** - Market archived, all obligations resolved

**Configuration:**
- Collateral rate per market (symmetrical calculation)
- Settlement window duration
- TGE token address and conversion rate

### Module 4: SettlementEngineV3
**Purpose:** Bulk token distribution

**Three-Phase Settlement:**
1. **Bulk Deposit** - Sellers deposit all required TGE tokens in one transaction
2. **Optional Claims** - Buyers can claim immediately if desired
3. **Auto-Distribution** - Automatic distribution triggered at settlement phase end

**Transaction Count:** Constant regardless of participant count
- 1000 buyers: 1 deposit + 1 auto-distribute = 2 transactions total

### Module 5: AccessControlV3
**Purpose:** Role-based permissions

**Two Roles:**
- **ADMIN_ROLE** - Create markets, grant/revoke MARKET_MANAGER_ROLE
- **MARKET_MANAGER_ROLE** - Update market configs, transition phases, pause markets

---

## Settlement Flow Example

**Scenario:** 500 buyers filled one seller's 30,000 point offer, TGE announced at 3:1 ratio

1. **Market Transition:** Admin sets TGE token address, starts settlement phase
2. **Seller Deposit:** `bulkDepositTGE()` - seller deposits 10,000 TGE tokens in one transaction
3. **Auto-Distribution:** At settlement phase end, system automatically sends tokens to all 500 buyers
4. **Collateral Release:** Seller receives buyer collateral, gets own collateral back

**Total Transactions:** 2 (deposit + auto-distribute)

---
