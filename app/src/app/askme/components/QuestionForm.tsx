"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

type QuestionFormProps = {
    question: string;
    onQuestionChange: (value: string) => void;
    onSubmit: () => void;
    loading: boolean;
};

export default function QuestionForm({
    question,
    onQuestionChange,
    onSubmit,
    loading,
}: QuestionFormProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [anchorToBottom, setAnchorToBottom] = useState(false);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
        event.preventDefault();
        if (!loading) onSubmit();
    };

    const syncHeight = useCallback((element?: HTMLTextAreaElement) => {
        const target = element ?? textareaRef.current;
        if (!target) return;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
        setAnchorToBottom(target.scrollHeight > 26);
    }, []);

    useEffect(() => {
        syncHeight();
    }, [question, syncHeight]);

    const buttonStyle = anchorToBottom
        ? { top: "auto", bottom: "16px", transform: "none" }
        : { top: "50%", bottom: "auto", transform: "translateY(-50%)" };

    return (
        <>
            <form className="space-y-3" onSubmit={(event) => event.preventDefault()}>
                <div className="relative group">
                    <textarea
                        ref={textareaRef}
                        placeholder="Ask anything about me..."
                        className="block outline-none w-full bg-transparent resize-none overflow-hidden leading-relaxed pr-16"
                        rows={1}
                        value={question}
                        onInput={(event) => {
                            onQuestionChange(event.currentTarget.value);
                            syncHeight(event.currentTarget);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </form>
            <button
                type="button"
                style={buttonStyle}
                onClick={onSubmit}
                disabled={loading}
                className="absolute cursor-pointer right-3 inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#1c1c1c] to-[#2d2d2d] text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60 disabled:opacity-60"
            >
                <span className="material-symbols-outlined text-[26px] leading-none">
                    {loading ? "schedule" : "arrow_upward"}
                </span>
            </button>
        </>
    );
}
