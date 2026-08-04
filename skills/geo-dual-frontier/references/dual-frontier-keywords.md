# Dual-Frontier Keyword Selection (双栖筛词)

The first step of the dual-frontier method: find queries that deserve **both** an SEO investment and a GEO investment. A keyword that only ranks, or only gets asked to AI, captures only half the value of the same writing effort.

## The Two Axes

### Axis 1 — Demand (SEO worthiness)
- **Search volume** — how many searches/month (Semrush, Ahrefs, GSC, Keyword Planner).
- **Difficulty** — can you realistically rank? Low-authority sites need long-tail.
- **Business value** — does ranking drive revenue or just traffic?

### Axis 2 — AI-Query-Fit (GEO worthiness)
A query is GEO-worthy when it is phrased the way people actually ask AI assistants:
- **Natural-language question** — "how much is a wedding banquet per table in Tianjin?" not "Tianjin wedding banquet price".
- **Comparison intent** — "[X] vs [Y]", "best [category] for [use case]".
- **Definition intent** — "what is [concept]".
- **How-to intent** — "how to [solve problem]".
- **Pricing/spec intent** — "[product] pricing", "[product] specs".

Validate by **asking the AI directly**: paste the query into ChatGPT and Perplexity. Does an AI Overview or cited answer appear? Are competitors cited? That tells you the query is live on the answer-frontier.

## The Matrix

Score each candidate 1–5 on both axes, multiply for a Dual score (1–25).

| Query | Demand | AI-Fit | Dual | Action |
|-------|:------:|:------:|:----:|--------|
| "天津婚宴 多少钱一桌" | 4 | 5 | 20 | ✅ Primary dual-target |
| "best CRM 2026" | 5 | 3 | 15 | ⚠️ SEO-led; add answer block |
| "our founding story" | 1 | 2 | 2 | ❌ Skip |
| "how to write a refund policy" | 3 | 4 | 12 | ⚠️ GEO-led; ensure it also ranks |

## Decision Rules

- **Dual ≥ 16** → full dual-frontier treatment (answer block + depth + 3-layer schema).
- **One axis strong / one weak** → build for the strong axis, add the *minimum* structure for the weak one:
  - SEO-strong, GEO-weak → add a 40–60 word answer block + FAQ schema so AI can extract it.
  - GEO-strong, SEO-weak → ensure the page is indexable, has E-E-A-T signals, and targets a real cluster so it can rank.
- **Both weak** → skip or fold into a broader cluster page.

## Fan-Out Coverage

For each primary dual-target, list the 5–10 related queries the AI will fan out to (synonyms, sub-questions) and confirm your content (or site) covers them. Single-page-per-keyword targeting underperforms on both fronts; topical authority wins. See `ai-seo` → Query Fan-Out and `content-strategy` for cluster planning.
