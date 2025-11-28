# Continue anonymous Posthog telemetry

## Behavior

- Used by Continue for product metrics (not used by customers)
- uses public posthog key in repo
- `CONTINUE_TELEMETRY_ENABLED` can be set to `0` to disable or `1` to enable (takes precedence)
- `CONTINUE_ALLOW_ANONYMOUS_TELEMETRY` can be set to `0` to disable (legacy, still supported)
- non-anonymous and private data like code is never sent to posthog
- Event user ids are the Continue user id is signed in, or a unique machine id if not
- Current events are slash command usage and chat calls
