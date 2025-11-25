import { useState } from "react";
import { icons } from "./Icons";

interface Project {
  title: string;
  description: string;
  techStack: string[];
  highlights: string[];
  github: string;
  live: string;
  image: string;
  category: "frontend" | "backend" | "fullstack";
}

// Modern ProjectCard component
const ProjectCard = ({ project }: { project: Project }) => {
  const [expanded, setExpanded] = useState(false);

  // Function to get icon component by tech name
  const getIconByTech = (techName: string) => {
    const lowerCaseTech = techName.toLowerCase();
    if (lowerCaseTech.includes("react")) return icons.react;
    if (lowerCaseTech.includes("javascript")) return icons.javascript;
    if (lowerCaseTech.includes("typescript")) return icons.typescript;
    if (lowerCaseTech.includes("tailwind")) return icons.tailwind;
    if (lowerCaseTech.includes("node")) return icons.node;
    if (lowerCaseTech.includes("mongo")) return icons.mongodb;
    if (lowerCaseTech.includes("redis")) return icons.redis;
    if (lowerCaseTech.includes("express")) return icons.express;
    if (lowerCaseTech.includes("puppeteer")) return icons.puppeteer;
    if (lowerCaseTech.includes("jest")) return icons.jest;
    if (lowerCaseTech.includes("npm")) return icons.npm;
    if (lowerCaseTech.includes("vitest")) return icons.vitest;
    return null;
  };

  return (
    <div className="mb-16 group">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
        <div className="flex flex-col md:flex-row">
          {/* Project Content */}
          <div className="md:w-full p-6 md:p-8">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-5">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center bg-gray-100 px-3 py-1 rounded-full group-hover:bg-gray-200 transition-colors"
                    >
                      {getIconByTech(tech) && (
                        <div className="w-6 h-6 mr-1 text-black rounded-full">
                          {getIconByTech(tech)}
                        </div>
                      )}
                      <span className="text-xs font-medium text-gray-700">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project highlights - conditionally rendered */}
              <div className="mt-4">
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-sm font-medium text-gray-700 flex items-center mb-4 hover:text-black"
                >
                  {expanded ? "Hide details" : "Show details"}
                  <svg
                    className={`ml-1 w-4 h-4 transition-transform ${
                      expanded ? "rotate-180" : ""
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {expanded && (
                  <div className="space-y-3 text-gray-600 text-sm my-4 pl-4 border-l-2 border-gray-200 animate-fadeIn">
                    {project.highlights.map((highlight, idx) => (
                      <p key={idx}>{highlight}</p>
                    ))}
                  </div>
                )}

                {/* Project links */}
                <div className="flex gap-4 mt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border-2 border-black rounded-md text-sm font-bold text-black hover:bg-black hover:text-white transition-all duration-300"
                  >
                    <div className="w-4 h-4 mr-2">{icons.github}</div>
                    GitHub
                  </a>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-black border-2 border-black rounded-md text-sm font-bold text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                      <div className="w-4 h-4 mr-2">{icons.link}</div>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Project() {
  // State for filtering projects
  const [filter, setFilter] = useState<
    "all" | "frontend" | "backend" | "fullstack"
  >("all");

  const projects: Project[] = [
    {
      title: "React-hook-granth",
      description:
        "A powerful NPM package with 15+ reusable custom React hooks, designed to minimize boilerplate and maximize developer productivity.",
      techStack: ["React.js", "JavaScript", "NPM", "Vitest", "Jest"],
      highlights: [
        "When building React applications, I noticed a recurring pattern: writing custom hooks for commonly needed functionality often felt repetitive and time-consuming. That's when I decided to create an NPM package, react-hook-granth, to help developers like myself avoid redundant code and focus on building meaningful features.",
        "This package offers 15+ reusable, customizable React hooks designed to save you time and reduce boilerplate. Whether you need to manage local storage, handle API calls, or set up timers, these hooks have you covered!",
        "To ensure maximum reliability and maintainability, I pushed for 100% test coverage using Vitest. With this, you can trust that every hook is well-tested and ready for production use. The package is also modular, which means you can import only the hooks you need, keeping your codebase clean and efficient.",
      ],
      github: "https://github.com/yuvrajkarna2717/react-hook-granth",
      live: "https://npmjs.com/package/react-hook-granth",
      image: "/images/react-hook-granth.png",
      category: "frontend",
    },
    {
      title: "Visualizer",
      description:
        "An interactive platform for learning and visualizing sorting algorithms through real-time animations.",
      techStack: [
        "TypeScript",
        "React.js",
        "TailwindCSS",
        "Node.js",
        "Express.js",
        "MongoDB",
      ],
      highlights: [
        "Learning algorithms can often feel abstract and theoretical, especially when it comes to sorting algorithms. That's why I decided to build an interactive sorting visualizer to help developers and students better grasp these concepts through real-time animations.",
        "Using TypeScript, React.js, and TailwindCSS, I created a user-friendly platform that lets you visualize how sorting algorithms like Bubble Sort, Merge Sort, and Quick Sort work in real time. Instead of reading dry descriptions, users can now watch the algorithms in action, which makes understanding complex algorithms much easier.",
      ],
      github: "https://github.com/yuvrajkarna2717/Sorting_Visualizer",
      live: "https://visualizer-live-link.com",
      image: "/path/to/visualizer.png",
      category: "fullstack",
    },
    {
      title: "ScrapeBackend-API",
      description:
        "A high-performance web scraping API built with Node.js and Puppeteer, optimized with Redis caching.",
      techStack: ["Node.js", "Puppeteer", "Express.js", "MongoDB", "Redis"],
      highlights: [
        "While working with large-scale data scraping tasks, I encountered a major bottleneck: slow response times when fetching data from multiple websites. To solve this, I built a powerful web scraping API that can handle 1000+ scraping tasks daily with significantly improved speed and reliability.",
        "By integrating Redis caching into the API, I managed to achieve 40% faster response times, while also reducing database load by 30%. This caching system ensures that repeated requests don't overwhelm the database, making the API more scalable and efficient.",
        "Moreover, I implemented rate-limiting middleware to prevent abuse of the scraping routes and maintain system performance.",
      ],
      github: "https://github.com/yuvrajkarna2717/ScrapeBackend-API",
      live: "",
      image: "/images/scrape-backend.png",
      category: "backend",
    },
    {
      title: "ExpressIt (Blog App)",
      description:
        "A real-time blog platform enabling media uploads, comments, likes, and upvotes for a seamless user experience.",
      techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Redis"],
      highlights: [
        "Creating a platform where people can engage, share ideas, and build a community is no small feat. That's why I set out to build a community platform that would not only enable users to connect but also offer a seamless, interactive experience.",
        "With 50+ active users, the platform has become a thriving space for discussion and collaboration. To enhance the user experience, I incorporated interactive features such as real-time messaging, dynamic profiles, and personalized notifications. This approach led to a 45% increase in user engagement, as users found themselves more connected and invested in the community.",
        "But user engagement wasn't the only area I focused on. I knew that a fast, responsive platform was essential to keep users coming back. To ensure a smooth experience, I optimized backend queries and implemented caching strategies. These improvements resulted in a 35% faster page load time, ensuring that users could access their content quickly, without unnecessary delays.",
      ],
      github: "https://github.com/yuvrajkarna2717/ExpressIt-Frontend",
      live: "",
      image: "/images/expressit.png",
      category: "fullstack",
    },
  ];

  // Filter projects based on selected category
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter(project => project.category === filter);

  return (
    <section
      id="projects"
      className="w-full py-16 px-6 md:px-20 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto">
        <div className="animate-wiggle mb-16">
          <p className="text-3xl md:text-4xl font-bold text-center text-black">
            Projects
          </p>
          <div className="flex flex-col items-center space-y-[2px] mt-1">
            <div className="h-[0.15rem] w-full max-w-[150px] bg-black"></div>
            <div className="h-[0.15rem] w-full max-w-[150px] bg-black"></div>
          </div>
        </div>

        {/* Project Filter */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                filter === "all"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter("frontend")}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                filter === "frontend"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Frontend
            </button>
            <button
              onClick={() => setFilter("backend")}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                filter === "backend"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Backend
            </button>
            <button
              onClick={() => setFilter("fullstack")}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                filter === "fullstack"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Full Stack
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        {/* Empty state when no projects match filter */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No projects found in this category.
            </p>
            <button
              onClick={() => setFilter("all")}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              View all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
