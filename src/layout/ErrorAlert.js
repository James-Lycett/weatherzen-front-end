import React from "react";

// popup with message when error
function ErrorAlert({ error }) {
  return (
    error && (
      <div className="alert alert-danger m-2">Error: {error.message}</div>
    )
  );
}

export default ErrorAlert;
