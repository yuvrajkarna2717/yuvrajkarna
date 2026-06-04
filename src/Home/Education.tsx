import { GraduationCap } from "lucide-react";
import AnimationTitle from "./AnimationTitle";

interface Course {
  name: string;
}

interface Degree {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  description: string;
  courses: Course[];
}

// ─── Update with your real education details ──────────────────────────────────
const education: Degree[] = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    institution: "Aditya University", // ← update
    location: "India",
    period: "2021 – 2025",
    grade: "8.11 CGPA", // ← update
    description:
      "Focused on software engineering, algorithms, and data structures. Built multiple academic and personal projects alongside coursework.",
    courses: [
      { name: "Data Structures & Algorithms" },
      { name: "Operating Systems" },
      { name: "Database Management Systems" },
      { name: "Computer Networks" },
      { name: "Software Engineering" },
      { name: "Object-Oriented Programming" },
      { name: "Web Development" },
    ],
  },
];
// ─────────────────────────────────────────────────────────────────────────────

export default function Education() {
  return (
    <section
      id="education"
      className="py-20 px-4 sm:px-6 bg-gray-50 dark:bg-dark-bg"
    >
      <AnimationTitle title="Education" />

      <div className="mt-12 max-w-3xl mx-auto space-y-8">
        {education.map(edu => (
          <div
            key={edu.institution}
            className="p-6 md:p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gray-100 dark:bg-white/10 shrink-0">
                <GraduationCap className="w-6 h-6 text-black dark:text-white" />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="text-lg font-bold text-black dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {edu.field}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
                    {edu.period}
                  </span>
                </div>

                <p className="text-sm font-medium text-black dark:text-white mt-1">
                  {edu.institution}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>📍 {edu.location}</span>
                  {edu.grade && <span>🏆 {edu.grade}</span>}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 leading-relaxed">
                  {edu.description}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    Key Courses
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map(course => (
                      <span
                        key={course.name}
                        className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10"
                      >
                        {course.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
