"use client";

import Link from "next/link";
import { useState } from "react";

import { Highlighter } from "@/components/ui/highlighter";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Experience", href: "/#experience" },
    // { name: "About", href: "#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "Ask me", href: "/askme", underline: true },
  ];

  const brandName = "Calvin Pfrender";

  return (
    <nav className="fixed top-0 left-0 w-full p-[24px] sm:p-[32px] z-50 text-white mix-blend-difference">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-sm font-medium tracking-tight">
          <Link href="/#home">{brandName}</Link>
        </div>

        <ul className="hidden md:flex space-x-5 sm:space-x-8">
          {navItems.map(({ name, href, underline }) => (
            <li
              key={name}
              className="text-sm font-medium hover:opacity-80 transition-opacity"
            >
              <Link href={href}>
                {underline ? (
                  <Highlighter action="underline" color="#0038ff" animationDuration={1400}>
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
          className="md:hidden inline-flex flex-col gap-[6px] items-center justify-center h-10 w-10 rounded-full"
        >
          <span
            className={`relative block h-0.5 w-6 bg-white transition-transform duration-300 ${isOpen ? "translate-y-[8px] rotate-45" : ""}`}
          />
          <span
            className={`relative block h-0.5 w-6 bg-white transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`relative block h-0.5 w-6 bg-white transition-transform duration-300 ${isOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"}`}>
        <div className="mt-4 rounded-2xl border border-white/30 bg-white/80 px-4 py-5 backdrop-blur-xl shadow-2xl shadow-black/10 text-black">
          <ul className="flex flex-col space-y-4 text-sm font-medium">
            {navItems.map(({ name, href, underline }) => (
              <li key={name}>
                {underline ? (
                  <Highlighter action="underline" color="#0038ff" animationDuration={1400}>
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 transition hover:bg-black/5"
                    >
                      <span>{name}</span>
                    </Link>
                  </Highlighter>
                ) : (
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 transition hover:bg-black/5"
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
