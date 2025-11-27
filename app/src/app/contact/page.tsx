import AnimatedContent from "@/components/AnimatedContent";
import { Highlighter } from "@/components/ui/highlighter";

export default function Projects() {
    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-[#fff9f0] text-black px-[48px] pt-40 md:pt-48"
        >
            <div className="pointer-events-none select-none absolute -top-36 -left-[6%] w-[112%] h-64 md:h-72 bg-[#1c1c1c] skew-y-5 origin-top-left" />
            <div className="pointer-events-none select-none absolute top-10 right-[10%] w-[36%] h-60 bg-[#1c1c1c] skew-y-2 rotate-1 origin-top-right md:top-8 md:h-68" />

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
                                <h1 className="text-8xl font-bold m-5">LET'S BUILD</h1>
                            </div>
                            <div className="flex flex-row">
                                <h1 className="text-8xl font-bold m-5">THE</h1>
                                <Highlighter action="highlight" color="#ffc700" animationDuration={1600} isView={true}>
                                    <h1 className="text-8xl font-bold m-5">FUTURE</h1>
                                </Highlighter>
                            </div>
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
