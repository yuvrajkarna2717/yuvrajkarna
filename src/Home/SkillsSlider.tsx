import React, { useState } from "react";

// Define skill interface
interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "tools";
}

// Skills data with icons and categories
const skills: Skill[] = [
  // Frontend
  { name: "JavaScript", icon: "javascript", category: "frontend" },
  { name: "React.js", icon: "react", category: "frontend" },
  { name: "TypeScript", icon: "typescript", category: "frontend" },
  { name: "Next.js", icon: "nextjs", category: "frontend" },
  { name: "TailwindCSS", icon: "tailwind", category: "frontend" },
  { name: "Bootstrap", icon: "bootstrap", category: "frontend" },

  // Backend
  { name: "Node.js", icon: "node", category: "backend" },
  { name: "Express.js", icon: "express", category: "backend" },
  { name: "MongoDB", icon: "mongodb", category: "backend" },
  { name: "PostgreSQL", icon: "postgresql", category: "backend" },
  { name: "Redis", icon: "redis", category: "backend" },
  { name: "GraphQL", icon: "graphql", category: "backend" },
  { name: "REST API", icon: "api", category: "backend" },
  { name: "Firebase", icon: "firebase", category: "backend" },
  { name: "Nest.js", icon: "node", category: "backend" },

  // Tools & Others
  { name: "Git", icon: "git", category: "tools" },
  { name: "Docker", icon: "docker", category: "tools" },
  { name: "Jest", icon: "jest", category: "tools" },
  { name: "CI/CD", icon: "cicd", category: "tools" },
  { name: "Github", icon: "github", category: "tools" },
  { name: "Jenkins", icon: "jenkins", category: "tools" },
];

const SkillsDisplay: React.FC = () => {
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Number of skills to show initially on mobile
  const MOBILE_INITIAL_COUNT = 8;

  // Determine which skills to display
  const displayedSkills = showAllSkills
    ? skills
    : skills.slice(0, MOBILE_INITIAL_COUNT);
  const hasMoreSkills = skills.length > MOBILE_INITIAL_COUNT;

  // Skill item component
  const SkillItem: React.FC<{ skill: Skill }> = ({ skill }) => (
    <div className="flex items-center bg-white rounded-full px-5 py-3 mx-2 my-2 shadow-md border border-gray-200 transform transition-all duration-300 hover:scale-110 hover:shadow-lg">
      <div className="w-6 h-6 mr-2">
        {/* Icon placeholder with category color */}
        <div className="w-full h-full rounded-full bg-gradient-to-br bg-black flex items-center justify-center text-white">
          <span className="text-xs font-bold">{skill.name.charAt(0)}</span>
        </div>
      </div>
      <span className="font-medium text-sm text-gray-800">{skill.name}</span>

      {/* Category indicator dot */}
      <div className="ml-2 w-2 h-2 rounded-full bg-gradient-to-br bg-black"></div>
    </div>
  );

  return (
    <div className="w-full py-12">
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <div className="text-3xl md:text-4xl font-bold text-center mb-2 text-black">
          Skills & Technologies
        </div>
        <div className="text-center text-gray-600 mb-8">
          Tools and technologies I've worked with
        </div>
      </div>

      {/* Skills display */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Skills grid */}
        <div className="flex flex-wrap justify-center mb-4">
          {displayedSkills.map((skill, index) => (
            <SkillItem key={`skill-${index}`} skill={skill} />
          ))}
        </div>

        {/* Show More/Less button for mobile */}
        {hasMoreSkills && (
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={() => setShowAllSkills(!showAllSkills)}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
            >
              <span>
                {showAllSkills
                  ? "Show Less"
                  : `Show More (${skills.length - MOBILE_INITIAL_COUNT}+)`}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  showAllSkills ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        )}

        {/* "and more" text for desktop */}
        <div className="hidden md:flex justify-center items-center text-black mt-4">
          and more.
        </div>
      </div>
    </div>
  );
};

export default SkillsDisplay;
