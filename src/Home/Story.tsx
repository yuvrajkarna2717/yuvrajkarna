import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Code,
  ExternalLink,
  Rocket,
  Lightbulb,
  Mountain,
  Trophy,
  Coffee,
  Bug,
} from "lucide-react";
import { FaBackward } from "react-icons/fa6";

export default function Story() {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Links object
  const links = {
    leetcode: "https://leetcode.com/u/yuvrajkarna27",
    geeksforgeeks: "https://auth.geeksforgeeks.org/user/yuvrajkarna27",
    github: "https://github.com/yuvrajkarna2717",
    githubProjects: "https://github.com/yuvrajkarna2717?tab=repositories",
    contact: "mailto:yuvrajkarna.code@gmail.com",
    resume: "/resume/YuvrajKarna.pdf",
  };

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapters = [
    {
      title: "The Spark",
      subtitle: "Where curiosity ignited",
      story:
        "It was a quiet evening when I stumbled upon my first line of code. The glow of the screen reflected in my eyes as I typed 'Hello World' - three simple characters that would become the first step of an incredible journey.",
      content:
        "What started as curiosity quickly became obsession. I spent nights exploring how websites worked, dismantling them in developer tools, and rebuilding them piece by piece. Every tutorial completed felt like unlocking a new superpower.",
      icon: <Lightbulb className="w-10 h-10" />,
      milestone: "First Hello World",
      year: "The Beginning",
      achievement: "Discovered the magic of programming",
    },
    {
      title: "The Grind",
      subtitle: "Building the foundation",
      story:
        "They say mastery requires 10,000 hours. I started my clock with LeetCode problem #1. Easy at first, then increasingly impossible. Each failed submission taught me more than any success could.",
      content:
        "Dawn after dawn, I sat with algorithms that seemed insurmountable. Two-pointer techniques, dynamic programming, graph traversals - each concept was a mountain to climb. But slowly, patterns emerged. My brain began thinking in loops and recursion.",
      icon: <Mountain className="w-10 h-10" />,
      milestone: "1000+ Problems",
      year: "The Struggle",
      achievement: "Transformed frustration into expertise",
      platform: "leetcode",
    },
    {
      title: "The Deep Dive",
      subtitle: "Understanding the 'why'",
      story:
        "Solving problems wasn't enough. I needed to understand the theory, the computer science that powered everything. GeeksforGeeks became my digital library.",
      content:
        "From time complexity analysis to system design principles, I devoured articles and tutorials. Data structures came alive - trees weren't just diagrams, they were elegant solutions to real problems. Algorithms had stories, histories, inventors.",
      icon: <Code className="w-10 h-10" />,
      milestone: "Deep CS Knowledge",
      year: "The Foundation",
      achievement: "Mastered fundamentals that last forever",
      platform: "geeksforgeeks",
    },
    {
      title: "The Builder",
      subtitle: "Creating real impact",
      story:
        "Knowledge without application is just trivia. It was time to build. GitHub became my canvas, and code became my art.",
      content:
        "One commit led to another. Projects grew from ideas scribbled on napkins to deployed applications touching real users. Open source taught me collaboration. Every pull request was a conversation. Every issue was a lesson in empathy.",
      icon: <Github className="w-10 h-10" />,
      milestone: "1000+ Contributions",
      year: "The Creation",
      achievement: "Built solutions that matter",
      platform: "github",
    },
    {
      title: "The Journey Continues",
      subtitle: "Always growing, always learning",
      story:
        "This isn't an ending - it's a checkpoint. Every skill mastered reveals ten more to learn. Every project completed sparks ideas for the next.",
      content:
        "The developer I am today would amaze the person who wrote that first Hello World. But the best part? I'm still that same curious person, still asking 'how does this work?', still excited by every new challenge.",
      icon: <Rocket className="w-10 h-10" />,
      milestone: "Next Chapter",
      year: "The Future",
      achievement: "Ready for whatever comes next",
    },
  ];

  const stats = [
    {
      label: "Problems Conquered",
      value: "1000+",
      platform: "LeetCode & GFG",
      icon: <Code className="w-6 h-6" />,
    },
    {
      label: "Green Squares",
      value: "1000+",
      platform: "GitHub",
      icon: <Github className="w-6 h-6" />,
    },
    {
      label: "Coffee Consumed",
      value: "∞",
      platform: "Fuel for Code",
      icon: <Coffee className="w-6 h-6" />,
    },
    {
      label: "Bugs Squashed",
      value: "Too Many",
      platform: "Battle Scars",
      icon: <Bug className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen text-white relative">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0 pointer-events-none" />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-white transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back Button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20 hover:scale-105"
          onClick={() => navigate("/")}
        >
          <FaBackward className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Hero Section */}
      <div
        className={`relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="text-center space-y-6 max-w-4xl">
          <div className="inline-block">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-mono">Status: Always Learning</span>
            </div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-tight">
            My Coding
            <br />
            Odyssey
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            A tale of late nights, countless bugs, breakthrough moments, and the
            relentless pursuit of mastery. This is my journey from curious
            beginner to passionate developer.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <a
              href="#story"
              className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Start Reading
            </a>
            <a
              href="#contact"
              className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              Skip to End
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div id="stats" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
            Journey By Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all hover:scale-105"
              >
                <div className="text-white mb-3">{stat.icon}</div>
                <div className="text-4xl sm:text-5xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500 font-mono">
                  {stat.platform}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Timeline Story */}
      <div id="story" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-white">
            The Story Unfolds
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            Scroll through the chapters of my journey. Each step was a lesson,
            each challenge was growth.
          </p>

          {/* Horizontal Timeline Path */}
          <div className="relative mb-20">
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-white/20" />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
              {chapters.map((chapter, index) => (
                <div key={index} className="relative">
                  <div className="hidden lg:block absolute top-20 left-1/2 w-6 h-6 bg-white rounded-full border-4 border-gray-800 transform -translate-x-1/2 -translate-y-1/2 z-10" />
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
                      {chapter.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 mt-2">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      {chapter.subtitle}
                    </p>
                    <span className="text-xs font-mono text-gray-500">
                      {chapter.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Story Sections */}
          <div className="space-y-32">
            {chapters.map((chapter, index) => (
              <div key={index} className="relative">
                <div
                  className={`max-w-4xl mx-auto \${index % 2 === 0 ? "" : "lg:ml-auto"}`}
                >
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl">
                    <div className="flex items-start gap-6 mb-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                        {chapter.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-400 font-mono mb-1">
                          Chapter {index + 1} • {chapter.year}
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-black text-white mb-2">
                          {chapter.title}
                        </h3>
                        <p className="text-gray-400 text-lg">
                          {chapter.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6 text-gray-300 leading-relaxed">
                      <p className="text-xl sm:text-2xl font-light italic border-l-4 border-white pl-6">
                        "{chapter.story}"
                      </p>
                      <p className="text-lg">{chapter.content}</p>
                    </div>

                    <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Trophy className="w-5 h-5 text-white" />
                        <span className="text-sm font-mono text-gray-400">
                          Achievement Unlocked
                        </span>
                      </div>
                      <div className="text-xl font-bold text-white">
                        {chapter.achievement}
                      </div>
                      <div className="text-gray-400 font-mono mt-1">
                        {chapter.milestone}
                      </div>
                    </div>

                    {/* Platform-specific content */}
                    {chapter.platform === "leetcode" && (
                      <div className="mt-8">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="text-2xl font-bold mb-3 flex items-center gap-2 text-white">
                            <Mountain className="w-6 h-6" />
                            LeetCode Journey
                          </h4>
                          <p className="text-gray-300 mb-4">
                            From Easy to Hard, from brute force to optimal
                            solutions. Each problem solved was a battle won,
                            each concept mastered was a level gained.
                          </p>
                          <a
                            href={links.leetcode}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-all hover:scale-105"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View LeetCode Profile
                          </a>
                        </div>
                      </div>
                    )}

                    {chapter.platform === "geeksforgeeks" && (
                      <div className="mt-8">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="text-2xl font-bold mb-3 flex items-center gap-2 text-white">
                            <Code className="w-6 h-6" />
                            GeeksforGeeks Learning Path
                          </h4>
                          <p className="text-gray-300 mb-4">
                            My university of computer science. Every article
                            read, every concept absorbed, built the foundation
                            that everything else stands on.
                          </p>
                          <a
                            href={links.geeksforgeeks}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-all hover:scale-105"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View GFG Profile
                          </a>
                        </div>
                      </div>
                    )}

                    {chapter.platform === "github" && (
                      <div className="mt-8">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                          <h4 className="text-2xl font-bold mb-3 flex items-center gap-2 text-white">
                            <Github className="w-6 h-6" />
                            GitHub Contributions
                          </h4>
                          <p className="text-gray-300 mb-4">
                            Every green square tells a story. A bug fixed at 2
                            AM. A feature shipped on a Saturday. A contribution
                            that helped someone across the world.
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <a
                              href={links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-200 rounded-full font-semibold transition-all hover:scale-105"
                            >
                              <Github className="w-4 h-4" />
                              View Profile
                            </a>
                            <a
                              href={links.githubProjects}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-all border border-white/20"
                            >
                              <Code className="w-4 h-4" />
                              Browse Projects
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div id="contact" className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 sm:p-16 border border-white/10 shadow-2xl">
            <Rocket className="w-16 h-16 mx-auto mb-6 text-white" />
            <h2 className="text-4xl sm:text-5xl font-black mb-6 text-white">
              Let's Write the Next Chapter Together
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              Every great story needs collaboration. Whether you're building
              something revolutionary, solving hard problems, or just want to
              talk code - I'm ready for the next adventure.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={links.contact}
                className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
              >
                Start a Conversation
              </a>
              <a
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                View My Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            Built with curiosity, powered by passion, fueled by coffee ☕
          </p>
          <p className="text-gray-600 text-sm font-mono">
            This story is still being written... Stay tuned for more chapters.
          </p>
        </div>
      </div>
    </div>
  );
}
