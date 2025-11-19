"use client";
import AnimatedContent from "@/components/AnimatedContent";

const experiences = [
    {
        head: "Software Developer Apprentice",
        subhead: "SIX Group AG",
        items: [
            {
                timeline: "2022 - 2023",
                depname: "Bbc AG",
            },
            {
                timeline: "2023 - 2026",
                depname: "Full Stack Developer",
            },
        ],
    },
];

export default function Experience() {

    return (
        <section id="experience" className="p-[48px] bg-[#1c1c1c] text-white ">
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
                        <h1 className="text-5xl font-bold mb-8">Experience</h1>
                        <div>
                            <p>

                            </p>
                        </div>
                        <div>

                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}