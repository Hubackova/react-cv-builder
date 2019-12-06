import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <input className="text-input" id={props.id || props.name} {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string
};

export default TextInput;
