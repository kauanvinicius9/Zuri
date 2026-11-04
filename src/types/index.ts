export type AIProvider = "local" | "openai" | "gemini" | "auto";

export type ActionType = "summarize" | "explain" | "extract_concepts" | "translate";

export interface UserSettings {
    provider: AIProvider;
    apiKey?: string;
    targetLanguage?: string;
}

export interface ContextPayload {
    text: string;
    action: ActionType;
    sourceUrl?: string;
}