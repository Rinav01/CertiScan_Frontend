import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../api";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const data = await uploadImage(file);
    setLoading(false);

    navigate("/results", { state: { file, data } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-[#020617]">

      <h1 className="text-3xl mb-6">Upload Image</h1>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-500 p-10 rounded-xl cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Drag & drop image or click</p>
      </div>

      {file && (
        <div className="mt-4 text-center">
          <p>{file.name}</p>

          <button
            onClick={handleUpload}
            className="mt-4 px-6 py-2 bg-purple-600 rounded-lg"
          >
            {loading ? "Uploading..." : "Analyze"}
          </button>
        </div>
      )}
    </div>
  );
}