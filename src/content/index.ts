interface SelectionPayload {
  type: "TEXT_SELECTED_EVENT";
  payload: {
    text: string;
    sourceUrl: string;
  };
}

let lastSelectedText = "";

document.addEventListener("mouseup", () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();

    if (selectedText && selectedText.length > 3) {
        if (selectedText === lastSelectedText) return;
        lastSelectedText = selectedText;

        const payload: SelectionPayload = {
            type: "TEXT_SELECTED_EVENT",
            payload: {
                text: selectedText,
                sourceUrl: window.location.href,
            },
        };

        try {
            chrome.runtime.sendMessage(payload, () => {
                if (chrome.runtime.lastError) {
                    return;
                }
            });
        } catch (error) {
            console.error("Zuri: Erro ao enviar mensagem de texto selecionado", error);
        }
    } else if (!selectedText) {
        lastSelectedText = "";
    }
});