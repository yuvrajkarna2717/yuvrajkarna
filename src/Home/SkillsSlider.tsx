import React from "react";

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
  { name: "TailwindCSS", icon: "tailwind", category: "frontend" },
  { name: "Next.js", icon: "nextjs", category: "frontend" },
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
  { name: "Jenkins", icon: "jenkins", category: "tools" },
];

const SkillsDisplay: React.FC = () => {
  // Split skills into two rows
  const firstRowSkills = skills.slice(0, Math.ceil(skills.length / 2));
  const secondRowSkills = skills.slice(Math.ceil(skills.length / 2));

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

      {/* Skills display in two rows */}
      <div className="max-w-6xl mx-auto px-4">
        {/* First row */}
        <div className="flex flex-wrap justify-center mb-4">
          {firstRowSkills.map((skill, index) => (
            <SkillItem key={`first-row-${index}`} skill={skill} />
          ))}
        </div>

        {/* Second row */}
        <div className="flex flex-wrap justify-center">
          {secondRowSkills.map((skill, index) => (
            <SkillItem key={`second-row-${index}`} skill={skill} />
          ))}
        </div>
       <div className="flex justify-center items-center text-black">and more.</div>
      </div>

    </div>
  );
};

export default SkillsDisplay;
