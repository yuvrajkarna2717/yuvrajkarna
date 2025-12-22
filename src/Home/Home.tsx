import { AboutMe } from "./AboutMe";
import Experience from "./Experience";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import OpenSource from "./OpenSource";
import Project from "./Project";
import SkillsSlider from "./SkillsSlider";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white text-white font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0 pointer-events-none" />
      <Navbar />
      <Hero />
      <SkillsSlider />
      <OpenSource />
      <Experience />
      <Project />
      <AboutMe />
      <Footer />
    </main>
  );
}
