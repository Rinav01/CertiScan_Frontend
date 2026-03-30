import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center flex-1 text-center px-4 pt-20 pb-32">
      
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-xl"
      >
        AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">DeepFake</span> Forensics
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mt-6 text-xl text-gray-400 max-w-2xl"
      >
        Real-time deepfake detection using advanced computer vision and authenticity scoring.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative inline-block mt-12"
      >
        <button
          onClick={() => navigate("/upload")}
          className="relative z-10 px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-bold shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.7)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
        >
          Upload Image 🚀
        </button>
      </motion.div>

    </div>
  );
}