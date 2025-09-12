---
title: "Ui Inventory"
---

### otX.markets Frontend — UI Inventory and Spec (to be populated)

Fill this document to define the exact behavior and appearance of every UI element. No code here—only specifications.

## A) Global
- **Theme**: [Light/Dark/default]
- **Typography**: [Primary font, sizes]
- **Spacing scale**: [xs/sm/md/lg]
- **Color tokens**: [primary/secondary/success/warning/destructive]
- **Locale & number formatting**: [default locale, currency display rules]

## B) Pages
For each page, define purpose, sections, and primary actions.

1. `Trade`
   - Purpose: browse markets and trade points
   - Sections: Market Selector, Chart, Orderbook, Trading Panel, Positions/Orders/History
   - Primary actions: Connect, Approve, Buy/Sell

2. 'Dashboard' (wip)
   - Purpose: to see the current status of all activity of user and allow advanced settlement options (if he was a seller ) and claim.
   - Sections:
   - Primary actions:

## C) Market Selector
- Layout: [Command/Combobox with search]
- Fields shown per market row: name, badge phase, created date, volume, price, link to projects twitter, link to project's website, short info/descriprion of selected market
- Badges: [Trading/Settlement/Closed] with colors
- Search/filter:  default - by volume, by name, by phase
- Default selection rule: [first active trading / last used]
- Empty/loading states: [copy, skeleton behavior]

Explanation: Market selector goes above the Chart, Orderbook, Trading Panel. It should not take too much space. 
On the right of it - a dropdown where you can see all the markets and sort them. 
1) There should be a field with short description of the selected market. Like "TEST is a new landing protocol on HyperEVM and shows...".  
2) Should also show a clear moderate-sized current price, 7D volume, links. 

## E) Orderbook
- Mode: [split sides | unified]
- Grouping: [group by identical price]
- Columns: price, size, total
- Decimals: price decimals, quantity decimals
- Update cadence: poll interval | stream
- Empty/loading states: [copy, skeleton style]
- Interactions: [row hover, tooltips]

## F) Trading Panel
- Modes: Market | Limit (switch with buttons)
- Inputs per mode:
  - Market: [quantity]
  - Limit: [quantity, price]
- Derived values:
  - Market: [average price, total, fees, slippage]
  - Limit: [total, fees]
- Validation rules: [min/max quantity, price > 0, phase gating]
- Balance/allowance checks: [pre‑check on change, thresholds]
- Actions: [Approve, Confirm]
- Error display: [inline below field, toast]
- Confirmation dialog contents: [side, quantity, price/avg price, fees, total]

## G) Wallet & Auth
- Connect flows: [supported wallets]
- SIWE copy: [title, description]
- JWT persistence: [session/local]
- Wrong network UX: [banner + switch CTA]

## H) Header Stats
- Fields: Available, Locked
- Refresh cadence: [poll interval]
- Formatting rules: [decimals]

## I) Positions / Orders / History
- Tabs and table columns per tab
- Empty states copy
- Sorting/filtering requirements

## J) Settlement & Claims (wip)
- When to show claim actions
- Claim preview contents
- Error states

## K) Toaster & Dialogs
- Toast variants: [success, error, warning, info]
- Dialog patterns: [AlertDialog for confirmation]

## L) Mobile
- Drawer usage: [orderbook/trade panel]
- Reduced columns / condensed views

## M) Accessibility
- Keyboard navigation rules
- Focus management in dialogs
- ARIA attributes

## N) Visual Examples (optional)
- Links to mockups, screenshots, or Figma frames


