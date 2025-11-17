"use client";
import AnimatedContent from "@/components/AnimatedContent";

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
                        <p className="text-lg text-gray-300">
                            This is the Experience section. Here you can showcase your professional experience, projects, and accomplishments.
                        </p>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}