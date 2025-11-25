import { useEffect, useRef, useState } from "react";

export function AboutMe() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Update visibility when the section enters or leaves the viewport
      },
      { threshold: 0.001 }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      id="about"
      className="w-full md:py-140 py-7 px-6 md:px-24 bg-white text-gray-800"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Heading */}
        <div className="text-center">
          <h2
            className={`text-4xl font-bold tracking-tight mb-2 transition-opacity duration-700 ${
              isVisible ? "opacity-100 animate-fade-in" : "opacity-0"
            }`}
          >
            About Me
          </h2>
          {isVisible && (
            <div
              className={`h-1 w-20 bg-black mx-auto rounded-full transition-all duration-700 ${
                isVisible ? "animate-grow" : ""
              }`}
            />
          )}
        </div>

        {/* Description */}
        <p
          ref={ref}
          className={`text-lg leading-relaxed text-center text-gray-700 transition-opacity duration-700 ${
            isVisible ? "opacity-100 animate-fade-in-delayed" : "opacity-0"
          }`}
        >
          I’m a passionate{" "}
          <span className="font-semibold">Software Engineer</span> and{" "}
          <span className="font-semibold">Full Stack Developer</span> with
          experience in building scalable web applications and creating seamless
          user experiences. My go-to stack includes{" "}
          <span className="font-medium">JavaScript</span>,{" "}
          <span className="font-medium">React</span>,{" "}
          <span className="font-medium">Node.js</span>, and{" "}
          <span className="font-medium">Python</span>. I enjoy turning complex
          problems into elegant, intuitive solutions.
        </p>

        <div className="flex justify-center items-center text-center italic md:text-3xl">
          Want to collaborate or contact ?
        </div>

        {/* Info Section */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 text-center transition-opacity duration-700 ${
            isVisible ? "opacity-100 animate-fade-in-slow" : "opacity-0"
          }`}
        >
          <div className="transition-transform hover:scale-105">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-lg font-medium">+91 7700833277</p>
          </div>
          <div className="transition-transform hover:scale-105">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">yuvrajkarna.code@gmail.com</p>
          </div>
          <div className="transition-transform hover:scale-105">
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-lg font-medium">India (Remote-ready)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
