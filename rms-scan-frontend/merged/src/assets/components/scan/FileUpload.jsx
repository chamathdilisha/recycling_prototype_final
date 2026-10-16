import { forwardRef, useImperativeHandle, useRef } from "react";

const MAX_FILE_SIZE_MB = 10;

/**
 * FileUpload
 * Exposes openFileExplorer() and handleFile(file) methods via ref
 */
const FileUpload = forwardRef(function FileUpload({ onUpload, onError }, ref) {
  const inputRef = useRef(null);

  const processFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      onError?.("Please choose a valid image file (JPG, PNG, JPEG, WebP).");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      onError?.(`Image is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onUpload(reader.result);
    reader.onerror = () => onError?.("Could not read that image. Please try another file.");
    reader.readAsDataURL(file);
  };

  useImperativeHandle(ref, () => ({
    openFileExplorer: () => inputRef.current?.click(),
    processFile: (file) => processFile(file),
  }));

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    e.target.value = "";
  };

  return (
    <input
      ref={inputRef}
      type="file"
      accept="image/jpeg,image/png,image/jpg,image/webp"
      onChange={handleChange}
      className="hidden"
      id="ecosort-file-input"
    />
  );
});

export default FileUpload;
