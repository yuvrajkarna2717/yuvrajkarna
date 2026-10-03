import { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import { BsArrowDown } from "react-icons/bs";
import { SiHappycow } from "react-icons/si";
import { CONTACT, mailto, SOCIAL_LINKS } from "../lib/contact";

const ROLES = [
  "Software Engineer",
  "Open Source Contributor",
  "Problem Solver",
  "Bug Creator 🐛",
];

// Map each social platform to its icon. Labels come from the shared
// SOCIAL_LINKS source so hrefs and accessible names never drift.
const SOCIAL_ICONS: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedin,
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  "Twitter / X": FaTwitter,
};

// Lightweight at-a-glance stats. These are static highlights (not the live
// figures) so the hero stays fast and never shows a loading state.
const QUICK_STATS = [
  { value: "3+", label: "Years building" },
  { value: "1000+", label: "DSA problems" },
  { value: "OSS", label: "Contributor" },
];

export default function Hero() {
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
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-black dark:text-white overflow-hidden">
      {/* Soft radial accent behind the content to fill the space the
          portrait used to occupy, without competing with the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[42rem] h-[42rem] max-w-[90vw] rounded-full bg-gradient-to-tr from-gray-200/50 via-transparent to-gray-300/40 dark:from-white/5 dark:via-transparent dark:to-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 w-full flex flex-col items-center text-center py-16 lg:py-20">
        {/* Availability status pill */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-green-200 dark:border-green-500/20 bg-green-50 dark:bg-green-500/10">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-700 dark:text-green-400">
            Building real-time AI products at Iquadra · open to collaborations
          </span>
        </div>

        {/* Name + icon */}
        <div className="flex justify-center gap-4 items-center group mb-1">
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
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed mb-8 tracking-wide max-w-lg mx-auto">
          I build clean, scalable software — from{" "}
          <span className="text-black dark:text-white font-medium">
            real-time AI products
          </span>{" "}
          to open-source tools developers actually use.
        </p>

        {/* Quick stats */}
        <div className="flex items-center justify-center divide-x divide-gray-200 dark:divide-white/10 mb-8">
          {QUICK_STATS.map(stat => (
            <div key={stat.label} className="px-5 sm:px-7">
              <p className="text-2xl md:text-3xl font-bold font-mono tabular-nums">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-6 text-2xl mb-8">
          {SOCIAL_LINKS.map(({ label, href }) => {
            const Icon = SOCIAL_ICONS[label];
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="hover:scale-110 hover:text-gray-700 dark:hover:text-gray-300 transition"
              >
                <Icon aria-hidden="true" />
              </a>
            );
          })}
        </div>

        {/* Action buttons — Resume is the primary CTA, Contact is secondary */}
        <div className="flex justify-center flex-wrap gap-4">
          <a
            href={CONTACT.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black dark:bg-white text-white dark:text-black px-7 py-2.5 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition"
          >
            View Resume
          </a>

          <a
            href={mailto}
            className="border border-gray-300 dark:border-white/25 px-6 py-2.5 rounded-full font-medium hover:border-gray-500 dark:hover:border-white/50 transition flex items-center gap-2"
          >
            <FaEnvelope className="flex-shrink-0" aria-hidden="true" />
            Get in touch
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────────────── */}
      <div className="relative z-10 pb-8 flex flex-col items-center gap-2">
        <a
          href="#about"
          className="text-black dark:text-white text-sm hover:underline"
        >
          See more about me
        </a>
        <BsArrowDown className="animate-arrow-bounce text-2xl text-black dark:text-white" />
      </div>
    </section>
  );
}
