import React from 'react';
import type { FC, ReactNode, ComponentType, ErrorInfo } from 'react';
import logErrorToServer from './errorLogger';
import DefaultErrorFallback from './ErrorPage';

interface ErrorBoundaryProps {
  fallback?: ComponentType<{ error: Error }>;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logErrorToServer(error, errorInfo);
  }

  render(): ReactNode {
    const { hasError, error } = this.state;
    const Fallback = this.props.fallback || DefaultErrorFallback;

    if (hasError && error) {
      return <Fallback error={error} />;
    }

    return this.props.children;
  }
}

function withErrorBoundary<TProps>(
    WrappedComponent: ComponentType<TProps>, 
    FallbackComponent?: ComponentType<{ error: Error }>,
): FC<TProps> {
    const ErrorHandledComponent: FC<TProps> = (props) => {
        return (
            <ErrorBoundary fallback={FallbackComponent}>
                {React.createElement(WrappedComponent as React.ElementType, props)}
            </ErrorBoundary>
        );
    };
    return ErrorHandledComponent;
}

export default withErrorBoundary;