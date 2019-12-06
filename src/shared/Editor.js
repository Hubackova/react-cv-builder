import PropTypes from "prop-types";
import React, { Suspense } from "react";
import { Field } from "formik";
import "react-quill/dist/quill.snow.css";

const ReactQuill = React.lazy(() => import("react-quill"));

const Editor = ({ id, label, name, onBlur, ...props }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        {label && <label htmlFor={id || name}>{label}</label>}
        <Field name="description">
          {({ field }) => (
            <ReactQuill
              value={field.value}
              onChange={field.onChange(field.name)}
              onBlur={() => onBlur(field.value)}
              theme="snow"
              {...props}
            />
          )}
        </Field>
      </div>
    </Suspense>
  );
};

Editor.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func
};

export default Editor;
