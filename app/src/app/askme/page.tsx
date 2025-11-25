"use client";

import AnimatedContent from "@/components/AnimatedContent";

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
                    <div className="min-h-[calc(100vh-96px)] pt-18">
                        hello ask me page
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}