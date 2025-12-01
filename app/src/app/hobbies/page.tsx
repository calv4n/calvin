import AnimatedContent from "@/components/AnimatedContent";
import { Highlighter } from "@/components/ui/highlighter";

const hobbies = [
    {
        title: "Hiking",
        description: "Exploring the beauty of the Swiss Alps.",
        image: "/images/hobbies/hiking.jpg",
        badge: "Outdoors",
    },
    {
        title: "Nature",
        description: "Enjoying the roots of nature.",
        image: "/images/hobbies/nature.jpg",
        badge: "Focus",
    },
    {
        title: "Martial Arts",
        description: "Expanding my strategic thinking.",
        image: "/images/hobbies/sport.jpg",
        badge: "Sport",
    },
];

export default function Hobbies() {
    return (
        <section id="hobbies" data-nav-theme="dark" className="relative overflow-hidden px-[24px] sm:px-[48px] bg-[#1c1c1c] text-white">
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
                    <div className="min-h-[calc(100vh-96px)] sm:min-h-[70vh] pt-32 sm:pt-32">
                        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
                            <div className="lg:w-[34%] space-y-6">
                                <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-gray-400">
                                    <span className="h-px w-10 bg-white/30" />
                                    hobbies
                                </div>
                                <h1 className="text-5xl font-[Bdogrotesk-Title] font-bold leading-tight">My Life Beyond Work</h1>
                                <p className="text-lg text-gray-300 leading-8">
                                    {/* The same curiosity that drives my code gets channelled into the outdoors, movement, and capturing moments. These are the things that reset my mind and keep my work sharp. */}
                                    My curiosity extends beyond my work — into the outdoors and physical activity. They balance my mind and{" "}
                                    <Highlighter
                                        action="underline"
                                        color="#0038ff"
                                        isView={true}
                                        animationDuration={1400}
                                    >
                                        sharpen my craft.
                                    </Highlighter>
                                    
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 flex-1 w-full">
                                {hobbies.map((hobby) => (
                                    <div
                                        key={hobby.title}
                                        className="group relative h-[320px] sm:h-[360px] overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
                                    >
                                        <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                            style={{ backgroundImage: `url(${hobby.image})` }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />

                                        <div className="absolute top-4 left-4 right-4 rounded-2xl bg-black/35 px-4 py-3 text-sm text-white/90 leading-6 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                                            {hobby.description}
                                        </div>

                                        <div className="relative flex h-full flex-col justify-end p-6 space-y-3">
                                            <h3 className="text-2xl font-semibold leading-tight">{hobby.title}</h3>
                                            <span className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                                                {hobby.badge}
                                            </span>
                                        </div>

                                        <div className="absolute inset-0 rounded-[28px] border border-white/10 opacity-0 transition duration-500 group-hover:opacity-100 group-hover:border-white/30" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </section>
    );
}
