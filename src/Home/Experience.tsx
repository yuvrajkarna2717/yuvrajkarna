import { useState } from "react";
import AnimationTitle from "./AnimationTitle";

export default function Experience() {
  const [showInternship, setShowInternship] = useState(false);

  const experience = {
    company: "Iquadra Information Services LLC.",
    companyUrl: "https://www.iquadra.com/",
    startDate: "2024-06-01", // For calculating total experience
    positions: [
      {
        title: "Software Engineer",
        period: "August 2024 – Present",
        type: "Full-time",
        techStack: [
          "React.js",
          "TypeScript",
          "Node.js",
          "Redux",
          "SWR",
          "REST APIs",
        ],
        achievements: [
          "Leading full-stack development projects with modern React architecture",
          "Mentoring junior developers and conducting code reviews",
          "Architecting scalable solutions for enterprise-level applications",
          "Implementing advanced performance optimization techniques",
        ],
      },
      {
        title: "Software Engineer Intern",
        period: "June 2024 – July 2024",
        type: "Internship",
        techStack: ["React.js", "JavaScript", "Redux", "SWR", "CSS3", "Git"],
        achievements: [
          "Developed and optimized client dashboards with seamless API integration, reducing load times by 10%",
          "Refactored Redux store, enhancing state management and reducing codebase by 600+ lines",
          "Enhanced data fetching efficiency by integrating SWR, boosting caching and reducing API latency",
          "Boosted website performance by 20% through lazy loading and minimizing re-renders",
          "Resolved 50+ critical bugs, improving system stability and reducing downtime by 60%",
        ],
      },
    ],
  };

  // Calculate total experience (minimum 1 year)
  const calculateExperience = (date: string) => {
    const startDate = new Date(date); //joining date
    const currentDate = new Date();
    const diffInMonths =
      (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
      (currentDate.getMonth() - startDate.getMonth());

    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;

    // Ensure minimum 1 year display
    if (years === 0 && months < 12) {
      return "1+ year";
    }

    if (years === 0) {
      return `${months} months`;
    } else if (months === 0) {
      return `${years} year${years > 1 ? "s" : ""}`;
    } else {
      return `${years} year${years > 1 ? "s" : ""} ${months} months`;
    }
  };

  return (
    <section id="experience" className="w-full py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {/* Quote */}
        <div className="text-center mb-16">
          <blockquote className="text-3xl md:text-4xl italic text-black font-light">
            "The only source of knowledge is experience."
          </blockquote>
          <cite className="block mt-4 text-gray-600 text-sm">
            — Albert Einstein
          </cite>
        </div>

        <AnimationTitle title="Experience" />

        {/* Experience Card */}
        <div className="mt-12 bg-white border-2 border-black rounded-2xl shadow-2xl overflow-hidden">
          {/* Company Header */}
          <div className="bg-black text-white p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {experience.company}
                </h2>
                <p className="text-gray-300 text-sm">
                  Total Experience: {calculateExperience(experience.startDate)}
                </p>
              </div>
              <a
                href={experience.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2 bg-white text-black rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Visit Company
              </a>
            </div>
          </div>

          {/* Timeline Content */}
          <div className="p-8 relative">
            {/* Current Position */}
            <div className="relative mb-8">
              {/* Position header */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                  <h3 className="text-xl font-bold text-black">
                    {experience.positions[0].title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-black text-white">
                      {experience.positions[0].type}
                    </span>
                    <span className="text-xs text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-lg">
                      {experience.positions[0].period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-black mb-3 uppercase tracking-wider">
                  ▸ Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {experience.positions[0].techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-black mb-3 uppercase tracking-wider">
                  ▸ Key Achievements
                </h4>
                <div className="space-y-2">
                  {experience.positions[0].achievements.map(
                    (achievement, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 group"
                      >
                        <div className="flex-shrink-0 mt-1.5">
                          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {achievement}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Show Internship Toggle */}
            <div className="border-t border-gray-200 pt-6">
              <button
                onClick={() => setShowInternship(!showInternship)}
                className="flex items-center justify-center w-full py-3 text-sm font-medium text-gray-600 hover:text-black transition-colors group"
              >
                <span className="mr-2">
                  {showInternship ? "Hide" : "Show"} Internship Experience
                </span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    showInternship ? "rotate-180" : ""
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
            </div>

            {/* Internship Experience (Collapsible) */}
            {showInternship && (
              <div className="mt-6 pt-6 border-t border-gray-200 bg-gray-50 rounded-lg p-6">
                <div className="relative">
                  {/* Position header */}
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                      <h3 className="text-xl font-bold text-black">
                        {experience.positions[1].title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-200 text-black">
                          {experience.positions[1].type}
                        </span>
                        <span className="text-xs text-gray-600 font-medium bg-white px-3 py-1 rounded-lg">
                          {experience.positions[1].period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-black mb-3 uppercase tracking-wider">
                      ▸ Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.positions[1].techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-800 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold text-black mb-3 uppercase tracking-wider">
                      ▸ Key Achievements
                    </h4>
                    <div className="space-y-2">
                      {experience.positions[1].achievements.map(
                        (achievement, idx) => (
                          <div
                            key={idx}
                            className="flex items-start space-x-3 group"
                          >
                            <div className="flex-shrink-0 mt-1.5">
                              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {achievement}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
