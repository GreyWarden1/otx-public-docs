---
title: "AccessControlV3 Technical Documentation"
---

# AccessControlV3 Technical Documentation

## Overview
Centralized role-based access control for the EscrowV3 system. Provides hierarchical permissions with transparent role management.

**Inheritance:** AccessControlEnumerable, Initializable

## Roles
- **ADMIN_ROLE:** Root authority, can grant/revoke all roles
- **MARKET_MANAGER_ROLE:** Operational authority, can manage markets

## Functions

### External Functions
```solidity
function initialize(address initialAdmin) public initializer
function grantRoleWithReason(bytes32 role, address account, string reason) external
function revokeRoleWithReason(bytes32 role, address account, string reason) external
function isAdmin(address account) external view returns (bool)
function isMarketManager(address account) external view returns (bool)
```

### Modifiers
```solidity
modifier onlyAdmin() // ADMIN_ROLE required
modifier onlyMarketManager() // ADMIN_ROLE or MARKET_MANAGER_ROLE
```

### Constants
```solidity
bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE")
bytes32 public constant MARKET_MANAGER_ROLE = keccak256("MARKET_MANAGER_ROLE")
```

## Events
```solidity
event RoleGrantedWithReason(bytes32 indexed role, address indexed account, address indexed sender, string reason)
event RoleRevokedWithReason(bytes32 indexed role, address indexed account, address indexed sender, string reason)
```

## Cross-Contract Usage
All other EscrowV3 contracts import AccessControlV3 and use:
- `accessControl.isAdmin(msg.sender)` - Check admin permissions
- `accessControl.isMarketManager(msg.sender)` - Check market manager permissions
- `onlyAdmin()` modifier - Restrict to admin functions
- `onlyMarketManager()` modifier - Restrict to market manager functions

## Security
- Role hierarchy: ADMIN_ROLE > MARKET_MANAGER_ROLE
- Initialization protection via `initializer` modifier
- Zero address validation for admin assignment
- Transparent role management with reason tracking 