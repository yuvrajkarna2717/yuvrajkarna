import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
import AnimationTitle from "../Home/AnimationTitle";
import { usePageMeta } from "../lib/usePageMeta";

interface Certificate {
  name: string;
  /** Public URL to view/verify the credential. */
  certificate: string;
  issuedDate: string;
}

const certificates: Certificate[] = [
  {
    name: "Problem Solving (Intermediate)",
    certificate: "https://www.hackerrank.com/certificates/8928457760d7",
    issuedDate: "August 2025",
  },
  {
    name: "Foundational C# with Microsoft",
    certificate:
      "https://www.freecodecamp.org/certification/yuvrajkarna27/foundational-c-sharp-with-microsoft",
    issuedDate: "June 2025",
  },
  {
    name: "Frontend Developer (React)",
    certificate: "https://www.hackerrank.com/certificates/ff6b5d6d6b7c",
    issuedDate: "May 2025",
  },
  {
    name: "Software Engineer Intern",
    certificate: "https://www.hackerrank.com/certificates/47ab48c12a0b",
    issuedDate: "May 2025",
  },
  {
    name: "REST API (Intermediate)",
    certificate: "https://www.hackerrank.com/certificates/f44631b8cdcd",
    issuedDate: "July 2024",
  },
  {
    name: "React (Basic)",
    certificate: "https://www.hackerrank.com/certificates/8af9b9872743",
    issuedDate: "June 2024",
  },
  {
    name: "Red Hat Certified System Administrator (RHCSA)",
    certificate:
      "https://www.credly.com/badges/296b765d-9d09-417f-87c6-6a59504f5d3c/public_url",
    issuedDate: "July 2023",
  },
  {
    name: "JavaScript (Basic)",
    certificate: "https://www.hackerrank.com/certificates/c1a824b5d595",
    issuedDate: "August 2023",
  },
  {
    name: "Problem Solving (Basic)",
    certificate: "https://www.hackerrank.com/certificates/4e51a141222a",
    issuedDate: "March 2023",
  },
  {
    name: "IT Specialist - Python",
    certificate:
      "https://www.credly.com/badges/b481e45c-facb-4522-a1d2-4a8fad7b90d7/public_url",
    issuedDate: "June 2022",
  },
];

/** Derive the issuer from the credential host so we don't duplicate data. */
function issuerFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("hackerrank")) return "HackerRank";
    if (host.includes("freecodecamp")) return "freeCodeCamp";
    if (host.includes("credly")) return "Credly";
    return host;
  } catch {
    return "Credential";
  }
}

/** Parse "Month YYYY" into a sortable timestamp (newest first). */
function dateValue(issued: string): number {
  const parsed = Date.parse(`1 ${issued}`);
  return Number.isNaN(parsed) ? 0 : parsed;
}

const sortedCertificates = [...certificates].sort(
  (a, b) => dateValue(b.issuedDate) - dateValue(a.issuedDate)
);

export default function Certificates() {
  usePageMeta({
    title: "Certificates",
    description:
      "Verified certifications earned by Yuvraj Karna across problem solving, frontend development, REST APIs, Python, and Linux system administration.",
    path: "/certificates",
  });

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-black dark:text-white">
      {/* Top bar */}
      <div className="w-full px-4 sm:px-6 md:px-12 py-6 sm:py-8 flex items-center justify-between">
        <Link
          to="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
        >
          ← Back home
        </Link>
        <ThemeToggle />
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-20">
        <AnimationTitle title="Certificates" />
        <p className="text-gray-500 dark:text-gray-400 text-lg mt-6 mb-12 text-center max-w-2xl mx-auto">
          {sortedCertificates.length} verified credentials — every one links
          straight to the issuer so you can check it yourself.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCertificates.map(cert => (
            <li key={cert.certificate}>
              <a
                href={cert.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                    {issuerFromUrl(cert.certificate)}
                  </span>
                  <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors shrink-0 mt-0.5" />
                </div>

                <h2 className="font-semibold text-black dark:text-white text-base leading-snug mb-auto">
                  {cert.name}
                </h2>

                <div className="flex items-center justify-between pt-5 mt-5 border-t border-gray-200 dark:border-white/10">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {cert.issuedDate}
                  </span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                    Verify ↗
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
