---
name: geo-dual-frontier
description: "When the user wants to make a single piece of content rank on Google AND get cited by AI assistants (ChatGPT, Perplexity, Gemini, Google AI Overviews) at the same time — the 'dual-frontier' operating workflow. Use when the user mentions 'GEO,' 'generative engine optimization,' 'dual-frontier SEO,' 'content that ranks and gets cited,' 'AI citations plus SEO,' 'answer engine and search together,' or 'write once for Google and AI.' For deep generative-engine theory, platform ranking factors, and the AI-visibility audit, see ai-seo. For implementing JSON-LD structured data, see schema. For planning the content calendar, see content-strategy."
metadata:
  author: Delonix AI
  version: 1.0.0
---

# GEO Dual-Frontier

You run the **dual-frontier** operating method: produce one content asset that wins **both** battlefields at once —

1. **Search-frontier (SEO):** rank on Google / Bing for high-intent queries.
2. **Answer-frontier (GEO):** get extracted and cited by AI assistants (ChatGPT, Perplexity, Gemini, AI Overviews) when users ask in natural language.

Most teams run these as two separate teams and two separate content calendars. That doubles cost and produces conflicting copy. The dual-frontier method plans, writes, and validates content **once** so it ranks *and* gets cited — because the overlap between what Google rewards and what AI cites is large (clear, factual, structured, authoritative, well-sourced content).

> This skill is the **operational companion** to `ai-seo`. `ai-seo` covers the theory, platform factors, and the full AI-visibility audit. This skill covers the *workflow* for shipping one asset that serves both fronts. Read `ai-seo` first if you need the deep background.

## Before Starting

**Check for product marketing context first:**
If `.agents/product-marketing.md` exists (or `.claude/product-marketing.md`, or the legacy `product-marketing-context.md`), read it before asking questions. Use that context and only ask for what's missing or task-specific.

Gather (ask if not provided):
- What queries matter most — and do they have *both* search demand and AI-ask demand?
- Current Google ranking position and current AI citation status for those queries.
- Existing structured data, `llms.txt`, machine-readable pricing/facts files.
- Brand's authority signals (reviews, entity presence, original data).

---

## The Dual-Frontier Principle

Google and AI engines diverge in *selection*, but converge in *what they reward*:

| | Search-frontier (Google) | Answer-frontier (AI) |
|---|--------------------------|----------------------|
| **Wants** | E-E-A-T, links, relevance, freshness | Extractable passages, citations, stats, clear structure |
| **Punishes** | Thin/thin-spin content, no expertise | Keyword stuffing (−10%), fabricated claims |
| **Overlap (exploit this)** | Clear definitions, real data w/ sources, FAQ structure, expert attribution, freshness | Same — directly answers, 40–60 word blocks, comparison tables |

**Implication:** write one document with (a) a tight answer block up top (snippet + extraction bait) and (b) comprehensive, sourced depth below (ranks + gives AI confident context). Do **not** write a separate "AI version" — that risks Google's scaled-content-abuse spam policy.

---

## Workflow

### Step 1 — Dual-Frontier Keyword Selection (双栖筛词)

Score every candidate query on **two axes**. Only pursue queries that score well on **both** — a keyword that only ranks or only gets asked to AI is half-wasted.

| Axis | What to measure | Tool / signal |
|------|-----------------|---------------|
| **Demand (SEO)** | Search volume, ranking difficulty, business value | GSC, Semrush/Ahrefs, keyword planner |
| **AI-Query-Fit (GEO)** | Phrased as a natural-language question? Comparison / definition / how-to / pricing intent? | Manually ask ChatGPT/Perplexity; check AI Overview presence |

Build a matrix and tag each query:

```
Query                  | Demand (1–5) | AI-Fit (1–5) | Dual score | Action
-----------------------|--------------|--------------|------------|----------------------------------
"天津婚宴 多少钱一桌"    | 4            | 5            | 20         | ✅ Build (both fronts)
"best CRM software"    | 5            | 3            | 15         | ⚠️ Build for SEO; add answer block
"our brand story"      | 1            | 2            | 2          | ❌ Skip (no demand, no AI-ask)
```

**Rules:**
- ✅ **Dual score ≥ 16** → primary target: full dual-frontier treatment.
- ⚠️ **One axis strong, one weak** → build for the strong axis, then add the *minimum* structure to also serve the weak axis (e.g., a 40–60 word answer block on an SEO page).
- ❌ **Both weak** → skip or fold into a broader cluster page.

For the topical cluster / fan-out planning, see `ai-seo` (Query Fan-Out) and `content-strategy`.

### Step 2 — Dual-Frontier Content Structure (双栖文)

One document, two layers:

**Layer A — Answer Block (40–60 words, first):**
Lead with a direct answer to the exact query. Self-contained, no surrounding context needed. This is both featured-snippet bait (Google) and the passage AI extracts (GEO).

```markdown
**Q: 天津办婚宴 450㎡ 无柱宴会厅多少钱一桌？**
瑞湾开元名都婚宴 2199 元/桌起（第三方婚嫁平台观测起步价），主力档 2599 元含五楼开元厅 450㎡ 无柱大厅+专属布置。同档滨海酒店普遍 3500+，瑞湾性价比突出。正式报价以酒店销售口径为准。
```

**Layer B — Depth (long-form below the answer block):**
- Cover the fan-out variants (related questions) so you're retrievable for them too.
- Add real statistics **with dated sources and links** (+37–40% citation boost per Princeton GEO research).
- Add expert quotes with name + title (+25–30%).
- Use comparison tables for "[X] vs [Y]" queries, numbered lists for how-to.
- Show "Last updated: [date]" — freshness is weighted heavily by both fronts.
- One idea per paragraph; H2/H3 headings that match how people phrase the query.

The same prose serves both fronts — no AI-only rewrite.

> Full template with annotated examples: [references/dual-frontier-content-template.md](references/dual-frontier-content-template.md)

### Step 3 — Three-Layer Schema (三层Schema)

Make the content machine-readable on three layers so both Google and AI can parse it:

**Layer 1 — On-page JSON-LD (for Google rich results):**
`Article`/`BlogPosting`, `FAQPage`, `HowTo`, `Product`. Content with proper schema shows 30–40% higher AI visibility on non-Google engines. For implementation, use the **schema** skill.

**Layer 2 — Machine-readable files (for AI engines & buying agents):**
- `/llms.txt` — concise context file pointing AI to key pages (see llmstxt.org).
- `/pricing.md` or `/pricing.txt` — structured facts/pricing parseable without JS or login walls. Agents increasingly compare products before a human visits; opaque pricing gets filtered out.
- `/okf/` — Open Knowledge Format bundle (Google-backed, v0.1) for agent-readable site content.

**Layer 3 — Entity & third-party presence (drives AI *recommendations*, not just citations):**
Google Business Profile, accurate Wikipedia/entity data, review platforms (G2, Trustpilot), authentic community participation. Citation ≠ recommendation — recommendations are governed by web-wide consensus (reviews, forums, press). See `ai-seo` → citations-vs-recommendations.

> Implementation paths for each layer: [references/three-layer-schema.md](references/three-layer-schema.md)

### Step 4 — Dual-Line Validation (双线验证)

Report both fronts together; optimize the weaker line.

| Line | What to measure | How |
|------|-----------------|-----|
| **SEO line** | Ranking position, GSC impressions/clicks, featured-snippet wins | GSC, Semrush/Ahrefs |
| **GEO line** | Are you cited by AI? Which page? Share of voice | Manual: ChatGPT/Perplexity/AI Overviews for your queries; tools: Peec AI, Otterly, ZipTie |

**Monthly cadence:**
1. Pick top 20 dual-frontier queries.
2. Run each through Google, ChatGPT, Perplexity; record rank + cite + which page.
3. Log month-over-month; intervene where one line lags.

> Detailed checklist + scoring sheet: [references/dual-line-validation.md](references/dual-line-validation.md)

---

## Ethics Guardrails (both fronts enforce these)

1. **No fabricated stats or sources.** Breaks Google E-E-A-T *and* AI trust simultaneously. Every number gets a dated, linked source.
2. **No separate "AI-only" content.** Writing a variant just for AI risks Google's scaled-content-abuse policy. One document, both audiences.
3. **Real scarcity / limits only.** "Only 3 weekends left" must be true.
4. **Don't block AI crawlers if you want citations.** Allow GPTBot, PerplexityBot, ClaudeBot, Google-Extended in robots.txt (block training-only CCBot if needed).
5. **No keyword stuffing.** Actively reduces AI visibility by ~10%.

---

## Common Mistakes

- **Running SEO and GEO as separate teams** — duplicated cost, conflicting copy. Plan once, dual-frontier.
- **Skipping the answer block** — loses both snippet and extraction upside.
- **Fabricating "AI-friendly" numbers** — backfires on both fronts the moment a source is checked.
- **Publishing AI-only spin** — Google spam risk; one document is safer and cheaper.
- **Measuring only rankings** — you can rank #1 and still be invisible in AI answers. Validate both lines.
- **Ignoring third-party presence** — citations don't equal recommendations; offsite consensus is the recommendation lever.

---

## Tool Integrations

For implementation, see the [tools registry](../../tools/REGISTRY.md).

| Tool | Use For |
|------|---------|
| `semrush` / `ahrefs` | Demand scoring, ranking, content-gap (SEO line) |
| `gsc` | Search Console performance, query tracking (SEO line) |
| `ga4` | Referral traffic from AI sources (GEO line) |
| Peec AI / Otterly / ZipTie | Cross-platform AI citation & share-of-voice (GEO line) |

---

## Task-Specific Questions

1. Which queries have *both* search demand and AI-ask demand for you?
2. Do you currently rank AND get cited for them, or only one?
3. Is your content structured with an answer block + depth, or just long-form?
4. Do you have Layer 1/2/3 schema in place (JSON-LD, llms.txt, entity presence)?
5. Are you validating both the SEO line and the GEO line monthly?

---

## Related Skills

- **ai-seo** — Deep generative-engine theory, platform ranking factors, full AI-visibility audit (read this first for background)
- **schema** — Implementing JSON-LD structured data (Layer 1)
- **content-strategy** — Planning the topical cluster and content calendar
- **seo-audit** — Traditional technical/on-page SEO health
- **ab-testing** — Measuring which dual-frontier variant wins (title, answer block, structure)
- **copywriting** — Writing content that's human-readable and AI-extractable
