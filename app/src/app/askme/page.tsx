"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import AnimatedContent from "@/components/AnimatedContent";
import AnswerPanel from "./components/AnswerPanel";
import QuestionForm from "./components/QuestionForm";
import PresetQuestions from "./components/PresetQuestions";
import { askQuestion } from "./api";

const QUESTIONS = [
    "What inspires you most about your work?",
    "What do you do in your free time?",
];

export default function Askme() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<{ role: "user" | "assistant" | "error"; text: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const answerRef = useRef<HTMLDivElement | null>(null);
    const hasMessages = messages.length > 0;

    const handleAsk = useCallback(async () => {
        if (!question.trim()) return;
        const currentQuestion = question.trim();
        setMessages((prev) => [...prev, { role: "user", text: currentQuestion }]);
        setLoading(true);
        try {
            const result = await askQuestion(currentQuestion);
            setMessages((prev) => [...prev, { role: "assistant", text: result }]);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong.";
            setMessages((prev) => [...prev, { role: "error", text: message }]);
        } finally {
            setLoading(false);
        }
    }, [question]);

    useEffect(() => {
        document.body.classList.add("hide-footer");
        return () => document.body.classList.remove("hide-footer");
    }, []);

    useEffect(() => {
        if (!hasMessages) return;
        answerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, [hasMessages, messages]);

    const handlePreset = useCallback((preset: string) => {
        setQuestion(preset);
    }, []);

    return (
        <section id="askme" data-nav-theme="light" className="p-[24px] sm:p-[48px] bg-[#fff9f0]">
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
                    <div
                        className={`min-h-[calc(100vh-48px)] sm:min-h-[calc(100vh-96px)] pt-18 flex flex-col px-2 gap-4 sm:gap-6 ${
                            hasMessages ? "" : "items-center justify-center"
                        }`}
                    >
                        <div ref={answerRef} className="w-full flex justify-center">
                            <AnswerPanel messages={messages} />
                        </div>

                        <div
                            className={`w-full flex flex-col items-center gap-3 ${
                                hasMessages ? "mt-auto pb-4 sm:pb-6" : ""
                            }`}
                        >
                            <div className="relative w-full max-w-2xl rounded-[28px] border bg-white/85 px-5 sm:px-7 py-4 sm:py-5 text-l placeholder:text-gray-400 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                                <QuestionForm
                                    question={question}
                                    onQuestionChange={setQuestion}
                                    onSubmit={handleAsk}
                                    loading={loading}
                                />
                            </div>
                            <PresetQuestions questions={QUESTIONS} onSelect={handlePreset} />
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
