import { useEffect, useRef, useState } from "react";
import { Check, Pause, Play, RotateCcw, Square } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { usePageMeta } from "../lib/usePageMeta";

const DEFAULT_STUDY_MINUTES = 50;
const DEFAULT_BREAK_MINUTES = 10;
const DEFAULT_CYCLES = 1;
const MIN_DURATION_MINUTES = 1;
const MAX_DURATION_MINUTES = 180;
const MAX_CYCLES = 20;

type Phase = "study" | "break";

function getPhaseDuration(phase: Phase, studyMinutes: number, breakMinutes: number) {
  return (phase === "study" ? studyMinutes : breakMinutes) * 60;
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
  const remainder = (seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${remainder}`;
}

async function playNotification(audioContext: AudioContext | null) {
  if (!audioContext) return;

  try {
    await audioContext.resume();
  } catch {
    return;
  }

  if (audioContext.state !== "running") return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  const duration = 1.2;

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(660, now);
  oscillator.frequency.setValueAtTime(880, now + 0.18);
  oscillator.frequency.setValueAtTime(660, now + 0.42);
  oscillator.frequency.setValueAtTime(880, now + 0.6);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.16, now + 0.04);
  gain.gain.setValueAtTime(0.16, now + 0.9);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

export default function PomodoroPage() {
  usePageMeta({
    title: "Pomodoro",
    description: "A simple 50-minute study and 10-minute break timer.",
    path: "/pomodoro",
    noindex: true,
  });

  const [phase, setPhase] = useState<Phase>("study");
  const [studyMinutes, setStudyMinutes] = useState(DEFAULT_STUDY_MINUTES);
  const [breakMinutes, setBreakMinutes] = useState(DEFAULT_BREAK_MINUTES);
  const [cycleCount, setCycleCount] = useState(DEFAULT_CYCLES);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(DEFAULT_STUDY_MINUTES * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setSecondsRemaining(current => {
        if (current > 1) return current - 1;

        const nextPhase = phase === "study" ? "break" : "study";
        setPhase(nextPhase);
        void playNotification(audioContextRef.current);

        if (phase === "break") {
          const nextCompletedCycles = completedCycles + 1;
          setCompletedCycles(nextCompletedCycles);

          if (nextCompletedCycles >= cycleCount) {
            setIsRunning(false);
            setHasStarted(false);
            setSessionComplete(true);
            setPhase("study");
            return getPhaseDuration("study", studyMinutes, breakMinutes);
          }
        }

        return getPhaseDuration(nextPhase, studyMinutes, breakMinutes);
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [breakMinutes, completedCycles, cycleCount, isRunning, phase, studyMinutes]);

  useEffect(() => {
    return () => {
      void audioContextRef.current?.close();
    };
  }, []);

  const ensureAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioContextConstructor =
        window.AudioContext ??
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextConstructor) return;
      audioContextRef.current = new AudioContextConstructor();
    }
    void audioContextRef.current.resume();
  };

  const startOrResume = () => {
    ensureAudioContext();
    if (sessionComplete) {
      setCompletedCycles(0);
      setPhase("study");
      setSecondsRemaining(studyMinutes * 60);
      setSessionComplete(false);
    }
    setHasStarted(true);
    setIsRunning(true);
  };

  const updateDuration = (durationPhase: Phase, rawValue: string) => {
    const nextMinutes = Math.min(
      MAX_DURATION_MINUTES,
      Math.max(MIN_DURATION_MINUTES, Number(rawValue) || MIN_DURATION_MINUTES)
    );

    if (durationPhase === "study") {
      setStudyMinutes(nextMinutes);
      if (!hasStarted && phase === "study") setSecondsRemaining(nextMinutes * 60);
      return;
    }

    setBreakMinutes(nextMinutes);
  };

  const updateCycleCount = (rawValue: string) => {
    const nextCycles = Math.min(MAX_CYCLES, Math.max(MIN_DURATION_MINUTES, Number(rawValue) || MIN_DURATION_MINUTES));
    setCycleCount(nextCycles);
  };

  const reset = () => {
    setIsRunning(false);
    setHasStarted(false);
    setSessionComplete(false);
    setPhase("study");
    setCompletedCycles(0);
    setSecondsRemaining(studyMinutes * 60);
    void audioContextRef.current?.close();
    audioContextRef.current = null;
  };

  const phaseDuration = getPhaseDuration(phase, studyMinutes, breakMinutes);
  const progress = ((phaseDuration - secondsRemaining) / phaseDuration) * 100;
  const stateLabel = !hasStarted ? "Ready" : isRunning ? "Running" : "Paused";
  const phaseLabel = phase === "study" ? "Study" : "Break";

  return (
    <div className="min-h-screen bg-white text-black dark:bg-dark-bg dark:text-white">
      <div className="flex w-full items-center justify-between px-4 py-6 sm:px-6 sm:py-8 md:px-12">
        <Link
          to="/"
          className="text-sm text-gray-500 transition hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          <span aria-hidden="true">←</span> Back home
        </Link>
        <ThemeToggle />
      </div>

      <main className="mx-auto flex max-w-3xl justify-center px-6 pb-20 pt-10 sm:pt-16">
        <section className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                Focus timer
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">Pomodoro</h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className={`h-2 w-2 rounded-full ${isRunning ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"}`} />
              {stateLabel}
            </div>
          </div>

          <div className="mt-8 grid gap-3 border-y border-gray-200 py-4 dark:border-white/10 sm:grid-cols-3">
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Study minutes
              <input
                type="number"
                min={MIN_DURATION_MINUTES}
                max={MAX_DURATION_MINUTES}
                value={studyMinutes}
                onChange={event => updateDuration("study", event.target.value)}
                disabled={hasStarted}
                className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black outline-none transition focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/40"
                aria-label="Study duration in minutes"
              />
            </label>
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Break minutes
              <input
                type="number"
                min={MIN_DURATION_MINUTES}
                max={MAX_DURATION_MINUTES}
                value={breakMinutes}
                onChange={event => updateDuration("break", event.target.value)}
                disabled={hasStarted}
                className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black outline-none transition focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/40"
                aria-label="Break duration in minutes"
              />
            </label>
            <label className="text-sm text-gray-500 dark:text-gray-400">
              Cycles
              <input
                type="number"
                min={MIN_DURATION_MINUTES}
                max={MAX_CYCLES}
                value={cycleCount}
                onChange={event => updateCycleCount(event.target.value)}
                disabled={hasStarted}
                className="mt-2 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-black outline-none transition focus:border-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-white/40"
                aria-label="Number of Pomodoro cycles"
              />
            </label>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-gray-500 dark:border-white/10 dark:text-gray-400">
              {sessionComplete ? <Check className="h-3.5 w-3.5" /> : phase === "study" ? <Check className="h-3.5 w-3.5" /> : <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />}
              {sessionComplete ? "Complete" : phaseLabel}
            </div>
            <p className="mt-5 font-mono text-7xl font-semibold tracking-tight sm:text-8xl" aria-live="polite">
              {formatTime(secondsRemaining)}
            </p>
            <div className="mx-auto mt-7 h-1.5 max-w-sm overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
              <div
                className={`h-full rounded-full transition-[width] duration-500 ${phase === "study" ? "bg-black dark:bg-white" : "bg-amber-400"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {sessionComplete
                ? `${cycleCount} ${cycleCount === 1 ? "cycle" : "cycles"} completed`
                : phase === "study"
                ? `${studyMinutes} minutes of focused work`
                : `${breakMinutes} minutes to recharge`}
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400 dark:text-gray-500">
            {completedCycles} of {cycleCount} {cycleCount === 1 ? "cycle" : "cycles"} completed
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={startOrResume}
              disabled={isRunning}
              className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              <Play className="h-4 w-4" />
              {hasStarted ? "Resume" : "Start"}
            </button>
            <button
              type="button"
              onClick={() => setIsRunning(false)}
              disabled={!isRunning}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium transition hover:border-gray-400 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:hover:border-white/30"
            >
              <Pause className="h-4 w-4" /> Pause
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:border-gray-400 hover:text-black dark:border-white/10 dark:text-gray-300 dark:hover:border-white/30 dark:hover:text-white"
            >
              {hasStarted ? <Square className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
              {hasStarted ? "End" : "Reset"}
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
            The next phase starts automatically when the timer reaches zero.
          </p>
        </section>
      </main>
    </div>
  );
}