import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { BsArrowDown } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SiHappycow } from "react-icons/si";

export default function Hero() {
  return (
    <section className="flex items-center justify-center text-black md:mt-14 mt-10">
      <div className="text-center max-w-3xl px-4 sm:px-10">
        {/* Heading */}

        <div className="flex flex-row justify-center gap-4 items-center group mt-10">
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
          Software Engineer 
        </p>

        {/* About Summary */}
        <p className="text-gray-600 text-lg leading-relaxed mb-8 tracking-widest md:text-xl ">
          I build software that works{" "}
          <span className="text-black font-medium hover:underline hover:cursor-pointer">
            (most of the time)
          </span>{" "}
          — clean, scalable, and user-friendly.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-6 text-2xl text-black mt-12">
          <a
            href="https://github.com/yuvrajkarna2717"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-gray-700 transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/yuvrajkarna"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-gray-700 transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.facebook.com/iamyuvrajkarna"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 hover:text-gray-700 transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://instagram.com/iamyuvrajkarna"
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
        
        {/* Contact Button */}
        <div className="mt-12">
          <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition flex items-center gap-2 mx-auto text-sm md:text-base">
            <FaEnvelope className="flex-shrink-0" />
            <a href="mailto:yuvrajkarna.code@gmail.com" className="break-all">
              <span className="hidden sm:inline">yuvrajkarna.code@gmail.com</span>
              <span className="sm:hidden">Contact Me</span>
            </a>
          </button>
        </div>
        
        {/* Resume Button */}
        <div className="mt-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/story">
              <button className="bg-gray-100 text-black px-6 py-2 rounded-full hover:bg-gray-200 transition border-2 border-gray-300">
                My Story
              </button>
            </Link>
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
              <a
                href="/resume/YuvrajKarna.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center sm:mt-5 md:mt-20 mt-4">
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
