import React from "react";
import ErrorBoundary from "../../components/error-boundary/error-boundary.component";

const ContactPage = () => {
  // throw Error;
  return <ErrorBoundary catchError={true}></ErrorBoundary>;
};

export default ContactPage;
