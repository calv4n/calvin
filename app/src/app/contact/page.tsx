import AnimatedContent from "@/components/AnimatedContent";
import { Highlighter } from "@/components/ui/highlighter";

export default function Projects() {
    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-[#fff9f0] text-black px-[48px] pt-40 md:pt-48"
        >
            <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-28 -left-[10%] w-[125%] h-72 md:h-80 bg-[#1c1c1c] rotate-[3deg] rounded-[38px] shadow-2xl shadow-[#1c1c1c]/25 transform-gpu" />
                <div className="absolute -top-4 right-[-8%] w-[0] lg:w-[32%] h-60 md:h-95 bg-gradient-to-b bg-[#1c1c1c] rotate-[3deg] md:rotate-[3deg] shadow-2xl shadow-[#1c1c1c]/25 transform-gpu" />
            </div>

            <div className="relative max-w-7xl mx-auto">
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
                    <div className="min-h-[calc(70vh-96px)] pt-8 md:pt-12">
                        <div>
                            <div>
                                <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold m-5">LET'S BUILD</h1>
                            </div>
                            <div className="flex flex-row">
                                <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold m-5 mr-0 sm:mr-5 x-500">THE</h1>
                                <Highlighter action="highlight" color="#ffc700" animationDuration={1600} isView={true}>
                                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold m-3 p-2">FUTURE</h1>
                                </Highlighter>
                            </div>
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
