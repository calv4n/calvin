import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { name: "About", href: "experience" },
    { name: "Experiece", href: "projects" },
    { name: "Contact", href: "contact" },
  ];

  const brandName = "Calvin Pfrender";

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-[48px] ">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <ul className="flex space-x-8">
          {navItems.map(({ name, href }) => (
            <li
              key={name} 
              className='text-sm font-medium hover:text-gray-600'
            >
              <Link href={`#${href}`}>
                {name}
              </Link> 
            </li>
          ))}
          </ul>
        
          <div className='hidden md:block text-sm font-medium'>
            <Link href="#">
              {brandName}
            </Link>
          </div>
        </div>
        
      </nav>
    </>
  );
}