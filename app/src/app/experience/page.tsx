"use client";
import AnimatedContent from "@/components/AnimatedContent";
import { Highlighter } from "@/components/ui/highlighter";
import SpotlightCard from "@/components/SpotlightCard";
import FloatingToolIcons from "@/components/FloatingToolIcons";

const experiences = [
    {
        timeline: "2022 - 2026",
        role: "Software Developer Apprentice",
        company: "SIX Group AG",
        employment: "Apprenticeship",
        text: "During my apprenticeship, I built and maintained various internal web applications and automations, taking ownership of both development and ongoing improvements. I also gained experience in agile teamwork, cloud technologies, DevOps practices, and AI integrations while contributing to different teams and internal initiatives.",
    },
    {
        timeline: "2022 - 2026",
        role: "Vocational School",
        company: "TBZ - Zurich",
        employment: "Education",
        text: "Currently completing my vocational education at TBZ, building a strong foundation in computer science and software engineering through coursework, projects, and practical training.",
    },
];

const skillscardData = [
    {
        title: "Frontend & UI",
        items: ["Angular & React", "JavaScript & Typescript", "Web Components", "TailwindCSS & HTML/CSS"],
    },
    {
        title: "Backend & DevOps",
        items: ["Java & Spring", "Python & Langchain", "ArgoCD & Kubernetes ", "CI/CD Pipelines"],
    },
]

export default function Experience() {
    return (
        <section
            id="experience"
            className="px-6 py-16 md:px-12 lg:px-[48px] bg-[#1c1c1c] text-white pt-24 pb-0"
        >
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
                    <div className="min-h-[calc(100vh-96px)] pt-18 space-y-10">
                        <h1 className="text-4xl sm:text-5xl font-bold">Experience</h1>
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
                            <div className="space-y-10 max-w-3xl flex-1 w-full">
                                {experiences.map((exp) => (
                                    <Highlighter
                                        key={`${exp.role}-${exp.company}`}
                                        action="bracket"
                                        color="#0038ff"
                                    >
                                        <div className="flex gap-4 sm:gap-6 lg:gap-8 mr-0 lg:mr-12">
                                            <div className="w-20 sm:w-28 lg:w-32 shrink-0 text-xs sm:text-sm text-gray-400">
                                                {exp.timeline}
                                            </div>
                                            <div className="space-y-2">
                                                <h2 className="text-xl font-semibold text-white">
                                                    {exp.role}
                                                </h2>
                                                <p className="text-sm sm:text-base text-gray-400">
                                                    {exp.company} &middot; {exp.employment}
                                                </p>
                                                <p className="text-sm sm:text-base text-gray-300 leading-7">
                                                    {exp.text}
                                                </p>
                                            </div>
                                        </div>
                                    </Highlighter>
                                ))}
                            </div>
                            <div className="w-full lg:w-auto flex-1 lg:flex-none">
                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                                    {skillscardData.map((card, index) => (
                                        <div key={card.title} className="mt-0 mb-5">
                                            <SpotlightCard
                                                className="w-full max-w-sm"
                                                spotlightColor="rgba(0, 56, 255, 0.2)"
                                            >
                                                <div className="flex flex-row justify-between items-start w-full gap-4">
                                                    <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
                                                    <p className="font-mono text-base sm:text-lg text-gray-400">
                                                        {index}
                                                    </p>
                                                </div>
                                                <ul className="list-disc list-inside space-y-2">
                                                    {card.items.map((item) => (
                                                        <p key={item} className="text-gray-400 text-sm sm:text-base">
                                                            {item}
                                                        </p>
                                                    ))}
                                                </ul>
                                            </SpotlightCard>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <FloatingToolIcons />
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
