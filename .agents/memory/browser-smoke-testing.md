---
name: Browser smoke testing
description: Headless Chromium verification in this workspace requires both the browser binary and native Nix runtime libraries.
---

Use a real headless browser for route-level verification when interaction matters; installing the browser binary alone is insufficient here because Chromium also needs native libraries such as glib and libgbm.

**Why:** The first browser launch failed on missing native libraries even after the automation package and browser binary were installed.

**How to apply:** For future interactive smoke tests, prepare the browser runtime through the environment's system-dependency tooling before treating browser-launch failures as application failures.