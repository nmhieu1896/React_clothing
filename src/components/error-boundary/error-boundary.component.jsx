import React from "react";

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from "./error-boundary.styles";

export default class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      catchError: false
    };
  }

  static getDerivedStateFromError() {
    return { catchError: true };
  }

  componentDidCatch(error, info) {
    console.log("error: ", error);
    console.log("info: ", info);
  }

  render() {
    if (this.state.catchError === true || this.props.catchError === true) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl={"https://i.imgur.com/yW2W9SC.png"} />
          <ErrorImageText>
            Something wrong happened, back to this page later, Thanks :)
          </ErrorImageText>
        </ErrorImageOverlay>
      );
    }
    return this.props.children;
  }
}
