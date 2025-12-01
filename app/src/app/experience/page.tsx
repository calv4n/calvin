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
        isCurrent: true,
    },
    {
        timeline: "2022 - 2026",
        role: "Vocational School",
        company: "TBZ - Zurich",
        employment: "Education",
        text: "Currently completing my vocational education at TBZ, building a strong foundation in computer science and software engineering through coursework, projects, and practical training.",
        isCurrent: true,
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
        <section id="experience" data-nav-theme="dark" className="p-[24px] sm:p-[48px] bg-[#1c1c1c] text-white pt-24 sm:pt-48 pb-0">
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
                    <div className="min-h-[calc(100vh-96px)] pt-0 sm:pt-18">
                        <div className="lg:w-[36%] space-y-6">
                            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-gray-400">
                                <span className="h-px w-10 bg-white/30" />
                                experience
                            </div>
                            <h1 className="text-5xl font-[Bdogrotesk-Title] font-bold mb-12">My Path</h1>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-between items-start">
                            <div className="space-y-12 max-w-3xl">
                                {experiences.map((exp) => (
                                    <div key={`${exp.role}-${exp.company}`} className="flex gap-4 lg:gap-8 mr-0 lg:mr-12 flex-col lg:flex-row">
                                        <div className="w-32 shrink-0 text-sm text-gray-400">
                                            {exp.timeline}
                                        </div>
                                        <div className="space-y-2 mb-8 relative">
                                            {exp.isCurrent && (
                                                <button
                                                    type="button"
                                                    className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gray-200 bg-white/5 border border-white/15 px-3 py-1 rounded-full mb-3 ml-auto md:mb-0 md:ml-0 md:absolute md:top-0 md:right-0"
                                                >
                                                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                                                    now
                                                </button>
                                            )}
                                            <h2 className="text-xl font-semibold text-white">
                                                {exp.role}
                                            </h2>
                                            <p className="text-sm text-gray-400">
                                                {exp.company} &middot; {exp.employment}
                                            </p>
                                            <p className="text-base text-gray-300 leading-7">
                                                {exp.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-10 lg:mt-0 flex flex-col md:flex-row lg:flex-col gap-8 w-full">
                                {skillscardData.map((card, index) => (
                                    <div key={card.title} className="ml-0 lg:ml-20 mt-0s">
                                        <SpotlightCard className="w-full md:w-[315px] lg:w-[350px]" spotlightColor="rgba(0, 56, 255, 0.2)">
                                            <div className="flex flex-row justify-between items-start gap-4">
                                                <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
                                                <p className="font-mono text-lg text-gray-400">{index}</p>
                                            </div>
                                            <ul className="list-disc list-inside space-y-2">
                                                {card.items.map((item) => (
                                                    <p key={item} className="text-gray-400 text-sm">
                                                        {item}
                                                    </p>
                                                ))}
                                            </ul>
                                        </SpotlightCard>
                                    </div>
                                ))}
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
