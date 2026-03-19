# SuprBuild
## Prompt-Style Product Requirements Document
**Version:** 1.0.0 · **Status:** Active Draft · **Stage:** Pre-Seed → Series A · **Model:** B2B SaaS

---

## 00 · Context

### Product Identity

You are **SuprBuild** — an AI-native growth infrastructure platform built for startups navigating 0→1 and SMBs managing AI-driven complexity at scale.

Your purpose is not to be another tool in the stack. Your purpose is to **replace the consultant, the fractional CTO, the growth agency, and the analytics BI team** — with a single intelligent system that compounds over time.

### Core Belief

The market moved. **AI adoption is table stakes; AI complexity management is the moat.** 91% of SMBs using AI report revenue growth, and growing companies are nearly twice as likely to invest in AI than declining ones. The real bottleneck for SMBs is not getting AI, it is orchestrating multiple vendors, agents, and workflows safely and transparently across finance, growth, and operations.

> **DO NOT** position SuprBuild as a generic SaaS platform, an AI tool aggregator, or a consulting service with software. SuprBuild is infrastructure — durable, composable, and deeply integrated into how a business operates.

---

### Market Signal · 2026

The following validated data points anchor all product and positioning decisions. Reference these in all user-facing copy, investor materials, and onboarding flows.

| Signal | Value | Context |
|---|---|---|
| SMB Software Market | **$77B** | Growing to $108B by 2031 |
| AI Revenue Impact | **91%** | of SMBs using AI report measurable revenue growth |
| Vertical SaaS CAGR | **25.9%** | Market projected at $720B by 2028 |
| AI SaaS Growth Rate | **38% CAGR** | Fastest growing category in enterprise software history |
| MSP Market | **$511B** | Projected end of 2026 |

### Confirmed Market Gaps — 2026 Validated

- **AI Complexity Governance for SMBs** — Running 5–12 disconnected AI tools is the dominant failure mode. SMBs need a single control plane for agent workflows, cost attribution, audits, and rollback.
- **Predictable Demand & Growth Marketing** — The a16z-backed $11.5M signal in March 2026 proves this gap is funded: SMBs still lose 40–60% of digital marketing spend to poor funnel visibility and execution drift.
- **Vertical SaaS Operating Engine** — The market is not broad horizontal SaaS first; the defensible growth path is vertical product + process templates for underserved SMB segments.
- **Secure Operational Foundations** — SMBs have enterprise attack surfaces without enterprise controls. Winning requires built-in policy enforcement, incident traceability, and compliance scaffolding.
- **SMB Financial & Operational Intelligence** — 62% of SMBs say business banking adds no value; too many systems still operate in silos without ROI-level dashboards.

---

## 01 · Role & Persona

### Product Role Definition

> If you are an AI assistant working on this product, assume the role of a **senior product engineer at a Series A startup**. Your team is small (4–8 people), opinionated, and building for speed without sacrificing architecture. You default to TypeScript, Next.js 15, PostgreSQL, and Tailwind. You know when to build and when to buy.

**Tone of all product output:** Direct. Data-grounded. No filler language.

Replace: `"future-proof"` `"robust"` `"cutting-edge"` `"empower"` — with specific outcomes, timelines, and metrics. Every claim earns its place.

**Design philosophy:** Clarity is the feature. Dense information, clearly structured. No decorative complexity. Every screen has one primary action. Operators under pressure should extract the answer in under 4 seconds.

---

### User Personas

#### Persona 01 — The Founding Builder
**Role:** Technical Co-Founder · Seed Stage

**Goals**
- Ship a scalable MVP without technical debt that kills the Series A
- Make architectural decisions they won't regret at 10× scale
- Access a senior technical sounding board without hiring cost

**Pain Points**
- No time to research best practices while building under pressure
- Unsure when to build vs buy vs integrate
- Isolated — critical decisions made without experienced input

---

#### Persona 02 — The SMB Operator
**Role:** Owner / GM · 10–50 people

**Goals**
- Identify AI tools that deliver real ROI for their specific size and sector
- Automate repetitive operations without an IT department
- Compete on data quality against better-resourced competitors

**Pain Points**
- Overwhelmed by vendor choices and conflicting advice
- Previous digital transformation projects failed or stalled at 60%
- No internal analytics capability — key decisions made on gut

---

#### Persona 03 — The SaaS Scaler
**Role:** CEO / Head of Product · B2B SaaS

**Goals**
- Improve NRR by reducing churn and expanding account revenue
- Move from generalist positioning to vertical-specific dominance
- Build compliance posture ahead of first enterprise sales motion

**Pain Points**
- Growth has plateaued — unclear if it's product, positioning, or GTM
- Engineering cycles consumed by firefighting, not product velocity
- No clear path to a Series B narrative that investors believe

---

## 02 · Constraints

Written in RFC 2119 modal verb convention. Every build decision is evaluated against this hierarchy.

### Hard Constraints

**MUST — Multi-tenant data isolation**
All client data must be logically and physically isolated. No cross-tenant data leakage under any operating condition. SOC 2 Type II compliance from day one of production deployment.

**MUST — API-first architecture**
Every product surface must be backed by a versioned, documented API. White-label partners and enterprise clients require full programmatic access. No hard-coded UI-only workflows.

**MUST — Auditability for all agent actions**
Every action taken by an AI agent must produce a timestamped, immutable log entry attributable to a specific agent, task, and user context. Non-negotiable for enterprise and compliance use cases.

**SHALL — Time-to-value under 30 minutes**
A new client shall reach their first meaningful output — readiness score, AI roadmap, or agent task completion — within 30 minutes of completing onboarding. Longer = churn signal at this stage.

**SHALL — Mobile-responsive core views**
Dashboard, agent status, KPI summary, and notification surfaces shall be fully functional on mobile (≥375px). SMB operators frequently work from mobile during operations.

---

### Design & Behaviour Constraints

**SHOULD — Prescriptive over descriptive**
Every data view should recommend a next action, not just display a metric. `"Your NRR is 94%"` is reporting. `"Your NRR is 94% — 3 accounts flagged as churn risk. Review playbook →"` is SuprBuild.

**SHOULD — Progressive disclosure**
Complex configurations (agent orchestration, compliance setup) should surface a simple default path first. Advanced options revealed on explicit user request. Complexity is available, never forced.

**SHOULD — Explainability for all AI recommendations**
Every AI-generated recommendation should include a one-sentence confidence signal and the primary data source. Operators should never be asked to act on a black box output.

**MAY — Vertical-specific template packs**
The platform may ship pre-configured template packs for high-priority verticals (e-commerce, professional services, logistics). These are acceleration layers, not product differentiators.

---

## 03 · Feature Requirements

### Priority Definitions

| Level | Label | Definition |
|---|---|---|
| P0 | Critical | Without this, the product does not function or the core value proposition is not deliverable. Ship before public launch. |
| P1 | High | Required for retention and competitive differentiation. Ship within 90 days of launch. |
| P2 | Medium | Enhances value for established clients. Roadmap within 6 months. |

> P3 features are tracked in backlog but not committed to any timeline. Not listed here.

---

### M1 · Startup Launchpad

For The Founding Builder. Reduces time-to-market-fit from ~18 months to under 10. Entry point for all startup cohorts.

| Feature | Priority | User Story | Acceptance Criteria |
|---|---|---|---|
| Intake & Diagnostic Engine | **P0** | As a founder, I want a structured assessment so I know exactly where I am and what to fix first. | 20-point readiness score in <8 min. Outputs actionable gap report with prioritised next steps. |
| Capital Pathways Dashboard | **P0** | As a founder, I want to see every funding source I qualify for without manual research. | 300+ grants/VC/RBF programs. Real-time eligibility scoring. Application status tracking. |
| Architecture Review Service | **P1** | As a CTO, I need expert feedback on my stack before I scale it into a problem. | Async expert review, 48hr turnaround. Output: risks, recommendations, alternatives. |
| Mentor Match Algorithm | **P1** | As a founder, I want a mentor who's solved the exact problem I'm facing, not just a generalist. | Match on sector, stage, specific founder gap. Structured session template. Progress tracking per relationship. |
| Investor Readiness Scorecard | **P2** | As a founder preparing for Series A, I want to know exactly what gaps will kill my raise. | Dynamic checklist aligned to Series A criteria. Per-item coaching prompts. Exportable as investor memo supplement. |

---

### M2 · SMB AI Operations

For The SMB Operator. The core product differentiation. Turns AI complexity from a liability into a managed asset. This is the agent orchestration layer.

| Feature | Priority | User Story | Acceptance Criteria |
|---|---|---|---|
| AI Readiness Assessment | **P0** | As an SMB owner, I want to know which AI investments will actually move my numbers before I spend anything. | Covers data quality, process maturity, team readiness. Outputs a 90-day ROI roadmap with execution playbook for the top 3 growth levers. |
| Agent Orchestration Layer | **P0** | As an operator, I need to manage all my AI agents in one place and see what they're doing and costing. | Multi-vendor agent dashboard, task orchestration, conflict resolution, cost attribution, and immutable audit logs with rollback actions. |
| Prescriptive Analytics Suite | **P1** | As an owner, I don't want a dashboard — I want to be told what to do next. | Actionable recommendations with confidence and source metadata; integrates with CRM/ERP/commerce; “next best 3 actions” workflow for revenue and retention. |
| Growth Marketing Reliability | **P1** | As a growth leader, I need predictable demand with measurable spend ROI from ad to close. | Data-backed campaign scorecards, bleed-down alerts, agent-assisted campaign optimization, and conversion pipeline attribution. |
| Cybersecurity Governance Kit | **P1** | As an SMB owner, I need to run AI growth operations with enterprise-grade controls in a small team. | Policy templates, risk posture score, incident workflow, and compliance checklists (SOC 2/ISO 27001 basics) wired into the agent governance UI. |

---

### M3 · SaaS Accelerator

For The SaaS Scaler. Vertical depth over horizontal breadth. The unit economics framework that turns stalling growth into a Series B narrative.

| Feature | Priority | User Story | Acceptance Criteria |
|---|---|---|---|
| Churn Prediction Engine | **P1** | As a SaaS CEO, I want to know which accounts are about to churn before they cancel, not after. | ML model flags at-risk accounts 30 days prior. Triggers automated retention playbook. Accuracy: >78% precision at 30-day horizon. |
| Vertical Positioning Workshop | **P1** | As a founder, I need to stop being a generic tool and start owning a specific market. | Facilitated ICP sharpening with market sizing data. Output: updated GTM strategy doc + revised positioning statement. |
| Scalability Benchmark Report | **P1** | As a CTO, I need to know where my architecture breaks before my investors find out the hard way. | Load testing, cost-per-unit analysis, bottleneck identification. Delivered as prioritised engineering backlog with effort estimates. |
| Enterprise Sales Readiness Kit | **P2** | As a founder, I need to look enterprise-ready to close my first $50K+ deal. | Security questionnaire templates, procurement guide, compliance checklist, standard DPA template. Covers top 10 enterprise objection categories. |

---

## 04 · Technical Architecture

### Architecture Directive

> SuprBuild is **API-first, modular, and multi-tenant by design**. Each pillar (Launchpad, AI Ops, SaaS Accelerator) deploys as an independent service. Partners and enterprise clients can consume individual modules via the public API without adopting the full platform.

**Non-negotiables**
- Every data model is tenant-scoped from row 1. No retrofitting isolation later.
- LLM calls are abstracted behind a provider interface. Swapping model vendors requires zero application code changes.
- Agent actions produce immutable event logs. Every automated decision is attributable, reversible, and auditable.
- The frontend is a skin on the API. No business logic in components.

---

### System Layers

| Layer | Components | Stack |
|---|---|---|
| Presentation | Client portal, admin dashboard, mobile app, partner-embed widget, API docs | Next.js 15, React Native, TailwindCSS |
| Orchestration | Agent manager, multi-vendor workflow engine, job queue, event bus, conflict resolution | Node.js, BullMQ, Kafka |
| Intelligence | ML models, LLM abstraction layer, analytics pipeline, recommendation engine, churn prediction | Python, FastAPI, LangChain, dbt |
| Data | Multi-tenant relational DB, vector store, data warehouse, event store, cache | PostgreSQL, Pinecone, Snowflake, Redis |
| Integrations | CRM, ERP, cloud provider, payment gateway, identity, webhook engine, 50+ connectors | REST, Webhook, OAuth 2.0 |
| Infrastructure | Container orchestration, CI/CD, observability, secrets management, DR | Kubernetes, GitHub Actions, Datadog |

---

## 05 · Success Metrics

Every KPI has a specific target, timeline, and owner. Vanity metrics are excluded.

| KPI | Target | Baseline | Timeline | Owner |
|---|---|---|---|---|
| Time to Market Fit | < 10 months | ~18 months | Per cohort | Product |
| AI Adoption Rate | > 70% | — | 90 days post-onboard | Onboarding |
| NRR (SaaS Tier) | > 120% | — | 6 months | CS |
| Time to ROI | < 12 weeks | — | Per cohort | Onboarding |
| 12-Month Client Retention | > 85% | — | Annual | CS + Product |
| NPS Score | > 55 | — | Quarterly | All |

### Failure Conditions

If any of the following are true at 90-day review, **halt feature development and run a full discovery sprint:**

- Time-to-first-value exceeds 60 minutes for >30% of onboarded clients.
- Agent orchestration module sees <40% weekly active usage from onboarded SMB clients.
- NPS falls below 40 for any single persona segment.
- **Any cross-tenant data access event, regardless of scale or cause.**

---

## 06 · Roadmap

| Phase | Focus | Key Deliverables | Timeline |
|---|---|---|---|
| **Q1** | Foundation | Intake & Diagnostic Engine, Capital Dashboard MVP, Multi-tenant DB schema, CI/CD pipeline | Months 1–3 |
| **Q2** | Intelligence | Agent Orchestration Layer, AI Readiness Assessment, Prescriptive Analytics v1, Mentor Match Algorithm | Months 4–6 |
| **Q3** | Scale | SaaS Accelerator module, Cybersecurity Governance Kit, FinOps Dashboard, Partner API v1 | Months 7–9 |
| **Q4** | Expand | White-label platform, APAC localisation, Vertical marketplace, Series A readiness review | Months 10–12 |

### Q1 — Foundation
- Intake & Diagnostic Engine — core assessment, readiness scoring, gap report output
- Capital Pathways Dashboard — 300+ programs, eligibility scoring, status tracking
- Multi-tenant database schema — row-level security, audit log foundation
- CI/CD pipeline and observability stack baseline

### Q2 — Intelligence
- Agent Orchestration Layer — multi-vendor agent management, conflict resolution, full audit log
- AI Readiness Assessment — 90-day adoption roadmap output with ROI estimate
- Analytics Pipeline — prescriptive recommendations engine v1
- Mentor Match Algorithm — matching model, session templates, progress tracking

### Q3 — Scale
- SaaS Accelerator module — churn prediction, vertical positioning workshop, scalability benchmarks
- Cybersecurity Governance Kit — policy templates, compliance checklists
- FinOps Dashboard — multi-cloud spend governance
- Partner API v1 — public API, webhook engine, SDK

### Q4 — Expand
- White-label platform — full theming, custom domain support, partner billing
- APAC localisation — SE Asia market focus, language packs
- Vertical marketplace — industry-specific template packs
- Series A readiness review — product, data, and narrative audit

---

*SuprBuild · Prompt-Style PRD · v1.0.0 · 2026 · Confidential*
