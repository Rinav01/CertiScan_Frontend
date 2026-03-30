import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { predictDeepfake, type ApiError } from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UploadCloud, FileImage, Loader2, AlertCircle } from "lucide-react";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onDrop = (acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) return;

    setError(null);
    setLoading(true);
    try {
      const data = await predictDeepfake(file);
      navigate("/results", { state: { file, data } });
    } catch (error) {
      const apiError = error as ApiError;
      const errorMsg = apiError.details || apiError.message || "Failed to process image";
      setError(errorMsg);
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-4 py-20 pb-32">
      
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Analyze an <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Image</span>
        </motion.h1>
        <p className="mt-4 text-gray-400">Upload a photo to run it through our deepfake detection engine.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
      >
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? "border-purple-500 bg-purple-500/10 scale-[1.02]" 
              : "border-gray-500 hover:border-purple-400 hover:bg-white/5"
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="bg-white/10 p-4 rounded-full mb-6">
            <UploadCloud className={`w-12 h-12 ${isDragActive ? "text-purple-400" : "text-gray-400"}`} />
          </div>

          <p className="text-lg font-medium text-white mb-2">
            {isDragActive ? "Drop image here..." : "Drag & drop your image"}
          </p>
          <p className="text-sm text-gray-400">or click to browse from your computer</p>
          <p className="text-xs text-gray-500 mt-6">Supports JPG, PNG, WEBP</p>
        </div>

        {file && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-4"
          >
            {/* File Info */}
            <div className="p-4 bg-black/40 rounded-xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-purple-500/20 p-2 rounded-lg">
                  <FileImage className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-medium text-white truncate max-w-[200px] md:max-w-xs">{file.name}</span>
                  <span className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); setFile(null); }}
                className="text-gray-400 hover:text-red-400 text-sm px-2 py-1 transition-colors"
                disabled={loading}
              >
                Remove
              </button>
            </div>

            {/* Image Preview */}
            <div className="p-4 bg-black/40 rounded-xl border border-white/10">
              <p className="text-xs text-gray-500 mb-3">Preview</p>
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-auto max-h-80 rounded-lg border border-white/10 object-cover"
              />
            </div>
          </motion.div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 ${
              !file || loading 
                ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:-translate-y-1"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Analyze Image"
            )}
          </button>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-red-400">Error</p>
              <p className="text-sm text-red-300 mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300 text-lg"
            >
              ✕
            </button>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}