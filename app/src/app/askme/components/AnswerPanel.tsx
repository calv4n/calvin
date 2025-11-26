"use client";

type AnswerPanelProps = {
    answer: string | null;
    error: string | null;
};

export default function AnswerPanel({ answer, error }: AnswerPanelProps) {
    if (!answer && !error) return null;

    return (
        <>
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
        </>
    );
}
