import React from "react";

const Button = ({ label, disabled }) => {
  return (
    <button className="btn btn-primary" disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
