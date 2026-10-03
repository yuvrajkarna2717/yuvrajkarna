import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import AnimationTitle from "./AnimationTitle";

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

// A short, real preview — the full list lives on /certificates.
const featured: Certification[] = [
  {
    name: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    date: "August 2025",
    credentialUrl: "https://www.hackerrank.com/certificates/8928457760d7",
  },
  {
    name: "Foundational C# with Microsoft",
    issuer: "freeCodeCamp",
    date: "June 2025",
    credentialUrl:
      "https://www.freecodecamp.org/certification/yuvrajkarna27/foundational-c-sharp-with-microsoft",
  },
  {
    name: "Red Hat Certified System Administrator (RHCSA)",
    issuer: "Credly",
    date: "July 2023",
    credentialUrl:
      "https://www.credly.com/badges/296b765d-9d09-417f-87c6-6a59504f5d3c/public_url",
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="py-20 px-4 sm:px-6 bg-white dark:bg-dark-bg"
    >
      <AnimationTitle title="Certifications" />
      <p className="text-gray-500 dark:text-gray-400 mt-4 mb-10 text-center max-w-xl mx-auto">
        Credentials that validate what I know — and pushed me to learn more.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {featured.map(cert => (
          <a
            key={cert.name}
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                {cert.issuer}
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors shrink-0 mt-0.5" />
            </div>

            <h3 className="font-semibold text-black dark:text-white text-base leading-snug mb-auto">
              {cert.name}
            </h3>

            <p className="text-xs text-gray-400 dark:text-gray-500 pt-5 mt-5 border-t border-gray-200 dark:border-white/10">
              {cert.date}
            </p>
          </a>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          to="/certificates"
          className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-300 dark:border-white/25 text-sm font-medium hover:border-gray-500 dark:hover:border-white/50 transition"
        >
          View all certificates
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
