import { useState } from "react";

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

const icons = {
  react: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.992-1.36-1.56z" />
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-3.032.284-6.017.51-9.020.417-.296 4.604-2.876 4.292-5.425z" />
    </svg>
  ),
  typescript: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
    </svg>
  ),
  openai: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142-.0852 4.783-2.7582a.7712.7712 0 0 0 .7806 0l5.8428 3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
    </svg>
  ),
};

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

  const getIconByTech = (tech: string) => {
    const lowerCaseTech = tech.toLowerCase();
    if (lowerCaseTech.includes("react")) return icons.react;
    if (lowerCaseTech.includes("node")) return icons.nodejs;
    if (lowerCaseTech.includes("typescript")) return icons.typescript;
    if (lowerCaseTech.includes("javascript")) return icons.javascript;
    if (lowerCaseTech.includes("mongo")) return icons.mongodb;
    if (lowerCaseTech.includes("openai")) return icons.openai;
    return null;
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {project.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {project.status === "completed"
                    ? "✅ Completed"
                    : "🚧 In Development"}
                </span>
                {project.users && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    👥 {project.users}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.slice(0, 4).map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
              >
                {getIconByTech(tech) && (
                  <div className="w-4 h-4 mr-2 text-gray-700 flex-shrink-0">
                    {getIconByTech(tech)}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {tech}
                </span>
              </div>
            ))}
            {project.techStack.length > 4 && (
              <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                <span className="text-sm font-medium text-gray-700">
                  +{project.techStack.length - 4} more
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center mb-4 transition-colors"
          >
            View details
            <svg
              className="ml-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border-2 border-gray-900 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200"
              >
                <div className="w-4 h-4 mr-2 flex-shrink-0">{icons.github}</div>
                GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-900 border-2 border-gray-900 rounded-lg text-sm font-medium text-white hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                <div className="w-4 h-4 mr-2 flex-shrink-0">{icons.link}</div>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-start justify-between gap-4 rounded-t-2xl">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {project.status === "completed"
                      ? "✅ Completed"
                      : "🚧 In Development"}
                  </span>
                  {project.users && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      👥 {project.users}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  About
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="flex items-center bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
                    >
                      {getIconByTech(tech) && (
                        <div className="w-4 h-4 mr-2 text-gray-700 flex-shrink-0">
                          {getIconByTech(tech)}
                        </div>
                      )}
                      <span className="text-sm font-medium text-gray-700">
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Key Highlights
                </h3>
                <div className="space-y-3">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed flex-1">
                        {highlight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 border-2 border-gray-900 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200"
                  >
                    <div className="w-4 h-4 mr-2 flex-shrink-0">
                      {icons.github}
                    </div>
                    View on GitHub
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-5 py-2.5 bg-gray-900 border-2 border-gray-900 rounded-lg text-sm font-medium text-white hover:bg-white hover:text-gray-900 transition-all duration-200"
                  >
                    <div className="w-4 h-4 mr-2 flex-shrink-0">
                      {icons.link}
                    </div>
                    View Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function Project() {
  const [filter, setFilter] = useState<
    "all" | "frontend" | "backend" | "fullstack"
  >("all");

  const filteredProjects =
    filter === "all" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing my professional work and contributions across different
            technologies and domains
          </p>
        </div>

        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-white rounded-xl p-1 sm:p-2 shadow-lg w-full sm:w-auto overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {["all", "frontend", "backend", "fullstack"].map(filterType => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType as any)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    filter === filterType
                      ? "bg-gray-900 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
