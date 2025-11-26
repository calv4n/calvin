"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import AnimatedContent from "@/components/AnimatedContent";

const QUESTIONS = [
    "What inspires you most about your work?",
    "What do you do in your free time?",
];

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000";

export default function Askme() {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [anchorToBottom, setAnchorToBottom] = useState(false);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const syncHeight = useCallback((element?: HTMLTextAreaElement) => {
        const target = element ?? textareaRef.current;
        if (!target) return;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
        setAnchorToBottom(target.scrollHeight > 26);
    }, []);

    useEffect(() => {
        syncHeight();
    }, [syncHeight]);

    const ask = useCallback(async () => {
        if (!question.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE}/ask`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: question.trim() }),
            });
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }
            const data = await response.json();
            setAnswer(data.answer ?? "No answer received.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
            setAnswer(null);
        } finally {
            setLoading(false);
        }
    }, [question]);

    const handlePreset = (preset: string) => {
        setQuestion(preset);
        if (textareaRef.current) {
            textareaRef.current.value = preset;
            syncHeight(textareaRef.current);
        }
    };

    const buttonStyle = anchorToBottom
        ? { top: "auto", bottom: "16px", transform: "none" }
        : { top: "50%", bottom: "auto", transform: "translateY(-50%)" };

    return (
        <section id="askme" className="p-[48px] bg-[#fff9f0]">
            <div className="max-w-7xl mx-auto">
                <AnimatedContent
                    distance={70}
                    direction="vertical"
                    reverse={false}
                    duration={0.8}
                    ease="power3.out"
                    initialOpacity={0.2}
                    animateOpacity
                    scale={1}
                    threshold={0.2}
                    delay={0}
                >
                    <div className="min-h-[calc(100vh-96px)] pt-18 flex items-center justify-center flex-col">
                            {answer && (
                                <div className="mb-4 text-sm text-gray-800">
                                    <p className="font-semibold mb-1">Answer:</p>
                                    <p className="leading-relaxed whitespace-pre-line">{answer}</p>
                                </div>
                            )}
                            {error && (
                                <div className="mb-4 text-sm text-red-600">
                                    <p className="font-semibold mb-1">Error:</p>
                                    <p className="leading-relaxed">{error}</p>
                                </div>
                            )}
                        <div className="relative w-[300px] md:w-1/2 rounded-[28px] border bg-white/80 px-7 py-5 mb-5 text-l placeholder:text-gray-400 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                            <form className="space-y-3" onSubmit={(event) => event.preventDefault()}>
                                <div className="relative group">
                                    <textarea
                                        ref={textareaRef}
                                        placeholder="Ask anything about me..."
                                        className="block outline-none w-full bg-transparent resize-none overflow-hidden leading-relaxed pr-16"
                                        rows={1}
                                        value={question}
                                        onInput={(event) => {
                                            setQuestion(event.currentTarget.value);
                                            syncHeight(event.currentTarget);
                                        }}
                                    />
                                </div>
                            </form>
                            <button
                                type="button"
                                style={buttonStyle}
                                onClick={ask}
                                disabled={loading}
                                className="absolute cursor-pointer right-3 inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#1c1c1c] to-[#2d2d2d] text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60 disabled:opacity-60"
                            >
                                <span className="material-symbols-outlined text-[26px] leading-none">
                                    {loading ? "schedule" : "arrow_upward"}
                                </span>
                            </button>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            {QUESTIONS.map((questionText, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer w-[300px] rounded-[12px] border bg-white/80 px-3 py-3 text-sm shadow-[0_12px_40px_rgba(0,0,0,0.08)] text-center"
                                    onClick={() => handlePreset(questionText)}
                                >
                                    {questionText}
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
