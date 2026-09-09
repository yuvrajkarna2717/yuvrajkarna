import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches render-time errors in the tree below it and shows a friendly
 * fallback instead of a blank screen.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surface the error for debugging; swap for a real logger if desired.
    console.error("Uncaught error:", error, info);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-dark-bg text-black dark:text-white px-6 text-center">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          An unexpected error occurred while rendering this page. Try heading
          back home.
        </p>
        <button
          onClick={this.handleReload}
          className="px-6 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition text-sm"
        >
          Go Home
        </button>
      </div>
    );
  }
}
