"use client";
import SplitText from "@/components/SplitText";
import Experience from "./experience/page";
import Projects from "./projects/page";
import Contact from "./contact/page";
import AnimatedContent from "@/components/AnimatedContent";
import { Highlighter } from "@/components/ui/highlighter";

export default function Home() {
  const splitTextProps = {
    className: "text-7xl sm:text-8xl md:text-9xl text-center font-[Bdogrotesk] font-[1000]",
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
    "Swiss software developer based near Zurich finishing his apprenticeship.";
  const textFirst =
    "Building and maintaining web applications and internal automations at SIX, focused on clarity, reliability, and best practices.";

  return (
    <>
      <section id="home" data-nav-theme="light" className="p-[24px] sm:p-[48px] bg-[#fff9f0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-start min-h-[calc(100vh-48px)] sm:min-h-[calc(100vh-96px)] justify-end pb-32 pt-16 gap-6 md:gap-12">
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
              <div className="w-[75%] flex flex-col md:flex-row gap-3 md:gap-14">
                <div className="text-xl sm:text-2xl md:text-3xl font-medium max-w-xl">
                  <p>{subtitleText}</p>
                </div>
                <div className=" text-sm text-gray-700 font-medium hidden sm:block">
                  <p>{textFirst}</p>
                  <br />
                  <p>
                    Constantly{" "}
                    <Highlighter action="highlight" color="#ffc700" animationDuration={1400} isView={true}>
                      improving
                    </Highlighter>{" "}
                    myself, both as a developer and as a person.
                  </p>
                </div>
                <div>
                  <p className="block sm:hidden py-4 text-gray-700 opacity-50">WORKING @ SIX GROUP</p>
                  <a 
                    href="#experience"
                    className="block sm:hidden text-white Bdogrotesk-Title bg-[#1c1c1c] p-4.5 rounded-4xl w-40 text-center font-semibold "
                    >
                      About Me 
                      <p 
                        className="material-symbols-outlined rotate-180 align-middle ml-2 inline-block">
                          arrow_insert
                      </p>
                  </a>
                </div>
              </div>
            </AnimatedContent>
          </div>
          <a href="#experience" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-700 opacity-50 text-xs uppercase tracking-[0.2em]">scroll</a>
        </div>
      </section>

      <Experience />
      <Projects />
      <Contact />
    </>
  );
}
