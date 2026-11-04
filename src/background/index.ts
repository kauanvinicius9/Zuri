chrome.sidepanel.setPanelBehavior({ openPanelOnActionClick: true });

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "analyze-selection",
        title: "Analisar com Zuri",
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "analyze-selection" && tab?.id && info.selectionText) {
        chrome.sidePanel.open({ tabId: tab.id });

        setTimeout(() => {
            chrome.runtime.sendMessage({
                type: "SELECTED_TEXT_PAYLOAD",
                payload: {
                    text: info.selectionText,
                    sourceUrl: tab.url,
                },
            });
        }, 400);
    }
});