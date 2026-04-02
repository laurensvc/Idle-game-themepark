---
name: seo
description: >
  Performs comprehensive SEO analysis for websites and Next.js apps: full site or single-page audits, technical SEO (crawlability, indexability, Core Web Vitals with INP), schema markup detection/validation/generation, E-E-A-T content quality, image optimization, sitemap analysis, and Generative Engine Optimization (GEO) for AI Overviews. Use when the user asks for SEO audit, schema markup, Core Web Vitals, sitemap, E-E-A-T, technical SEO, content quality, page speed, structured data, meta tags, or AI search optimization.
---

# SEO Analysis Skill

Based on the [claude-seo](https://github.com/AgriciDaniel/claude-seo) methodology. Use this skill when the user requests SEO analysis, audits, schema, or optimization for a URL, the current site, or specific pages.

## When to Use

Trigger on: "SEO", "audit", "schema", "Core Web Vitals", "sitemap", "E-E-A-T", "AI Overviews", "GEO", "technical SEO", "content quality", "page speed", "structured data", "meta tags", "image optimization", "hreflang".

## Analysis Types

| Request               | Scope               | Actions                                                                                            |
| --------------------- | ------------------- | -------------------------------------------------------------------------------------------------- |
| **Full site audit**   | Entire site         | Crawl key pages, technical + content + schema + sitemap; produce health score and action plan      |
| **Single page**       | One URL             | On-page SEO, content quality, technical elements, schema, images, CWV considerations               |
| **Technical SEO**     | Site or page        | Crawlability, indexability, security, URLs, mobile, Core Web Vitals, structured data, JS rendering |
| **Content / E-E-A-T** | Page or section     | Experience, expertise, authoritativeness, trustworthiness; readability; AI citation readiness      |
| **Schema**            | Page or site        | Detect JSON-LD/Microdata/RDFa; validate; suggest or generate Schema.org markup                     |
| **Images**            | Page or site        | Alt text, file size (>200KB flag), formats (WebP/AVIF), srcset/sizes, lazy loading, CLS            |
| **Sitemap**           | Site                | Validate XML sitemap or help generate one; coverage, lastmod, quality gates                        |
| **GEO / AI search**   | Page or site        | Citability, structure, entity clarity, authority signals for AI Overviews / ChatGPT / Perplexity   |
| **Plan**              | Strategy            | SEO strategy by type: saas, local, ecommerce, publisher, agency                                    |
| **Hreflang**          | Multi-language site | Validate or generate hreflang; return tags, x-default, ISO codes                                   |

## Core Web Vitals (Current)

- **LCP** (Largest Contentful Paint): target &lt; 2.5s
- **INP** (Interaction to Next Paint): target &lt; 200ms
- **CLS** (Cumulative Layout Shift): target &lt; 0.1

Use **INP** only; do not reference FID (deprecated). See [reference.md](reference.md) for thresholds.

## Schema Rules

- Prefer **JSON-LD** in `<script type="application/ld+json">`.
- **HowTo** schema: deprecated (Sept 2023) — do not recommend.
- **FAQ** schema: only for government/healthcare — otherwise avoid.
- **SpecialAnnouncement**: deprecated (July 2025).
- For Next.js: inject critical schema in server-rendered HTML; avoid schema only in client JS.

## Quality Gates

- **Location pages**: WARNING at 30+ (require 60%+ unique content); HARD STOP at 50+ without explicit user justification.
- **Thin content**: Apply minimum word counts by page type (see reference.md).
- **Programmatic SEO**: WARNING at 100+ generated pages; recommend audit before scaling past 500.

## Output Format

### Audits and page analysis

1. **Summary** — Score (0–100 if full audit), top issues, top quick wins.
2. **Findings by category** — Technical, content, on-page, schema, images, performance, GEO as relevant.
3. **Priorities** — Critical (fix now) → High (1 week) → Medium (1 month) → Low (backlog).
4. **Concrete recommendations** — File/component changes, meta tags, schema snippets, config (e.g. next.config, robots, headers).

### Schema generation

- Output valid JSON-LD ready to paste into the page or app.
- Include `@context`, `@type`, and required properties; note optional fields that help rich results.

## Next.js–Specific Guidance

- **Metadata**: Prefer `metadata` export and `generateMetadata` in app router; ensure titles and descriptions are unique and within length limits.
- **Canonical / robots**: Set in layout or page metadata; avoid canonical only from client-side.
- **Structured data**: Add in server components or in the initial HTML; do not rely solely on client-side injection for Product/Article and critical types.
- **Images**: Use `next/image` with explicit dimensions to avoid CLS; provide meaningful `alt`.
- **Sitemap**: Implement `app/sitemap.ts` (or equivalent) and reference in robots.txt.

## Industry Detection (for audits)

Infer from homepage/content when planning scope:

- **SaaS**: pricing, /features, /integrations, /docs, sign-up.
- **Local**: phone, address, service area, map.
- **E-commerce**: products, cart, product schema.
- **Publisher**: blog, articles, author pages, dates.
- **Agency**: case studies, portfolio, client logos.

## Reference

- Detailed commands, CWV thresholds, and schema/EEAT notes: [reference.md](reference.md).
- Full CLI skill (slash commands, subagents): [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) — install via `curl -fsSL https://raw.githubusercontent.com/AgriciDaniel/claude-seo/main/install.sh | bash` for use with Claude Code.
