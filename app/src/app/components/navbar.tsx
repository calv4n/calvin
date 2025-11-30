"use client";

import Link from "next/link";

import { Highlighter } from "@/components/ui/highlighter";

export default function Navbar() {
  const navItems = [
    { name: "Experience", href: "/#experience" },
    // { name: "About", href: "#about" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "Ask me", href: "/askme", underline: true },
  ];

  const brandName = "Calvin Pfrender";

  return (
    <nav className="fixed top-0 left-0 w-full p-[32px] sm:p-[48px] z-50 text-white mix-blend-difference">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <ul className="flex space-x-5 sm:space-x-8">
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
        <div className="hidden md:block text-sm font-medium">
          <Link href="/#home">{brandName}</Link>
        </div>
      </div>
    </nav>
  );
}