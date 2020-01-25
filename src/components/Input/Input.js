import React from "react";
import Alert from "../Alert/Alert";

const Input = props => {
  const { label, name, type, value, onChange, errors, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        type={type}
        value={value}
        name={name}
        id={name}
        onChange={onChange}
        {...rest}
      />
      {errors[name] && <Alert error={errors[name]} />}
    </div>
  );
};

export default Input;
