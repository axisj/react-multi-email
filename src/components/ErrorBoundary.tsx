import * as React from 'react';

class ErrorBoundary extends React.Component {
  componentDidCatch() {
    if (process.env.NODE_ENV === 'production') {
      typeof window !== 'undefined' && window.location.reload(true);
    }
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
