# Privacy Policy

**Last updated:** November 6, 2026

Zuri is an open-source Chrome extension that helps you summarize, understand, and translate text you select on web pages. This document explains, in plain language, what Zuri does with your data.

## Summary

- Zuri has **no servers, no accounts, no analytics, and no tracking**. The project does not collect your data.
- Your selected text is processed **on your device** when you use the browser's built-in AI.
- Your selected text is sent to **Google's Gemini API** only if you choose to use that provider and add **your own API key**.
- Your settings stay in your browser's local storage. Nothing is synced or uploaded by Zuri.
- Zuri is open source, so you can read exactly what it does.

## What Zuri processes

Zuri only works with text that **you select** on a page and then send to the AI by using one of its actions (for example **Summarize**, **Concepts**, or **Translate**), either from the side panel, the right-click menu, or the floating popup.

To make this work, a small script runs on the pages you visit and reads the text you have selected. It does not read the rest of the page, your forms, your cookies, or your browsing history. The selected text, and the address of the page it came from, are passed only to other parts of the extension running inside your browser.

## How your text is handled

### Local mode (browser built-in AI)

When Zuri uses the AI built into Chrome, the text is processed **on your device** and is not sent to any server by Zuri.

The first time you use these features, Chrome may download an on-device AI model. That download is performed by Chrome, not by Zuri. See Chrome's documentation for details about the built-in AI and its requirements.

### Cloud mode (Gemini API, your own key)

If the local AI is not available on your computer, or if you choose the Gemini provider in the settings, Zuri sends the **selected text and the instruction for the chosen action** (for example, "summarize this") directly from your browser to the **Google Gemini API**, using the API key you provided.

- Zuri does not send this text to any server operated by the project. It goes straight from your browser to Google.
- Zuri does not send the address of the page to the AI provider.
- Google handles the data according to its own terms and privacy policy for the Gemini API. Please review them, especially before selecting sensitive or confidential text.

**Tip:** if you do not want your text to leave your device, choose the local provider and do not add an API key.

## What Zuri stores on your device

Zuri uses the extension's local storage in your browser (`chrome.storage.local`) to save:

- Your preferences, such as the AI provider, the target language, and whether the floating popup is enabled.
- Your Gemini API key, if you add one.

Important details:

- This data stays on your computer, in your browser profile. Zuri does not upload it.
- Your API key is stored **without encryption** in the extension's local storage, like most extensions that accept API keys. Use a key with limited permissions and quota, and avoid using Zuri with your key on shared computers.
- Removing the extension deletes this stored data.

## What Zuri does not do

- It does not require an account or login.
- It does not collect analytics, telemetry, or crash reports.
- It does not use advertising or tracking tools.
- It does not sell, rent, or share your data.
- It does not keep a history of your selected text on any server.

## Permissions

| Permission | Why Zuri needs it |
| --- | --- |
| `sidePanel` | To show Zuri's side panel with the results. |
| `contextMenus` | To add the "Analyze with Zuri" option to the right-click menu. |
| `activeTab` | To act on the tab you are using when you trigger Zuri. |
| `scripting` | To let the extension run its own code in the pages you use. |
| `storage` | To save your settings locally in your browser. |
| Access to all sites (`<all_urls>`) | So that Zuri can detect your text selection and work on **any** website. It only reads the text you select. |

## Landing page

The project landing page (the `index.html` in this repository, when you run it or host it) may load fonts from Google Fonts. When a page loads those fonts, your browser requests them from Google, which may receive technical information such as your IP address. This applies only to the landing page, not to the extension itself.

## Third parties

- **Google (Chrome built-in AI):** provides the on-device model used in local mode.
- **Google (Gemini API):** receives your selected text only if you use cloud mode with your own key.
- **Google Fonts:** used by the landing page only.

Zuri is not responsible for the privacy practices of these services.

## Your control

- To stop all data sharing with a cloud provider, switch to the local provider and remove your API key in Zuri's settings.
- To delete everything Zuri stored, remove the API key and settings, or uninstall the extension from `chrome://extensions`.
- To check exactly what Zuri does, read the source code in this repository.

## Changes to this policy

If Zuri's behavior changes in a way that affects your privacy (for example, a new AI provider), this file will be updated before the change is released. The full history of changes is available in the repository's commit history.

## Contact

For questions about privacy, open an issue in the [Zuri repository](https://github.com/kauanvinicius9/Zuri/issues). To report a security vulnerability, follow the instructions in [SECURITY.md](SECURITY.md).