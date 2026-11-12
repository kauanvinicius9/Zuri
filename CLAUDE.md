# CLAUDE.md - Zuri Chrome Extension

## Overview

Zuri is an **Open-Source** Chrome **Side-Panel** Extension built using `React`, `TailwindCSS`, `Vite` and `TypeScript`. It summarizes web content, isolates core concepts, and translates selected text using AI integrations.

## Teck Stack

- **Framework**: React + TypeScript;
- **Styling**: TailwindCSS;
- **Platform**: Chrome Extensions API - Manifest V3, Side Panel API;
- **CI / CD**: GitHub Actions `ci.yml`, `cd.yml`.

## Common Commands

- `npm install` - Install dependences;
- `npm run dev` - Run local server;
- `npm run build` - Build production bundle to `/dist`;
- `npm run lint` - Run linter checks.

## Architecture & Conventions

- **Manifest V3**: Keep background service workers stateless and lightweight.;
- **Side Panel**: Mani UI resides in the Chrome Side Panel; avoid heavy DOM manipulation in content scripts;
- **Styling**: Prefer TailwindCSS utility classess; keep componets modular and strictly typed with TypeScript;
- **Security**: Never hardcode API keys; user keys must be stored securely using `chrome.storage.local`;

## Workfloe Rules

-  Always ensure `npm run build` and `npm run lint` pass before committing changes, as enforced by GitHub Actions CI.