import React from "react";
import { useField } from "formik";

const TextInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <input className="input-label" {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

export default TextInput;
