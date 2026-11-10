# NyayaDesk Supreme Court

Complete source repository for the NyayaDesk Supreme Court research interface and its judgment-data extraction tool.

- **Research app:** [nyayadesk-supreme-court.vercel.app](https://nyayadesk-supreme-court.vercel.app/)
- **Extraction tool:** [nyayadesk-supreme-court-extractor.vercel.app](https://nyayadesk-supreme-court-extractor.vercel.app/)
- **Source dataset:** [`vanga/indian-supreme-court-judgments`](https://github.com/vanga/indian-supreme-court-judgments)

## Current application

The application includes:

- Evidence-linked legal research memos
- Supreme Court case search and filters
- Judgment reader with record-integrity indicators
- Descriptive judge and subject analytics
- Matter workspaces and alerts
- Explicit verification and scope warnings

The research interface uses a curated, reviewed set of landmark cases and links to the corpus-scale extractor schema. It does not provide legal advice. Authorities should be checked against official judgments before filing.

## Repository contents

### Research application

- `index.html` — application shell and all research views
- `styles.css` — responsive visual system
- `app.js` — curated research records, live extractor-schema connection and interface behaviour
- `vercel.json` — research-app deployment configuration

### Supreme Court data extractor

The complete extractor source is in [`extractor/`](extractor/):

- `extractor/extractor.py` — download, filtering, enrichment and CSV/JSONL/SQLite export engine
- `extractor/server.py` — full local web server with background jobs and persistent exports
- `extractor/cloud_extract.py` — bounded synchronous extraction used on Vercel
- `extractor/api/index.py` — live serverless API and static-file entry point
- `extractor/web/` — extraction-tool interface source
- `extractor/test_extractor.py` — extraction, provenance and cloud-limit tests
- `extractor/requirements.txt` and `extractor/pyproject.toml` — reproducible dependencies
- `extractor/run.sh` and `extractor/start.command` — local launch scripts

See [SOURCE_MANIFEST.md](SOURCE_MANIFEST.md) for the audited file inventory and data boundaries.

## Run the research app locally

The application is a static site with its editable source at the repository root.

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

## Run the extractor locally

```bash
cd extractor
./run.sh --open
```

The extractor opens at [http://127.0.0.1:4181](http://127.0.0.1:4181). Its local mode supports unrestricted year ranges, CSV, JSONL, SQLite and optional English-PDF text extraction.

The hosted extractor is intentionally bounded to five years and 1,000 rows per request. It supports CSV and JSONL and does not retain generated exports.

## Data and accuracy boundaries

The large judgment corpus is not committed to Git. The extractor retrieves selected yearly Parquet metadata and, only when requested locally, matching English PDFs from the public dataset’s S3 storage.

Analysis-ready fields such as ratio, holding, cited cases and later treatment remain blank until a separately verified enrichment process creates them. Source metadata and generated analysis are not presented as equivalent.

## Deployment

The research app deploys from the repository root. The extractor has its own Vercel configuration inside `extractor/`. Local caches, generated exports, virtual environments, Vercel project metadata and environment files are excluded from Git.
