"use client";

type PresetQuestionsProps = {
    questions: string[];
    onSelect: (question: string) => void;
};

export default function PresetQuestions({ questions, onSelect }: PresetQuestionsProps) {
    return (
        <div className="flex flex-wrap justify-center gap-3 mt-2">
            {questions.map((questionText) => (
                <button
                    key={questionText}
                    type="button"
                    onClick={() => onSelect(questionText)}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#1c1c1c]/10 bg-white/90 px-4 py-2 text-xs sm:text-sm font-medium text-[#1c1c1c] shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition hover:-translate-y-[2px] hover:border-[#1c1c1c]/30 cursor-pointer hover:shadow-[0_12px_26px_rgba(0,56,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0038ff]"
                >
                    <span className="text-left">{questionText}</span>
                </button>
            ))}
        </div>
    );
}
