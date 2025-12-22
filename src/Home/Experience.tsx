import { useState } from "react";
import AnimationTitle from "./AnimationTitle";

interface Experience {
  company: string;
  duration: string;
  position: string;
  products: Product[];
}

interface Product {
  name: string;
  role: string;
  duration: string;
  techStack: string[];
  description: string;
  highlights: string[];
  users?: string;
  link?: string;
  status?: "completed" | "in-progress";
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
  openai: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142-.0852 4.783-2.7582a.7712.7712 0 0 0 .7806 0l5.8428 3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
    </svg>
  ),
};

const ProductCard: React.FC<{ product: Product; index: number }> = ({
  product,
  index,
}) => {
  const [expanded, setExpanded] = useState(false);

  const getIconByTech = (tech: string) => {
    const lowerCaseTech = tech.toLowerCase();
    if (lowerCaseTech.includes("react")) return icons.react;
    if (lowerCaseTech.includes("node")) return icons.nodejs;
    if (lowerCaseTech.includes("mongo")) return icons.mongodb;
    if (lowerCaseTech.includes("openai")) return icons.openai;
    return null;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 w-full border border-gray-200 hover:border-gray-900 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center text-sm font-bold">
            {index + 1}
          </div>
          <h4 className="text-xl font-bold text-gray-900">{product.name}</h4>
        </div>
        <div className="flex gap-2 items-center">
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
            📅 {product.duration}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              product?.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {product.status === "completed" ? "✅ Live" : "🚧 Development"}
          </span>
          {product.users && (
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
              👥 {product.users}
            </span>
          )}
        </div>
      </div>

      <div className="mb-4">
        <span className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium shadow-md">
          {product.role}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {product.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {product.techStack.map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center bg-gray-50 px-2 py-1 rounded-md"
          >
            {getIconByTech(tech) && (
              <div className="w-3 h-3 mr-1 text-gray-700">
                {getIconByTech(tech)}
              </div>
            )}
            <span className="text-xs font-medium text-gray-700">{tech}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm font-medium text-gray-900 hover:text-gray-700 flex items-center mb-4 transition-colors bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg"
      >
        {expanded ? "Hide details" : "Show details"}
        <svg
          className={`ml-1 w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
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
        <div className="space-y-2 text-gray-600 text-xs mb-4 pl-3 border-l-2 border-blue-200">
          {product.highlights.map((highlight, idx) => (
            <p key={idx}>{highlight}</p>
          ))}
        </div>
      )}

      {product.link && (
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-2 bg-gray-900 rounded-md text-xs font-medium text-white hover:bg-gray-700 transition-colors"
        >
          <div className="w-3 h-3 mr-1">{icons.link}</div>
          View Product
        </a>
      )}
    </div>
  );
};

const ExperienceCard: React.FC<{ experience: Experience }> = ({
  experience,
}) => {
  return (
    <div className="relative">
      {/* Company Header with gradient background */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 mb-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-3xl font-bold mb-2">{experience.company}</h3>
            <p className="text-gray-200 text-lg">{experience.position}</p>
          </div>
          <div className="text-right">
            <span className="px-6 py-3 bg-white text-gray-900 rounded-xl text-sm font-bold shadow-lg">
              {experience.duration}
            </span>
            <div className="text-white text-sm mt-2 opacity-80">
              {experience.products.length} Products
            </div>
          </div>
        </div>
      </div>

      {/* Products Timeline */}
      <div className="relative pl-8">
        {/* Vertical Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-900 via-gray-600 to-gray-300"></div>

        <div className="space-y-8">
          {experience.products.map((product, index) => (
            <div key={index} className="relative">
              {/* Timeline Dot */}
              <div className="absolute -left-6 top-6 w-4 h-4 bg-gray-900 rounded-full border-4 border-white shadow-lg z-10"></div>

              {/* Product Card */}
              <div className="ml-4">
                <ProductCard product={product} index={index} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <blockquote className="text-3xl md:text-4xl italic text-gray-800 font-light mb-4">
            "The only source of knowledge is experience."
          </blockquote>
          <cite className="block text-gray-500 text-sm mb-8">
            — Albert Einstein
          </cite>

          <AnimationTitle title="Professional Experience" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            My professional journey building innovative products and solutions
          </p>
        </div>

        <div>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}

const experiences: Experience[] = [
  {
    company: "Iquadra Information Services LLC",
    duration: "June 2024 – Present",
    position: "Software Engineer Intern → Full-time Employee",
    products: [
      {
        name: "iQua.ai",
        role: "Frontend Developer (Intern)",
        duration: "June 2024 – April 2025",
        techStack: ["React.js", "Redux Toolkit", "Bootstrap", "Debugging", "API Integration"],
        description:
          "A cutting-edge AI-powered Interview platform revolutionizing the hiring process with intelligent interview methods and real-time metrics.",
        highlights: [
          "Built a dynamic test dashboard with real-time monitoring and fixed 50+ major bugs to improve stability.",
          "Removed redundant APIs and refactored 1000+ Redux lines into a cleaner 100-line structure, improving speed and maintainability.",
          "Designed and built the SME (Subject Matter Expert) system, enabling users to schedule sessions and join video calls.",
        ],
        link: "https://iqua.ai",
        status: "completed",
        users: "10K+",
      },
      {
        name: "PNN",
        role: "Frontend Developer (Intern)",
        duration: "May 2025 – Present",
        techStack: ["React.js", "Redux Toolkit", "TailwindCSS", "WebRTC", "Payment Integration", "UI/UX Design"],
        description:
          "A comprehensive news platform MVP with WebRTC-based video/audio recording capabilities, real-time transcription, and enhanced user engagement features.",
        highlights: [
          "Designed system architecture (HLD/LLD) and built a WebRTC-based video/audio recorder with real-time transcription.",
          "Solely developed the entire frontend, including responsive UIs, payment pages, dark/light themes, and performance optimizations.",
          "Reduced bundle size by 1.3MB through optimization techniques and integrated multiple APIs for seamless functionality.",
        ],
        link: "https://main.d1pz2go0m9b7yl.amplifyapp.com/",
        status: "in-progress",
      },
      {
        name: "Dhanvv.ai",
        role: "Full Stack Developer (Full-time)",
        duration: "August 2025 – Present",
        techStack: [
          "React.js",
          "Node.js",
          "MongoDB",
          "Langchain.js",
          "WebSocket",
          "Socket.io",
          "Redis",
          "CI/CD",
        ],
        description:
          "An AI-powered healthcare assistant that understands user urgency and health conditions, connecting them with the right healthcare professionals through intelligent symptom analysis and video consultations.",
        highlights: [
          "Developed an intelligent health agent using Langchain.js that analyzes user symptoms and health conditions to provide personalized medical guidance",
          "Built real-time video consultation system with WebRTC, enabling patients to connect with doctors for urgent medical consultations with user confirmation",
          "Implemented WebSocket and Socket.io for real-time communication between patients, AI agent, and healthcare providers",
          "Created a comprehensive super admin dashboard to control access and manage multiple portals including medicine portal and laboratory portal",
          "Designed symptom-based doctor matching algorithm that connects patients with specialists based on their specific health conditions",
          "Integrated Redis for efficient session management and real-time data caching across the healthcare platform",
        ],
        link: "https://dhanvv-web.onrender.com/",
        status: "in-progress",
      },
    ],
  },
];
