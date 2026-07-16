import React from 'react';

// Some corporate/managed laptops disable WebGL entirely, which makes
// react-three-fiber throw during render. Without this, that takes the
// whole Hero section down with it instead of falling back quietly.
class HeroSceneBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('3D hero scene failed to render, falling back:', error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default HeroSceneBoundary;
