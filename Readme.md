# MRI Cube ↔ HubSpot Integration

A backend integration service enabling **bi-directional synchronization** between **MRI Cube** and **HubSpot CRM** for core real-estate entities. This service ensures data consistency, referential integrity, and controlled ownership across both systems.

---

## Overview

This repository contains the integration logic to synchronize data between **MRI Cube** and **HubSpot**, supporting multi-tenant environments and custom CRM objects.

### Supported Sync Scope

| Entity   | Direction       | Notes                     |
| -------- | --------------- | ------------------------- |
| Tenant   | 2‑way           | Custom object in HubSpot  |
| Property | 2‑way           | Custom object in HubSpot  |
| Unit     | 2‑way           | Custom object in HubSpot  |
| Owner    | 1‑way → HubSpot | Source of truth: MRI Cube |

---

## Domain Model & Relationships

The integration enforces the following hierarchy:

```
Owner
 └── Property
      └── Unit
           └── Tenant
```

### HubSpot Object Mapping

| Domain Entity | HubSpot Object Type      |
| ------------- | ------------------------ |
| Owner         | Standard / Custom Object |
| Property      | Custom Object            |
| Unit          | Custom Object            |
| Tenant        | Custom Object            |

Relationships are maintained using **HubSpot object associations**.

---

## Sync Strategy

### Source of Truth Rules

* **Owner**: MRI Cube is the single source of truth
* **Tenant / Property / Unit**:

  * Updates can originate from either system
  * Conflict resolution is timestamp-based (last-write-wins)

### Key Sync Characteristics

* Idempotent operations
* External ID–based upserts
* Association-first validation
* Partial failure isolation (one entity failure does not halt others)

---

## High-Level Architecture

```
MRI Cube API
     │
     ▼
Integration Service
     │
     ├── Sync Engine
     ├── Mapping Layer
     ├── Conflict Resolver
     └── Webhook/Event Handlers
     │
     ▼
HubSpot CRM APIs
```

---

## Features

* Bi-directional sync with HubSpot custom objects
* Tenant-aware processing
* Retry-safe upserts
* Association integrity checks
* Extensible mapping layer
* Structured logging for audit/debugging

---

## Configuration

### Environment Variables

```env
# HubSpot
HUBSPOT_ACCESS_TOKEN=
HUBSPOT_PORTAL_ID=

# MRI Cube
MRI_API_BASE_URL=
MRI_API_KEY=

# Sync Settings
SYNC_BATCH_SIZE=100
SYNC_RETRY_LIMIT=3
LOG_LEVEL=info
```

---

## Setup & Installation

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Production
npm run start
```

---

## Sync Workflows

### 1. Tenant Sync (2‑Way)

* Validate unit association
* Upsert tenant
* Maintain unit ↔ tenant relationship

### 2. Property Sync (2‑Way)

* Validate owner association
* Upsert property
* Maintain owner ↔ property relationship

### 3. Unit Sync (2‑Way)

* Validate property association
* Upsert unit
* Maintain property ↔ unit relationship

### 4. Owner Sync (MRI → HubSpot)

* Create or update owner
* No reverse updates allowed

---

## Error Handling & Observability

* Structured error logs with entity context
* Graceful handling of missing associations
* Retry with exponential backoff
* Non-blocking sync pipeline

---

## Security Considerations

* OAuth / API-key based authentication
* Secrets managed via environment variables
* No PII logged

---

## Repository Structure (Indicative)

```
src/
 ├── clients/        # MRI & HubSpot API clients
 ├── services/       # Sync services
 ├── mappers/        # Field mappings
 ├── handlers/       # Webhooks / jobs
 ├── utils/          # Shared utilities
 └── index.ts
```

---

## Contribution Guidelines

* Follow conventional commits
* Add tests for new sync logic
* Ensure backward compatibility

---

## License

Internal / Proprietary

---

## Maintainers

Integration Engineering Team
