---
title: "App Flow"
---

## Overview
This document outlines the application flow for real-time Over-The-Counter (OTC) trading of points on a P2P platform built on HyperEVM, designed to provide a DEX-like experience. Points are speculative, off-chain assets. The platform enables real-time trading with a chart, order book (reflecting on-chain offers), and support for limit and market orders, secured through USDC deposits managed by an on-chain escrow smart contract. 


### Key explanation

**Points** - Non-tracable, off-chain, completely external to our application. This is basically "future airdrop allocations", that at some day will be converted to actual transferable crypto token.
Projects in Web3 usually do point farming programs to reward their users and allow them to earn and track their possible future airdrop allocation. 

OTX.markets provides a platform to trade those not-yet-liquid allocations. 

To ensure full zero-trust einviroument, a symmetrical collateral escrow system is used. Offers are fully 100% backed from both sides.
Because we cant verify amount of points a user have, we can only punish bad actors.
Sellers and buyers lock the same amount of collateral (USDC).

**TGE token** - is the actual token address that points are converted to. Individual to every points market. 
For example:
1) ProjectTEST started points farming program for their users. 
2) We, otx.markets, created ProjectTEST market on our platform, allowing users to speculate and trade those points allocations, whitch they can see only on ProjectTEST frontend (for example). 
Now, users can sell and buy those points (basically IOU`s) by locking up collateral in USDC.
3) After a few months, ProjectTEST announced an airdrop, where points are converted 3:1 to an actual deployed token, called TEST. They airdropped it to their users.
4) We, otx.markets, now update our existing ProjectTEST market with TGE token address of this TEST token, conversion rate. This triggers start of the Settlement Phase of the market. No new trades can be made now.
5) 24-hour window now starts, where Seller have to transfel corresponding amount of TGE tokens to the buyers. 
- If they do this, they will receive buyers collateral, AND their own collateral is released. Only thing Sellers are losing is actual TGE tokens.
- If not, sellers collateral will be transferred to buyers as penalty.And buyers collateral is released. 
After those 24 hours pass, Settlement window closes, and the market is over.

**Market Phases** 
1) Trading Phase, started immediatly after creation of the points market (by admin)
2) Settlement Phase, started after updating the corresponding points market with TGE token address, conversion rate, settlement duration. (by admin)
3) Closure, where all orders are forced to close. 

### Key Actors
- **User (Seller/Buyer)**: A user interacting via their EOA wallet
- **Platform**: Provides a DEX-like interface, backend services (FastAPI), database/cache (Supabase), and the on-chain Escrow contract.
- **Escrow Contract**: HERE

### Goal
Enable users to trade points in a real-time P2P OTC market with a DEX-like interface, supporting limit and market orders executed against on-chain offers, settlement after the TGE.

### Market Phases
HERE

## User Journey
HERE

### Step 1: User Connects Wallet & Accesses Platform

Shows Market Selector to choose active points markets.
### Step 2: User Creates a Sell offer.
User found a market for points that interests him. For example, ProjectTEST, and on their website he has 1000 points.  Selects trading pair (e.g., "TEST / USDC"), clicks "Sell", chooses "Limit". Inputs points amount (e.g., 10 TEST) and price (e.g., 1.0 USDC/point). Total collateral needed: 10 USDC.
User lock required collateral to fully cover his position. Those funds are now locked in Escrow.

If another user wants to buy those points, either with limit/market order, buyer also locks equal amount of USDC as "collateral" to buy those points. 

### Step 3: User checks his orders in Dashboard (optional)

HERE

### Step 4: User uses Dashboard to settle his buy/sell orders 

HERE

### Project considerations
HERE

- Every order should be a partial fill and we need to support extreme scenarios, like 1 sell order with 1500 buyers, same users taking different directions, all that. 
- Merkle trees 
-else , HERE