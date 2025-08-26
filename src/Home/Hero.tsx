import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { BsArrowDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SiHappycow } from "react-icons/si";

export default function Hero() {
  return (
    <section className="flex items-center justify-center text-black md:mt-14 mt-10">
      <div className="text-center max-w-2xl px-4 sm:px-10">
        {/* Heading */}

        <div className="flex flex-row justify-center gap-4 items-center group">
          <p className="md:text-5xl sm:text-2xl text-2xl text-gray-600 font-light mb-4">
            Hi, I'm{" "}
            <a
              href="https://www.linkedin.com/in/yuvrajkarna27"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block cursor-pointer"
            >
              <span className="text-black font-semibold">Yuvraj Karna</span>
              {/* underline effect on hover */}
              <span className="absolute left-0 -bottom-1 w-full h-1 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
          </p>

          {/* For mobile screens only */}
          <SiHappycow className="block md:hidden w-12 h-12 animate-wiggle transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 group-hover:translate-x-2 group-hover:-translate-y-2" />

          {/* For md and above */}
          <SiHappycow className="hidden md:block w-12 h-12 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 group-hover:translate-x-2 group-hover:-translate-y-2" />
        </div>

        <p className="md:text-3xl sm:text-2xl text-xl font-normal mb-6 tracking-widest">
          Software Engineer • Full Stack Developer
        </p>

        {/* About Summary */}
        <p className="text-gray-600 text-lg leading-relaxed mb-8 tracking-widest md:text-xl py-4">
          I specialize in{" "}
          <span className="text-black font-medium hover:underline">
            scalable, clean, and user-focused web applications
          </span>{" "}
          that merge{" "}
          <span className="text-black font-medium hover:underline">
            technical excellence
          </span>{" "}
          with{" "}
          <span className="text-black font-medium hover:underline">
            great design.
          </span>
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-2xl text-black">
          <a
            href="https://github.com/yuvrajkarna2717"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-gray-700 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/yuvrajkarna27"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-gray-700 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://facebook.com/yuvraj.karna.9"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-gray-700 transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com/yuvrajkarna_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-gray-700 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/yuvrajkarna"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-gray-700 transition"
          >
            <FaTwitter />
          </a>
        </div>
        <div className="flex justify-around items-center gap-6 mt-10">
          <button
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
            aria-label="Resume"
          >
            <a
              href="/resume/YuvrajKarna.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </button>
          <button type="button" aria-label="Contact Me">
            <a
              href="mailto:yuvrajkarna.code@gmail.com"
              className="bg-black text-white px-6 py-2 mt-10 rounded-full hover:bg-gray-800 transition"
            >
              Contact Me
            </a>
          </button>
        </div>

        <div className="flex items-center justify-center sm:mt-5 lg:mt-10 mt-4">
          <button className="flex flex-col justify-center items-center gap-3">
            <Link to="/about" className="text-black text-md hover:underline">
              See more about me
            </Link>
            <div className="text-black text-3xl mt-1">
              <BsArrowDown className="animate-arrow-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
