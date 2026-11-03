document.addEventListener("mouseup", () => {
    const selectedText = window.getSelection()?.toString().trim();
    if (selectedText && selectedText.length > 5) {
        chrome.runtime.sendMessage({
            type: "TEXT_SELECTED_EVENT",
            text: selectedText,
        });
    }
});