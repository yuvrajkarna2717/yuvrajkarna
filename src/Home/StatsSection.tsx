import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import AnimationTitle from "./AnimationTitle";
import { useDevStats } from "../hooks/useDevStats";

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node || target === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            // ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, nodeRef };
}

function StatCard({
  label,
  value,
  suffix = "",
  description,
}: {
  label: string;
  value: number | null;
  suffix?: string;
  description?: string;
}) {
  const { count, nodeRef } = useCountUp(value ?? 0);
  return (
    <div
      ref={nodeRef}
      className="text-center p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all"
    >
      <p className="text-4xl font-bold text-black dark:text-white mb-1 font-mono tabular-nums">
        {value === null ? "—" : `${count.toLocaleString()}${suffix}`}
      </p>
      <p className="text-sm font-medium text-black dark:text-white">{label}</p>
      {description && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
          {description}
        </p>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: "loading" | "live" | "error" }) {
  if (status === "live") {
    return (
      <span className="text-xs text-green-500 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
        live
      </span>
    );
  }
  if (status === "loading") {
    return (
      <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-white/20 inline-block animate-pulse" />
        loading
      </span>
    );
  }
  return (
    <span className="text-xs text-amber-500 flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
      showing last known
    </span>
  );
}

export default function StatsSection() {
  const { github, githubStatus, leetcode, leetcodeStatus } = useDevStats(
    "yuvrajkarna2717",
    "yuvrajkarna"
  );

  return (
    <section id="stats" className="py-20 px-4 sm:px-6 bg-white dark:bg-dark-bg">
      <AnimationTitle title="By the Numbers" />
      <p className="text-gray-500 dark:text-gray-400 mt-4 mb-12 text-center max-w-xl mx-auto">
        Metrics that tell the story better than words.
      </p>

      {/* GitHub */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-2 mb-4">
          <FaGithub className="w-5 h-5" />
          <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
            GitHub
          </h3>
          <StatusBadge status={githubStatus} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Public Repos"
            value={github?.repos ?? null}
            description="Open-source projects"
          />
          <StatCard
            label="GitHub Stars"
            value={github?.stars ?? null}
            description="Across all repos"
          />
          <StatCard
            label="Followers"
            value={github?.followers ?? null}
            description="On GitHub"
          />
        </div>
      </div>

      {/* LeetCode */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <SiLeetcode className="w-5 h-5" />
          <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
            LeetCode
          </h3>
          <StatusBadge status={leetcodeStatus} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            label="Total Solved"
            value={leetcode?.total ?? null}
            suffix="+"
            description="Problems solved"
          />
          <StatCard
            label="Easy"
            value={leetcode?.easy ?? null}
            suffix="+"
            description="Easy problems"
          />
          <StatCard
            label="Medium"
            value={leetcode?.medium ?? null}
            suffix="+"
            description="Medium problems"
          />
          <StatCard
            label="Hard"
            value={leetcode?.hard ?? null}
            suffix="+"
            description="Hard problems"
          />
        </div>
      </div>
    </section>
  );
}
