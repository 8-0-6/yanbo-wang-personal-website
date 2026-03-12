# X Draft Automation

This workspace contains a minimal read-only X research helper for a daily post-drafting workflow.

## Setup

1. Rotate or generate a fresh X Bearer Token in the X Developer Console.
2. Copy `.env.example` to `.env`.
3. Set `X_BEARER_TOKEN` in `.env`.

## Usage

Generate a research report for `@BobBuiltThis` and the default AI/tech seed set:

```sh
./scripts/run_x_report.sh --handle BobBuiltThis --out reports/x-research.md
```

Print the report to stdout instead:

```sh
./scripts/run_x_report.sh --handle BobBuiltThis
```

## Notes

- The bearer token is read-only and only works for public data.
- X's app-only auth can fetch public posts and following lists, but it does not expose private/home timelines.
- The API gives a current following snapshot, not "earliest followed" order.
- User search requires user-context auth, so influencer discovery should stay seed-based or be handled separately.

