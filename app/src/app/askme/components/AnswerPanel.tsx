"use client";

type ChatMessage = { role: "user" | "assistant" | "error"; text: string };

type AnswerPanelProps = {
    messages: ChatMessage[];
};

export default function AnswerPanel({ messages }: AnswerPanelProps) {
    if (!messages.length) return null;

    return (
        <div className="w-full max-w-2xl flex flex-col gap-3 mb-6">
            {messages.map((message, index) => {
                if (message.role === "user") {
                    return (
                        <div
                            key={`${message.role}-${index}`}
                            className="self-end max-w-[85%] rounded-3xl rounded-br-md bg-white/90 text-[#0f0f0f] text-sm sm:text-base px-4 py-3 shadow-[0_10px_28px_rgba(0,0,0,0.08)]"
                        >
                            <p className="leading-relaxed break-words whitespace-pre-wrap">{message.text}</p>
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
                return (
                    <p
                        key={`${message.role}-${index}`}
                        className="text-sm sm:text-base leading-relaxed text-[#0f0f0f] whitespace-pre-wrap"
                    >
                        {message.text}
                    </p>
                );
            })}
        </div>
    );
}
