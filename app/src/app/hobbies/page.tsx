import AnimatedContent from "@/components/AnimatedContent";

export default function Hobbies() {
    return (
        <section id="hobbies" data-nav-theme="dark" className="px-[24px] sm:px-[48px] bg-[#1c1c1c] text-white">
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
                    <div className="min-h-[calc(100vh-96px)] pt-0 sm:pt-32">
                        <h1 className="text-5xl font-[Bdogrotesk-Title] font-bold mb-8">Beyond Work</h1>
                        
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}