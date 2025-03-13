'use client';

import React, { type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // You can log the error to an error reporting service here
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="rounded-lg bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-red-600">
              Oops! Something went wrong.
            </h2>
            <p className="mb-4 text-gray-600">
              We are sorry, but an error occurred while loading this page.
            </p>
            {this.state.error && (
              <p className="mb-4 text-sm text-gray-500">
                Error: {this.state.error.message}
              </p>
            )}
            <button
              onClick={this.resetError}
              className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
