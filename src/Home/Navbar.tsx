import { useState } from "react";
import { Link } from "react-router-dom";
import flower from "../assets/flower.svg";
import ThemeToggle from "../components/ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "About Me", to: "#about" },
    { name: "Projects", to: "#projects" },
    { name: "Experience", to: "#experience" },
    { name: "Blog", to: "/blog" },
    { name: "My Story", to: "/story" },
    { name: "Uses", to: "/uses" },
    { name: "Open Source", to: "#opensource" },
  ];

  return (
    <nav
      id="home"
      className="w-full px-4 sm:px-6 py-6 sm:py-8 text-black dark:text-white"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <img
          src={flower}
          alt="Yuvraj Karna logo"
          className="w-10 h-10 dark:invert"
        />

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 items-center">
          {navItems.map(item => (
            <li key={item.to}>
              {item.to.startsWith("/") ? (
                <Link
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block text-black dark:text-white transition-all duration-200 transform hover:underline hover:translate-x-2 hover:scale-110"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  href={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block text-black dark:text-white transition-all duration-200 transform hover:underline hover:translate-x-2 hover:scale-110"
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>

        <div className="flex items-center gap-3 md:hidden">
          {/* Theme toggle on mobile */}
          <ThemeToggle />
          {/* Mobile Menu Toggle Button */}
          <button
            className="text-2xl z-50"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true">☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul
          id="mobile-menu"
          className="md:hidden fixed top-16 sm:top-20 left-0 w-full bg-white dark:bg-dark-bg text-black dark:text-white z-[9999] shadow-md dark:shadow-white/5 py-4 px-6 space-y-4"
        >
          {navItems.map(item => (
            <li key={item.to}>
              {item.to.startsWith("/") ? (
                <Link
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block text-black dark:text-white transition-all duration-200 transform hover:underline hover:translate-x-2 hover:scale-110"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  href={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block text-black dark:text-white transition-all duration-200 transform hover:underline hover:translate-x-2 hover:scale-110"
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
