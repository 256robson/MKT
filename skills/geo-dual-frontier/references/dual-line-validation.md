# Dual-Line Validation (双线验证)

A dual-frontier asset is only "done" when it performs on **both** lines. Validate and report them together; optimize whichever line lags.

## The Two Lines

| Line | Question | Metrics | How to check |
|------|----------|---------|--------------|
| **SEO line** | Do we *rank*? | Position, GSC impressions, clicks, featured-snippet wins | GSC; Semrush/Ahrefs |
| **GEO line** | Are we *cited*? | Cited in AI answer? Which page? Share of voice | Manual (ChatGPT/Perplexity/AI Overviews); Peec AI, Otterly, ZipTie |

You can rank #1 and still be invisible in AI answers — and vice versa. Measuring only one line hides half the picture.

## Monthly Cadence

1. Pick your top 20 dual-frontier queries (from Step 1 matrix).
2. For each, record:
   - **SEO:** Google position (manual or GSC), snippet won?
   - **GEO:** Ask ChatGPT + Perplexity + check AI Overview. Cited? Which URL? Competitors cited instead?
3. Log month-over-month in a sheet.
4. Flag any query where one line is strong and the other weak → targeted fix:
   - Ranks but not cited → add answer block / FAQ schema / statistics with sources.
   - Cited but not ranking → build E-E-A-T, internal links, acquire a backlink, cover fan-out cluster.

## Scoring Sheet Template

| Query | SEO pos | Snippet? | Cited (ChatGPT) | Cited (Perplexity) | AIO? | Weak line | Fix |
|-------|:------:|:--------:|:---------------:|:------------------:|:----:|-----------|-----|
| 天津婚宴 多少钱一桌 | 8 | No | No | Yes (competitor) | No | SEO+Citations | Add answer block, earn 1 backlink |
| best crm for startups | 3 | Yes | Yes | Yes | Yes | — | Maintain |

## Tools

- **SEO line:** GSC (Performance, Coverage), Semrush, Ahrefs.
- **GEO line:** Peec AI (ChatGPT/Gemini/Perplexity/Claude/Copilot+), Otterly (ChatGPT/Perplexity/AIO), ZipTie (AIO/ChatGPT/Perplexity).
- **Referral signal:** GA4 — but note the attribution blind spot: most AI-influenced visits appear as branded search / direct, not "ai.com". Track with prompt tracking + self-reported attribution, not just referral paths.

## What "Good" Looks Like

- Primary dual-targets: ranking on page 1 **and** cited in ≥2 of {ChatGPT, Perplexity, AI Overviews}.
- Answer block extracted by AI (verify by asking the exact query and seeing your phrasing).
- Schema validated (Google Rich Results Test passes).
- `llms.txt` / `/pricing.md` present and current.

For experimenting with which answer-block phrasing or title wins on either line, see **ab-testing**.
