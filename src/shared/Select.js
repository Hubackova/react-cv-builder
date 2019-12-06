import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useField } from "formik";

const Select = ({ children, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <StyledSelect {...field} {...props}>
        <option value="" defaultValue disabled hidden>
          {props.placeholder || "Vyberte"}
        </option>
        {children}
      </StyledSelect>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

const StyledSelect = styled.select`
  color: var(--blue);
`;

Select.propTypes = {
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

Select.defaultProps = {
  disabled: false,
  error: false
};

export default Select;
