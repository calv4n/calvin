import AnimatedContent from "@/components/AnimatedContent";
import { Highlighter } from "@/components/ui/highlighter";

export default function Projects() {
    return (
        <section
            id="contact"
            data-nav-theme="dark"
            className="relative overflow-hidden bg-[#fff9f0] text-black px-[0px] sm:px-[48px]"
        >
            <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-28 -left-[10%] w-[125%] h-72 md:h-80 bg-[#1c1c1c] rotate-[8deg] lg:rotate-[3deg] rounded-[38px] shadow-2xl shadow-[#1c1c1c]/25 transform-gpu" />
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
                    <div className="min-h-[calc(86vh)] pt-48 md:pt-60">
                        <div className="flex flex-col items-center md:items-start">
                            <div>
                                <h1 className="text-5xl md:text-8xl m-5 font-[Bdogrotesk-Mono]">LET'S BUILD</h1>
                            </div>
                            <div className="flex flex-row text-center">
                                <h1 className="text-5xl md:text-8xl m-5 mr-0 sm:mr-5 x-500 font-[Bdogrotesk-Mono]">THE</h1>
                                <Highlighter action="highlight" color="#ffc700" animationDuration={1600} isView={true}>
                                    <h1 className="text-5xl md:text-8xl font-[Bdogrotesk-Mono] m-3 p-2">FUTURE</h1>
                                </Highlighter>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 md:gap-32 items-center md:items-start mt-4 md:mt-12 ml-0 md:ml-12">
                            <div className="text-center md:text-start">
                                <p className="pt-2 text-base md:text-lg text-gray-700">Interested in my work? Let's connect!</p>
                                <a
                                    href="mailto:calvin.pfrender@gmail.com"
                                    className="inline-flex items-center justify-center gap-3 mt-6 md:mt-8 px-6 py-3 rounded-full bg-[#1c1c1c] text-white text-sm font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:translate-y-[-2px] hover:shadow-[0_16px_40px_rgba(0,0,0,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1c]"
                                >
                                    <span className="material-symbols-outlined text-base">mail</span>
                                    contact@calvinpfrender.dev
                                </a>
                            </div>
                            <div className="flex flex-row md:flex-col gap-3">
                                <a
                                    href="https://github.com/calv4n"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#1c1c1c] text-[#1c1c1c] text-sm font-semibold bg-white transition hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c1c1c]"
                                >
                                    <span className="material-symbols-outlined text-base">code</span>
                                    GitHub
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/calvin-pfrender-05aaa3274/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0a66c2] text-white text-sm font-semibold transition hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a66c2]"
                                >
                                    <span className="material-symbols-outlined text-base">group</span>
                                    LinkedIn
                                </a>
                            </div>
                        </div>

                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
