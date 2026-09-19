# Bienstar

**Planting trees to return the water Bitcoin used.**

Bienstar is a Bitcoin donation router for reforestation. Donors give BTC, which becomes verifiable, spendable USDC through a trustless lending flow, and lands in the hands of vetted reforestation organizations, who unlock it only after showing proof the trees are actually in the ground.

This README is meant to be the only document you need to read to understand the project: what it does, how it works, what's built today, and where it's going.

## The problem

Bitcoin donations to social and environmental causes are common, but two things usually break down after the transaction clears:

- **Liquidity.** A small reforestation nonprofit cannot easily spend BTC. It sits in a wallet, gets converted through an opaque off-ramp, or simply gets ignored as a donation channel.
- **Accountability.** Once funds are sent, donors have no reliable way to know whether the money actually became trees, wells, or cleanup, versus operating overhead or nothing at all.

Bienstar addresses both: it turns BTC into spendable USDC without a bridge or custodian holding donor funds, and it gates withdrawals behind evidence the organization has to submit and the team has to review.

## How it works

**For donors**, there are two ways to give:

1. **General pool.** BTC goes into a shared pool. The Bienstar team curates how the pool is distributed across vetted reforestation organizations, based on need and track record.
2. **Direct to an organization.** Donors pick a specific reforestation organization from the vetted list and their BTC is routed there directly.

**For organizations**, receiving funds is not the end of the flow:

1. Apply and get vetted to join the platform as a recipient.
2. Receive donations (from the pool allocation, direct donations, or both).
3. Submit evidence of the reforestation work the funds paid for: photos and GPS coordinates tied to the planting site.
4. The Bienstar team manually reviews the evidence before the withdrawal is unlocked or flagged.
5. Withdraw as USDC, without ever having to touch BTC infrastructure themselves.

**Under the hood**, converting BTC to USDC uses [Writz Protocol](https://github.com/WritzProtocol/writz), a trustless BTC lending protocol on Stellar/Soroban. The donor's BTC is locked natively (verified through Bitcoin SPV proofs, no bridge, no custodian, no wrapped tokens), and USDC is issued against it on Stellar. That USDC is what actually moves through the pool or direct-donation routing and what organizations withdraw.

## Architecture

```
Donor's BTC
    |
    v
Writz Protocol (Stellar/Soroban)
  - BTC locked natively, verified via Bitcoin SPV
  - No bridge, no custodian, no wrapped BTC
  - USDC issued against the locked BTC
    |
    v
Bienstar routing layer
  - General pool (manually curated allocation)      -> OR ->   Direct donation (donor-selected org)
    |                                                                  |
    v                                                                  v
                         Organization's USDC balance (escrowed until evidence review)
                                            |
                                            v
                         Evidence submission (photos + GPS)
                                            |
                                            v
                         Manual review by Bienstar team
                                            |
                                            v
                         USDC withdrawal unlocked
```

A deeper technical write-up, including current contract data models and the open design decisions in the migration, lives in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Tech stack

| Layer | Today | Direction |
|---|---|---|
| Web frontend | Next.js 15 (App Router, Turbopack), React 19, Tailwind CSS, react-three-fiber / drei for the 3D Bitcoin model, GSAP for scroll animation, next-themes for dark mode, a custom i18n context (EN / ES / JA) | Rebuilding the messaging and donation flow around the reforestation router described above |
| Mobile | Expo / React Native app ("Growie"), Expo Router, `@cavos/aegis` for Starknet account abstraction | Will follow the same chain migration as the on-chain layer |
| Smart contracts | Cairo / Dojo ECS on Starknet (Sepolia testnet), with `admin_system` and `donate_system` | Migrating to Stellar / Soroban to integrate natively with Writz Protocol and avoid a cross-chain bridge for the BTC-to-USDC step |

## Repository structure

```
apps/
  webapp/     Next.js frontend (the donor-facing site)
  expo/       React Native mobile app ("Growie")
  contracts/  On-chain logic
    bienstar_dojo/   Current Cairo/Dojo contracts on Starknet Sepolia
    cairo/            Notes and scaffolding for Cairo work
    dojo/             Notes and scaffolding for Dojo work
```

## Project status

Bienstar started as a general-purpose Bitcoin crowdfunding platform and shipped a working prototype: a Next.js site with a full donation UX (hero, featured projects, how-it-works, growth-themed storytelling, testimonials, trust badges), a Dojo/Cairo contract pair (`admin_system`, `donate_system`) deployed to Starknet Sepolia, and a companion Expo mobile app.

Validating that prototype surfaced the two gaps described above: general crowdfunding does not differentiate Bienstar, and Starknet does not give us a trustless BTC-to-USDC path. The project is now narrowing scope to a single, sharper use case, reforestation, and moving the on-chain layer to Stellar/Soroban to plug directly into Writz Protocol.

**Built:**
- Donor-facing web UI rewritten around the reforestation narrative: hero, how-it-works (donate, verify, grow), the BTC-to-tree journey, a verified-organizations grid, and a proof-wall preview of the evidence review flow, in EN / ES / JA
- Cairo/Dojo donation contracts on Starknet Sepolia
- Mobile app shell with campaign browsing and profile screens

**In progress / not yet built:**
- The organization and evidence data shown on the site is illustrative placeholder content, not a live backend. There is no real donation flow, organization registry, or evidence upload yet.
- Stellar/Soroban contracts replacing the Cairo/Dojo layer
- Writz Protocol integration for the BTC-lock-to-USDC step
- Organization vetting, evidence submission (photo + GPS), and manual review workflow
- Withdrawal flow for organizations

## Getting started

**Web app**

```bash
cd apps/webapp
bun install
bun dev
```

Open `http://localhost:3000`.

**Mobile app**

```bash
cd apps/expo
bun install
bun start
```

**Contracts**

```bash
cd apps/contracts/bienstar_dojo
sozo build
sozo migrate
```

## Related repos

- [`bienstar-internal`](https://github.com/salazarsebas/bienstar-internal) (private): narrative, positioning, and funding application context. Not needed to understand or run the product; kept separate on purpose.
