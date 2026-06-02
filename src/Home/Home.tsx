import { AboutMe } from "./AboutMe";
import Experience from "./Experience";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import OpenSource from "./OpenSource";
import Project from "./Project";
import SkillsSlider from "./SkillsSlider";
import StatsSection from "./StatsSection";
import Timeline from "./Timeline";
import Education from "./Education";
import Certifications from "./Certifications";
import NowSection from "./NowSection";
import Blog from "./Blog";
import BackToTop from "../components/BackToTop";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white dark:bg-dark-bg text-black dark:text-white font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0 pointer-events-none" />
      <Navbar />
      <Hero />
      <SkillsSlider />
      <StatsSection />
      <Timeline />
      <OpenSource />
      <Experience />
      <Project />
      <Education />
      <Certifications />
      <NowSection />
      <Blog />
      <AboutMe />
      <Footer />
      <BackToTop />
    </main>
  );
}

