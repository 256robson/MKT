# Pricing Page Teardown

A structured way to score a live pricing page and return prioritized fixes. It grades **two axes**: the classic **human buyer experience**, and — the newer, higher-leverage lens — **AI-agent readiness**: whether the LLMs and agents that increasingly shortlist and compare tools can actually read, quote, and recommend your pricing.

> **Framework credit:** the two-axis structure and especially the AI-agent-readiness lens are adapted from **Kyle Poyar's** (Growth Unhinged) pricing-page teardown. Learn-from-only — this rubric is authored independently; credit the framing to Poyar.

## Why the second axis matters now

Buyers increasingly ask ChatGPT, Perplexity, and Claude *"what's the best [category] tool and what does it cost?"* before they ever hit your site. If your pricing is trapped in an image, rendered only by JavaScript, gated behind "Contact us," or missing from the page's text, the AI **can't cite your price** — so it recommends and quotes the competitor whose pricing it *can* read. A pricing page that's invisible to agents silently loses deals you never see. This axis is the pricing-page complement to `ai-seo` and `schema`.

**The 30-second test — the "paste test":** paste the pricing URL into ChatGPT/Claude and ask *"What are the plans and prices?"* If it can't answer correctly and completely, an AI shopping on your buyer's behalf can't either. That failure *is* the finding.

## The rubric

Score each dimension **Pass / Partial / Gap** (or 1–5 if you want a number). Two sub-scores (one per axis) plus a prioritized fix list is the deliverable — not a single vanity number.

### Axis 1 — Human buyer experience

| # | Dimension | Passing looks like | Common gaps |
|---|---|---|---|
| 1 | **Value-prop clarity** | Above the fold: what you get + why it's worth it, in the buyer's words | Feature list with no outcome; "flexible plans for every team" |
| 2 | **Plan clarity / differentiation** | Obvious which plan is for whom and exactly how they differ | Feature-soup tables; tiers that blur together; no "who it's for" |
| 3 | **Cognitive load** | A buyer can decide in <30s | Too many tiers (5+), unexplained jargon, decision paralysis |
| 4 | **Trust signals** | Logos, testimonials, security/compliance, a guarantee near the CTA | No proof; trust content buried below the fold |
| 5 | **Pricing psychology** | A recommended/anchor tier, sensible anchoring, coherent charm vs. round pricing | No recommended tier; highest price hidden last; random price endings |
| 6 | **Transparency** | The actual price is shown; what's in/out is clear; no surprise fees | "Contact us" on every tier; hidden overages; usage limits omitted |

### Axis 2 — AI-agent readiness (the novel lens)

| # | Dimension | Passing looks like | Common gaps |
|---|---|---|---|
| 7 | **Machine-readable pricing** | The real numbers are in the page's HTML/text | Price is in an image/SVG, JS-only render, a PDF, or "Contact sales" — an agent extracts nothing |
| 8 | **FAQ / objection coverage** | Extractable answers to "does it do X," "what's the limit," "can I cancel," "is there a free trial" | No FAQ, or answers only in a support portal an agent won't reach |
| 9 | **Per-tier depth in text** | Each plan's inclusions, limits, and quotas stated in words | Differences shown only as checkmark columns in an image; limits unnamed |
| 10 | **Structured data & extractability** | `Product`/`Offer` schema markup, clean semantic HTML, AI-bot crawlable, listed in `llms.txt` | No schema; pricing behind auth/interaction; AI bots blocked in robots.txt |

Dimensions 7 and 10 hand off to **`schema`** (Product/Offer JSON-LD) and **`ai-seo`** (extractability, AI-bot access, `llms.txt`) for implementation.

## How to run it

1. **Load context** — read `.agents/product-marketing.md` (ICP, positioning) so "clarity" is judged against the *right* buyer.
2. **Fetch the page as an agent would** — get the rendered text/HTML, not a screenshot. Note immediately whether prices appear in the text (that's dimension 7).
3. **Run the paste test** — ask an LLM for the plans and prices from the URL; record what it gets wrong or misses.
4. **Score all 10 dimensions** Pass/Partial/Gap with a one-line reason each.
5. **Prioritize fixes** by impact × effort. AI-readiness gaps are often *high impact, low effort* (add text prices, add Offer schema) — surface those first.

## Output template

```markdown
# Pricing Page Teardown — [url] — [date]

## Scores
- Human buyer experience: [X/6 passing]
- AI-agent readiness:      [X/4 passing]

## Paste test
[What an LLM returned for "plans and prices" — and what it got wrong/missed]

## Dimension-by-dimension
| # | Dimension | Verdict | Note |
|---|-----------|---------|------|
| 1 | Value-prop clarity | Pass/Partial/Gap | ... |
| … | … | … | … |

## Prioritized fixes (impact × effort)
1. [High/low] — [fix] — [why it matters] — [→ schema / ai-seo / cro if handing off]
2. ...

## The one thing
[The single highest-leverage fix — often "put your actual prices in text + add Offer schema so AI can quote you."]
```

## Common failure patterns

- **The image-price** — a beautiful pricing graphic with the numbers baked in. Humans love it; agents (and screen readers) get nothing. Put prices in text; the image can stay as decoration.
- **"Contact us" everywhere** — sometimes right for true enterprise, but if *all* tiers hide price, both humans and agents bounce to a competitor with numbers. Show at least a starting price or a representative range.
- **Checkmark-only tables** — feature differences shown only as ✓/✗ columns in an image or icon font. State the actual limits and inclusions in words.
- **JS-only render / auth wall** — if the price only appears after interaction or login, no crawler or agent sees it.
- **Blocked AI bots** — robots.txt disallows GPTBot/PerplexityBot/ClaudeBot, so the pricing never enters the models that recommend you (→ `ai-seo`).

## Related
- `schema` — Product/Offer JSON-LD so machines read your tiers and prices.
- `ai-seo` — extractability, AI-bot access, `llms.txt`, getting cited by AI answers.
- `cro` — converting the human once the page is clear.
- `copywriting` — the value-prop and tier copy the teardown flags.
