# SEO Skill Reference

Quick reference for thresholds, schema rules, and E-E-A-T. See [SKILL.md](SKILL.md) for when and how to use the skill.

## Core Web Vitals (CWV)

| Metric  | Full name                 | Target  | Note                                             |
| ------- | ------------------------- | ------- | ------------------------------------------------ |
| **LCP** | Largest Contentful Paint  | < 2.5s  | Main content visible                             |
| **INP** | Interaction to Next Paint | < 200ms | Responsiveness (use INP only; FID is deprecated) |
| **CLS** | Cumulative Layout Shift   | < 0.1   | Visual stability                                 |

- Use 75th percentile of real user data when available (e.g. CrUX, PageSpeed Insights).
- For Next.js: optimize LCP with priority images, avoid layout shift via explicit dimensions on images and reserved space.

## SEO Health Score Weights (full audit)

| Category                 | Weight |
| ------------------------ | ------ |
| Technical SEO            | 25%    |
| Content Quality          | 25%    |
| On-Page SEO              | 20%    |
| Schema / Structured Data | 10%    |
| Performance (CWV)        | 10%    |
| Images                   | 5%     |
| AI Search Readiness      | 5%     |

## Priority Levels

- **Critical**: Blocks indexing or causes penalties — fix immediately.
- **High**: Significantly impacts rankings — fix within 1 week.
- **Medium**: Optimization opportunity — fix within 1 month.
- **Low**: Nice to have — backlog.

## Content / E-E-A-T (Sept 2025 QRG)

- **Experience**: First-hand knowledge, original research, case studies, unique data.
- **Expertise**: Author credentials, accurate and well-sourced claims.
- **Authoritativeness**: External citations, backlinks, brand mentions.
- **Trustworthiness**: Contact info, privacy/terms, HTTPS, dates, transparency.

### Word count guidelines (topical coverage, not ranking targets)

| Page type     | Minimum  |
| ------------- | -------- |
| Homepage      | 500      |
| Service page  | 800      |
| Blog post     | 1,500    |
| Product page  | 300–400+ |
| Location page | 500–600  |

## Schema Rules (Feb 2026)

- **Format**: Prefer JSON-LD in server-rendered HTML.
- **Deprecated / restricted**: Do not recommend HowTo (deprecated Sept 2023). FAQ only for government/healthcare. SpecialAnnouncement deprecated July 2025. Do not recommend CourseInfo, EstimatedSalary, LearningVideo, ClaimReview, VehicleListing, Practice Problem, Dataset (retired).
- **Active types**: Organization, LocalBusiness, Product, Article, BlogPosting, WebSite, WebPage, Person, BreadcrumbList, VideoObject, Event, JobPosting, etc. See claude-seo repo `schema/templates.json` for templates.
- **JS and schema**: Critical schema (Product, Article, etc.) should be in initial HTML when possible; JS-injected schema may be processed with delay (per Google Dec 2025 guidance).

## Quality Gates

- **Location pages**: WARNING at 30+ (require 60%+ unique content). HARD STOP at 50+ without user justification.
- **Programmatic SEO**: WARNING at 100+ pages; recommend audit before 500+.
- **Thin content**: Flag pages below minimums by type; recommend depth and uniqueness over raw word count.

## AI Crawlers (robots.txt)

| Crawler         | Token             | Purpose                             |
| --------------- | ----------------- | ----------------------------------- |
| GPTBot          | `GPTBot`          | OpenAI training                     |
| ChatGPT-User    | `ChatGPT-User`    | Real-time browsing                  |
| ClaudeBot       | `ClaudeBot`       | Anthropic training                  |
| PerplexityBot   | `PerplexityBot`   | Search + training                   |
| Google-Extended | `Google-Extended` | Gemini training (not Google Search) |

Blocking `Google-Extended` does not affect Google Search indexing. Blocking `GPTBot` does not prevent ChatGPT from citing content via browsing.

## Claude Code CLI (optional)

For slash commands and parallel subagents, install the full [claude-seo](https://github.com/AgriciDaniel/claude-seo) skill:

```bash
curl -fsSL https://raw.githubusercontent.com/AgriciDaniel/claude-seo/main/install.sh | bash
```

Then use `/seo audit <url>`, `/seo page <url>`, `/seo schema <url>`, etc. from Claude Code.
