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

  const ContributionCard: React.FC<{
    contribution: Contribution;
    index: number;
  }> = ({ contribution, index }) => (
    <div
      className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl animate-float"
      style={{ animationDelay: `${index * 0.3}s` }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-black truncate">
            {contribution.project}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 truncate">
            {contribution.organization}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0 flex-wrap">
          <span className="px-2 py-1 bg-black text-white text-xs rounded-full whitespace-nowrap">
            {contribution.type}
          </span>
          <span
            className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
              contribution.status === "Closed"
                ? "bg-green-100 text-green-800"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            {contribution.status}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2 sm:line-clamp-none">
        {contribution.contribution}
      </p>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-black mr-2 flex-shrink-0"></div>
          <span className="text-xs sm:text-sm text-gray-700">
            {contribution.language}
          </span>
        </div>

        <a
          href={contribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-600 transition-colors duration-200 text-xs sm:text-sm font-medium whitespace-nowrap"
        >
          View PR →
        </a>
      </div>
    </div>
  );

  return (
    <div id="opensource" className="w-full min-h-3.5">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-black">
          Open Source Contributions
        </div>
        <div className="text-sm sm:text-base text-center text-gray-600 mb-6 sm:mb-8">
          my contributions to open source projects
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-gray-100 rounded-lg p-1 flex w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("Closed")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                activeTab === "Closed"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Closed ({closedContributions.length})
            </button>
            <button
              onClick={() => setActiveTab("Open")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                activeTab === "Open"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Open ({openContributions.length})
            </button>
          </div>
        </div>

        <div className="h-[32rem] sm:h-96 overflow-y-auto">
          {currentContributions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pr-2">
              {currentContributions.map((contribution, index) => (
                <ContributionCard
                  key={index}
                  contribution={contribution}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-base sm:text-lg">
                No {activeTab.toLowerCase()} contributions yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpenSource;
