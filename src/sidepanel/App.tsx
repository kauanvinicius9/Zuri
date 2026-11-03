import React, { useState, useEffect } from "react";
import { Sparkles, BookOpen, Cpu, Settings, Code, Copy, Check } from 'lucide-react';
import { ActionType, UserSettings } from '../types';
import { processTextWithAI } from '../services/aiService';

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
            chrome.storage.local.get(["ai_settings"], (res) => {
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

    const handleExecuteAction = async (action: ActionType) => {
        if (!selectedText) return;
        setLoading(true);
        setResult("");
        try {
            const output = await
        }
    }
}