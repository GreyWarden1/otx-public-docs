---
title: "CURSORIGNORE SUGGESTIONS"
---

### Proposed additions to .cursorignore

- Node/Hardhat builds
  - artifacts/
  - cache/
  - typechain-types/
  - generated/
  - coverage/
  - coverage.json
  - build/

- Subgraph generated/build
  - subgraph-legacy/build/
  - subgraph-legacy/generated/
  - subgraph-legacy/node_modules/
  - subgraph-testnet/build/
  - subgraph-testnet/generated/
  - subgraph-testnet/node_modules/
  - subgraph-mainnet/build/
  - subgraph-mainnet/generated/
  - subgraph-mainnet/node_modules/

- Python build metadata
  - backend/*.egg-info/
  - backend/**/__pycache__/

- Large JSON deployment blobs
  - deployments/*/*.json
  - deployments/*/solcInputs/*.json

- Transient sandboxes
  - goldsky-test/
  - goldsky-test/node_modules/

- Media and heavy docs assets
  - design_photos/
  - docs/_build/

- Misc caches
  - .pytest_cache/
  - .nox/
  - .tox/
  - .nyc_output/
  - .parcel-cache/

- Dependencies
  - node_modules/

Notes
- Many of these are already in `.gitignore`, but adding here ensures Cursor ignores them during indexing and code suggestions.


