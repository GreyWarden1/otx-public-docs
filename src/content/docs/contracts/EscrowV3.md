---
title: "EscrowV3 System: Production Implementation Documentation"
---

# EscrowV3 System: Production Implementation Documentation

**Updated:** January 2025  
**Status:** ✅ PRODUCTION READY - All features implemented and tested

### Key Explanation

**Points** - Non-trackable, off-chain, completely external to our application. This is basically "future airdrop allocations", that at some day will be converted to actual transferable crypto token.
Projects in Web3 usually do point farming programs to reward their users and allow them to earn and track their possible future airdrop allocation. 

OTX.markets provides a platform to trade those not-yet-liquid allocations. 

To ensure full zero-trust environment, a symmetrical collateral escrow system is implemented. 
Because we cant verify amount of points a user have, we can only punish bad actors.
Sellers and buyers lock the same amount of collateral (USDC).100% backed.

**TGE token** - is the actual token address that points are converted to. Individual to every points market. 
For example:
1) ProjectTEST started points farming program for their users. 
2) We, otx.markets, created ProjectTEST market on our platform, allowing users to speculate and trade those points allocations, which they can see only on ProjectTEST frontend (for example). 
Now, users can sell and buy those points (basically IOU's) by locking up collateral in USDC.
3) After a few months, ProjectTEST announced an airdrop, where points are converted 3:1 to an actual deployed token, called TEST. They airdropped it to their users.
4) We, otx.markets, now update our existing ProjectTEST market with TGE token address of this TEST token, conversion rate. This triggers start of the Settlement Phase of the market. No new trades can be made now.
5) 24-hour window now starts, where Seller have to transfer corresponding amount of TGE tokens to the buyers. 
- If they do this, they will receive buyers collateral, AND their own collateral is released. Only thing Sellers are losing is actual TGE tokens.
- If not, sellers collateral will be transferred to buyers as penalty. And buyers collateral is released. 
After those 24 hours pass, Settlement window closes, and the market is over.

**Market Phases** 
1) Trading Phase, started immediately after creation of the points market (by admin)
2) Settlement Phase, started after updating the corresponding points market with TGE token address, conversion rate, settlement duration. (by admin)
3) Closure, where all orders are forced to close. 

---

