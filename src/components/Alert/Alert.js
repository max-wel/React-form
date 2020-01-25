import React from "react";

const Alert = ({ error }) => {
  return <div className="alert alert-sm alert-danger">{error}</div>;
};

export default Alert;
