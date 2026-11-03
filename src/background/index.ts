chrome.sidepanel.setPanelBehavior({ openPlaneOnActionClick: true});
chrome.runtime.on.Installed.addListener(() => {
    chrome.contextMenus.create({
        id: "analyze-selection",
        title: "Analisar com Vulcan",
        contexts: ["selection"],
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "analyze-selection" && tab?.id && info.selectionText) {
        chrome.sidePanel.open({ tabId: tab.id});

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