import { useState, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  SiReact,
  SiRedux,
  SiBootstrap,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiSocketdotio,
  SiRedis,
} from "react-icons/si";
import AnimationTitle from "./AnimationTitle";

interface Experience {
  company: string;
  duration: string;
  position: string;
  products: Product[];
}

interface Product {
  name: string;
  role: string;
  duration: string;
  techStack: string[];
  description: string;
  highlights: string[];
  users?: string;
  link?: string;
  status?: "completed" | "in-progress";
}

// ── Tech icon map ──────────────────────────────────────────────────────────────
const techIconMap: Record<string, React.ReactNode> = {
  react: <SiReact className="w-3 h-3" />,
  redux: <SiRedux className="w-3 h-3" />,
  bootstrap: <SiBootstrap className="w-3 h-3" />,
  node: <SiNodedotjs className="w-3 h-3" />,
  mongo: <SiMongodb className="w-3 h-3" />,
  tailwind: <SiTailwindcss className="w-3 h-3" />,
  socket: <SiSocketdotio className="w-3 h-3" />,
  redis: <SiRedis className="w-3 h-3" />,
};

function getTechIcon(tech: string): React.ReactNode | null {
  const key = tech.toLowerCase();
  for (const [k, icon] of Object.entries(techIconMap)) {
    if (key.includes(k)) return icon;
  }
  return null;
}

const experiences: Experience[] = [
  {
    company: "Iquadra Information Services LLC",
    duration: "June 2024 – Present",
    position: "Software Engineer Intern → Full-time Employee",
    products: [
      {
        name: "iQua.ai",
        role: "Frontend Developer · Intern",
        duration: "June 2024 – April 2025",
        techStack: [
          "React.js",
          "Redux Toolkit",
          "Bootstrap",
          "Debugging",
          "API Integration",
        ],
        description:
          "A cutting-edge AI-powered Interview platform revolutionizing the hiring process with intelligent interview methods and real-time metrics.",
        highlights: [
          "Built a dynamic test dashboard with real-time monitoring and fixed 50+ major bugs to improve stability.",
          "Removed redundant APIs and refactored 1000+ Redux lines into a cleaner 100-line structure, improving speed and maintainability.",
          "Designed and built the SME (Subject Matter Expert) system, enabling users to schedule sessions and join video calls.",
        ],
        link: "https://iqua.ai",
        status: "completed",
        users: "10K+",
      },
      {
        name: "PNN",
        role: "Frontend Developer · Intern",
        duration: "May 2025 – Present",
        techStack: [
          "React.js",
          "Redux Toolkit",
          "TailwindCSS",
          "WebRTC",
          "Payment Integration",
          "UI/UX Design",
        ],
        description:
          "A comprehensive news platform MVP with WebRTC-based video/audio recording capabilities, real-time transcription, and enhanced user engagement features.",
        highlights: [
          "Designed system architecture (HLD/LLD) and built a WebRTC-based video/audio recorder with real-time transcription.",
          "Solely developed the entire frontend, including responsive UIs, payment pages, dark/light themes, and performance optimizations.",
          "Reduced bundle size by 1.3 MB through optimization techniques and integrated multiple APIs for seamless functionality.",
        ],
        link: "https://main.d1pz2go0m9b7yl.amplifyapp.com/",
        status: "in-progress",
      },
      {
        name: "Dhanvv.ai",
        role: "Full Stack Developer · Full-time",
        duration: "August 2025 – Present",
        techStack: [
          "React.js",
          "Node.js",
          "MongoDB",
          "Langchain.js",
          "WebSocket",
          "Socket.io",
          "Redis",
          "CI/CD",
        ],
        description:
          "An AI-powered healthcare assistant that understands user urgency and health conditions, connecting them with the right healthcare professionals through intelligent symptom analysis and video consultations.",
        highlights: [
          "Developed an intelligent health agent using Langchain.js that analyzes user symptoms and health conditions to provide personalized medical guidance.",
          "Built real-time video consultation system with WebRTC, enabling patients to connect with doctors for urgent medical consultations.",
          "Implemented WebSocket and Socket.io for real-time communication between patients, AI agent, and healthcare providers.",
          "Created a super admin dashboard to control access and manage multiple portals including medicine and laboratory portals.",
          "Designed symptom-based doctor matching algorithm that connects patients with specialists based on their specific health conditions.",
          "Integrated Redis for efficient session management and real-time data caching across the healthcare platform.",
        ],
        link: "https://dhanvv-web.onrender.com/",
        status: "in-progress",
      },
    ],
  },
];

// ── ProductCard ───────────────────────────────────────────────────────────────
const ProductCard: React.FC<{ product: Product; index: number }> = ({
  product,
  index,
}) => {
  const [expanded, setExpanded] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const isLive = product.status === "completed";

  return (
    <div className="group p-5 sm:p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all duration-200 hover:-translate-y-0.5">
      {/* ── Header row ──────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 mb-1">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-xs font-mono text-gray-400 dark:text-gray-500 shrink-0">
            0{index + 1}
          </span>
          <h4 className="font-bold text-base leading-tight truncate">
            {product.name}
          </h4>
          {/* Status indicator */}
          <span
            className={`shrink-0 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
              isLive
                ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400"
                : "bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isLive ? "bg-green-500" : "bg-blue-500 animate-pulse"}`}
            />
            {isLive ? "Live" : "Active"}
          </span>
          {product.users && (
            <span className="shrink-0 hidden sm:inline-flex text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400">
              {product.users} users
            </span>
          )}
        </div>

        {/* External link */}
        {product.link && (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            aria-label={`Visit ${product.name}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* ── Role + duration ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-4 pl-7">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {product.role}
        </span>
        <span className="text-gray-300 dark:text-gray-600">·</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {product.duration}
        </span>
      </div>

      {/* ── Description ─────────────────────────────────────────────────── */}
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        {product.description}
      </p>

      {/* ── Tech stack ──────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {product.techStack.map(tech => {
          const icon = getTechIcon(tech);
          return (
            <span
              key={tech}
              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
            >
              {icon && <span className="opacity-70">{icon}</span>}
              {tech}
            </span>
          );
        })}
      </div>

      {/* ── Expandable highlights ────────────────────────────────────────── */}
      <button
        onClick={() => setExpanded(v => !v)}
        className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-1"
      >
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        {expanded ? "Hide highlights" : "Show highlights"}
      </button>

      <div
        ref={detailsRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: expanded ? detailsRef.current?.scrollHeight : 0 }}
      >
        <ul className="mt-3 space-y-2 pl-4 border-l-2 border-gray-200 dark:border-white/10">
          {product.highlights.map((h, i) => (
            <li
              key={i}
              className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed"
            >
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ── ExperienceCard ────────────────────────────────────────────────────────────
const ExperienceCard: React.FC<{ experience: Experience }> = ({
  experience,
}) => {
  return (
    <div>
      {/* Company header */}
      <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-0.5">
              {experience.company}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {experience.position}
            </p>
          </div>
          <div className="flex items-center gap-3 sm:text-right shrink-0">
            <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-white dark:bg-white/10 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 whitespace-nowrap">
              {experience.duration}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {experience.products.length} products
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative pl-6 sm:pl-8">
        {/* Vertical line */}
        <div className="absolute left-2.5 sm:left-3 top-3 bottom-3 w-px bg-gray-200 dark:bg-white/10" />

        <div className="space-y-5">
          {experience.products.map((product, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[1.35rem] sm:-left-[1.6rem] top-5 w-2.5 h-2.5 rounded-full bg-white dark:bg-dark-bg border-2 border-gray-400 dark:border-white/40 z-10" />
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <blockquote className="text-2xl md:text-3xl italic text-gray-600 dark:text-gray-300 font-light mb-3 leading-relaxed">
            "The only source of knowledge is experience."
          </blockquote>
          <cite className="block text-sm text-gray-400 dark:text-gray-500 mb-10">
            — Albert Einstein
          </cite>
          <AnimationTitle title="Experience" />
          <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
            Products I've built and shipped, and what I learned along the way.
          </p>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} experience={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
