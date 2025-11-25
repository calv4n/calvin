import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ToolBadge = {
  name: string;
  bg: string;
  tilt: number;
  x: string;
  y: string;
  src: string;
  delay?: number;
};

const tools: ToolBadge[] = [
  { name: "Django", bg: "bg-[#092e20]", tilt: -26, x: "12%", y: "1%", src: "/images/icons/django.png" },
  { name: "Ollama", bg: "bg-white text-black", tilt: 20, x: "24%", y: "-32%", src: "/images/icons/ollama-icon.jpeg" },
  { name: "Docker", bg: "bg-white", tilt: -22, x: "42%", y: "-15%", src: "/images/icons/docker.png" },
  { name: "Kubernetes", bg: "bg-[#326eea]", tilt: 26, x: "49%", y: "22%", src: "/images/icons/kubernetes.jpeg" },
  { name: "Python", bg: "bg-[#F2F4F7] text-black", tilt: -12, x: "66%", y: "-10%", src: "/images/icons/python.png" },
];

export default function FloatingToolIcons() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Move icons upward and add a stronger rotation while scrolling past the strip.
  const translateY = useTransform(scrollYProgress, [0, 1], [130, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-26, 54]);

  return (
    <div
      ref={ref}
      className="relative h-56 w-full overflow-visible pointer-events-none mt-18"
    >
      <div className="absolute inset-0">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.name}
            className="absolute"
            style={{ left: tool.x, top: tool.y, rotate, y: translateY }}
          >
            <motion.div
              className={`relative flex h-[92px] w-[92px] items-center justify-center overflow-hidden rounded-2xl shadow-xl shadow-black/25 ring-2 ring-white/10 text-base font-semibold ${tool.bg}`}
              style={{ rotate: `${tool.tilt}deg` }}
              initial={{ scale: 0.9, opacity: 0.7 }}
              whileInView={{
                scale: 1,
                opacity: 1,
                transition: { delay: 0.05 * index, duration: 0.6 },
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <img
                src={tool.src}
                alt={tool.name}
                className="h-full w-full object-contain p-3"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
