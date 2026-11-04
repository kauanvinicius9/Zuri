import type { ActionType, UserSettings } from "../types";

export async function processTextWithAI( text: string, action: ActionType, settings: UserSettings ): Promise<string> {
    const prompts: Record<ActionType, string> = {
        summarize: `Faça um resumo claro, conciso e estruturado em tópicos do seguinte conteúdo:\n\n${text}`,
        explain: `Explique o conceito ou código a seguir de forma didática e objetiva:\n\n${text}`,
        extract_concepts: `Extraia os principais conceitos, termos chave e definições do texto abaixo:\n\n${text}`,
        translate: `Traduza o texto a seguir mantendo o contexto técnico e clareza para o Português:\n\n${text}`,
    };

    const prompt = prompts[action];
     if (settings.provider === "local") {
        return processWithLocalAI(prompt)
     }

     if (settings.provider === "gemini" && settings.apiKey) {
        return processWithGeminiAPI(prompt, settings.apiKey);
     }

     throw new Error("Provedor de IA não configurado ou chave de API ausente");
}

async function processWithLocalAI(prompt: string): Promise<string> {
    const aiWindow = window as any;
    if (aiWindow.ai && aiWindow.ai.languageModel) {
        try {
            const capabilities = await aiWindow.ai.languageModel.capabilities();
            if (capabilities.available !== "no") {
                const session = await aiWindow.ai.languageModel.create();
                const result = await session.prompt(prompt);
                return result;
            }
        } catch (err) {
            console.warn("Erro na IA local nativa", err);
        }
    }

    return "[Simulação IA local]: O modelo nativo window.ai não está ativado no seu navegador (habilite via chrome://flags/#optimization-guide-on-device-model). Resultado simulado para o prompt recebido"
}

async function processWithGeminiAPI(prompt: string, apiKey: string): Promise<string> {
    const response = await fetch (
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
            }),
        }
    );

    if (!response.ok) {
        throw new Error(`Erro na API do Gemini: ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Nenhuma resposta retornada";
}