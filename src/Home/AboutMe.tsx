export function AboutMe() {
  return (
    <section
      id="about"
      className="w-full md:py-140 py-7 px-6 md:px-24 bg-white text-gray-800"
    >
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-2 transition-opacity duration-700 opacity-100">
            About Me
          </h2>
        </div>

        {/* Description */}
        <p className="text-lg leading-relaxed text-center text-gray-700 transition-opacity duration-700 opacity-100">
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
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-center transition-opacity duration-700 opacity-100">
          <div className="transition-transform hover:scale-105">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">yuvrajkarna.code@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
