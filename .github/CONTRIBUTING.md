# Contributing to Zuri

First of all, thank you for your interest in contributing to Zuri!

Every contribution matters — whether it's fixing a bug, improving documentation, suggesting a feature, or helping other contributors.

## Before You Start

Please take a moment to:

- Read our [Code of Conduct](CODE_OF_CONDUCT.md).
- Check existing [Issues](../../issues) before opening a new one.
- Search for existing Pull Requests to avoid duplicated work.
- Open an issue before starting major changes.

## How to Contribute

### 1. Fork the Repository

Click **Fork** at the top of the [Zuri repository](https://github.com/kauanvinicius9/Zuri "Click to Access Official Zuri Repository") to create your own copy.

Then clone **your fork** (replace `YOUR-NAME` with your Github username)

```bash
git clone https://github.com/YOUR-NAME/Zuri.git
```

```bash
cd Zuri
```

Add the original repository as `upstream` so you can keep your fork up to date:

```bash
git remote add upstream https://github.com/kauanvinicius9/Zuri.git
```

Before starting new work, sync your fork:

```bash
git fetch upstream
```

```bash
git checkout main
```

```bash
git merge upstream/main
```

### 2. Set Up the Development Environment

Install the project dependencies:

```bash
npm install
```

Create a branch for your changes:

```bash
git checkout -b type/short-description
```

Suggested branch prefixes:

- `feat/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation changes
- `refactor/` — Code improvements
- `test/` — Tests
- `chore/` — Maintenance tasks

### 3. Make Your Changes

Please keep your changes:

- Focused on a single purpose.
- Consistent with the existing code style.
- Well documented when necessary.
- Covered by tests whenever applicable.

Avoid including unrelated changes in the same Pull Request.

### 4. Run Checks

Before submitting your changes, run the available project checks:

```bash
npm run lint
```

```bash
npm run build
```

Make sure all relevant checks pass.

### 5. Commit Your Changes

Use clear and descriptive commit messages.

Suggested format:

```text
type: short description
```

Examples:

```text
feat: add conversation history
fix: handle API timeout errors
docs: improve installation guide
```

### 6. Open a Pull Request

Push your branch to your fork:

```bash
git push origin type/shor-description
```

Then open a Pull Request from your fork's branch to the `main` branch of `kauanvinicius9/Zuri`

Please include:

- A clear description of the problem and solution.
- The related issue, if one exists.
- Screenshots or recordings for UI changes.
- Tests performed.
- Any relevant breaking changes.

A maintainer may request changes before merging.

## Reporting Bugs

When reporting a bug, include:

- A clear description of the issue.
- Steps to reproduce it.
- Expected behavior.
- Actual behavior.
- Environment and relevant versions.
- Logs or screenshots, when useful.

Please avoid including passwords, API keys, personal data, or other secrets.

## Suggesting Features

Feature suggestions are welcome!

Before opening a feature request, explain:

- The problem you want to solve.
- Why the feature would be useful.
- How you imagine it working.
- Any alternatives you have considered.

## Questions

If you need help, open a discussion or issue in the repository.

Thank you for helping build Zuri!

**Zuri — Intelligence by your side.**