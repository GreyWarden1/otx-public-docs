---
title: "PROPOSED DELETIONS"
---

### Proposed deletions and rationale

- **`et --hard 823bb14`**: Stray terminal output accidentally committed (contains git reflog text). Not used anywhere.
- **`tatus`**: Stray file name fragment. No references anywhere.
- **Root `build/`**: Leftover build output (`build/MarketRegistryV3/`). Already ignored in `.gitignore`; should not be tracked.
- **Root `generated/`**: TypeScript contract bindings not referenced by code. Subgraphs use their own `generated/` in their folders. Safe to remove to avoid duplication.
- **`coverage/` and `coverage.json`**: Coverage artifacts. Already in `.gitignore`; delete from repo.
- **`artifacts/` and `cache/`**: Hardhat build artifacts. Should not be committed; delete current contents.
- **`typechain-types/`**: Generated bindings. Should not be committed; delete if tracked (it’s already ignored in `.gitignore`).
- **`backend/backend.egg-info/` and `backend/otx_markets_backend.egg-info/`**: Build metadata accidentally committed. Remove.
- **`backend/legacy_tests/`**: Not run by pytest (`testpaths = ["backend/tests"]`). Superseded by `backend/tests/`. Remove to reduce noise.
- **`subgraph-legacy/` (entire folder)**: Superseded by `subgraph-mainnet/` and `subgraph-testnet/`. No external references found outside of itself. Remove.
- **`subgraph-*/build/`**: Graph build outputs (e.g., `subgraph-testnet/build/`). Not source; delete.
- **`goldsky-test/`**: Ad-hoc test sandbox (own `node_modules`, config). Not referenced by scripts or backend. Either delete or move to `examples/goldsky/` outside main repo.
- **`test/temp_fix.txt`**: Temporary placeholder. Safe to delete.
- **`contracts/` (entire folder)**: Legacy solidity set superseded by `contracts-improved/` (Hardhat `paths.sources` points to `contracts-improved`). Not referenced by scripts or backend. Archive or delete.
- **Root `Escrow.sol`**: Monolithic alt contract used only for comparison in docs. Not referenced by Hardhat or scripts. Move into `docs/contracts/` as an appendix or delete.
- **`backend/pyproject.toml` and `backend/setup.py`**: Redundant with root `pyproject.toml` packaging which already maps `package-dir = {"" = "backend"}`. Removing avoids packaging confusion.
 - **One lockfile**: Keep either `yarn.lock` or `package-lock.json` at the repo root, not both. Choose your package manager and delete the other to avoid tooling conflicts.

Optional moves instead of delete
- **`design_photos/`**: Move under `docs/assets/` (binary images) and keep out of IDE indexers.
- **`deployments/hyperevm-backup-/`**: Rename/move to `deployments/backups/` or remove; trailing hyphen suggests temporary backup.

Notes and evidence
- Hardhat config uses `contracts-improved/` exclusively:
  - See `hardhat.config.ts` paths.sources set to `./contracts-improved`.
- No project references to root `generated/` were found; subgraphs import their own `../generated/...` within their folders.
- No repository references to `subgraph-legacy/` outside itself; modern subgraphs live under `subgraph-mainnet/` and `subgraph-testnet/`.

Deletion order suggestions
1) Remove build artifacts and caches: `artifacts/`, `cache/`, `coverage/`, `coverage.json`, `subgraph-*/build/`, `build/`.
2) Remove stray files: `et --hard 823bb14`, `tatus`.
3) Remove redundant/generated: `typechain-types/`, root `generated/`.
4) Remove old packaging metadata: `backend/*.egg-info/`, `backend/pyproject.toml`, `backend/setup.py`.
5) Remove legacy code: `backend/legacy_tests/`, `subgraph-legacy/`, `contracts/`, root `Escrow.sol` (or move).
6) Decide on `goldsky-test/` and `design_photos/` move/delete.


