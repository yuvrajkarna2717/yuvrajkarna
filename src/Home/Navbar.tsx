import { useState } from "react";
import flower from "../assets/flower.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About Me", to: "#about" },
    { name: "Projects", to: "#projects" },
    { name: "Experience", to: "#experience" },
    { name: "Story", to: "/story" },
    { name: "Open Source Contributions", to: "#opensource" },
  ];

  return (
    <nav id="home" className="w-full md:px-[10rem] px-6 py-10 text-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <img src={flower} alt="flower" className="w-10 h-10" />

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8">
          {navItems.map(item => (
            <li key={item.to}>
              <a
                href={item.to}
                onClick={() => setIsOpen(false)}
                className="block text-black transition-all duration-200 transform hover:underline hover:translate-x-2 hover:scale-110"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-2xl z-50"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden fixed top-20 left-0 w-full bg-white text-black z-[9999] shadow-md py-4 px-10 space-y-4">
          {navItems.map(item => (
            <li key={item.to}>
              <a
                href={item.to}
                onClick={() => setIsOpen(false)}
                className="block text-black transition-all duration-200 transform hover:underline hover:translate-x-2 hover:scale-110"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
