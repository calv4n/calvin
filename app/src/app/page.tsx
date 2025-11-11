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

  const subTitleProps = {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat.",
  }

  const textProps = {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-red-300">
      <div className="flex flex-col items-start justify-center">
        <SplitText text="Calvin" {...splitTextProps} />
        <SplitText text="Pfrender" {...splitTextProps} />
      </div>
      <div>
        <div>
          <p>
            
          </p>
        </div>
      </div>
    </div>
  );
}
