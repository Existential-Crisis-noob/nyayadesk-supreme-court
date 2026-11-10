# Source manifest

Audited on 10 November 2026 after consolidating the research interface and data extractor into one repository.

## Research interface

| File | Purpose |
| --- | --- |
| `index.html` | Complete application markup for research, case search, judgment reader, judge lens, matters, alerts and data views |
| `styles.css` | Complete desktop and responsive styling |
| `app.js` | Curated case records, research-answer rendering, filters, analytics, reader behaviour and workspace interactions |
| `vercel.json` | Root static deployment configuration |

The research application is written in plain HTML, CSS and JavaScript. There is no missing React, TypeScript or compiled component tree behind these files.

## Extraction tool

| File or directory | Purpose |
| --- | --- |
| `extractor/extractor.py` | Core dataset engine, 51-column schema, filters, provenance, PDF text extraction and exporters |
| `extractor/server.py` | Local asynchronous job server, downloads, cancellation and export history |
| `extractor/cloud_extract.py` | Vercel-safe request limits and direct downloads |
| `extractor/api/index.py` | Production API routes and static serving |
| `extractor/web/index.html` | Extraction interface markup |
| `extractor/web/styles.css` | Extraction interface styling |
| `extractor/web/cloud.css` | Hosted-mode visual states |
| `extractor/web/app.js` | Column selection, filters, progress, downloads and hosted/local behaviour |
| `extractor/test_extractor.py` | Unit tests for years, source URLs, enrichment integrity, schema and cloud guardrails |
| `extractor/requirements.txt` | Local Python dependencies |
| `extractor/pyproject.toml` | Vercel Python project and dependency definition |
| `extractor/run.sh` | Reproducible local environment and launch script |
| `extractor/start.command` | macOS double-click launcher |
| `extractor/vercel.json` | Extractor deployment settings |

## Deliberately excluded

These are runtime data or credentials, not source code:

- `.venv/` and Python bytecode
- `.cache/` downloaded Parquet metadata and PDFs
- generated files under `exports/`
- `.vercel/` local project identifiers
- `.env*` secrets and local environment configuration
- the upstream multi-gigabyte judgment corpus

## External data provenance

- Dataset code and documentation: <https://github.com/vanga/indian-supreme-court-judgments>
- Dataset licence recorded by the extractor: CC BY 4.0
- The extractor stores a source repository, source licence, source metadata URL and source PDF URL with exported records.
