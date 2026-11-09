import type { ActionType, UserSettings } from "../types";

interface ChromeAIWindow extends Window {
  ai?: {
    translator?: {
      availability(): Promise<"readily" | "after-download" | "no">;
      create(options?: { sourceLanguage?: string; targetLanguage?: string }): Promise<{translate(text: string): Promise<string>}>;
    };
    summarizer?: {
      availability(): Promise<"readily" | "after-download" | "no">;
      create(options?: { type?: string; format?: string; length?: string }): Promise<{summarize(text: string): Promise<string>}>;
    };

    languageModel?: {
      availability(): Promise<"readily" | "after-download" | "no">;
      create(): Promise<{prompt(text: string): Promise<string>}>;
    };
  };
}

export async function processTextWithAI(text: string, action: ActionType, settings: UserSettings): Promise<string> {
  if (settings.provider === "local") {
    try {
      return await processWithLocalAI(text, action);
    } catch (err: unknown) {
      console.warn("Zuri: IA local indisponível ou falhou.", err);

      // Fallback automático para nuvem caso haja chave configurada
      if (settings.apiKey) {
        console.info("Zuri: Alternando automaticamente para a API em nuvem...");

        try {
          return await processWithGeminiAPI(text, action, settings);
        } catch (apiError: unknown) {
          throw new Error(
            "A IA local falhou e o fallback para a nuvem também encontrou um erro",
            { cause: apiError },
          );
        }
      }

      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
      throw new Error(
        `A IA local nativa não pôde processar a solicitação: ${errorMessage}. Configure uma chave de API para o fallback em nuvem`,
        { cause: err },
      );
    }
  }

  // Fluxo da API em Nuvem (Google Gemini)
  if (settings.provider === "gemini") {
    if (!settings.apiKey) {throw new Error("Chave de API do Gemini não configurada.")}
    return await processWithGeminiAPI(text, action, settings);
  }
  throw new Error("Provedor de IA não configurado ou inválido.");
}

// Processa utilizando as APIs nativas do Chrome (Built-in AI / Gemini Nano)
async function processWithLocalAI( text: string, action: ActionType ): Promise<string> {
  const aiWindow = window as unknown as ChromeAIWindow;

  if (!aiWindow.ai) { throw new Error("O objeto window.ai não está disponível neste navegador (verifique flags ou versão do Chrome)") }

  // Ação: Tradução nativa via window.ai.translator
  if (action === "translate") {
    if (!aiWindow.ai.translator) { throw new Error("API window.ai.translator não suportada") }

    const availability = await aiWindow.ai.translator.availability();
    if (availability === "no") { throw new Error("Serviço de tradução local indisponível no momento.") }

    const translator = await aiWindow.ai.translator.create({
      sourceLanguage: "auto",
      targetLanguage: "pt",
    });
    return await translator.translate(text);
  }

  // Ação: Resumo nativo via window.ai.summarizer
  if (action === "summarize") {
    if (!aiWindow.ai.summarizer) { throw new Error("API window.ai.summarizer não suportada") }

    const availability = await aiWindow.ai.summarizer.availability();
    if (availability === "no") { throw new Error("Serviço de resumo local indisponível.") }

    const summarizer = await aiWindow.ai.summarizer.create({ type: "tl;dr", format: "markdown", length: "medium" });
    return await summarizer.summarize(text);
  }

  // Ações: Explain / Extract Concepts via window.ai.languageModel (Prompt API)
  if (!aiWindow.ai.languageModel) { throw new Error("API window.ai.languageModel não suportada") }

  const availability = await aiWindow.ai.languageModel.availability();
  if (availability === "no") { throw new Error("Modelo de linguagem local indisponível.") }

  const prompts: Record<Exclude<ActionType, "translate" | "summarize">, string> = {
    explain: `Explique o conceito ou código a seguir de forma didática e objetiva:\n\n${text}`,
    extract_concepts: `Extraia os principais conceitos, termos chave e definições do texto abaixo:\n\n${text}`,
  };

  const session = await aiWindow.ai.languageModel.create();
  return await session.prompt(prompts[action as keyof typeof prompts]);
}

// Processa utilizando a API REST do Gemini (Fallback em Nuvem)
async function processWithGeminiAPI( text: string, action: ActionType, settings: UserSettings ): Promise<string> {
  const model = settings.geminiModel || "gemini-1.5-flash";

  const prompts: Record<ActionType, string> = {
    summarize: `Faça um resumo claro, conciso e estruturado em tópicos do seguinte conteúdo:\n\n${text}`,
    explain: `Explique o conceito ou código a seguir de forma didática e objetiva:\n\n${text}`,
    extract_concepts: `Extraia os principais conceitos, termos chave e definições do texto abaixo:\n\n${text}`,
    translate: `Traduza o texto a seguir mantendo o contexto técnico e clareza para o Português:\n\n${text}`,
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": settings.apiKey,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompts[action] }] }],
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Erro na API do Gemini (${response.status}): ${errorData.error?.message || response.statusText}`,
    );
  }

  const data = (await response.json()) as {
    candidates?: Array<{
        content?: {
            parts?: Array<{
                text?: string;
            }>;
        };
     }>;
  };
  const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!resultText) {
    throw new Error("A API do Gemini retornou uma resposta vazia.");
  }

  return resultText;
}
