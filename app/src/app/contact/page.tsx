import AnimatedContent from "@/components/AnimatedContent";

export default function Projects() {
    return (
        <section id="contact" className="p-[48px] bg-[#1c1c1c] text-white pt-24">
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
                        <h1 className="text-5xl font-bold mb-12">Contact</h1>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}