"use client";

type AnswerPanelProps = {
    answer: string | null;
    error: string | null;
};

export default function AnswerPanel({ answer, error }: AnswerPanelProps) {
    if (!answer && !error) return null;

    return (
        <div className="max-w-[450px] md:w-1/2 flex flex-col">
            {answer && (
                <div className="mb-4 text-sm text-gray-800 bg-white/80 p-3 pr-4 pl-4 rounded-tl-4xl rounded-tr-4xl rounded-bl-4xl rounded-br-md shadow-[0_12px_40px_rgba(0,0,0,0.08)] ">
                    <p className="leading-relaxed whitespace-pre-line">{answer}</p>
                </div>
            )}
            {error && (
                <div className="mb-4 text-sm text-red-600">
                    <p className="font-semibold mb-1">Error:</p>
                    <p className="leading-relaxed">{error}</p>
                </div>
            )}
        </div>
    );
}
