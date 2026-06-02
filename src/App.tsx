import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Story from "./Home/Story";
import NotFound from "./pages/NotFound";
import Uses from "./pages/Uses";
import CommandPalette from "./components/CommandPalette";
import TerminalMode from "./components/TerminalMode";
import CursorTrail from "./components/CursorTrail";
import Confetti from "./components/Confetti";
import { useKonami } from "./hooks/useKonami";

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/uses" element={<Uses />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <CursorTrail />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
      <TerminalMode isOpen={termOpen} onClose={() => setTermOpen(false)} />
      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}
    </>
  );
}
