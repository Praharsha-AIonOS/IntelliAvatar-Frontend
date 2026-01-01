import React from "react";
import { cn } from "@/lib/utils";

export interface FileUploadProps {
  label: string;
  description?: string;
  accept: string | string[];
  icon?: React.ReactNode;
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  description,
  accept,
  icon,
  onFileSelect,
  selectedFile,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };

  const acceptValue = Array.isArray(accept) ? accept.join(",") : accept;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>

      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-muted/50 transition"
        )}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptValue}
          className="hidden"
          onChange={handleChange}
        />

        {icon && <div className="mx-auto mb-2 flex justify-center">{icon}</div>}

        <p className="text-sm text-muted-foreground">
          {selectedFile
            ? selectedFile.name
            : description || "Click to upload a file"}
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
