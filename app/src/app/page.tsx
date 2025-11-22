"use client";
import SplitText from "@/components/SplitText";
import Experience from "./experience/page";
import AnimatedContent from "@/components/AnimatedContent";

export default function Home() {
  const splitTextProps = {
    className: "text-8xl md:text-9xl text-center font-[Bdogrotesk] font-[1000]",
    delay: 75,
    duration: 0.5,
    ease: "power3.out" as const,
    splitType: "chars" as const,
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
    threshold: 0.1,
    rootMargin: "-100px",
    textAlign: "center" as const,
  };

  const subtitleText =
    "Swiss developer based near Zurich finishing his apprenticeship.";
  const text = {
    first: "Building and maintaining web applications and internal automations at SIX, focused on clarity, reliability, and best practices.",
    second: "Constantly improving myself, both as a developer and as a person."
  };

  return (
    <>
      <section id="home" className="p-[48px] bg-[#fff9f0]">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col items-start min-h-[calc(100vh-96px)] justify-end pb-48 gap-12">
            <div className="flex flex-col items-start">
              <SplitText text="Calvin" {...splitTextProps} />
              <SplitText text="Pfrender" {...splitTextProps} />
            </div>

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
              <div className="w-full flex flex-col md:flex-row gap-10 md:gap-24">
                <div className="text-3xl font-medium max-w-xl">
                  <p>{subtitleText}</p>
                </div>
                <div className="hidden md:block text-sm text-gray-700 font-medium">
                  <p>{text.first}</p>
                  <br />
                  <p>{text.second}</p>
                </div>
              </div>
            </AnimatedContent>
          </header>
        </div>
      </section>

      <Experience />
    </>
  );
}
