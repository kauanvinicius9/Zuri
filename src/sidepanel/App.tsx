import React, { useState, useEffect } from "react";
import { Sparkles, BookOpen, Cpu, Code, Copy, Check } from "lucide-react";
import type { ActionType, UserSettings } from "../types";
import { processTextWithAI } from "../services/aiService";

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
        if (chrome.storage?.local) {
            chrome.storage.local.get(["zuri_user_settings"], (res) => {
                if (res.ai_settings) setSettings(res.ai_settings);
            });
        }

        const messageListener = (message: any) => {
            if (message.type === "SELECTED_TEXT_PAYLOAD") {
                setSelectedText(message.payload.text);
            }
        };

        chrome.runtime?.onMessage?.addListener(messageListener);
        return () => chrome.runtime?.onMessage?.removeListener(messageListener);
    }, []);

    const handleSaveSettings = (newSettings: UserSettings) => {
        setSettings(newSettings);
        if (chrome.storage?.local) {
            chrome.storage.local.set({ zuri_user_settings: newSettings });
        }
    }

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
        <div className="flex flex-col h-screen p-4 bg-slate-900 text-slate-100">
            <header className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400"/>
                    <h1 className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        Zuri (Colocar imagem depois)
                        {/* <img src="" alt="" /> */}
                    </h1>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                    {settings.provider.toUpperCase()}
                </span>
            </header>

            <main className="flex-1 overflow-y-auto my-4  space-y-4">
                <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                    Contexto Selecionado:
                </label>
                <p className="text-xs text-slate-300 line-clamp-4 italic">
                    {selectedText || "Nenhum texto selecionado. Selecione um texto em qualquer página e clique com o botão direito"}
                </p>

                <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => handleExecuteAction("summarize")} disabled={!selectedText || loading} className="flex items-center justify-center gap-2 p-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg text-xs font-medium transition">
                        <BookOpen className="w-4 h-4"/> Resumir 
                    </button>

                    <button onClick={() => handleExecuteAction("extract_concepts")} disabled={!selectedText || loading} className="flex items-center justify-center gap-2 p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-lg text-xs font-medium border-border-slate-700 transition">
                        <Cpu className="w-4 h-4 text-emerald-400"/> Conceitos
                    </button>

                    <button onClick={() => handleExecuteAction("translate")} disabled={!selectedText || loading} className="flex items-center justify-center gap-2 p-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-lg text-xs font-medium border-border-slate-700 transition">
                        <Sparkles className="w-4 h-4 text-amber-400"/> Traduzir
                    </button>
                </div>

                {loading && (
                    <div className="p-4 text-center text-xs text-indigo-400 animate-pulse">
                        Processando com {settings.provider}...
                    </div>
                )}

                {result && (
                    <div className="relative p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                        <button onClick={copyToClipboard} className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-slate-400 hover:text-slate-200 transition">
                            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {result}
                        </div>
                    </div>
                )}
                 </div>
            </main>
        </div>
    )
}