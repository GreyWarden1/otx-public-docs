---
title: "EscrowV3 System Architecture Guide"
---

# EscrowV3 System Architecture Guide

## Overview

EscrowV3 is an OTC trading system for off-chain "points" (future airdrop allocations) built on HyperEVM. It implements true token escrow with symmetrical collateral, unlimited partial fills, and constant-time settlement regardless of participant count.

**Key Features:** Modular architecture with 100% collateral backing, bulk settlement operations, and automated token distribution.

---

## Core Concepts

### What Are Points?
- **Off-chain allocations** that users earn through project engagement
- **Future airdrop promises** that will eventually convert to transferable tokens
- **Not trackable on-chain** - our system trades IOUs backed by collateral
- **Examples:** Loyalty points, farming rewards, future token allocations

### TGE (Token Generation Event)
When projects deploy actual tokens and convert points at a specific ratio, whitch is set by admin:
- **1:1 ratio** = 1000 points become 1000 tokens
- **3:1 ratio** = 3000 points become 1000 tokens
- **Settlement trigger** = Market transitions from Trading to Settlement phase

### Symmetrical Collateral System
Both sellers and buyers lock **identical USDC amounts** to ensure zero-trust trading:
- **Seller locks:** `points_amount × price_per_point` in USDC (100% backing)
- **Buyer locks:** `points_amount × price_per_point` in USDC (100% backing)
- **Purpose:** Punish bad actors, ensure delivery commitments

---

## Five-Module Architecture

### 1. AccessControlV3 - Security Foundation
**Purpose:** Centralized role-based permissions and emergency controls

**Key Features:**
- **ADMIN_ROLE:** Create markets, grant roles, emergency pause, system configuration
- **MARKET_MANAGER_ROLE:** Transition market phases, update market configs, market-level pause
- **Emergency Pause:** System-wide halt for critical situations
- **Transparent Role Management:** Events for all role changes with reasons

**Core Security Model:**
- Hierarchical roles with ADMIN as root authority
- Pausable functionality across all modules
- Transparent permission changes with event logging

### 2. EscrowVaultV3 - Token Custody Engine
**Purpose:** Secure custody of USDC collateral and TGE tokens with authorized-only transfers

**Key Features:**
- **True Escrow:** Actually holds tokens during trading and settlement
- **Module Authorization:** Only approved contracts can move funds
- **Dual Token Support:** USDC collateral + TGE token settlement
- **Fee Integration:** Automatic fee collection during transfers via FeeManager integration

**Core Operations:**
```
lockCollateral(user, amount)           → Lock USDC for offers
unlockCollateral(user, amount)         → Release USDC after cancellation
transferCollateral(from, to, amount)   → Internal transfers (settlement)
transferCompensation(from, to, amount) → Direct compensation (defaults)
depositTGE(token, amount)              → Sellers deposit TGE tokens
transferTGE(token, to, amount)         → Distribute TGE to buyers
batchTransferTGE(recipients, amounts)  → Bulk TGE distribution
collectFeeFromCollateral(...)          → Fee collection with FeeManager
```

**Security Model:**
- Module authorization prevents unauthorized access
- ReentrancyGuard on all transfer functions
- Emergency token recovery for edge cases
- Balance tracking with overflow protection
- Integrated fee collection with proper authorization checks

### 3. FeeManagerV3 - Centralized Fee System
**Purpose:** Unified fee calculation, collection, and tracking across all operations

**Fee Types & Rates:**
- **CancelOffer:** 0.5% on remaining collateral
- **Settlement:** 2.5% on seller's total collateral
- **BuyToken:** 2.0% on buyer's claim collateral
- **DefaultOrder:** 0.5% on defaulted principal

**Advanced Features:**
- **Configurable Rates:** Admin can adjust fees per type
- **Min/Max Limits:** Prevent dust fees and excessive charges
- **Revenue Tracking:** Complete audit trail of all collections
- **Future Revenue Sharing:** Built-in support for profit distribution
- **Module Authorization:** Only authorized contracts can record fee collections

**Integration Pattern:**
- EscrowVaultV3 calls FeeManagerV3 during transfers
- Automatic fee calculation and deduction
- Real-time tracking of collected vs distributed fees
- Proper authorization checks for fee collection operations

### 4. MarketRegistryV3 - Lifecycle Management
**Purpose:** Market configuration and three-phase lifecycle orchestration

**Market Phases:**
1. **Trading Phase**
   - Create and fill offers
   - TGE token unknown
   - Normal market operations
   
2. **Settlement Phase** 
   - TGE token announced with conversion rate
   - Sellers must deposit TGE tokens
   - Buyers can claim tokens
   - No new trading allowed
   
3. **Closure Phase**
   - All obligations resolved
   - Market archived
   - Final cleanup completed

**Critical Phase Transition Logic:**
- **Trading → Settlement:** Admin sets TGE token + conversion rate + settlement window
- **Auto-cleanup:** Automatically handles partial/unfilled offers
- **Settlement → Closure:** After settlement window expires
- **Prevents Deadlocks:** No manual offer cleanup required

**Market Configuration:**
```solidity
struct Market {
    string name;                    // Human-readable identifier
    string pointsIdentifier;        // Project-specific points name
    uint256 settlementWindow;       // Duration in seconds (set when settlement starts)
    address tgeToken;               // TGE token contract address
    uint256 conversionRate;         // Points per 1e18 TGE tokens
    Phase currentPhase;             // Current market phase
    uint256 settlementStartTime;    // Settlement phase timestamp
    uint256 createdAt;              // Market creation time
    bool isActive;                  // Market active status
}
```

### 5. OrderBookV3 - Trading Engine
**Purpose:** Order management with unlimited partial fills

**Key Features:**
- **Unlimited Partial Fills:** One offer can serve multiple buyers
- **Complete Fill Tracking:** Individual Fill records for each transaction
- **Flexible Order Types:** BuyPoints and SellPoints offers
- **Offer Lifecycle Management:** Open, Partial, Filled, Cancelled, Settled states

**Offer Structure:**
```solidity
struct Offer {
    uint256 marketId;           // Target market
    address maker;              // Offer creator
    OfferType offerType;        // BuyPoints or SellPoints
    uint256 pointsAmount;       // Total points offered
    uint256 pricePerPoint;      // Price per point in USDC (6 decimals)
    uint256 collateralLocked;   // Maker's USDC locked (100% backing)
    uint256 pointsFilled;       // Points filled so far
    OfferStatus status;         // Open/Partial/Filled/Cancelled/Settled
    uint256 createdAt;          // Creation timestamp
    uint256 fillCount;          // Number of fills
}
```

**Fill Tracking:**
```solidity
struct Fill {
    uint256 offerId;            // Parent offer
    address taker;              // Buyer address
    uint256 pointsAmount;       // Points bought in this fill
    uint256 collateralAmount;   // Taker's USDC locked (100% backing)
    uint256 createdAt;          // Fill timestamp
}
```

**Key Operations:**
- **createOffer():** Lock collateral, create offer
- **fillOffer():** Partial fill with unlimited takers
- **cancelOffer():** Cancel unfilled portion with fee
- **batchCleanupOffersForSettlement():** Auto-cleanup for phase transitions

### 6. SettlementEngineV3 - Bulk Distribution System
**Purpose:** Constant-time settlement regardless of participant count

**Three-Phase Settlement Process:**

#### Phase 1: Bulk TGE Deposit
```
bulkDepositTGE(marketId, offerIds[])
```
- Seller deposits TGE tokens for all their filled offers
- **1 transaction** regardless of number of offers
- Calculates total TGE required across all offers
- Locks offers to prevent state changes during deposit

#### Phase 2: Optional Immediate Claims
```
claimTGETokens(marketId, proof[])
```
- Buyers can claim immediately if they want
- Uses Merkle proof verification for gas efficiency
- **Consistent Encoding:** Uses `abi.encodePacked()` for Merkle proof generation
- **Optional step** - buyers can wait for auto-distribution

#### Phase 3: Auto-Distribution
```
executeAutoDistribution(marketId)
```
- **1 transaction** distributes to all buyers automatically
- Triggered when settlement window expires
- No manual buyer action required
- Constant gas cost regardless of recipient count

**Settlement Status Tracking:**
```solidity
enum SettlementStatus { 
    Pending,        // Waiting for TGE deposit
    TGEDeposited,   // Ready for distribution
    Settled,        // Completed
    Defaulted       // Seller failed to deliver
}
```

**Default Handling:**
- Seller fails to deposit TGE tokens within settlement window
- Seller's collateral transferred to buyers as compensation
- DefaultOrder fee applied (0.5% on principal)
- Automatic resolution without manual intervention

**Merkle Proof System:**
- **Consistent Encoding:** All Merkle proofs use `abi.encodePacked()` for compatibility
- **Gas Efficient:** Batch verification reduces transaction costs
- **Secure Verification:** Cryptographic proof of inclusion without storing all data

---

## Complete Trading Flow Example

### Market Creation
1. **Admin creates market:** "ProjectXYZ Points" in Trading phase
2. **Market configuration:** Market name and points identifier
3. **Market goes live:** Users can create and fill offers

### Trading Phase
1. **Alice creates sell offer:** 10,000 ProjectXYZ points @ $0.50/point
   - Alice locks: 10,000 × $0.50 = $5,000 USDC collateral (100% backing)
   
2. **Bob fills partially:** Buys 500 points from Alice's offer
   - Bob locks: 500 × $0.50 = $250 USDC collateral (100% backing)
   - Alice's offer: 9,500 points remaining, still open
   
3. **Carol fills partially:** Buys 1,000 points from Alice's offer
   - Carol locks: 1,000 × $0.50 = $500 USDC collateral (100% backing)
   - Alice's offer: 8,500 points remaining, still open

4. **999 more buyers:** Each buy small amounts from Alice's offer
   - **Total:** 1,001 buyers served by 1 offer

### Settlement Phase (TGE Announcement)
1. **ProjectXYZ announces TGE:** 3:1 conversion rate (3000 points = 1000 tokens)
2. **Admin updates market:** Sets TGE token address, conversion rate, and settlement window
3. **Market transitions:** Trading → Settlement phase
4. **Auto-cleanup:** System handles any remaining unfilled offers

### Settlement Execution
1. **Alice deposits TGE tokens:** `bulkDepositTGE()` - 1 transaction
   - Calculates total: 1,500 points filled ÷ 3 = 500 TGE tokens required
   
2. **Settlement window:** Configurable duration for buyers to claim or wait
   
3. **Auto-distribution:** `executeAutoDistribution()` - 1 transaction
   - Sends TGE tokens to all 1,001 buyers automatically
   - Releases Alice's collateral
   - Transfers buyers' collateral to Alice

**Total Transactions:** 2 (deposit + auto-distribute) for 1,001 participants

### Market Closure
1. **Settlement window expires:** Market transitions to Closure phase
2. **Final accounting:** All collateral released, tokens distributed
3. **Market archived:** Historical data preserved

---

## System Benefits

### Scalability Features
- **Unlimited partial fills** allow high liquidity concentration
- **Batch settlement operations** reduce gas costs
- **Constant settlement time** regardless of participant count
- **Automated distribution** removes manual coordination

### Security Architecture
- **100% collateral backing** ensures trade value is always available
- **Symmetrical risk** means both parties have equal skin in the game  
- **True token custody** during settlement vs promise-based systems
- **Automated penalties** for non-delivery via smart contracts
- **Consistent Merkle proof encoding** prevents verification failures

### Gas Efficiency
- **Traditional systems:** 1000 participants = 1000+ transactions
- **EscrowV3 system:** 1000 participants = 2-3 transactions
- **Bulk operations** optimize gas usage across all settlement functions

---

## Technical Integration

### Module Communication
All modules communicate through authorized function calls:
```
OrderBookV3 → EscrowVaultV3 (lock/unlock collateral)
EscrowVaultV3 → FeeManagerV3 (calculate/collect fees)
SettlementEngineV3 → EscrowVaultV3 (transfer tokens)
MarketRegistryV3 → OrderBookV3 (cleanup for phase transitions)
All modules → AccessControlV3 (permission verification)
```

### Event System
Complete event coverage for off-chain indexing:
- **Trading Events:** OfferCreated, FillCreated, OfferCancelled
- **Settlement Events:** TGEDeposited, TGEClaimed, AutoDistributionCompleted
- **Market Events:** MarketCreated, SettlementPhaseStarted, MarketClosed
- **Fee Events:** FeeCollected, FeesWithdrawn
- **Security Events:** RoleGranted, EmergencyPause

### Security Architecture
- **Role-Based Access:** Hierarchical permissions with transparency
- **Module Authorization:** Only approved contracts can move funds
- **Reentrancy Protection:** All external calls protected
- **Emergency Controls:** System-wide pause capability
- **Overflow Protection:** SafeMath usage throughout
- **Fee Authorization:** Proper checks for fee collection operations

---

## Production Deployment

### Contract Deployment Order
1. **AccessControlV3** (security foundation)
2. **FeeManagerV3** (fee system)
3. **EscrowVaultV3** (token custody)
4. **MarketRegistryV3** (market management)
5. **OrderBookV3** (trading engine)
6. **SettlementEngineV3** (settlement system)

### Initial Configuration
1. **Grant roles:** ADMIN_ROLE and MARKET_MANAGER_ROLE
2. **Authorize modules:** Allow contracts to call each other
3. **Set fee rates:** Configure default fee percentages
4. **Test integration:** Verify all module communication
5. **Verify Merkle encoding:** Ensure consistent proof generation

### Monitoring Requirements
- **Collateral Tracking:** Total locked vs distributed
- **Settlement Status:** Pending TGE deposits and distributions
- **Fee Collection:** Revenue tracking and withdrawal monitoring
- **Gas Usage:** Transaction cost optimization verification
- **Merkle Proof Verification:** Ensure consistent encoding across operations

This architecture provides the foundation for a production-grade OTC system that scales efficiently while maintaining zero-trust security guarantees. 