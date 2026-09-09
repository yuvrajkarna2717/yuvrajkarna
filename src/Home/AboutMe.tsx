import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react";

const INTERESTS = [
  "Full-Stack Dev",
  "Open Source",
  "System Design",
  "DSA / LeetCode",
  "Real-time Apps",
  "AI Integrations",
  "Coffee & Code ☕",
];

function CopyableRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="flex items-center justify-between py-4 group">
      <div className="flex items-center gap-3">
        <span className="text-gray-400 dark:text-gray-500">{icon}</span>
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-0.5">
            {label}
          </p>
          {href ? (
            <a
              href={href}
              className="text-sm font-medium text-gray-800 dark:text-gray-100 hover:underline"
            >
              {value}
            </a>
          ) : (
            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
              {value}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 dark:text-gray-500"
        title="Copy"
      >
        {copied ? (
          <Check size={14} className="text-green-500" />
        ) : (
          <Copy size={14} />
        )}
      </button>
    </div>
  );
}

export function AboutMe() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="w-full py-16 md:py-24 px-4 sm:px-6 bg-white dark:bg-dark-bg text-gray-800 dark:text-gray-100"
    >
      <div
        className={`max-w-4xl mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Section label */}
        <p className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
          About Me
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">
          A bit about who I am.
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left — Bio */}
          <div className="lg:col-span-3 space-y-5 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              Hey, I'm{" "}
              <span className="font-semibold text-black dark:text-white">
                Yuvraj Karna
              </span>{" "}
              — a Software Engineer based in India who enjoys building products
              that live at the intersection of{" "}
              <span className="text-black dark:text-white font-medium">
                performance, usability, and clean architecture
              </span>
              .
            </p>
            <p>
              I work across the full stack — React on the front, Python, Node.js
              & Redis on the back, and everything in between. I'm currently
              building real-time AI products at{" "}
              <span className="text-black dark:text-white font-medium">
                Iquadra
              </span>
              , where I work on iQua.ai, PNN, and Dhanvv.ai.
            </p>
            <p>
              Outside of work, I contribute to open source, grind DSA on
              LeetCode, and occasionally write about things I learn the hard
              way. I care deeply about developer experience — both for the
              people using what I build and for myself writing it.
            </p>

            {/* Interest tags */}
            <div className="pt-2 flex flex-wrap gap-2">
              {INTERESTS.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Contact */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-6 divide-y divide-gray-100 dark:divide-white/10">
              <CopyableRow
                icon={<Mail size={16} />}
                label="Email"
                value="yuvrajkarna.code@gmail.com"
                href="mailto:yuvrajkarna.code@gmail.com"
              />
              <CopyableRow
                icon={<Phone size={16} />}
                label="Phone"
                value="+91 7700833277"
                href="tel:+917700833277"
              />
              <CopyableRow
                icon={<MapPin size={16} />}
                label="Location"
                value="India — Remote-ready"
              />
            </div>

            {/* Open-to-work badge */}
            <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <p className="text-xs text-green-700 dark:text-green-400 font-medium">
                Open to interesting roles & collaborations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
