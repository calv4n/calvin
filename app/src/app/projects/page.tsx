import AnimatedContent from "@/components/AnimatedContent";
import { Highlighter } from "@/components/ui/highlighter";
import { LatestRepositories } from "./LatestRepositories";

export default function Projects() {
    return (
        <section id="projects" data-nav-theme="dark" className="px-[24px] sm:px-[48px] bg-[#1c1c1c] text-white">
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
                        <h1 className="text-5xl font-[Bdogrotesk-Title] font-bold mb-8">Projects</h1>
                        <div className="h-[400px]">
                            <div className="mt-8  text-xl font-medium mb-12">
                                More Projects coming soon... 💫
                            </div>
                        </div>
                        <div>
                            <Highlighter
                                action="underline"
                                color="#0038ff"
                                isView={true}
                                animationDuration={1400}
                            >
                                <h2 className="text-xl font-medium mb-1">My Latest Repositories</h2>
                            </Highlighter>
                            <div className="mt-8">
                                <LatestRepositories />
                            </div>
                        </div>

                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
