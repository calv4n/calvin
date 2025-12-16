"use client";

import ShinyText from "@/components/ShinyText";
import { Response } from "@/components/ui/Response";

type ChatMessage = { role: "user" | "assistant" | "error"; text: string; pending?: boolean };

type AnswerPanelProps = {
    messages: ChatMessage[];
};

export default function AnswerPanel({ messages }: AnswerPanelProps) {
    if (!messages.length) return null;

    return (
        <div className="w-full max-w-2xl flex flex-col gap-4 mb-8">
            {messages.map((message, index) => {
                if (message.role === "user") {
                    return (
                        <div
                            key={`${message.role}-${index}`}
                            className="self-end max-w-[85%] rounded-3xl rounded-br-md bg-white/90 text-[#0f0f0f] text-sm sm:text-base px-4 py-3 shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
                        >
                            <Response
                                className="text-sm sm:text-base leading-relaxed break-words"
                                parseIncompleteMarkdown={false}
                            >
                                {message.text}
                            </Response>
                        </div>
                    );
                }

                if (message.role === "error") {
                    return (
                        <div key={`${message.role}-${index}`} className="text-sm text-red-600">
                            <p className="font-semibold">Error:</p>
                            <p className="leading-relaxed">{message.text}</p>
                        </div>
                    );
                }

                if (message.role === "assistant" && message.pending) {
                    return (
                        <div
                            key={`${message.role}-${index}`}
                            className="relative text-sm sm:text-base leading-relaxed text-[#0f0f0f]"
                            aria-busy
                        >
                            <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-gradient-to-b from-[#1c1c1c] to-[#2d2d2d]" />
                            <div className="ml-3 px-4 py-3">
                                <ShinyText
                                    text={message.text || "Thinking..."}
                                    disabled={false}
                                    speed={6}
                                    className="text-sm sm:text-base leading-relaxed text-gray-700"
                                />
                            </div>
                        </div>
                    );
                }

                if (message.role === "assistant") {
                    return (
                        <div
                            key={`${message.role}-${index}`}
                            className="relative text-sm sm:text-base leading-relaxed text-[#0f0f0f]"
                        >
                            <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-gradient-to-b from-[#1c1c1c] to-[#2d2d2d]" />
                            <div className="ml-3 px-4 py-3">
                                <Response className="text-sm sm:text-base leading-relaxed break-words">
                                    {message.text}
                                </Response>
                            </div>
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
}
