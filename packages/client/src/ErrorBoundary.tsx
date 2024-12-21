import React, { Component, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
  message: string;
};
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    this.setState({ message: String(error) });
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.message}</h1>;
    }

    if (typeof this.props === "object" && this.props.children !== undefined) {
      return this.props.children;
    }
  }
}
