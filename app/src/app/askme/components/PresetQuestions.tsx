"use client";

type PresetQuestionsProps = {
    questions: string[];
    onSelect: (question: string) => void;
};

export default function PresetQuestions({ questions, onSelect }: PresetQuestionsProps) {
    return (
        <div className="flex flex-col md:flex-row gap-6 justify-center">
            {questions.map((questionText, index) => (
                <div
                    key={index}
                    className="cursor-pointer w-[300px] rounded-[12px] border bg-white/80 px-3 py-3 text-sm shadow-[0_12px_40px_rgba(0,0,0,0.08)] text-center"
                    onClick={() => onSelect(questionText)}
                >
                    {questionText}
                </div>
            ))}
        </div>
    );
}
