import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";

const Checkbox = ({ children, onChange, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });

  function changeCheckbox(e) {
    onChange(e);
    field.onChange(e);
  }
  const {id, name} = props
  
  return (
    <>
      <label htmlFor={id || name} className="checkbox">
        <input
          id={id || name}
          key={id || name}
          {...field}
          {...props}
          onChange={e => changeCheckbox(e)}
          type="checkbox"
        />
        {children}
      </label>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

Checkbox.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.any
};

export default Checkbox;
