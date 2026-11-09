import React, { useState, useEffect } from "react";
import { processTextWithAI } from "../services/aiService";
import type { ActionType, UserSettings } from "../types";
import { getUserSettings, saveUserSettings } from "../services/chromeStorage";
import zuriLogo from "../assets/zuri-logo-2.png";

interface SelectionSection { text: string; sourceUrl: string; timestamp: number }

export const App: React.FC = () => {
    const [selectedText, setSelectedText] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);
    
    // Controle da tela de configurações
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [saveStatus, setSaveStatus] = useState<string>("");

    const [settings, setSettings] = useState<UserSettings>({
        provider: "local",
        apiKey: "",
        geminiModel: "gemini-1.5-flash",
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
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Erro desconhecido";
            setResult(`Erro ao processar: ${message}`);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await saveUserSettings(settings);
            setSaveStatus("Configurações salvas com sucesso!");
            setTimeout(() => {
                setSaveStatus("");
                setIsSettingsOpen(false);
            }, 1200);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message: "Erro desconhecido";
            setSaveStatus(`Erro ao salvar: ${message}`);
        }
    };

    return (
        <div className="flex flex-col h-screen p-4 bg-gradient-to-t from-zinc-200 to-white text-zinc-900 select-none">
            <header className="flex items-center justify-between pb-4 border-b border-zinc-300">
                <div className="flex items-center gap-2">
                    <img src={zuriLogo} alt="Logo Zuri" className="w-20 object-contain" />
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8c2639] text-white font-semibold">
                        {settings.provider.toUpperCase()}
                    </span>
                    <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="p-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-700 transition cursor-pointer" title="Configurações">
                        Configurações
                    </button>
                </div>
            </header>

            {isSettingsOpen ? (
                <main className="flex-1 overflow-y-auto my-4 space-y-4">
                    <div className="p-4 bg-white border border-zinc-300 rounded-xl shadow-sm space-y-4">
                        <div className="flex justify-between items-center border-b border-zinc-200 pb-2">
                            <h2 className="text-xs font-bold text-zinc-800">Configurações de IA</h2>
                            <button onClick={() => setIsSettingsOpen(false)} className="text-xs text-zinc-500 hover:text-zinc-800 cursor-pointer">✕ Fechar</button>
                        </div>

                        <form onSubmit={handleSaveSettings} className="space-y-3">
                            <div>
                                <label className="text-xs font-semibold text-zinc-700 block mb-1">Provedor de IA:</label>
                                <select value={settings.provider} onChange={(e) => setSettings({ ...settings, provider: e.target.value as "local" | "gemini" })} className="w-full text-xs p-2 rounded-lg border border-zinc-300 bg-zinc-50 focus:outline-none focus:ring-1 focus:ring-[#8c2639]">
                                    <option value="local">Local (Chrome Built-in / Gemini Nano)</option>
                                    <option value="gemini">Nuvem (Google Gemini API Key)</option>
                                </select>
                            </div>

                            {settings.provider === "gemini" && (
                                <>
                                    <div>
                                        <label className="text-xs font-semibold text-zinc-700 block mb-1">Chave de API (Gemini):</label>
                                        <input type="password" placeholder="Cole sua API Key aqui..." value={settings.apiKey || ""} onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })} className="w-full text-xs p-2 rounded-lg border border-zinc-300 bg-zinc-50 focus:outline-none focus:ring-1 focus:ring-[#8c2639]"/>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-zinc-700 block mb-1">Modelo Gemini:</label>
                                        <input type="text" value={settings.geminiModel || "gemini-1.5-flash"} onChange={(e) => setSettings({ ...settings, geminiModel: e.target.value })} className="w-full text-xs p-2 rounded-lg border border-zinc-300 bg-zinc-50 focus:outline-none focus:ring-1 focus:ring-[#8c2639]"/>
                                    </div>
                                </>
                            )}

                            {saveStatus && (
                                <p className="text-xs text-center font-medium text-[#8c2639]">{saveStatus}</p>
                            )}

                            <button type="submit" className="w-full py-2 bg-[#8c2639] hover:bg-[#641b2b] text-white rounded-lg text-xs font-medium transition cursor-pointer">
                                Salvar Configurações
                            </button>
                        </form>
                    </div>
                </main>
            ) : (
                <main className="flex-1 overflow-y-auto my-4 space-y-4">
                    <div className="p-3 bg-zinc-200 rounded-xl space-y-3 shadow-inner">
                        <div>
                            <label className="text-xs font-semibold text-zinc-800 block mb-1">
                                Contexto Selecionado:
                            </label>
                            <p className="text-xs text-zinc-600 line-clamp-4 italic p-2 bg-white/50 rounded-lg">
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

                            <button onClick={() => handleExecuteAction("translate")} disabled={!selectedText || loading} className="flex items-center justify-center gap-2 p-2.5 bg-[#641b2b] hover:bg-[#35141d] text-white rounded-lg text-xs font-medium transition col-span-2 cursor-pointer">
                                Traduzir
                            </button>
                        </div>
                    </div>

                    {loading && (
                        <div className="p-4 text-center text-xs text-[#8c2639] font-semibold animate-pulse">
                            Processando com {settings.provider}...
                        </div>
                    )}

                    {result && (
                        <div className="relative p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 shadow-md">
                            <button onClick={copyToClipboard} className="absolute top-2 right-2 px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-md text-slate-300 text-[10px] transition cursor-pointer">
                                {copied ? "Copiado!" : "Copiar"}
                            </button>

                            <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap pr-6">
                                {result}
                            </div>
                        </div>
                    )}
                </main>
            )}
        </div>
    );
};

export default App;