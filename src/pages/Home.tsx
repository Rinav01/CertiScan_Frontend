import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col text-white bg-[#020617] overflow-hidden">

      {/* 🌊 BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600 opacity-30 blur-[200px] rounded-full" />
        <div className="absolute bottom-[-200px] right-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-600 opacity-30 blur-[200px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.2),transparent_60%)]" />
      </div>

      {/* 🔝 NAVBAR */}
      <nav className="flex items-center bg-black text-white px-12 py-5">
        <h1 className="text-xl font-semibold">DeepFake Detection</h1>

        <div className="flex items-center gap-10 ml-auto">
          <div className="flex gap-8 text-gray-300">
            <span onClick={() => navigate("/")} className="cursor-pointer hover:text-white">
              Home
            </span>

            <span onClick={() => navigate("/features")} className="cursor-pointer hover:text-white">
              Features
            </span>

            <span onClick={() => navigate("/about")} className="cursor-pointer hover:text-white">
              About
            </span>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="px-5 py-2 rounded-full bg-white text-black font-medium"
          >
            Try Now
          </button>
        </div>
      </nav>

      {/* 🚀 HERO (CENTERED PROPERLY) */}
      <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold leading-tight"
        >
          AI-Powered DeepFake Forensics Engine
        </motion.h1>

        <p className="mt-6 text-gray-400 max-w-xl">
          Real-time deepfake detection using advanced computer vision and authenticity scoring.
        </p>

        <div className="relative inline-block">
          <button
            onClick={() => navigate("/upload")}
            className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-purple-500/40 hover:shadow-purple-500/70 hover:scale-105 transition duration-300"
          >
            Upload Image 🚀
          </button>

          {/* glow under button */}
          <div className="absolute w-40 h-10 bg-purple-500 blur-2xl opacity-30 left-1/2 -translate-x-1/2 mt-2" />
        </div>

      </div>

      {/* 🔻 FOOTER (BOTTOM FIXED) */}
      <footer className="w-full bg-black border-t border-white/10 text-gray-400 text-center py-4 text-sm opacity-80">
  © 2026 DeepFake Detection • Built by Team
</footer>

    </div>
  );
}