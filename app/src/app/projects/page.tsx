import AnimatedContent from "@/components/AnimatedContent";
import { Highlighter } from "@/components/ui/highlighter";
import { LatestRepositories } from "./LatestRepositories";

async function ask(question: string) {
  const res = await fetch("http://localhost:8000/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question }),
  });
  const data = await res.json();
  return data.answer as string;
}


export default function Projects() {
    return (
        <section id="projects" className="p-[48px] bg-[#1c1c1c] text-white pt-24">
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
                        <h1 className="text-5xl font-bold mb-8">Projects</h1>
                        <Highlighter
                            action="underline"
                            color="#0038ff"
                        >
                            <h2 className="text-xl font-medium mb-1">My Latest Repositories</h2>
                        </Highlighter>
                        <div className="mt-8">
                            <LatestRepositories />
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
