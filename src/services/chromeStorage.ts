import type { UserSettings } from "../types";

export const storageKeys = {
    USER_SETTINGS: "zuri_user_settings",
    CACHED_SUMMARIES: "zuri_cached_summaries",
} as const;

export async function saveUserSettings(settings: UserSettings): Promise<void> {
    try {
        await chrome.storage.local.set({ [storageKeys.USER_SETTINGS]: settings });
    } catch (error) {
        console.error("Erro ao salvar configurações no Chrome Storage:", error);
        throw error;
    }
}

export async function getUserSettings(): Promise<UserSettings | null> {
    try {
        const result = await chrome.storage.local.get(storageKeys);
        return (result[storageKeys.USER_SETTINGS] as UserSettings) || null;
    } catch (error) {
        console.error("Erro ao recuperar configurações do Chrome Storage:", error);
        return null;
    }
}

export async function setStorageItem<T>(key: string, value: T): Promise<void> {
    try {
        await chrome.storage.local.set({ [key]: value });
    } catch (error) {
        console.error(`Erro ao salvar a chave ${key} no Chrome Storage:`, error);
        throw error;
    }
}

export async function getStorageItem<T>(key: string): Promise<T | null> {
    try {
        const result = await chrome.storage.local.get(key);
        return result[key] !== undefined ? (result[key] as T) : null;
    } catch (error) {
        console.error(`Erro ao recuperar a chave ${key} do Chrome Storage:`, error);
        return null;
    }
}

export async function removeStorageItem(key: string): Promise<void> {
    try {
        await chrome.storage.local.remove(key);
    } catch (error) {
        console.error(`Erro ao remover a chave ${key} do Chrome Storage:`, error);
        throw error;
    }
}