# Architecture

This document goes one level deeper than the README: what the current Starknet prototype actually does on-chain, what the Stellar/Soroban target looks like, and the reasoning behind the migration. Read the root [README](../README.md) first for the product-level picture.

## Current state: Starknet / Cairo / Dojo

The existing contracts (`apps/contracts/bienstar_dojo`) are a Dojo ECS deployment on Starknet Sepolia with four models and two systems.

**Models**

| Model | Purpose |
|---|---|
| `Player` | Tracks an account's total donated wBTC, donation count, and last donation timestamp |
| `Tree` | A gamified growth indicator per account, `growth_level` advances with donation thresholds (this is what the "Growie" mobile app and the `GrowingTreeSection` web component visualize) |
| `DonationLog` | One row per donation: player, initiative, amount, timestamp, anonymous flag |
| `Initiative` | A donation campaign, keyed by id, pointing at a `vesu_pool_addr` and a metadata `uri` |

**Systems**

| System | Responsibility |
|---|---|
| `admin_system` | `register_initiative`, creating new campaigns |
| `donate_system` | `donate`, recording a donation against an initiative and updating `Player` / `Tree` state |

Notably, `Initiative` already pointed at a `vesu_pool_addr`, meaning the original design routed donations into [Vesu](https://vesu.xyz), a Starknet lending pool, rather than holding them idle. The reforestation pivot keeps that same instinct (donated capital should be productive, not sit still) but moves it to Stellar so the lending step is BTC-native instead of wBTC-wrapped, and privacy-preserving instead of fully transparent balances.

## Why migrate to Stellar / Soroban

Two things the Starknet prototype cannot do without extra trust assumptions:

1. **Native BTC.** The current flow depends on wBTC, a wrapped, custodied representation of BTC. [Writz Protocol](https://github.com/WritzProtocol/writz) lets a donor lock real BTC directly from a Bitcoin wallet, verified on-chain via Bitcoin SPV proofs inside a Soroban contract, no bridge, no custodian, no wrapped asset.
2. **A liquid, widely-supported stablecoin leg.** Writz issues USDC against the locked BTC on Stellar. That gives organizations a withdrawal asset with real off-ramps, instead of a Starknet-native wrapped token.

The trade-off is real and worth naming: it means re-platforming the contract layer instead of extending the Cairo one, and the mobile app's `@cavos/aegis` Starknet account abstraction layer will need a Stellar-side equivalent. This is tracked as the main open migration cost.

## Target flow on Stellar / Soroban

```
Donor connects Bitcoin wallet + Stellar wallet
        |
        v
Donor sends BTC to a Writz-derived deposit address
        |
        v
Writz Soroban contracts verify the BTC transaction (SPV, no oracle)
and issue USDC against it
        |
        v
Bienstar routing contract receives the USDC and, per the donor's choice:
  - credits the general pool (curated allocation, see below), or
  - credits a specific organization's escrowed balance directly
        |
        v
Organization submits evidence (photo + GPS) off-chain,
with a reference hash recorded on-chain
        |
        v
Bienstar team reviews evidence (manual, off-chain today)
        |
        v
Approved -> organization's escrowed balance becomes withdrawable
Rejected -> balance stays escrowed, organization is notified to resubmit
```

## Design decisions still open

These are flagged deliberately rather than glossed over, since they are the actual engineering work ahead:

- **Pool allocation.** "Manually curated" is the answer for the MVP, but whether that allocation decision is recorded on-chain (an admin-signed transaction per allocation) or made off-chain with only the resulting transfer on-chain is not yet decided.
- **Organization vetting.** No registry contract or vetting criteria exist yet. An organization currently has no on-chain identity distinct from a Stellar address.
- **Evidence storage.** Photos and GPS data are not suited to on-chain storage. The plan is off-chain storage (details TBD) with only a content hash committed on-chain, so evidence can be verified as unaltered without bloating the ledger.
- **Escrow contract.** The Soroban contract that holds an organization's USDC until evidence is approved does not exist yet; this is the core new contract this migration requires, beyond porting `donate_system`'s logic.

## Repository mapping

| Concern | Current location |
|---|---|
| Starknet/Cairo/Dojo contracts (being migrated away from) | `apps/contracts/bienstar_dojo`, `apps/contracts/cairo`, `apps/contracts/dojo` |
| Web frontend | `apps/webapp` |
| Mobile app | `apps/expo` |
| Stellar/Soroban contracts | Not yet created; will live under `apps/contracts` alongside the Cairo work until the migration is complete, then replace it |
