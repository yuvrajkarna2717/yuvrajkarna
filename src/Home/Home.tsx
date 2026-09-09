import { lazy, Suspense } from "react";
// Above-the-fold — loaded eagerly
import Hero from "./Hero";
import Navbar from "./Navbar";

// Below-the-fold — lazily loaded in a single deferred chunk
const SkillsSlider = lazy(() => import("./SkillsSlider"));
const StatsSection = lazy(() => import("./StatsSection"));
const OpenSource = lazy(() => import("./OpenSource"));
const Experience = lazy(() => import("./Experience"));
const Project = lazy(() => import("./Project"));
const Education = lazy(() => import("./Education"));
const Certifications = lazy(() => import("./Certifications"));
const Blog = lazy(() => import("./Blog"));
const AboutMe = lazy(() =>
  import("./AboutMe").then(m => ({ default: m.AboutMe }))
);
const Footer = lazy(() => import("./Footer"));
const BackToTop = lazy(() => import("../components/BackToTop"));

// Thin spacer shown while a section's chunk is loading (prevents layout jump)
function SectionFallback() {
  return <div className="h-24" />;
}

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white dark:bg-dark-bg text-black dark:text-white font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0 pointer-events-none" />
      <Navbar />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <SkillsSlider />
        <StatsSection />
        <OpenSource />
        <Experience />
        <Project />
        <Education />
        <Certifications />
        <Blog />
        <AboutMe />
        <Footer />
        <BackToTop />
      </Suspense>
    </main>
  );
}
