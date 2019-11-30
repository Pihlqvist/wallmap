import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import "./Dropzone.css";

const ImageDropzone = ({ setImages }) => {
  const onDrop = useCallback(acceptedFiles => {
    setImages(acceptedFiles);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png', onDrop
  });

  const files = acceptedFiles.map(file => {
    return (
      <li key={file.path} className="DropzoneFileList">
        {file.path} - {humanFileSize(file.size)}
      </li>
    );
  });

  return (
    <section className="DropzoneContainer">
      <div {...getRootProps({ className: "Dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some images here, or click to select images</p>
      </div>
      <aside>
        {files.length > 0 && <h4>Files</h4>}
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

// Converts size in bytes to human readable string
const humanFileSize = (size) => {
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

export { ImageDropzone };
