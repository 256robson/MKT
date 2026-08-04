# Three-Layer Schema (三层Schema)

Make dual-frontier content machine-readable on three layers so both Google and AI engines can parse, extract, and cite it. You do not need all three at once — start with Layer 1, add Layer 2/3 as authority grows.

## Layer 1 — On-page JSON-LD (Google rich results)

For implementation details and templates, use the **schema** skill. Key types:

| Content | Schema | Why |
|---------|--------|-----|
| Article / blog | `Article`, `BlogPosting` | Author, date, topic ID |
| FAQ | `FAQPage` | Direct Q&A extraction |
| How-to | `HowTo` | Step extraction |
| Product / pricing | `Product`, `Offer` | Price, availability, reviews |
| Comparison | `ItemList` | Structured comparison |
| Org | `Organization` | Entity recognition |

Content with proper schema shows **30–40% higher AI visibility** on non-Google engines. Google: structured data is "not required for generative AI search" but recommended for overall SEO.

## Layer 2 — Machine-readable files (AI engines & buying agents)

AI agents increasingly evaluate products programmatically before a human visits. Opaque, JS-rendered, or "contact sales" pricing gets filtered out.

**`/llms.txt`** (llmstxt.org) — a concise context file telling AI what your site is, who it's for, and linking to key pages (including pricing). No confirmed ranking signal yet; treat as protocol-layer registration like early schema.org.

**`/pricing.md` or `/pricing.txt`** — structured, parseable facts:

```markdown
# Pricing — [Product]
## Standard
- Price: ¥2599/table (wedding banquet, observed starting price)
- Includes: 450㎡ pillar-free hall (5F Kaiyuan), bridal suite, double breakfast
- Source: third-party wedding platforms; confirm with sales
## Premium
- Price: ¥3380–4880/table
- Includes: full package + premium decor
```

Best practices: consistent units; specific limits not just feature names; list what's *included* at each tier; keep updated (stale pricing is worse than none); link from sitemap and main pricing page.

**`/okf/` — Open Knowledge Format bundle** (Google-backed, v0.1): a directory of cross-linked markdown files with YAML frontmatter representing site content, agent-readable without scraping. Free generator, WordPress plugin, or by-hand. No confirmed AI-search ranking signal today — protocol-layer registration.

> Google's stance: these files are **not required** for AI Overviews/AI Mode. Include them because non-Google engines (ChatGPT, Claude, Perplexity) and autonomous buying agents reward extractable structure — without harming Google.

## Layer 3 — Entity & third-party presence (drives recommendations)

Citations ≠ recommendations. Getting *cited* means consulted; getting *recommended* (onto the buyer's shortlist) is governed by web-wide consensus:

- **Google Business Profile** + **Merchant Center** feeds — local/business visibility in AI Search.
- **Wikipedia / entity data** — accurate, current.
- **Review platforms** — G2, Trustpilot, Capterra, industry-specific.
- **Authentic community participation** — Reddit, forums, Quora (real, not spam).
- **Earned media / PR** — press, analyst mentions.

In one 100-query B2B study, 69% of AI Overview citations earned by self-promotional "best [category]" listicles appeared in answers that recommended *competitors* instead. Build offsite consensus; don't rely on self-published listicles for recommendations. See `ai-seo` → citations-vs-recommendations.

## Rollout Order

1. Layer 1 (JSON-LD) — cheap, high payoff, do first.
2. Layer 2 (`llms.txt` + `/pricing.md`) — once you have stable, factual data.
3. Layer 3 (entity + reviews) — ongoing, the recommendation lever.
