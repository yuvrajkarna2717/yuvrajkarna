import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CommandPalette from "./components/CommandPalette";
import TerminalMode from "./components/TerminalMode";
import CursorTrail from "./components/CursorTrail";
import Confetti from "./components/Confetti";
import ErrorBoundary from "./components/ErrorBoundary";
import PrivateRoute from "./components/PrivateRoute";
import { useKonami } from "./hooks/useKonami";

// Route-level code splitting — each page is a separate chunk
const Home = lazy(() => import("./Home/Home"));
const Story = lazy(() => import("./Home/Story"));
const Uses = lazy(() => import("./pages/Uses"));
const Certificates = lazy(() => import("./pages/Certificates"));
const BlogList = lazy(() => import("./pages/BlogList"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PersonalPage = lazy(() => import("./pages/PersonalPage"));
const TrackPage = lazy(() => import("./pages/TrackPage"));
const PomodoroPage = lazy(() => import("./pages/PomodoroPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-800 dark:border-gray-700 dark:border-t-white rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [termOpen, setTermOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Konami code → confetti 🎉
  useKonami(useCallback(() => setShowConfetti(true), []));

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K → command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(open => !open);
        setTermOpen(false);
      }
      // Backtick → terminal (ignore when typing in inputs)
      if (e.key === "`" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const active = document.activeElement;
        if (
          active instanceof HTMLInputElement ||
          active instanceof HTMLTextAreaElement
        )
          return;
        setTermOpen(open => !open);
        setCmdOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/story" element={<Story />} />
            <Route path="/uses" element={<Uses />} />
            <Route path="/certificates" element={<Certificates />} />
            {/* Private entry point — password gate */}
            <Route path="/personal" element={<PersonalPage />} />
            {/* Protected routes — redirect to /personal when unauthenticated */}
            <Route
              path="/track"
              element={
                <PrivateRoute>
                  <TrackPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/pomodoro"
              element={
                <PrivateRoute>
                  <PomodoroPage />
                </PrivateRoute>
              }
            />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>

      <CursorTrail />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <TerminalMode isOpen={termOpen} onClose={() => setTermOpen(false)} />
      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}
    </>
  );
}
