import React, { useState, useEffect } from "react";
import { processTextWithAI } from "../services/aiService";
import type { ActionType, UserSettings } from "../types";
import { getUserSettings } from "../services/chromeStorage";
import zuriLogo from "../assets/zuri-logo-2.png";

interface SelectionSection {
    text: string;
    sourceUrl: string;
    timestamp: number;
}

export const App: React.FC = () => {
    const [selectedText, setSelectedText] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    const [settings, setSettings] = useState<UserSettings>({
        provider: "local",
        apiKey: "",
    });

    useEffect(() => {
        async function loadStoredSettings() {
            try {
                const savedSettings = await getUserSettings();
                if (savedSettings) {
                    setSettings(savedSettings);
                }
            } catch (err) {
                console.error("Erro ao carregar configurações do Zuri:", err);
            }
        }

        loadStoredSettings();

        if (chrome.storage?.session) {
            chrome.storage.session.get(["current_selection"], (res) => {
                const selection = res.current_selection as SelectionSection | undefined;
                if (selection?.text) {
                    setSelectedText(selection.text);
                }
            });
        }

        const storageListener = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
            if (areaName === "session" && changes.current_selection) {
                const newValue = changes.current_selection.newValue as SelectionSection | undefined;
                if (newValue?.text) {
                    setSelectedText(newValue.text);
                    setResult(""); 
                }
            }
        };

        chrome.storage?.onChanged?.addListener(storageListener);
        return () => {
            chrome.storage?.onChanged?.removeListener(storageListener);
        };
    }, []);

    const handleExecuteAction = async (action: ActionType) => {
        if (!selectedText) return;
        setLoading(true);
        setResult("");
        try {
            const output = await processTextWithAI(selectedText, action, settings);
            setResult(output);
        } catch (err: any) {
            setResult(`Erro ao processar: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-screen p-4 bg-gradient-to-t from-zinc-200 to white text-white select-none">
            <header className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <img src={zuriLogo} alt="Logo Zuri" className="w-25" />
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-[#8c2639] text-white">
                    {settings.provider.toUpperCase()}
                </span>
            </header>

            <main className="flex-1 overflow-y-auto my-4 space-y-4">
                <div className="p-3 bg-zinc-200 rounded-xl space-y-3">
                    <div>
                        <label className="text-xs font-semibold text-black block mb-1">
                            Contexto Selecionado:
                        </label>
                        <p className="text-xs text-zinc-600 line-clamp-4 italic p-2.5">
                            {selectedText || "Nenhum texto selecionado. Selecione um texto em qualquer página e clique no menu de contexto."}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => handleExecuteAction("summarize")} disabled={!selectedText || loading} className="flex text-[#35141d] items-center justify-center gap-2 p-2.5 hover:bg-[#35131d] hover:text-white border border-[#35131d] rounded-lg text-xs font-medium transition cursor-pointer">
                            Resumir 
                        </button>

                        <button onClick={() => handleExecuteAction("extract_concepts")} disabled={!selectedText || loading} className="flex text-[#35141d] items-center justify-center gap-2 p-2.5 hover:bg-[#35141d] hover:text-white rounded-lg text-xs font-medium border border-[#35131d] transition cursor-pointer">
                            Conceitos
                        </button>

                        <button onClick={() => handleExecuteAction("translate")} disabled={!selectedText || loading} className="flex items-center justify-center gap-2 p-2.5 bg-[#641b2b] hover:bg-[#35141d] rounded-lg text-xs font-medium transition col-span-2 cursor-pointer">
                            Traduzir
                        </button>
                    </div>
                </div>

                {loading && (
                    <div className="p-4 text-center text-xs text-indigo-400 animate-pulse">
                        Processando com {settings.provider}...
                    </div>
                )}

                {result && (
                    <div className="relative p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                        <button onClick={copyToClipboard} className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-slate-400 hover:text-slate-200 transition cursor-pointer">
                            {copied ? "Copiado" : "Copiar"}
                        </button>

                        <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap pr-6">
                            {result}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;