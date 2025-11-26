"use client";

import React from "react";
import AnimatedContent from "@/components/AnimatedContent";

const QUESTIONS = [
    "What inspires you most about your work?",
    "What do you do in your free time?",
];

export default function Askme() {
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
                        <div className="relative w-[300px] md:w-1/2 rounded-[28px] border bg-white/80 px-7 py-5 mb-5 text-l placeholder:text-gray-400 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                            <form className="space-y-3">
                                <div className="relative group">
                                    <textarea
                                        placeholder="Ask anything about me..."
                                        className="block outline-none w-full bg-transparent resize-none overflow-hidden leading-relaxed pr-16"
                                        rows={1}
                                    />
                                </div>
                            </form>
                            <a
                                href="#"
                                className="absolute right-2 top-1/2 inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-[#1c1c1c] to-[#2d2d2d] text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] transform -translate-y-1/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60"
                            >
                                <span className="material-symbols-outlined text-[26px] leading-none">
                                    arrow_upward
                                </span>
                            </a>
                        </div>
                        <div className="flex flex-row gap-6 justify-center">
                            {QUESTIONS.map((question, index) => (
                            <div
                                key={index}
                                className="cursor-pointer w-[300px] rounded-[12px] border bg-white/80 px-3 py-3 text-sm shadow-[0_12px_40px_rgba(0,0,0,0.08)] text-center"
                            >
                                {question}
                            </div>
                            ))}
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
