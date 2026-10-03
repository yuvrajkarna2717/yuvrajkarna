import { useEffect, useState } from "react";
import { apiUrl } from "../lib/api";

export interface GitHubData {
  repos: number;
  followers: number;
  stars: number;
}

export interface LeetCodeData {
  total: number;
  easy: number;
  medium: number;
  hard: number;
}

type Status = "loading" | "live" | "error";

interface DevStats {
  github: GitHubData | null;
  githubStatus: Status;
  leetcode: LeetCodeData | null;
  leetcodeStatus: Status;
}

// Single source of truth for the LeetCode cache so Story and StatsSection
// never disagree on the stored shape. (A previous bug had one writing
// `{ data, ts }` and the other reading `{ data, timestamp }`.)
const LEETCODE_CACHE_KEY = "lc_stats_cache_v3";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CacheEntry {
  data: LeetCodeData;
  timestamp: number;
}

function getCachedLeetCode(): LeetCodeData | null {
  try {
    const raw = localStorage.getItem(LEETCODE_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CacheEntry>;
    if (
      !parsed ||
      typeof parsed.timestamp !== "number" ||
      !parsed.data ||
      parsed.data.total === 0
    ) {
      return null;
    }
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null; // expired
    return parsed.data;
  } catch {
    return null;
  }
}

function setCachedLeetCode(data: LeetCodeData) {
  try {
    const entry: CacheEntry = { data, timestamp: Date.now() };
    localStorage.setItem(LEETCODE_CACHE_KEY, JSON.stringify(entry));
  } catch {
    // storage quota exceeded — ignore
  }
}

async function fetchLeetCode(username: string): Promise<LeetCodeData> {
  const res = await fetch(apiUrl(`/api/leetcode/${username}`));
  if (!res.ok) throw new Error(`LeetCode API error ${res.status}`);
  const json = await res.json();
  const data: LeetCodeData = json.solved;
  // All-zero means the user wasn't matched / upstream failed — treat as error
  // so we keep the fallback and never cache zeros.
  if (!data || data.total === 0) {
    throw new Error("LeetCode returned no data");
  }
  return data;
}

async function fetchGitHub(username: string): Promise<GitHubData> {
  const res = await fetch(apiUrl(`/api/github/${username}`));
  if (!res.ok) throw new Error(`GitHub worker error ${res.status}`);
  const json = await res.json();
  const stats: GitHubData = {
    repos: json?.totals?.repos ?? 0,
    followers: json?.totals?.followers ?? 0,
    stars: json?.totals?.stars ?? 0,
  };
  // A fully zeroed response means the worker's GitHub call failed (rate limit).
  if (stats.repos === 0 && stats.followers === 0 && stats.stars === 0) {
    throw new Error("GitHub returned no data");
  }
  return stats;
}

/**
 * Fetches GitHub + LeetCode stats behind the Cloudflare worker, with a
 * cache-first strategy for LeetCode. Shared by StatsSection and Story so the
 * fetch/cache logic lives in exactly one place.
 */
export function useDevStats(
  githubUsername: string,
  leetcodeUsername: string
): DevStats {
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [githubStatus, setGithubStatus] = useState<Status>("loading");
  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null);
  const [leetcodeStatus, setLeetcodeStatus] = useState<Status>("loading");

  useEffect(() => {
    let cancelled = false;

    // ── LeetCode: cache first, fetch only if stale ──────────────────────────
    const cached = getCachedLeetCode();
    if (cached) {
      setLeetcode(cached);
      setLeetcodeStatus("live");
    } else {
      fetchLeetCode(leetcodeUsername)
        .then(data => {
          if (cancelled) return;
          setCachedLeetCode(data);
          setLeetcode(data);
          setLeetcodeStatus("live");
        })
        .catch(() => {
          if (!cancelled) setLeetcodeStatus("error");
        });
    }

    // ── GitHub ──────────────────────────────────────────────────────────────
    fetchGitHub(githubUsername)
      .then(data => {
        if (cancelled) return;
        setGithub(data);
        setGithubStatus("live");
      })
      .catch(() => {
        if (!cancelled) setGithubStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [githubUsername, leetcodeUsername]);

  return { github, githubStatus, leetcode, leetcodeStatus };
}
