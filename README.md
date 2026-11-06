<h1>
 <img src="./src/assets/zuri-logo-icon-white.png" width="55" align="left">
 <span>Technical Documentation - Zuri</span>
</h1>

### Overview

React Widget for Local AI and Productivity

**Zuri - Intelligence By Your Side** is a **Chrome** extension built with `React` + `Manifest V3`. It is an AI Reading and Context Copilot—a `React` extension that allows you to select any text or code snippet on a web page and open a side panel with AI features: smart summary, explanation of complex snippets, extraction of key concepts, or explanatory translation.

Using built-in **AI APIs** from the browser itself to run offline and without API costs, or allowing the user to provide their own API Key. This project requires excellent mastery of React—browser DOM manipulation, content script injection, state management in the side panel, and asynchronous message communication in the **Chrome Extension**. Zuri transforms complex information into clear and concise answers.

It is an intelligence that learns to understand context and accompanies the user in their activities. Zuri was not developed to replace the user. It was developed to amplify what they are capable of doing.

An extension can only see what's inside the browser, so it works on any website.

## Characteres

Its 05 characteristics are:

- **Autonomous**: Analyzes situations and proposes paths;
- **Reliable**: Prioritizes useful and transparent answers;
- **Intelligent**: Understands contexts;
- **Partner**: Works alongside the user in any software, without trying to take their place;
- **Determined**: A strong identity and objective communication.

## Visual Identity

### 1. Colors

- Red: `#35141D` `#641B2B` `#8C2639` `#C65A6C`;
- White: `#F5F5F5`;
- Black: `#0E0E0E`;
- Gray: `#999999`;

### 2. Logo

<img src="/src/assets/visual-identity-black-card-1.png" width="400" alt="Visual Identity Black Card 01" title="Zuri Logo"/>
</br>
<img src="/src/assets/visual-identity-black-card-2.png" width="400" alt="Visual Identity Black Card 02" title="Zuri Logo"/>
</br>
<img src="/src/assets/visual-identity-white-card.png" width="400" alt="Visual Identity White Card" title="Zuri Logo"/>

## How to Use Zuri Plugin
 
1- Clone this repository

```powershell
git clone https://github.com/kauanvinicius9/Zuri.git
```

2- Enter in the project

```powershell
cd zuri
```

3- Install dependences

```powershell
npm install
```

4- Update files

```powershell
npm run build
```

5- Run project

```powershell
npm run dev
```

6- Chrome

- Acess [Chrome Extensions](chrome://extensions) and activate **developer mode**;
- Load Unpacked;
- Select `dist` folder, test on any page - select some text, right-click and choose **Analyze with Zuri**. The side panel opens. Clicking on the extension icon also opens the panel.


Then, the **activate** button on the landing page talks to the extension (via postMessage to the content script) and sets a flag in chrome.storage. With it turned on, the content script shows a floating popup near the selected text, with Summarize, Concepts, and Translate.

The `aiService.ts` uses `window.ai.languageModel`, which is the old `API`. The current Chrome documentation uses the global LanguageModel, along with dedicated **Summarizer** and **Translator** `APIs`, and all of them can be used in Chrome extensions. They fit well in Summarize and Translate.

---

## Dependences

> package.json

```json
{
  "name": "zuri",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.4",
    "lucide-react": "^1.67.0",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "tailwindcss": "^4.3.4"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/chrome": "^0.3.7",
    "@types/node": "^24.19.2",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "eslint": "^10.13.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.7",
    "globals": "^17.13.0",
    "typescript": "^5.8.3",
    "typescript-eslint": "^8.72.0",
    "vite": "^8.3.5"
  }
}
```

> tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client", "chrome"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

<div align="left">
    <img src="./src/assets/skills/eslint-icon.svg" alt="ESLint Icon" width="40" title="ESLint" />
    <img src="./src/assets/skills/nodejs-icon.svg" alt="NodeJS Icon" width="40" title="NodeJS" />
    <img src="./src/assets/skills/react-icon.svg" alt="React Icon" width="40" title="React" />
    <img src="./src/assets/skills/typescript-icon.svg" alt="TypeScript Icon" width="40" title="TypeScript" />
    <img src="./src/assets/skills/vite-icon.svg" alt="Vite Icon" width="40" title="Vite" />
    <img src="./src/assets/skills/tailwindcss-icon.svg" alt="TailwindCSS Icon" width="40" title="TailwindCSS" />
</div>