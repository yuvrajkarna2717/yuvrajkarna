import { ExternalLink } from "lucide-react";
import AnimationTitle from "./AnimationTitle";

interface Certification {
  name: string;
  issuer: string;
  date: string;
  imageUrl: string; // badge/certificate image URL
  credentialUrl: string; // link to verify the credential
  skills: string[];
}

// ─── Replace with your real certifications ───────────────────────────────────
// imageUrl: a direct URL to the badge image (Credly, Coursera, etc.)
// credentialUrl: link to verify/view the certificate
const certifications: Certification[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    imageUrl:
      "https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png",
    credentialUrl:
      "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    skills: ["AWS", "Cloud Computing", "S3", "EC2", "IAM"],
  },
  {
    name: "Meta Front-End Developer Certificate",
    issuer: "Meta (Coursera)",
    date: "2023",
    imageUrl:
      "https://images.credly.com/size/340x340/images/e91ed0b0-842b-417f-8d2f-b07535febdda/image.png",
    credentialUrl:
      "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    skills: ["React", "JavaScript", "HTML/CSS", "UX/UI"],
  },
  {
    name: "Google IT Automation with Python",
    issuer: "Google (Coursera)",
    date: "2022",
    imageUrl:
      "https://images.credly.com/size/340x340/images/efbdc0d6-b46e-4e3c-8cf8-2314d8a5b971/GCC_badge_IT_Support_1000x1000.png",
    credentialUrl:
      "https://www.coursera.org/professional-certificates/google-it-automation",
    skills: ["Python", "Automation", "Git", "Linux", "Cloud"],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

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
        {certifications.map(cert => (
          <a
            key={cert.name}
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-all duration-200 hover:-translate-y-1"
          >
            {/* Badge image + external link icon */}
            <div className="flex items-start justify-between mb-4">
              <img
                src={cert.imageUrl}
                alt={`${cert.name} badge`}
                className="w-16 h-16 object-contain rounded-lg"
                onError={e => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors shrink-0 mt-1" />
            </div>

            <h3 className="font-semibold text-black dark:text-white text-sm leading-snug mb-1">
              {cert.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {cert.issuer}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              {cert.date}
            </p>

            <div className="mt-auto flex flex-wrap gap-1">
              {cert.skills.map(skill => (
                <span
                  key={skill}
                  className="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
