chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "analyze-selection",
        title: "Analisar com Zuri",
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "analyze-selection" && tab?.id && info.selectionText) {
        chrome.sidePanel.open({ tabId: tab.id });
        chrome.storage.session.set({
            current_selection: {
                text: info.selectionText,
                sourceUrl: tab.url || "",
                timestamp: Date.now()
            }
        });
    }
});