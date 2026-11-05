# NyayaDesk Supreme Court Research

Evidence-first legal research interface for Supreme Court of India judgments.

**Live app:** [nyayadesk-supreme-court.vercel.app](https://nyayadesk-supreme-court.vercel.app/)

## Current prototype

The prototype includes:

- Evidence-linked legal research memos
- Supreme Court case search and filters
- Judgment reader with record-integrity indicators
- Descriptive judge and subject analytics
- Matter workspaces and alerts
- Explicit verification and scope warnings

The current interface uses a small, curated sample corpus. It does not claim production-wide coverage or provide legal advice. Authorities should be checked against official judgments before filing.

## Run locally

The application is a static site with its editable source at the repository root.

```bash
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173).

## Structure

- `index.html` — application shell and views
- `styles.css` — responsive visual system
- `app.js` — sample corpus and interface behaviour

## Deployment

The production site is hosted on Vercel and deploys directly from the repository root.
