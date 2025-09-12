---
title: Tokenomics
description: Token model summary.
---
## Token Utility and Mechanics
The $OTX token serves as the core asset of the otX.markets platform. It enables three main functions:
Revenue Sharing – Holders of staked OTX earn a share of platform fees. Specifically, 80% of fees collected (in USDC or HYPE) are distributed to stakers.

Fee Discounts – Users receive trading fee discounts based on the amount of OTX they stake. Discount tiers are structured with fixed OTX thresholds. The effective fee for a user is calculated as:

```
effective_fee = base_fee × discount_multiplier
```

where `discount_multiplier` depends on the user’s staked amount tier.

P2P Operator Collateral – Operators who facilitate OTC trades must stake an amount of OTX equivalent to at least 100% of the deal value. The collateral is held in escrow by the protocol smart contracts during the trade lifecycle.

## Token Allocation and Emissions
Max Supply: 1,000,000 OTX (no inflation, no minting beyond cap).

| Category | Tokens | % |
| --- | ---: | ---: |
| Airdrops & Incentives | 600,000 | 60% |
| Early Investors | 200,000 | 20% |
| Team & Advisors | 100,000 | 10% |
| Reserve for Emissions | 100,000 | 10% |


## Fee Utilization Breakdown

| Fee Type | Rate | Applied To | When Collected |
| --- | ---: | --- | --- |
| Cancel Offer Fee | 0.5% | Remaining amount of a canceled offer | Upon offer cancellation |
| Settlement Fee | 2.5% | Total collateral value of seller's orders during settlement | When seller initiates settlement |
| Buy Token Fee | 2.0% | Collateral amount when a buyer claims TGE tokens | During buyer's settlement claim |
| Default Order Fee | 0.5% | Principal of orders that default (not settled by expiry) | When defaulted orders are processed |

Fees incurred on every trade are split as follows:

- 80% redistributed to stakers as revenue share.
- 10% used in buy-back operations, permanently burning OTX tokens, which creates deflationary pressure by reducing circulating supply:

```
ΔSupply_t = -burn_t
```

- 10% allocated to the otX treasury, funding operations, development, and audits.

## Revenue Sharing
Revenue sharing is calculated only from actively staked OTX, not the total supply or theoretical circulating supply. This design ensures:
Only stakers participate in revenue share; unstaked tokens do not earn fees.
The float for revenue share is the sum of staked OTX, denoted as W_t for epoch t:

```
W_t = Σ_i weight_i
```
Each staker’s weight is given by:

```
weight_i = staked_tokens_i × (1 + lock_duration_i / 90)
```
where:
lock_duration_i is the optional lock in days, up to 90 days, which provides up to 2x weight boost.
Without locking:

```
weight_i = staked_tokens_i × 1
```
The individual’s revenue share each epoch is calculated as:

```
share_i(t) = (weight_i / W_t) × R_t
```
where `R_t` is the total revenue pool collected during epoch t (fees × 80%).
This ensures the sum of all shares over all stakers equals R_t exactly.
The above design guarantees revenue emissions are bounded: no more than R_t is ever distributed, regardless of the number of stakers or the weight distribution.
### Example Revenue Share Calculation
Assume:
Platform fees collected this week: $10,000.
Revenue pool R_t = $8,000 (80% of fees).
Total staked weight W_t = 100,000.
Alice stakes 5,000 OTX, locked 45 days → weight = 5,000 × (1 + 45/90) = 7,500.
Her revenue share:
share_Alice = (7,500 / 100,000) × 8,000 = $600
## Staking Details
Minimum staking amount: 1 OTX.
Optional locking period: up to 90 days for up to 2x weight.
Cooldown period: 7 days after unstaking request before tokens are released.
Weekly distribution of revenue ensures predictable income for active stakers.

## Fee Discount Tiers
OTX staked grants trading fee discounts, calculated using fixed thresholds:

| Tier | Staked OTX | Discount Multiplier | Example Seller Fee |
| --- | ---: | ---: | ---: |
| 0 | 0 | 1.00 | 2.50% |
| 1 | 500 | 0.90 | 2.25% |
| 2 | 2,000 | 0.75 | 1.88% |
| 3 | 8,000 | 0.60 | 1.50% |
| 4 | 20,000 | 0.40 | 1.00% |
| 5 | 40,000 | 0.25 | 0.63% |

A user's effective fee for any platform service is given by:

```
effective_fee = base_fee × multiplier (from tier)
```
## Deflationary Dynamics
Buy-back and burn mechanism uses 10% of all platform fees, converted to OTX via TWAP buys on DEXs, and sends them to a burn address:

```
ΔSupply_t = -burn_t
```
With constant trading activity, circulating supply gradually decreases, creating sustained scarcity.