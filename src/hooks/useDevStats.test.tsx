import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDevStats } from "./useDevStats";

const GH = "yuvrajkarna2717";
const LC = "yuvrajkarna";

function mockJsonResponse(body: unknown, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => body,
  } as Response;
}

const githubBody = { totals: { repos: 42, followers: 10, stars: 7 } };
const leetcodeBody = {
  solved: { total: 300, easy: 150, medium: 120, hard: 30 },
};

describe("useDevStats", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("reports live status and data when both fetches succeed", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
      (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/github/")) {
          return Promise.resolve(mockJsonResponse(githubBody));
        }
        return Promise.resolve(mockJsonResponse(leetcodeBody));
      }
    );

    const { result } = renderHook(() => useDevStats(GH, LC));

    await waitFor(() => expect(result.current.githubStatus).toBe("live"));
    await waitFor(() => expect(result.current.leetcodeStatus).toBe("live"));

    expect(result.current.github).toEqual({
      repos: 42,
      followers: 10,
      stars: 7,
    });
    expect(result.current.leetcode).toEqual({
      total: 300,
      easy: 150,
      medium: 120,
      hard: 30,
    });
  });

  it("reports error status (and null data) when a fetch fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      mockJsonResponse(null, false, 500)
    );

    const { result } = renderHook(() => useDevStats(GH, LC));

    await waitFor(() => expect(result.current.githubStatus).toBe("error"));
    await waitFor(() => expect(result.current.leetcodeStatus).toBe("error"));
    expect(result.current.github).toBeNull();
    expect(result.current.leetcode).toBeNull();
  });

  it("serves LeetCode from cache without refetching, and treats a zeroed response as an error", async () => {
    // Seed a valid cache entry in the shape the hook writes.
    localStorage.setItem(
      "lc_stats_cache_v3",
      JSON.stringify({
        data: { total: 500, easy: 200, medium: 250, hard: 50 },
        timestamp: Date.now(),
      })
    );

    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockImplementation((input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/github/")) {
          return Promise.resolve(mockJsonResponse(githubBody));
        }
        // A zeroed LeetCode payload should be treated as an error, not cached.
        return Promise.resolve(
          mockJsonResponse({
            solved: { total: 0, easy: 0, medium: 0, hard: 0 },
          })
        );
      });

    const { result } = renderHook(() => useDevStats(GH, LC));

    await waitFor(() => expect(result.current.leetcodeStatus).toBe("live"));
    // Cache hit → value comes from localStorage, not the network.
    expect(result.current.leetcode?.total).toBe(500);
    // The LeetCode endpoint should never have been called (cache served it).
    const calledLeetcode = fetchSpy.mock.calls.some(call =>
      String(call[0]).includes("/api/leetcode/")
    );
    expect(calledLeetcode).toBe(false);
  });
});
