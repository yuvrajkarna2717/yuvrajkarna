import React, { useState } from "react";

interface Contribution {
  project: string;
  organization: string;
  contribution: string;
  language: string;
  url: string;
  type: string;
  status: "Closed" | "Open";
}

const contributions: Contribution[] = [
  {
    project: "ExpenTable",
    organization: "Blankscreen-exe",
    contribution: "Enhanced UI components and improved user experience",
    language: "JavaScript",
    url: "https://github.com/Blankscreen-exe/ExpenTable/pull/24",
    type: "Feature",
    status: "Closed",
  },
  {
    project: "ExpenTable",
    organization: "Blankscreen-exe",
    contribution:
      "Fixed re-rendering issues and improved performance by adding lazy loading",
    language: "JavaScript",
    url: "https://github.com/Blankscreen-exe/ExpenTable/pull/26",
    type: "Bug Fix & Performance",
    status: "Closed",
  },
  {
    project: "Kestra",
    organization: "Kestra.io",
    contribution: "Refactor of a component to improve maintainability",
    language: "JavaScript",
    url: "https://github.com/kestra-io/kestra/pull/13125",
    type: "Refactor",
    status: "Closed",
  },
  {
    project: "LangChain.js",
    organization: "LangChain AI",
    contribution: "Identified and reported documentation issues",
    language: "TypeScript",
    url: "https://github.com/langchain-ai/langchainjs/issues/9309",
    type: "Documentation",
    status: "Closed",
  },
];

const OpenSource: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Open" | "Closed">("Closed");

  const openContributions = contributions.filter(c => c.status === "Open");
  const closedContributions = contributions.filter(c => c.status === "Closed");
  const currentContributions =
    activeTab === "Open" ? openContributions : closedContributions;

  const ContributionRow: React.FC<{ contribution: Contribution }> = ({
    contribution,
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-3.5 -mx-2 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-medium text-sm">{contribution.project}</span>
          <span className="text-gray-300 dark:text-gray-600">·</span>
          <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {contribution.organization}
          </span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
          {contribution.contribution}
        </p>
      </div>
      <div className="shrink-0 flex items-center gap-3">
        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 whitespace-nowrap">
          {contribution.type}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-black dark:bg-white shrink-0" />
          <span className="text-xs text-gray-500 dark:text-gray-400">{contribution.language}</span>
        </div>
        <a
          href={contribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors whitespace-nowrap"
        >
          View PR →
        </a>
      </div>
    </div>
  );

  return (
    <div id="opensource" className="w-full min-h-3.5">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-black dark:text-white">
          Open Source Contributions
        </div>
        <div className="text-sm sm:text-base text-center text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
          my contributions to open source projects
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-gray-100 dark:bg-white/10 rounded-lg p-1 flex w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("Closed")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                activeTab === "Closed"
                  ? "bg-white dark:bg-white/20 text-black dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Closed ({closedContributions.length})
            </button>
            <button
              onClick={() => setActiveTab("Open")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                activeTab === "Open"
                  ? "bg-white dark:bg-white/20 text-black dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Open ({openContributions.length})
            </button>
          </div>
        </div>

        <div>
          {currentContributions.length > 0 ? (
            <div className="divide-y divide-gray-100 dark:divide-white/10">
              {currentContributions.map((contribution, index) => (
                <ContributionRow key={index} contribution={contribution} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 dark:text-gray-500 py-8 text-sm">
              No {activeTab.toLowerCase()} contributions yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenSource;
