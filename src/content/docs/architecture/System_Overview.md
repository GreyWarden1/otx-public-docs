---
title: "System Overview"
---

### otX.markets System Overview (Concise)

- Data path: Subgraph → Goldsky Pipeline → Supabase `mirror.*` → Public views/derived tables → Frontend Realtime

- Sources
  - Contracts: `OrderBookV3`, `MarketRegistryV3`, `SettlementEngineV3`
  - Subgraph entities: `market`, `offer`, `trade`

- Goldsky
  - Subgraph indexes on-chain events into entities
  - Pipeline streams entities to Supabase `mirror.market`, `mirror.offer`, `mirror.trade`

- Supabase
  - Mirror tables: raw indexed data
  - Public views/tables: `public.market_view`, `public.orderbook_levels`, etc.
  - Realtime: FE subscribes to public tables for live updates

- Backend
  - Prepares unsigned txs (create offer, fill, market-order, cancel)
  - Maintains derived tables (orderbook levels) via webhook-triggered recomputes
  - Health/metrics only for ops

- Frontend
  - Initial snapshot from Supabase public views
  - Subscribe to Supabase Realtime; no polling of backend for market data

- Notes
  - If an `OfferCreated` was missed before startBlock, subsequent fills may not produce `trade` without reindex
  - Ensure pipeline includes `trade` stream and writes to `mirror.trade`


