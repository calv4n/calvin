import AnimatedContent from "@/components/AnimatedContent";
import { Highlighter } from "@/components/ui/highlighter";

export default function Projects() {
    return (
        <section id="contact" className="p-[48px] bg-[#fff9f0] text-black pt-24">
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
                    <div className="min-h-[calc(70vh-96px)] pt-18">
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