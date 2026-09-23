import { createContext, useCallback, useContext, useState } from "react";

// ─── Storage ────────────────────────────────────────────────────────────────
// We persist a simple boolean flag in localStorage so the session survives
// page refreshes.  Nothing sensitive is stored: the password itself never
// touches localStorage.
const STORAGE_KEY = "personal_auth";

function readStored(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeStored(value: boolean) {
  try {
    if (value) {
      localStorage.setItem(STORAGE_KEY, "1");
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // localStorage blocked (e.g. private browsing on some browsers) — ignore
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────
interface AuthContextType {
  /** Whether the user has successfully verified their identity this session. */
  isAuthenticated: boolean;
  /**
   * Verify the supplied password against the env-configured secret.
   * Returns `true` on success, `false` on failure (wrong password or env var
   * not configured).
   */
  login: (password: string) => boolean;
  /** Clear the session. */
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

// ─── Provider ────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(readStored);

  const login = useCallback((password: string): boolean => {
    const secret = import.meta.env.VITE_PERSONAL_PASSWORD;

    // Fail-safe: if the env var is missing or empty, deny access so
    // the site doesn't accidentally become open in production.
    if (!secret || typeof secret !== "string" || secret.trim() === "") {
      console.warn(
        "[AuthContext] VITE_PERSONAL_PASSWORD is not set. " +
          "Add it to your .env file to enable the private section."
      );
      return false;
    }

    if (password === secret) {
      writeStored(true);
      setIsAuthenticated(true);
      return true;
    }

    return false;
  }, []);

  const logout = useCallback(() => {
    writeStored(false);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useAuth() {
  return useContext(AuthContext);
}
