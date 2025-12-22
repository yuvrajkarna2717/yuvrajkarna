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
  { name: "TailwindCSS", icon: "tailwind", category: "frontend" },
  { name: "Next.js", icon: "nextjs", category: "frontend" },
  { name: "Bootstrap", icon: "bootstrap", category: "frontend" },

  // Backend
  { name: "Node.js", icon: "node", category: "backend" },
  { name: "Express.js", icon: "express", category: "backend" },
  { name: "MongoDB", icon: "mongodb", category: "backend" },
  { name: "PostgreSQL", icon: "postgresql", category: "backend" },
  { name: "Redis", icon: "redis", category: "backend" },
  { name: "Firebase", icon: "firebase", category: "backend" },
  { name: "Nest.js", icon: "node", category: "backend" },

  // Tools & Others
  { name: "Git", icon: "git", category: "tools" },
  { name: "Docker", icon: "docker", category: "tools" },
  { name: "Jest", icon: "jest", category: "tools" },
  { name: "CI/CD", icon: "cicd", category: "tools" },
  { name: "GitHub Actions", icon: "githubaction", category: "tools" },
];

const SkillsDisplay: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_SKILLS_COUNT = 8;
  
  const displayedSkills = showAll ? skills : skills.slice(0, INITIAL_SKILLS_COUNT);

  // Skill item component with simple animations
  const SkillItem: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => (
    <div 
      className="flex items-center bg-white rounded-full px-5 py-3 mx-2 my-2 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl animate-float"
      style={{ animationDelay: `${index * 0.2}s` }}
    >
      <div className="w-6 h-6 mr-2">
        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white animate-pulse-slow">
          <span className="text-xs font-bold">{skill.name.charAt(0)}</span>
        </div>
      </div>
      <span className="font-medium text-sm text-gray-800">{skill.name}</span>
      <div className="ml-2 w-2 h-2 rounded-full bg-black"></div>
    </div>
  );

  return (
    <div className="w-full py-12">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <div className="text-3xl md:text-4xl font-bold text-center mb-2 text-black">
          Skills & Technologies
        </div>
        <div className="text-center text-gray-600 mb-8">
          Tools and technologies I've worked with
        </div>
      </div>

      {/* Skills display with animations */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center mb-6">
          {displayedSkills.map((skill, index) => (
            <SkillItem key={index} skill={skill} index={index} />
          ))}
        </div>

        {/* Animated View All / View Less Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200"
          >
            {showAll ? "View Less" : `View All (${skills.length - INITIAL_SKILLS_COUNT} more)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsDisplay;
