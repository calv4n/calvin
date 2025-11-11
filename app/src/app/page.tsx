"use client";
import SplitText from "@/components/SplitText";

export default function Home() {
  const splitTextProps = {
    className: "text-9xl text-center font-[Bdogrotesk] font-[1000]",
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
    "I am a full-stack developer interested in creating websites and other random tools on the internet.";

  const text = {
    first: "With a passion for modern web technologies, I've had the privilege of building robust web apps and creating delightful user experiences.",
    second: "I am constantly exploring new tools and techniques to enhance my skills and deliver high-quality solutions."
  };

  return (
    <div className="flex flex-col min-h-screen items-start justify-center bg-red-300 gap-12">
      <div className="flex flex-col items-start">
        <SplitText text="Calvin" {...splitTextProps} />
        <SplitText text="Pfrender" {...splitTextProps} />
      </div>
      <div className="w-full flex flex-row gap-24">
        <div className="text-3xl font-medium max-w-xl">
          <p>{subtitleText}</p>
        </div>
        <div className="text-sm text-gray-700 font-medium">
          <p>{text.first}</p>
          <br/>
          <p>{text.second}</p>
        </div>
      </div>
    </div>
  );
}
