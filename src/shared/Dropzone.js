import PropTypes from "prop-types";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = React.memo(({ onUpload }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          const decoder = new TextDecoder("utf8");
          const text = decoder.decode(reader.result);
          onUpload(JSON.parse(text));
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [onUpload]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} style={{ cursor: "pointer" }}>
      <input {...getInputProps()} />
      <p style={{ backgroundColor: "lightGrey", padding: "5rem" }}>
        <strong>Nahrejte JSON</strong>
        <br />
        <span>Sem přetáhněte soubor se životopisem, nebo klikněte, a následně soubor vyberte</span>
      </p>
    </div>
  );
});

Dropzone.propTypes = {
  onUpload: PropTypes.func.isRequired
};

export default Dropzone;
