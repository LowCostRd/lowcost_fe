import { useRef, useState } from "react";
import icons from "../assets/Icons";
import "./styles/style.scss";

interface FileUploadProps {
  label?: string;
  hint?: string;
  error?: string;
  onChange?: (file: File | null) => void;
}

const FileUpload = ({ label, hint, error, onChange }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileSelect = (file: File | null) => {
    if (file) {
      setFileName(file.name);
      onChange?.(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  return (
    <div className="input-wrapper">
      {label && <label className="input-label">{label}</label>}

      <div
        className={`upload-box-wrap ${error ? "upload-box--error" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          <div className="upload-icon"><figure className="img-box">{icons.upload}</figure></div>

          {fileName ? (
            <p>{fileName}</p>
          ) : (
            <p>
              Drag and drop your file here <br />
              or <span className="upload-link">click to browse</span>
            </p>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
        />
      </div>

      {error && <p className="input-error">{error}</p>}
      {hint && !error && <p className="input-hint">{hint}</p>}
    </div>
  );
};

export default FileUpload;
