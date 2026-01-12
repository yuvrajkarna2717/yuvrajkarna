import { useState } from "react";
import { FaGithub, FaCode, FaExternalLinkAlt } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

export default function Story() {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      title: "The Beginning",
      subtitle: "Where it all started",
      content:
        "Every great story has a beginning. Mine started with curiosity about how websites work and a simple 'Hello World' that changed everything.",
      icon: <FaCode className="w-8 h-8" />,
    },
    {
      title: "The Grind",
      subtitle: "LeetCode & Problem Solving",
      content:
        "Countless hours solving algorithms, debugging edge cases, and building that problem-solving muscle one challenge at a time.",
      icon: <SiLeetcode className="w-8 h-8" />,
    },
    {
      title: "The Learning",
      subtitle: "GeeksforGeeks Journey",
      content:
        "Deep diving into computer science fundamentals, data structures, and system design concepts that shaped my engineering mindset.",
      icon: <SiGeeksforgeeks className="w-8 h-8" />,
    },
    {
      title: "The Commitment",
      subtitle: "GitHub Contributions",
      content:
        "A year of consistent coding, building projects, and contributing to the open-source community. Every green square tells a story.",
      icon: <FaGithub className="w-8 h-8" />,
    },
  ];

  const stats = [
    {
      label: "Problems Solved",
      value: "1000+",
      platform: "leetcode/geeksforgeeks",
    },
    { label: "Contributions", value: "1000+", platform: "github" },
  ];

  return (
    <main className="relative min-h-screen w-full bg-white text-black font-sans">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            My Coding
            <span className="block text-gray-600">Story</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            A journey through algorithms, projects, and countless lines of code
            that shaped me into the developer I am today.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="text-2xl md:text-3xl font-bold text-black mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.platform}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter Navigation */}
      <section className="relative z-10 px-4 sm:px-10 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {chapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() => setActiveChapter(index)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                  activeChapter === index
                    ? "bg-black text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {chapter.icon}
                <div className="text-left">
                  <div className="font-semibold">{chapter.title}</div>
                  <div className="text-sm opacity-75">{chapter.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Chapter Content */}
      <section className="relative z-10 px-4 sm:px-10 mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-black">{chapters[activeChapter].icon}</div>
              <div>
                <h2 className="text-3xl font-bold text-black">
                  {chapters[activeChapter].title}
                </h2>
                <p className="text-gray-600">
                  {chapters[activeChapter].subtitle}
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {chapters[activeChapter].content}
            </p>

            {/* Chapter-specific content */}
            {activeChapter === 1 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <SiLeetcode className="text-orange-500" />
                    LeetCode Journey
                  </h3>
                  <p className="text-gray-600 mb-4">
                    My problem-solving journey on LeetCode has been
                    transformative. From struggling with basic array problems to
                    solving complex dynamic programming challenges.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="text-center text-gray-500 text-sm mb-2">
                      LeetCode Profile
                    </div>
                    <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <img
                        className="max-w-full max-h-full object-contain rounded-lg"
                        src="/leetcode.png"
                        alt="LeetCode Profile"
                      />
                    </div>
                  </div>
                  <a
                    href="https://leetcode.com/yuvrajkarna27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    <FaExternalLinkAlt />
                    View My LeetCode Profile
                  </a>
                </div>
              </div>
            )}

            {activeChapter === 2 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <SiGeeksforgeeks className="text-green-600" />
                    GeeksforGeeks Learning
                  </h3>
                  <p className="text-gray-600 mb-4">
                    GeeksforGeeks has been my go-to resource for understanding
                    computer science fundamentals, algorithms, and system design
                    concepts.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="text-center text-gray-500 text-sm mb-2">
                      GeeksforGeeks Profile
                    </div>
                    <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <img
                        className="max-w-full max-h-full object-contain rounded-lg"
                        src="/gfg.png"
                        alt="GeeksforGeeks Profile"
                      />
                    </div>
                  </div>
                  <a
                    href="https://www.geeksforgeeks.org/profile/yuvrajkarna27"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FaExternalLinkAlt />
                    View My GeeksforGeeks Profile
                  </a>
                </div>
              </div>
            )}

            {activeChapter === 3 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FaGithub />
                    GitHub Contributions Heatmap
                  </h3>
                  <p className="text-gray-600 mb-4">
                    A visual representation of my coding consistency over the
                    past year. Each green square represents commits,
                    contributions, and progress.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="text-center text-gray-500 text-sm mb-2">
                      GitHub Contributions Heatmap
                    </div>
                    <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                      <img
                        className="max-w-full max-h-full object-contain rounded-lg"
                        src="/github.png"
                        alt="GitHub Contributions Heatmap"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://github.com/yuvrajkarna2717"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <FaGithub />
                      View My GitHub Profile
                    </a>
                    <a
                      href="https://github.com/yuvrajkarna2717?tab=repositories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-2 border-black text-black px-4 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
                    >
                      <FaCode />
                      View My Repositories
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 px-4 sm:px-10 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black text-white rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to be part of my story?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's build something amazing together. I'm always excited about
              new opportunities and collaborations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:yuvrajkarna.code@gmail.com"
                className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get In Touch
              </a>
              <a
                href="/resume/YuvrajKarna.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
              >
                View Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
