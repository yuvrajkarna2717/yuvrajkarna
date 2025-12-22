import { FcLike } from "react-icons/fc";
import { SiHappycow } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="md:px-6 md:pt-8 pt-6 text-center text-black md:pb-6 pb-6">
      <div className="flex flex-row items-center justify-center gap-2 text-xl sm:text-2xl">
        <p className="flex items-center gap-2">
          Crafted with <FcLike className="w-5 h-5" /> and passion by
        </p>
        <a
          href="https://www.linkedin.com/in/yuvrajkarna"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
        >
          Yuvraj
        </a>
        <SiHappycow className="w-6 h-6 transition-all duration-300 group-hover:scale-125 group-hover:rotate-6 group-hover:translate-x-2 group-hover:-translate-y-2" />
      </div>
    </footer>
  );
}
