import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, Copy, Check } from "lucide-react";
import { useState } from "react";
import { getPredictionMask } from "../api";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [copiedUuid, setCopiedUuid] = useState(false);

  if (!state || !state.data) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-10">
        <p className="text-gray-400">No results found. Please upload an image first.</p>
        <button onClick={() => navigate("/upload")} className="mt-4 px-6 py-2 bg-purple-600 rounded-lg">Go to Upload</button>
      </div>
    );
  }

  const { file, data } = state;
  const maskUrl = data.uuid ? getPredictionMask(data.uuid) : null;

  // Normalize confidence value to 0-100 range
  let confidenceValue = 0;
  if (data.confidence !== undefined && data.confidence !== null) {
    const confidence = typeof data.confidence === 'string' ? parseFloat(data.confidence) : data.confidence;
    // If the value is between 0-1, it's a decimal percentage (multiply by 100)
    confidenceValue = confidence > 1 ? confidence : confidence * 100;
  }

  const chartData = [
    { name: "Confidence", value: Math.round(confidenceValue) },
  ];

  // Debug: Log the full response structure
  console.log("Backend response data:", data);

  // Determine if prediction is fake - check multiple possible field names
  const isFake = 
    (data.label?.toLowerCase?.().includes("fake")) || 
    (data.label?.toLowerCase?.().includes("manipulated")) ||
    (data.prediction?.toLowerCase?.().includes("fake")) ||
    (data.prediction?.toLowerCase?.().includes("manipulated")) ||
    (data.result?.toLowerCase?.().includes("fake")) ||
    (data.result?.toLowerCase?.().includes("manipulated")) ||
    false;

  const handleCopyUuid = () => {
    if (data.uuid) {
      navigator.clipboard.writeText(data.uuid);
      setCopiedUuid(true);
      setTimeout(() => setCopiedUuid(false), 2000);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center px-4 py-16 pb-32 w-full max-w-6xl mx-auto">
      
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-12"
      >
        Analysis <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Results</span>
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8 w-full">
        {/* Left Column: Image Preview & Mask */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-6"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Original Image</h3>
            <img
              src={URL.createObjectURL(file)}
              className="w-full h-auto rounded-xl border border-white/10"
              alt="Uploaded source"
            />
          </div>

          {maskUrl && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-300 mb-4">Tampered Region Highlights</h3>
              <img
                src={maskUrl}
                className="w-full h-auto rounded-xl border border-white/10"
                alt="Tamper mask"
                onError={(e) => {
                  (e.target as HTMLImageElement).alt = "Mask unavailable";
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </motion.div>

        {/* Right Column: Prediction Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-6"
        >
          {/* Main Verdict Card */}
          <div className={`backdrop-blur-xl border rounded-2xl p-8 shadow-xl flex flex-col items-center text-center ${isFake ? 'bg-red-500/10 border-red-500/30 shadow-red-500/10' : 'bg-green-500/10 border-green-500/30 shadow-green-500/10'}`}>
            {isFake ? (
              <div className="bg-red-500/20 p-4 rounded-full mb-4">
                <ShieldAlert className="w-12 h-12 text-red-500" />
              </div>
            ) : (
              <div className="bg-green-500/20 p-4 rounded-full mb-4">
                <ShieldCheck className="w-12 h-12 text-green-500" />
              </div>
            )}
            <h2 className="text-2xl text-gray-400 mb-2">System Verdict</h2>
            <h3 className={`text-5xl font-bold uppercase tracking-widest ${isFake ? 'text-red-400' : 'text-green-400'}`}>
              {isFake ? "FAKE" : (data.label || data.prediction || data.result || "AUTHENTIC")}
            </h3>
            <p className="mt-4 text-gray-400 text-lg">
              Confidence Score: <span className="text-white font-bold">{confidenceValue.toFixed(2)}%</span>
            </p>
            {data.uuid && (
              <div className="mt-6 pt-6 border-t border-white/10 text-left w-full">
                <p className="text-xs text-gray-500 mb-2">Result ID</p>
                <div className="flex items-center gap-2 bg-black/50 rounded-lg px-3 py-2">
                  <code className="text-xs text-purple-300 flex-1 break-all">{data.uuid}</code>
                  <button
                    onClick={handleCopyUuid}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedUuid ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Graph Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex-1 min-h-[300px] flex flex-col">
            <h3 className="text-lg font-semibold text-gray-300 mb-6">Confidence Metric</h3>
            <div className="flex-1 w-full h-full min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#a1a1aa" />
                  <YAxis domain={[0, 100]} stroke="#a1a1aa" />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px' }} />
                  <Bar dataKey="value" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </motion.div>
      </div>

    </div>
  );
}