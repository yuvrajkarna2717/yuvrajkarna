import AnimationTitle from "./AnimationTitle";

const techStack = [
  "Javascript",
  "React.js",
  "Redux.js",
  "Bootstrap",
  "API integration",
  "Responsive Design",
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="w-full py-16 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Quote */}
        <div className="text-center mb-16">
          <blockquote className="text-3xl md:text-4xl italic text-gray-800 font-light">
            "The only source of knowledge is experience."
          </blockquote>
          <cite className="block mt-4 text-gray-500 text-sm">
            — Albert Einstein
          </cite>
        </div>

        <AnimationTitle title="Experience" />

        {/* Experience Card */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                Iquadra information services LLC
              </h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-black">
                June 2024 – Present
              </span>
            </div>
            
            <div className="mt-2 mb-6">
              <span className="inline-block px-4 py-1 rounded-md bg-gray-100 text-gray-700 font-medium">
                Software Engineer Intern
              </span>
            </div>

            {/* Tech Stack Pills */}
            {/* <div className="flex flex-wrap gap-2 mb-6">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div> */}

            {/* Achievements with modern styling */}
            <div className="space-y-4 my-8">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Developed and optimized client dashboards with seamless API integration, reducing load times by 10%.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Refactored and improved the Redux store, enhancing state management efficiency and reducing codebase size by 600+ lines, increasing maintainability and performance.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Enhanced data fetching efficiency and user experience by integrating SWR (stale-while-revalidate), boosted caching efficiency and reduced API latency.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Boosted website performance by 20% through advanced techniques, including lazy loading, minimizing re-renders, and leveraging SWR for caching.
                </p>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Resolved 50+ critical bugs across multiple products and versions, improving system stability, reducing downtime by 60% and ensuring a seamless client experience.
                </p>
              </div>
            </div>

            {/* Links with modern styling */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="https://company-verify-link.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verify Employment
              </a>
              <a
                href="https://www.iqua.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
