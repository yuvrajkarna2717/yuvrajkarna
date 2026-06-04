import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { BsArrowDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SiHappycow } from "react-icons/si";
import yuvrajDark from "../assets/yuvraj_karna_dark.png";
import yuvrajWhite from "../assets/yuvraj_karna_white.png";
import { useTheme } from "../context/useTheme";

const ROLES = [
  "Software Engineer",
  "Open Source Contributor",
  "Problem Solver",
  "Bug Creator 🐛",
];

export default function Hero() {
  const { theme } = useTheme();
  const yuvrajPhoto = theme === "dark" ? yuvrajDark : yuvrajWhite;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length - 1)),
        40
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex(i => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-black dark:text-white">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-16 items-center py-16 lg:py-20">
        {/* ── Left: Text ───────────────────────────────────────────────── */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          {/* Name + icon */}
          <div className="flex lg:justify-start justify-center gap-4 items-center group mb-1">
            <p className="md:text-5xl sm:text-3xl text-2xl text-gray-600 dark:text-gray-400 font-light">
              Hi, I'm{" "}
              <a
                href="https://www.linkedin.com/in/yuvrajkarna27"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block cursor-pointer"
              >
                <span className="text-black dark:text-white font-semibold">
                  Yuvraj Karna
                </span>
                <span className="absolute left-0 -bottom-1 w-full h-1 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            </p>
            <SiHappycow className="w-10 h-10 md:w-12 md:h-12 shrink-0 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 group-hover:translate-x-2 group-hover:-translate-y-2" />
          </div>

          {/* Typewriter role */}
          <p className="md:text-3xl sm:text-2xl text-xl font-normal mb-5 tracking-widest min-h-[2.5rem]">
            {displayed}
            <span className="animate-blink">|</span>
          </p>

          {/* Tagline */}
          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-8 tracking-wide max-w-lg lg:mx-0 mx-auto">
            I build software that works{" "}
            <span className="text-black dark:text-white font-medium hover:underline hover:cursor-pointer">
              (most of the time)
            </span>{" "}
            — clean, scalable, and user-friendly.
          </p>

          {/* Social links */}
          <div className="flex lg:justify-start justify-center gap-6 text-2xl mb-8">
            <a
              href="https://github.com/yuvrajkarna2717"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/yuvrajkarna"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/iamyuvrajkarna"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com/iamyuvrajkarna"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/yuvrajkarna"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 hover:text-gray-700 dark:hover:text-gray-300 transition"
            >
              <FaTwitter />
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between gap-3r-r-10">
            <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition flex items-center gap-2 text-sm md:text-base">
              <FaEnvelope className="flex-shrink-0" />
              <a href="mailto:yuvrajkarna.code@gmail.com" className="break-all">
                <span className="hidden sm:inline">
                  yuvrajkarna.code@gmail.com
                </span>
                <span className="sm:hidden">Contact Me</span>
              </a>
            </button>

            <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition">
              <a
                href="/resume/YuvrajKarna.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </button>
          </div>
        </div>

        {/* ── Right: Photo ─────────────────────────────────────────────── */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <img
            src={yuvrajPhoto}
            alt="Yuvraj Karna"
            className="w-56 h-72 md:w-64 md:h-80 lg:w-80 lg:h-[460px] object-cover object-top select-none pointer-events-none"
            style={{
              maskImage:
                "radial-gradient(ellipse 85% 90% at 50% 42%, black 28%, rgba(0,0,0,0.6) 55%, transparent 72%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 85% 90% at 50% 42%, black 28%, rgba(0,0,0,0.6) 55%, transparent 72%)",
            }}
          />
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <div className="pb-8 flex flex-col items-center gap-2">
        <Link
          to="/about"
          className="text-black dark:text-white text-sm hover:underline"
        >
          See more about me
        </Link>
        <BsArrowDown className="animate-arrow-bounce text-2xl text-black dark:text-white" />
      </div>
    </section>
  );
}
