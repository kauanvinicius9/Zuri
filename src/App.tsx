import { useState, useEffect } from "react";
import { getUserSettings } from "./services/chromeStorage";
import type { UserSettings } from "./types";
import "./App.css";

export function App() {
    const [summary, setSummary] = useState<string>("Selecione um texto na página para gerar o resumo offline");
    const [settings, setSettings] = useState<UserSettings | null>(null);

    useEffect(() => {
        async function loadSettings() {
            const saved = await getUserSettings();
            if (saved) {
                setSettings(saved);
            }
        }
        loadSettings();
    }, []);

    return (
        <div className="w-[350px] p-4 bg-zinc-900 text-zinc-100 flex flex-col gap-3">
            <div>
                <h2 className="text-lg font-bold tracking-tight">Zuri</h2>
                <p className="text-xs text-zinc-400">{settings ? `Provedor: ${settings.provider}` : "Inteligência ao Seu Lado"}</p>
            </div>

            <div className="p-3 bg-zinc-800 rounded-md border border-zinc-700 text-sm">
                <p>{summary}</p>
            </div>

            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md transition-colors cursor-pointer text-sm" onClick={() => setSummary("Processando seleção no DOM...")}>
                Resumir seleção
            </button>
        </div>
    );
}
export default App;