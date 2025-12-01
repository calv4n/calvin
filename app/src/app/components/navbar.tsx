"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { Highlighter } from "@/components/ui/highlighter";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<"light" | "dark">(() => {
    if (!pathname) return "light";
    if (pathname.startsWith("/projects") || pathname.startsWith("/experience")) return "dark";
    return "light";
  });

  const navItems = [
    { name: "Experience", href: "/#experience" },
    // { name: "About", href: "#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "Ask me", href: "/askme", underline: true },
  ];

  const brandName = "Calvin Pfrender";

  useLayoutEffect(() => {
    const themedSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]")
    );

    if (!themedSections.length) {
      setNavTheme("light");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topSection = visible[0]?.target as HTMLElement | undefined;
        const theme = topSection?.dataset.navTheme;

        if (theme === "dark" || theme === "light") {
          setNavTheme(theme);
        }
      },
      {
        threshold: [0.15, 0.35, 0.5, 0.75],
        rootMargin: "-15% 0px -35% 0px",
      }
    );

    themedSections.forEach((section) => observer.observe(section));

    const markerY = window.innerHeight * 0.2;
    const initial = themedSections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= markerY && rect.bottom >= markerY;
    });
    const initialTheme = initial?.dataset.navTheme;
    if (initialTheme === "dark" || initialTheme === "light") {
      setNavTheme(initialTheme);
    }

    return () => observer.disconnect();
  }, [pathname]);

  const isDark = navTheme === "dark";
  const textClass = isDark ? "text-white" : "text-[#0f0f0f]";
  const lineClass = isDark ? "bg-white" : "bg-[#0f0f0f]";
  const underlineColor = isDark ? "#0038ff" : "#ffc700";

  return (
    <nav
      className={`fixed top-0 left-0 w-full p-[24px] sm:p-[32px] z-50 bg-transparent backdrop-blur-md border-b border-transparent transition-colors duration-300 ${textClass}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className={`text-sm font-bold sm:font-medium tracking-tight ${textClass}`}>
          <Link href="/#home">{brandName}</Link>
        </div>

        <ul className="hidden md:flex space-x-5 sm:space-x-8">
          {navItems.map(({ name, href, underline }) => (
            <li
              key={name}
              className={`text-sm font-medium hover:opacity-80 transition-opacity ${textClass}`}
            >
              <Link href={href}>
                {underline ? (
                  <Highlighter action="underline" color={underlineColor} animationDuration={1400}>
                    {name}
                  </Highlighter>
                ) : (
                  name
                )}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          className={`md:hidden inline-flex flex-col gap-[6px] items-center justify-center h-10 w-10 rounded-full ${textClass}`}
        >
          <span
            className={`relative block h-0.5 w-6 transition-transform duration-300 ${lineClass} ${isOpen ? "translate-y-[8px] rotate-45" : ""}`}
          />
          <span
            className={`relative block h-0.5 w-6 transition-opacity duration-300 ${lineClass} ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`relative block h-0.5 w-6 transition-transform duration-300 ${lineClass} ${isOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"}`}>
        <div className={`mt-4 px-4 py-5 font-[Bdogrotesk-Title] text-bold ${textClass}`}>
          <ul className="flex flex-col space-y-2 text-lg">
            {navItems.map(({ name, href, underline }) => (
              <li key={name}>
                {underline ? (
                  <Highlighter action="underline" color={underlineColor} animationDuration={1400}>
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center justify-between rounded-lg px-1 py-2 transition hover:bg-black/5"
                    >
                      <span>{name}</span>
                    </Link>
                  </Highlighter>
                ) : (
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-between rounded-lg px-1 py-2 transition hover:bg-black/5"
                  >
                    <span>{name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
