import { useEffect, useRef, useState } from "react";

export function AboutMe() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
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
              className={`h-1 w-36 bg-black mx-auto rounded-full transition-all duration-700 ${
                isVisible ? "animate-grow" : ""
              }`}
            />
          )}
        </div>

        {/* Description */}
        <div
          ref={ref}
          className={`text-center space-y-6 transition-opacity duration-700 ${
            isVisible ? "opacity-100 animate-fade-in-delayed" : "opacity-0"
          }`}
        >
          <p className="text-xl text-gray-800 font-light">
            Hi there! 👋 I'm a{" "}
            <span className="font-semibold text-black">Software Engineer</span>{" "}
            who loves crafting digital experiences.
          </p>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I turn ideas into reality through clean code and thoughtful design.
            Always excited about new challenges and learning opportunities.
          </p>
        </div>

        <div className="text-center">
          <p className="text-2xl font-light text-gray-700 mb-6">
            Let's connect!
          </p>
        </div>

        {/* Contact Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-opacity duration-700 ${
            isVisible ? "opacity-100 animate-fade-in-slow" : "opacity-0"
          }`}
        >
          <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200 group">
            <p className="text-sm text-gray-500 mb-1">Phone</p>
            <p className="font-medium text-gray-800">+91 7700833277</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200 group">
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-medium text-gray-800">
              yuvrajkarna.code@gmail.com
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200 group">
            <p className="text-sm text-gray-500 mb-1">Location</p>
            <p className="font-medium text-gray-800">India (Remote-ready)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
