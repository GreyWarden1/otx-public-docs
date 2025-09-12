---
title: "User Journey"
---

### otX.markets Frontend — End‑to‑End User Journey (UI/UX, no code)

This document describes the complete user journey, functional states, and UX requirements for the trading interface. It is implementation‑agnostic and contains no code.

## 1) Scope and Assumptions
- **Audience**: Web3 users trading points via on‑chain offers and settlements.
- **Primary Surface**: `Trade` page (desktop and mobile).
- **Wallets**: EVM wallets via browser extensions or mobile connectors.
- **Backend**: REST API under `/api/v1`, Subgraph via Goldsky, Settlement/OrderBook/Registry contracts.
- **Number formatting**: Locale‑aware on client; server renders neutral, avoid SSR/client mismatches.

## 2) Global UX Principles
- **Clarity**: Always indicate market phase; clearly distinguish Market vs Limit orders.
- **Feedback**: Toasts for actionable errors/success; inline messages for validation and phase gating.
- **Resilience**: Empty and skeleton states for all async data. No mock placeholders in production UI.
- **Accessibility**: Keyboard navigation, focus rings, ARIA roles on dialogs/menus/tables, color‑contrast safe.
- **Performance**: Avoid layout shift; stream data where possible; debounce inputs; virtualize large tables if needed.

## 3) Navigation and IA
- Entry: `/trade` (default route for authenticated and unauthenticated users).
- Global elements:
  - Header: brand, wallet status (address, available, locked), Dashboard button
  - Content: Market selector, price/chart, orderbook, trade panel, positions/orders/history.
  - Footer: legal and links.

## 4) First‑Time User Flow
1. User lands on `/trade`.
   - Show skeleton loaders for Market Selector, Orderbook, Chart, and Panels.
   - If backend not reachable, show a non‑blocking banner with retry.
2. Connect Wallet CTA in header and trade panel.
   - On click: open wallet connector.
   - If wrong network: prompt network switch; block trading actions until resolved.
3. Authenticate (Sign‑In With Wallet):
   - Request nonce -> user signs message -> verify -> store JWT in memory and (optionally) local storage.
   - On success: show success toast; header reflects authenticated state.
4. Approvals & Balances Primer:
   - If collateral token allowance is insufficient for intended amount, show inline note and a one‑click “Approve” action.
   - Balance/allowance checks run on input change before user presses Confirm.

## 5) Market Selection and State
- Market Selector shows list with search and a badge for phase:
  - Phases: Trading, Settlement, Closed.
  - Disabled actions when not in Trading; show inline reason.
- Auto‑select the most recently interacted or the first available Trading market.
- Show counts: total markets, active markets; show loading skeleton on first paint.

## 6) Market Data Surfaces
- Price/Chart: basic OHLC or placeholder trend; respect timeframe selection.
- Orderbook:
  - Split by side (Bids/Asks) or unified table with side indicator.
  - Group rows by identical price; aggregate size and total.
  - Correct decimal scaling (on‑chain units -> human). No exaggerated values.
  - Empty state when no offers; streaming/refresh indicator.
  - Row hover highlights and tooltips for details (maker, remaining size).

## 7) Trading Panel
- Mode toggle: Market vs Limit.
- Inputs:
  - Quantity (points).
  - For Limit: Price per point.
  - Side: Buy/Sell.
- Derived values:
  - For Market: best available fill preview, average price, total cost, fees. total offers filled.
  - For Limit: total cost at input price and quantity.
- Validation and pre‑checks (before enabling Confirm):
  - Market phase must be Trading.
  - Quantity > 0 and within user balance.
  - Allowance sufficient; otherwise prompt Approve.
  - Price > 0 for Limit orders.
  - Slippage constraints (configurable) for Market.
- Actions:
  - Approve (if required): single click; show pending/success/error toasts.
  - Confirm: opens confirmation dialog summarizing side, quantity, average/limit price, fees, total.
- Confirmation dialog:
  - Clearly state the action and risks; disable Confirm if validations fail.
  - On confirm: submit transaction, show wallet prompt, then pending state.

## 8) Transaction States
- Pending: show hash with link; UI disables duplicate submissions; show optimistic updates if safe.
- Success: toast + inline banner; positions and orders refresh.
- Failure: parse revert reasons; show human messages (e.g., not in trading phase, insufficient balance, allowance needed, price moved).

## 9) Positions / Orders / History
- Tabs with tables using consistent columns and formatting.
- Empty states with clear next steps (e.g., “Place your first order”).
- Historical fills show timestamps, sides, prices, quantities, and PnL if available.

## 10) Settlement and Claims (wip)
- If market enters Settlement/Closed:
  - Disable new orders; show banner explaining phase.
  - Provide “Claim” actions when applicable with required proofs.
  - Show outcomes and claimable amounts; handle partial defaults.

## 11) Errors and Messaging (canonical)
- Connectivity: “Unable to reach API. Retry.”
- Auth: “Signature rejected” / “Session expired” -> Re‑authenticate.
- Network: “Wrong network” -> Offer switch.
- Market phase: “This market is not in Trading; orders are disabled.”
- Balance: “Insufficient balance by X units.”
- Allowance: “Approval required for Y. Click Approve.”
- Price moved: “Price moved beyond slippage tolerance. Review preview.”
- Backend 4xx/5xx: humanized message + support link.

## 12) Mobile UX (WIP)
- Drawer for Orderbook and Trade Panel; stack vertically.
- Sticky Connect/Approve/Confirm actions.
- Larger tap targets and simplified tables.

## 13) Accessibility & i18n/L10n
- All dialogs focus‑trapped; ESC to close.
- Tab order predictable; keyboard shortcuts where safe.
- Number/date formatting respects locale; avoid SSR/client mismatches by formatting on client only for dynamic values.

## 14) Telemetry (suggested events)
- view_trade, connect_wallet_clicked, siwe_completed, approval_submitted/succeeded/failed, order_previewed, order_submitted/succeeded/failed, market_changed, claim_submitted/succeeded/failed.

## 15) Empty and Loading States
- Market Selector: skeleton rows; “No markets” copy.
- Orderbook: skeleton ladders; “No offers yet.”
- Panels: dimmed controls while loading; disabled Confirm until valid.

## 16) Quality Gates
- No mock values in production surfaces.
- Unit conversion verified against contract decimals.
- Grouped orderbook by equal price; no duplicates.
- Phase gating enforced.


