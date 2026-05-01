# Jira–Playwright demo

This repo demos turning a **test backlog** into Playwright TypeScript tests via MCP:

- **Jira:** fetch backlog issues through Atlassian MCP.
- **CSV:** read backlog rows from [`test-backlog/`](test-backlog/) instead of Jira — see [Alternative workflow: CSV backlog](#alternative-workflow-csv-backlog) below.

In both cases, use **one of the prompts in [`prompts/`](prompts/)** together with that backlog context to drive generation.

## Setup

1. Install the official **Playwright MCP** server.
2. Add the **Atlassian** plugin so Cursor can use the Atlassian MCP.

## Cursor workflow (Jira backlog)

Copy or attach your chosen prompt from [`prompts/`](prompts/) alongside the Jira context below.

Use Atlassian MCP to fetch Jira issues from project `<project-name>` where status is **Backlog**.

For each issue:

1. Read summary, description, and test steps (AIO).
2. Extract:
   - Test title  
   - Steps  
   - Expected results  

Then use Playwright MCP to open the target URL (e.g. `https://www.example.com/`), inspect the UI, and generate Playwright TypeScript tests per that prompt.

## Alternative workflow: CSV backlog

Instead of Jira, you can keep backlog data in CSV under **`test-backlog/`** (for example [`test-backlog/aio-tests.csv`](test-backlog/aio-tests.csv)).

1. Attach the CSV or point the agent at the file so it can read each row (title, preconditions, steps, expected results, keys, etc., depending on your columns).
2. Use the **same prompts in [`prompts/`](prompts/)**, replacing MCP Jira fetch with interpretation of those CSV rows.
3. Use Playwright MCP against the appropriate app URL and generate **`/pages`** and **`/tests`** using the extracted titles, steps, and expected outcomes.

This path is useful when Jira isn’t wired up or when you want a portable, reviewable backlog in the repo.

## Rules for generated tests

- Use the **Page Object Model**.
- Use `/pages` and `/tests` layout.
- Prefer `getByRole`, `getByLabel`, `getByText`.
- Avoid hard waits (use Playwright auto-waits / explicit conditions).
- Keep **assertions only in spec files**.
- Include the **Jira key** in comments.
- Keep code clean and minimal.
- Do not overwrite existing files without asking.
