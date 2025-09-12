---
title: "Goldsky Schema"
---

# Goldsky Schema

## Market Order Related Types

### Market
- `id: ID!`
- `marketId: BigInt!`
- `name: String!`
- `pointsIdentifier: String!`
- `creator: Bytes!`
- `createdAt: BigInt!`
- `isActive: Boolean!`
- `currentPhase: String!`
- `settlementInfo: SettlementInfo`
- `offers: [Offer!]`
- `trades: [Trade!]`

### Offer
- `id: ID!`
- `offerId: BigInt!`
- `market: Market!`
- `creator: Bytes!`
- `offerType: String!` # "BUY" or "SELL"
- `amount: BigInt!`
- `amountFilled: BigInt!`
- `price: BigInt!`
- `createdAt: BigInt!`
- `isFilled: Boolean!`
- `isCancelled: Boolean!`

### Trade
- `id: ID!`
- `market: Market!`
- `buyer: Bytes!`
- `seller: Bytes!`
- `amount: BigInt!`
- `price: BigInt!`
- `timestamp: BigInt!`

## Query Structure

### Get Market Offers
```graphql
query GetMarketOffers($marketId: BigInt!) {
  market(id: $marketId) {
    offers(
      where: { isFilled: false, isCancelled: false }
      orderBy: price
      orderDirection: asc
      first: $limit
    ) {
      id
      offerId
      creator
      offerType
      amount
      amountFilled
      price
      isFilled
      isCancelled
    }
  }
}
```

### Get Offer Details
```graphql
query GetOfferById($offerId: BigInt!) {
  offer(id: $offerId) {
    id
    offerId
    market {
      marketId
    }
    creator
    offerType
    amount
    amountFilled
    price
    isFilled
    isCancelled
  }
}
```
