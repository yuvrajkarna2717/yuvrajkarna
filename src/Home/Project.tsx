import { useState, useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";
import AnimationTitle from "./AnimationTitle";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
  github?: string;
  live?: string;
  image?: string;
  category: "frontend" | "backend" | "fullstack";
  status: "completed" | "development";
  users?: string;
}

const projects: Project[] = [
  {
    title: "Mora",
    description:
      "A privacy-first Chrome extension that helps users understand their browser usage by tracking exact time spent on different platforms, providing actionable AI-driven productivity insights while keeping data secure.",
    techStack: ["HTML", "CSS", "JavaScript", "Node.js"],
    highlights: [
      "Built a Chrome extension that tracks exact time spent per base URL to give users deep insights into their browsing behavior",
      "Designed the system with a privacy-first approach by storing all user data locally in the browser by default",
      "Implemented optional cloud sync functionality allowing users to securely back up and access their data across devices",
      "Developed AI-powered insights that analyze browsing patterns and suggest ways to improve focus and productivity",
      "Created an intuitive dashboard to visualize time usage, productivity trends, and behavioral patterns",
      "Engineered background scripts and content scripts for accurate time tracking without impacting browser performance",
    ],
    github: "https://github.com/yuvrajkarna2717/mora",
    live: "https://mora.pages.dev",
    category: "fullstack",
    status: "development",
  },

  {
    title: "React Utility Hooks",
    description:
      "An open-source npm package that provides a curated collection of reusable and production-ready React hooks to simplify common frontend development tasks.",
    techStack: ["React", "TypeScript", "JavaScript", "Vitest", "npm"],
    highlights: [
      "Built and published an open-source npm package offering a wide range of reusable React hooks such as useClipboard and other utility hooks",
      "Designed hooks to solve common real-world problems encountered during React application development",
      "Achieved 98% test coverage by writing comprehensive unit tests for all hooks, ensuring reliability and stability",
      "Used modern testing tools to validate edge cases and hook behavior across different scenarios",
      "Authored detailed documentation explaining usage, API contracts, and real-world examples for each hook",
      "Focused on clean APIs and developer experience to make the package easy to adopt and extend",
      "Structured the codebase for scalability, enabling easy addition of new hooks in the future",
    ],
    github: "https://github.com/username/react-utility-hooks",
    live: "https://www.npmjs.com/package/react-utility-hooks",
    category: "frontend",
    status: "completed",
  },
  {
    title: "OpenBooks API",
    description:
      "An open-source backend platform that ingests publicly available book metadata via automated scraping pipelines and exposes it through clean, well-documented REST APIs, focusing on real-world backend system design and scalability.",
    techStack: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Puppeteer",
      "Swagger (OpenAPI)",
      "Vitest",
      "GitHub Actions",
    ],
    highlights: [
      "Designed and built a production-style data ingestion pipeline to scrape and normalize 1,000+ book records from a public demo source",
      "Developed expressive REST APIs supporting pagination, filtering, sorting, and search through a single powerful endpoint",
      "Reduced API surface complexity by replacing ~15 narrow endpoints with one flexible, query-driven endpoint",
      "Implemented rate limiting, CORS handling, and robust error management to protect and stabilize public APIs",
      "Designed relational database schema with indexed fields and managed schema evolution using Knex.js migrations",
      "Integrated Swagger (OpenAPI) for fully interactive, self-documented APIs accessible via browser",
      "Added comprehensive automated tests using Vitest to ensure API correctness and regression safety",
      "Automated periodic data refresh using GitHub Actions, treating ingestion as a background system process",
      "Containerized the application using Docker for consistent local development and future deployment",
      "Structured the codebase with clear separation between ingestion, API, and infrastructure layers",
    ],
    github: "https://github.com/yuvrajkarna2717/openbooks-api",
    category: "backend",
    status: "completed",
  },
  {
    title: "Algorithm Visualizer",
    description:
      "An interactive algorithm visualizer built with React and TypeScript that demonstrates the inner workings of common algorithms through real-time, step-by-step animations for intuitive learning.",
    techStack: ["React", "TypeScript", "HTML", "CSS"],
    highlights: [
      "Built an interactive algorithm visualizer using React and TypeScript for better state management and type safety",
      "Implemented visualizations for 8 core algorithms including multiple sorting algorithms, linear search, and binary search",
      "Designed reusable React components to animate comparisons, swaps, and search steps in real time",
      "Used controlled state updates to clearly illustrate each algorithm step without blocking the UI",
      "Added controls for play, pause, speed adjustment, and reset to enhance the learning experience",
      "Focused on visual clarity and smooth animations to make complex algorithm behavior easy to understand",
      "Structured the project to allow easy addition of new algorithms and visualizations",
    ],
    github: "https://github.com/username/algorithm-visualizer",
    live: "https://algorithm-visualizer-demo.pages.dev",
    category: "frontend",
    status: "completed",
  },
  {
    title: "QuickRev Bot",
    description:
      "A Telegram-based revision assistant that helps users quickly revise any topic by generating comprehensive explanations, subtopics, and all possible question–answer pairs from given text or concepts.",
    techStack: ["Node.js", "Typescript", "Telegram API", "generative AI"],
    highlights: [
      "Built an intelligent Telegram bot that allows users to revise topics directly within the chat interface",
      "Designed the bot to accept topics, subtopics, paragraphs, or raw text as input for flexible usage",
      "Automatically generates detailed explanations along with all possible exam-oriented questions and answers",
      "Optimized the bot for quick revisions, making it useful for last-minute preparation and concept reinforcement",
      "Implemented conversational flows to ensure clear, structured, and easy-to-understand responses",
      "Handled real-time message processing and response generation using Telegram Bot APIs",
    ],
    category: "backend",
    github: "https://github.com/username/quickrev-bot",
    live: "https://t.me/quickrev_bot",
    status: "completed",
  },
];

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [showModal, setShowModal] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showModal]);

  return (
    <>
      {/* ── Row ──────────────────────────────────────────────────────────── */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.title}`}
        className="py-4 -mx-2 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group"
        onClick={() => setShowModal(true)}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowModal(true);
          }
        }}
      >
        {/* Top line: status · title · category · links */}
        <div className="flex items-center justify-between gap-4 mb-1.5">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                project.status === "completed"
                  ? "bg-green-500"
                  : "bg-blue-500 animate-pulse"
              }`}
            />
            <span className="font-semibold text-sm">{project.title}</span>
            <span className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 capitalize">
              {project.category}
            </span>
            {project.users && (
              <span className="hidden sm:inline text-xs text-gray-400 dark:text-gray-500">
                {project.users} users
              </span>
            )}
          </div>
          {/* Wrapper only stops the row's click from bubbling; the interactive
              children (links/button) carry their own semantics. */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            className="flex items-center gap-3 shrink-0"
            onClick={e => e.stopPropagation()}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                Live ↗
              </a>
            )}
            <button
              onClick={e => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              Details →
            </button>
          </div>
        </div>

        {/* Bottom line: description + tech pills */}
        <div className="flex items-center justify-between gap-4 pl-[18px]">
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 flex-1 leading-relaxed">
            {project.description}
          </p>
          <div className="hidden md:flex items-center gap-1.5 shrink-0">
            {project.techStack.slice(0, 3).map(tech => (
              <span
                key={tech}
                className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      {showModal && (
        // Backdrop click dismisses; Escape also closes (see effect above).
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setShowModal(false)}
        >
          {/* Panel stops backdrop clicks from closing the modal. */}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} details`}
            className="bg-white dark:bg-dark-bg w-full sm:rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl rounded-t-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-dark-bg border-b border-gray-100 dark:border-white/10 px-6 py-5 flex items-start justify-between gap-4 rounded-t-2xl">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs ${
                      project.status === "completed"
                        ? "text-green-600 dark:text-green-400"
                        : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        project.status === "completed"
                          ? "bg-green-500"
                          : "bg-blue-500 animate-pulse"
                      }`}
                    />
                    {project.status === "completed"
                      ? "Completed"
                      : "In development"}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">·</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {project.category}
                  </span>
                  {project.users && (
                    <>
                      <span className="text-gray-300 dark:text-gray-600">
                        ·
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {project.users} users
                      </span>
                    </>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                  {project.title}
                </h2>
              </div>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className="shrink-0 p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-6 space-y-7">
              {/* About */}
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description}
              </p>

              {/* Built with */}
              <div>
                <p className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                  Built with
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/15 text-gray-600 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div>
                <p className="text-xs font-mono text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                  Highlights
                </p>
                <ul className="space-y-3 border-l-2 border-gray-100 dark:border-white/10 pl-4">
                  {project.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              {(project.github || project.live) && (
                <div className="flex flex-wrap gap-3 pt-5 border-t border-gray-100 dark:border-white/10">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/20 text-sm font-medium hover:border-gray-400 dark:hover:border-white/40 transition-colors"
                    >
                      GitHub
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                      Live demo
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function Project() {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-dark-bg">
      <div className="max-w-4xl mx-auto px-6">
        <AnimationTitle title="Projects" />
        <p className="text-gray-500 dark:text-gray-400 mt-4 mb-10 text-center max-w-xl mx-auto">
          A selection of things I've built — from open-source tools to
          full-stack products.
        </p>
        <div className="divide-y divide-gray-100 dark:divide-white/10">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
