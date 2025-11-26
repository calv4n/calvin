"use client";

import React, { useCallback, useState } from "react";
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
    const [answer, setAnswer] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAsk = useCallback(async () => {
        if (!question.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const result = await askQuestion(question.trim());
            setAnswer(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
            setAnswer(null);
        } finally {
            setLoading(false);
        }
    }, [question]);

    const handlePreset = useCallback((preset: string) => {
        setQuestion(preset);
    }, []);

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
                        <AnswerPanel answer={answer} error={error} />
                        <div className="relative w-[300px] md:w-1/2 rounded-[28px] border bg-white/80 px-7 py-5 mb-5 text-l placeholder:text-gray-400 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                            <QuestionForm
                                question={question}
                                onQuestionChange={setQuestion}
                                onSubmit={handleAsk}
                                loading={loading}
                            />
                        </div>
                        <PresetQuestions questions={QUESTIONS} onSelect={handlePreset} />
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
