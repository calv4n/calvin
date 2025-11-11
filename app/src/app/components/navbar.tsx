import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
    { name: "Calvin Pfrender", href: "#" },
  ];


  return (
    <>
      <nav className="fixed top-0 w-full h-32 flex items-center justify-center px-10 z-50">
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link className="text-black " href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}