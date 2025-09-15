import { useState } from "react";

interface Project {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  techStack: string[];
  links: {
    github?: string;
    npm?: string;
    demo?: string;
  };
  stats?: {
    stars?: number;
    downloads?: string;
    forks?: number;
  };
}

interface Contribution {
  project: string;
  projectUrl: string;
  prUrl: string;
  description: string;
  type: "Bug Fix" | "Feature" | "Documentation" | "Refactor";
  isNotable?: boolean;
}

export default function OpenSourceContributions() {
  const [activeTab, setActiveTab] = useState<"projects" | "contributions">(
    "projects"
  );

  const myProjects: Project[] = [
    {
      name: "TrackIt CLI",
      tagline: "Task-tracking CLI tool for developers",
      description:
        "A powerful command-line task management tool built with Node.js",
      features: [
        "Create, update, and delete tasks from terminal",
        "Priority-based task organization",
        "Time tracking and productivity analytics",
      ],
      techStack: ["Node.js", "TypeScript", "Commander.js", "Chalk"],
      links: {
        github: "https://github.com/yourusername/trackit-cli",
        npm: "https://www.npmjs.com/package/trackit-cli",
      },
      stats: {
        downloads: "2.5k+",
        stars: 45,
      },
    },
    {
      name: "React Hook Library",
      tagline: "Collection of custom React hooks for common use cases",
      description:
        "A comprehensive library of reusable React hooks for modern applications",
      features: [
        "20+ production-ready hooks",
        "TypeScript support with full type safety",
        "Zero dependencies, lightweight bundle",
      ],
      techStack: ["React", "TypeScript", "Rollup", "Jest"],
      links: {
        github: "https://github.com/yourusername/react-hooks-lib",
        npm: "https://www.npmjs.com/package/@yourname/react-hooks",
        demo: "https://react-hooks-demo.vercel.app",
      },
      stats: {
        downloads: "1.2k+",
        stars: 78,
        forks: 12,
      },
    },
    {
      name: "Open Math RS",
      tagline: "Rust library for geometry & coordinate calculations",
      description:
        "High-performance mathematical operations library written in Rust",
      features: [
        "Fast geometric calculations and transformations",
        "Coordinate system conversions",
        "Vector and matrix operations",
      ],
      techStack: ["Rust", "Cargo", "Documentation"],
      links: {
        github: "https://github.com/yourusername/open-math-rs",
      },
      stats: {
        stars: 23,
        forks: 5,
      },
    },
    {
      name: "GitWhistle",
      tagline: "GitHub notification bot for teams",
      description:
        "Micro-SaaS tool for managing GitHub notifications and team collaboration",
      features: [
        "Smart notification filtering",
        "Team collaboration features",
        "Integration with popular chat platforms",
      ],
      techStack: ["Node.js", "GitHub API", "MongoDB", "Express"],
      links: {
        github: "https://github.com/yourusername/gitwhistle",
        demo: "https://gitwhistle.dev",
      },
      stats: {
        stars: 15,
      },
    },
  ];

  const contributions: Contribution[] = [
    {
      project: "React Router",
      projectUrl: "https://github.com/remix-run/react-router",
      prUrl: "https://github.com/remix-run/react-router/pull/1234",
      description: "Fixed memory leak in route transition handling",
      type: "Bug Fix",
      isNotable: true,
    },
    {
      project: "Tailwind CSS",
      projectUrl: "https://github.com/tailwindlabs/tailwindcss",
      prUrl: "https://github.com/tailwindlabs/tailwindcss/pull/5678",
      description: "Added new utility classes for backdrop filters",
      type: "Feature",
      isNotable: true,
    },
    {
      project: "Vite",
      projectUrl: "https://github.com/vitejs/vite",
      prUrl: "https://github.com/vitejs/vite/pull/9012",
      description: "Improved TypeScript configuration documentation",
      type: "Documentation",
    },
    {
      project: "shadcn/ui",
      projectUrl: "https://github.com/shadcn/ui",
      prUrl: "https://github.com/shadcn/ui/pull/3456",
      description: "Enhanced accessibility in form components",
      type: "Feature",
      isNotable: true,
    },
    {
      project: "DSA Learning Repository",
      projectUrl: "https://github.com/community/dsa-problems",
      prUrl: "https://github.com/community/dsa-problems/pull/7890",
      description:
        "Added solutions and explanations for 15+ medium-level problems",
      type: "Feature",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Bug Fix":
        return "bg-red-100 text-red-800";
      case "Feature":
        return "bg-green-100 text-green-800";
      case "Documentation":
        return "bg-blue-100 text-blue-800";
      case "Refactor":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="opensource" className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Open Source Contributions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Building tools for developers and contributing to the open source
            community
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1 inline-flex">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-6 py-3 rounded-md font-medium text-sm transition-all ${
                activeTab === "projects"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              My Projects
            </button>
            <button
              onClick={() => setActiveTab("contributions")}
              className={`px-6 py-3 rounded-md font-medium text-sm transition-all ${
                activeTab === "contributions"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              External Contributions
            </button>
          </div>
        </div>

        {/* My Projects Tab */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {myProjects.map((project, index) => (
              <div
                key={index}
                className="bg-white border-2 border-black rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                {/* Project Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-black mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm font-medium">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-black mb-2 uppercase tracking-wider">
                    ▸ Key Features
                  </h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-xs text-gray-700"
                      >
                        <span className="w-1 h-1 bg-black rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                {project.stats && (
                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-600">
                    {project.stats.stars && (
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {project.stats.stars}
                      </div>
                    )}
                    {project.stats.downloads && (
                      <div>📦 {project.stats.downloads} downloads</div>
                    )}
                    {project.stats.forks && (
                      <div>🍴 {project.stats.forks} forks</div>
                    )}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-2">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 bg-black text-white rounded text-xs font-medium hover:bg-gray-800 transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {project.links.npm && (
                    <a
                      href={project.links.npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-black text-black rounded text-xs font-medium hover:bg-black hover:text-white transition-colors"
                    >
                      npm
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-black text-black rounded text-xs font-medium hover:bg-black hover:text-white transition-colors"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* External Contributions Tab */}
        {activeTab === "contributions" && (
          <div className="space-y-6">
            {contributions.map((contribution, index) => (
              <div
                key={index}
                className={`bg-white border rounded-xl p-6 hover:shadow-md transition-shadow ${
                  contribution.isNotable
                    ? "border-black border-2"
                    : "border-gray-200"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-black">
                        {contribution.project}
                      </h3>
                      {contribution.isNotable && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                          Notable
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(
                          contribution.type
                        )}`}
                      >
                        {contribution.type}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">
                      {contribution.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={contribution.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-black text-black rounded text-xs font-medium hover:bg-black hover:text-white transition-colors"
                    >
                      Project
                    </a>
                    <a
                      href={contribution.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 bg-black text-white rounded text-xs font-medium hover:bg-gray-800 transition-colors"
                    >
                      View PR
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* GitHub Profile Link */}
            <div className="text-center mt-8">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                See More on GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
