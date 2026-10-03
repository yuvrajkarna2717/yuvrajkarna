import { type FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import { useAuth } from "../context/AuthContext";
import { usePageMeta } from "../lib/usePageMeta";

export default function PersonalPage() {
  usePageMeta({ title: "Personal", path: "/personal", noindex: true });

  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Destination to redirect to after login — default to /track
  const from = (location.state as { from?: string } | null)?.from ?? "/track";

  // If already authenticated, skip the gate and send to the intended destination
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = login(password);
    if (ok) {
      navigate(from, { replace: true });
    } else {
      setError("Incorrect password. Try again.");
      setPassword("");
      // Shake animation feedback
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft size={15} />
          Home
        </Link>
        <ThemeToggle />
      </header>

      {/* Centered card */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Lock icon */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800">
              <Lock size={22} className="text-gray-700 dark:text-gray-300" />
            </span>
          </div>

          <h1 className="text-2xl font-semibold text-center mb-1">Private area</h1>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8">
            Enter the password to access personal tools.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div
              className={`relative transition-transform ${shaking ? "animate-shake" : ""}`}
            >
              <input
                ref={inputRef}
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Password"
                aria-label="Password"
                aria-describedby={error ? "password-error" : undefined}
                aria-invalid={!!error}
                className={[
                  "w-full px-4 py-2.5 pr-10 rounded-lg border text-sm",
                  "bg-white dark:bg-gray-800",
                  "placeholder-gray-400 dark:placeholder-gray-500",
                  "focus:outline-none focus:ring-2",
                  error
                    ? "border-red-400 dark:border-red-500 focus:ring-red-300 dark:focus:ring-red-700"
                    : "border-gray-300 dark:border-gray-700 focus:ring-gray-300 dark:focus:ring-gray-600",
                ].join(" ")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p
                id="password-error"
                role="alert"
                className="mt-2 text-xs text-red-500 dark:text-red-400"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={password.length === 0}
              className="mt-4 w-full py-2.5 rounded-lg text-sm font-medium
                bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900
                hover:bg-gray-700 dark:hover:bg-white
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-gray-700 dark:focus:ring-gray-300"
            >
              Unlock
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
