# Support Desk API — Node.js / TypeScript

A deliberately imperfect training application for read-only engineering investigations.
Use only synthetic data and run on loopback. Do not deploy this application for real users.
The issue tracker describes user-visible symptoms; diagnoses are intentionally omitted.

## Run

Node 24+ and npm. Run `npm ci`, `npm run build`, then `npm start`.
The API listens on http://127.0.0.1:4311. `GET /health` reports readiness.

Data resets on process restart. All dates use UTC and all identifiers are fictional.
The baseline-v1 tag is the fixed source revision used for the initial issue set.
