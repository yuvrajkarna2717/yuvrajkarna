import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  help          — show this menu
  ls            — list sections
  cat about     — about Yuvraj
  cat skills    — list tech skills
  open github   — open GitHub profile
  open linkedin — open LinkedIn
  open resume   — view resume PDF
  whoami        — who am I?
  clear         — clear the terminal
  exit          — close terminal`,

  ls: `~/portfolio
├── about        (Software Engineer, India)
├── skills       (JS, React, Node.js, TypeScript...)
├── experience   (Iquadra Information Services)
├── projects     (Mora, OpenBooks API, QuickRev Bot...)
├── open-source  (LangChain.js, Kestra, ExpenTable)
├── blog         (Writing about things I've built)
└── timeline     (2021 → present)`,

  "cat about": `Name     :  Yuvraj Karna
Role     :  Software Engineer
Based    :  India (Remote-ready)
Email    :  yuvrajkarna.code@gmail.com
GitHub   :  github.com/yuvrajkarna2717
LeetCode :  1000+ problems solved
Status   :  Open to opportunities`,

  "cat skills": `Frontend  :  React.js, Next.js, TypeScript, TailwindCSS
Backend   :  Node.js, Express.js, Nest.js
Database  :  PostgreSQL, MongoDB, Redis
Tools     :  Docker, Git, GitHub Actions, Jest, CI/CD
Cloud     :  AWS, Firebase`,

  whoami: "guest@yuvrajkarna.dev",

  "open github": "__OPEN__https://github.com/yuvrajkarna2717",
  "open linkedin": "__OPEN__https://linkedin.com/in/yuvrajkarna",
  "open resume": "__OPEN__/resume/YuvrajKarna.pdf",
};

interface Line {
  type: "input" | "output" | "error";
  text: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function TerminalMode({ isOpen, onClose }: Props) {
  const [lines, setLines] = useState<Line[]>([
    {
      type: "output",
      text: 'Welcome to yuvraj@portfolio. Type "help" to get started.',
    },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 10);
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    if (trimmed === "clear") {
      setLines([
        {
          type: "output",
          text: 'Terminal cleared. Type "help" to start.',
        },
      ]);
      setInput("");
      return;
    }

    if (trimmed === "exit") {
      onClose();
      return;
    }

    const newLines: Line[] = [{ type: "input", text: cmd }];
    const result = COMMANDS[trimmed];

    if (result) {
      if (result.startsWith("__OPEN__")) {
        const url = result.replace("__OPEN__", "");
        window.open(url, "_blank");
        newLines.push({ type: "output", text: `Opening ${url}...` });
      } else {
        newLines.push({ type: "output", text: result });
      }
    } else if (trimmed !== "") {
      newLines.push({
        type: "error",
        text: `command not found: ${trimmed}. Type "help" for available commands.`,
      });
    }

    setLines(prev => [...prev, ...newLines]);
    setInput("");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-gray-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden font-mono text-sm">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
            aria-label="Close terminal"
          />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-xs text-gray-400">
            yuvraj@portfolio — bash
          </span>
        </div>

        {/* Output */}
        <div className="h-72 overflow-y-auto p-4 space-y-1">
          {lines.map((line, i) => (
            <div key={i}>
              {line.type === "input" ? (
                <p className="text-white">
                  <span className="text-green-400">yuvraj@portfolio</span>
                  <span className="text-gray-400">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-gray-400">$ </span>
                  {line.text}
                </p>
              ) : line.type === "error" ? (
                <p className="text-red-400">{line.text}</p>
              ) : (
                <p className="text-gray-300 whitespace-pre-wrap">{line.text}</p>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input row */}
        <div className="flex items-center px-4 py-3 border-t border-white/10 bg-black/20">
          <span className="text-green-400">yuvraj@portfolio</span>
          <span className="text-gray-400">:</span>
          <span className="text-blue-400">~</span>
          <span className="text-gray-400 mr-2">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") handleCommand(input);
            }}
            className="flex-1 bg-transparent text-white outline-none caret-green-400"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
