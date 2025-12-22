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
    status: "Closed"
  },
  {
    project: "ExpenTable",
    organization: "Blankscreen-exe",
    contribution: "Fixed responsive design issues and added mobile support",
    language: "CSS",
    url: "https://github.com/Blankscreen-exe/ExpenTable/pull/26",
    type: "Bug Fix",
    status: "Closed"
  },
  {
    project: "Kestra",
    organization: "Kestra.io",
    contribution: "Improved workflow automation and task scheduling",
    language: "Java",
    url: "https://github.com/kestra-io/kestra/pull/13125",
    type: "Refactor & Bug fix",
    status: "Open"
  },
  {
    project: "Kestra",
    organization: "Kestra.io",
    contribution: "Improved workflow automation and task scheduling",
    language: "Java",
    url: "https://github.com/kestra-io/kestra/pull/13125",
    type: "Refactor & Bug fix",
    status: "Open"
  },
  {
    project: "Kestra",
    organization: "Kestra.io",
    contribution: "Improved workflow automation and task scheduling",
    language: "Java",
    url: "https://github.com/kestra-io/kestra/pull/13125",
    type: "Refactor & Bug fix",
    status: "Open"
  },
  {
    project: "Kestra",
    organization: "Kestra.io",
    contribution: "Improved workflow automation and task scheduling",
    language: "Java",
    url: "https://github.com/kestra-io/kestra/pull/13125",
    type: "Refactor & Bug fix",
    status: "Open"
  },
  {
    project: "LangChain.js",
    organization: "LangChain AI",
    contribution: "Reported and helped resolve integration issues",
    language: "TypeScript",
    url: "https://github.com/langchain-ai/langchainjs/issues/9309",
    type: "Documentation",
    status: "Closed"
  },
  {
    project: "ExpenTable",
    organization: "Blankscreen-exe",
    contribution: "Enhanced UI components and improved user experience",
    language: "JavaScript",
    url: "https://github.com/Blankscreen-exe/ExpenTable/pull/24",
    type: "Feature",
    status: "Closed"
  },
  {
    project: "ExpenTable",
    organization: "Blankscreen-exe",
    contribution: "Fixed responsive design issues and added mobile support",
    language: "CSS",
    url: "https://github.com/Blankscreen-exe/ExpenTable/pull/26",
    type: "Bug Fix",
    status: "Closed"
  },
  {
    project: "Kestra",
    organization: "Kestra.io",
    contribution: "Improved workflow automation and task scheduling",
    language: "Java",
    url: "https://github.com/kestra-io/kestra/pull/13125",
    type: "Refactor & Bug fix",
    status: "Open"
  },
  {
    project: "LangChain.js",
    organization: "LangChain AI",
    contribution: "Reported and helped resolve integration issues",
    language: "TypeScript",
    url: "https://github.com/langchain-ai/langchainjs/issues/9309",
    type: "Documentation",
    status: "Closed"
  }
];

const OpenSource: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Open" | "Closed">("Closed");
  
  const openContributions = contributions.filter(c => c.status === "Open");
  const closedContributions = contributions.filter(c => c.status === "Closed");
  const currentContributions = activeTab === "Open" ? openContributions : closedContributions;

  const ContributionCard: React.FC<{ contribution: Contribution; index: number }> = ({ contribution, index }) => (
    <div 
      className="bg-white rounded-lg p-6 shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl animate-float"
      style={{ animationDelay: `${index * 0.3}s` }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-black">{contribution.project}</h3>
          <p className="text-sm text-gray-500">{contribution.organization}</p>
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-black text-white text-xs rounded-full">
            {contribution.type}
          </span>
          <span className={`px-2 py-1 text-xs rounded-full ${
            contribution.status === 'Closed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {contribution.status}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">{contribution.contribution}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-black mr-2"></div>
          <span className="text-sm text-gray-700">{contribution.language}</span>
        </div>
        
        <a 
          href={contribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-black hover:text-gray-600 transition-colors duration-200 text-sm font-medium"
        >
          View PR →
        </a>
      </div>
    </div>
  );

  return (
    <div  id="opensource" className="w-full min-h-3.5">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      
      <div className="max-w-5xl mx-auto px-6 mb-8">
        <div className="text-3xl md:text-4xl font-bold text-center mb-2 text-black">
          Open Source Contributions
        </div>
        <div className="text-center text-gray-600 mb-8">
          my contributions to open source projects
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab("Closed")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "Closed"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Closed ({closedContributions.length})
            </button>
            <button
              onClick={() => setActiveTab("Open")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "Open"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Open ({openContributions.length})
            </button>
          </div>
        </div>
        
        <div className="h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-2">
            {currentContributions.map((contribution, index) => (
              <ContributionCard key={index} contribution={contribution} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenSource;