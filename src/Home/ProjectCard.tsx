import { FaGithub, FaLink } from "react-icons/fa";
// import { SiNpm } from "react-icons/si";
interface Project {
  title: string;
  description: string;
  highlights: string[];
  techStack: string[];
  github?: string;
  live?: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="md:p-8 text-left md:flex md:items-center md:gap-10 mb-12">
      {/* Project Image */}
      {/* {project.title !== "React-hook-granth" && project.image && (
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <img
            src={project.image}
            alt={project.title + " Screenshot"}
            className="rounded-lg shadow-md w-full md:w-80"
          />
        </div>
      )} */}

      {/* Project Content */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-black mb-4">{project.title}</h3>

        <p className="text-gray-700 mb-4">{project.description}</p>

        {/* Highlights */}
        <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2 sm:block hidden  ">
          {project.highlights.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links with Icons */}
        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full hover:bg-gray-700 transition"
            >
              <FaGithub className="text-lg" />
              Code
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full hover:bg-gray-700 transition"
            >
              <FaLink className="text-lg" />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
