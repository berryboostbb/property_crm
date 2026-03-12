import React, { useState, useRef, useEffect } from "react";
import { uploadFile } from "../../api/uploadServices";
import { notifyError } from "../toast";
import { Icon } from "@iconify/react";

interface ImagePickerProps {
  label?: string;
  className?: string;
  placeholder?: string;
  fileType?: string;
  type?: "image" | "file" | "both";
  value?: string | null;
  onChange?: (url: string) => void;
}

export default function ImagePicker({
  label = "",
  className = "",
  placeholder = "Choose a file",
  fileType = "images",
  type = "image",
  value = "",
  onChange,
}: ImagePickerProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [userSelected, setUserSelected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!userSelected) {
      if (value) {
        setPreview(value);
        try {
          const extractedName = value.split("/").pop() || "uploaded_file";
          setFileName(extractedName);
        } catch {
          setFileName("uploaded_file");
        }
      } else {
        setPreview(null);
        setFileName(null);
      }
    }
  }, [value, userSelected]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUserSelected(true);
    setFileName(file.name);

    if (file.type.startsWith("image/")) {
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);
    } else {
      setPreview(null);
    }

    try {
      setUploading(true);
      const response = await uploadFile(file, fileType);
      const uploadedUrl = response.data?.url;

      if (uploadedUrl) {
        setPreview(uploadedUrl);
        onChange?.(uploadedUrl);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      notifyError("File upload failed. Please try again.");
    } finally {
      setUploading(false);
      setTimeout(() => setUserSelected(false), 500);
    }
  };

  const handleClick = () => {
    if (!uploading) fileInputRef.current?.click();
  };

  const getAcceptType = () => {
    if (type === "image") return "image/*";
    if (type === "file") return ".pdf,.doc,.docx,.xls,.xlsx,.txt";
    return "*/*";
  };

  return (
    <div className="relative w-full">
      {label && (
        <label className="absolute px-1 text-xs bg-white -top-2 left-5 z-9 text-light">
          {label}
        </label>
      )}

      <div
        className={`rounded-md w-full h-14 px-3 py-2 flex items-center justify-between border-primary border-[0.5px] cursor-pointer transition-all duration-200 ${
          uploading ? "opacity-80 cursor-not-allowed" : ""
        } ${className}`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          {uploading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 rounded-full border-primary border-t-transparent animate-spin"></div>
              <span className="text-sm text-light">Uploading...</span>
            </div>
          ) : preview && type !== "file" ? (
            <div className="flex items-center gap-3">
              <img
                src={preview}
                alt="Preview"
                className="object-cover w-10 h-10 rounded-md"
              />
              {fileName && (
                <span className="text-sm truncate text-heading lg:max-w-75 max-w-45">
                  {fileName}
                </span>
              )}
            </div>
          ) : fileName ? (
            <span className="text-sm truncate text-heading lg:max-w-75 max-w-45">
              {fileName}
            </span>
          ) : (
            <span className="text-sm text-light">{placeholder}</span>
          )}
        </div>

        {!uploading && (
          <Icon icon="mingcute:upload-fill" className="text-2xl text-primary" />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptType()}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
