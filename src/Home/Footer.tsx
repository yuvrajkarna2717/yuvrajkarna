import { FcLike } from "react-icons/fc";
import yuvrajImageSrc from "../assets/yuvraj-image.jpg";

export default function Footer() {
  return (
    <footer className="md:px-6 md:py-8 py-6 text-center text-black md:pb-20">
      <div className="flex flex-row items-center justify-center gap-3 sm:gap-2 text-xl sm:text-2xl">
        <p className="flex items-center gap-2">
          Made with <FcLike className="w-6 h-6" /> by
        </p>
        <a
          href="https://www.linkedin.com/in/yuvrajkarna" // Replace with your actual LinkedIn
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-semibold hover:underline ml-0"
        >
          Yuvraj
          <img
            src={yuvrajImageSrc}
            alt="Yuvraj Karna"
            className="w-8 h-8 rounded-full object-cover border-2 border-black"
          />
        </a>
      </div>
    </footer>
  );
}
