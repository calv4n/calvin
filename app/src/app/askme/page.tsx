"use client";

import AnimatedContent from "@/components/AnimatedContent";
import { Highlighter } from "@/components/ui/highlighter";

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
                        <div className="relative w-[300px] md:w-1/2 rounded-[28px] border bg-white/80 px-7 py-5 text-l placeholder:text-gray-400 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">


                            <form className="space-y-3">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        placeholder="Ask anything about me..."
                                        className="border-hidden"
                                    />
                                </div>
                            </form>
                            <a
                                href="#"
                                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-[#1c1c1c] text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/60"
                            >
                                <span className="material-symbols-outlined text-[26px] leading-none">
                                    arrow_upward
                                </span>
                            </a>
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
