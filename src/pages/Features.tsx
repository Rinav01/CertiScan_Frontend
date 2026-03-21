import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Features() {
  const navigate = useNavigate();

  const features = [
    {
      title: "AI Detection",
      desc: "Detect manipulated images using advanced deep learning models.",
    },
    {
      title: "Fast Processing",
      desc: "Get instant results with optimized backend performance.",
    },
    {
      title: "Visual Insights",
      desc: "View confidence scores and highlighted tampered regions.",
    },
    {
      title: "Secure Upload",
      desc: "Your uploaded data is processed securely and privately.",
    },
    {
      title: "Real-time Results",
      desc: "Immediate analysis with high accuracy predictions.",
    },
    {
      title: "User Friendly UI",
      desc: "Simple and clean interface for easy interaction.",
    },
  ];

  return (
    <div className="relative min-h-screen text-white bg-[#020617] overflow-hidden">

      {/* 🌊 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600 opacity-30 blur-[200px] rounded-full" />
        <div className="absolute bottom-[-200px] right-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-600 opacity-30 blur-[200px] rounded-full" />
      </div>

      {/* 🔝 NAVBAR */}
      <nav className="flex items-center bg-black text-white px-12 py-5">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-semibold cursor-pointer"
        >
          DeepFake Detection
        </h1>

        <div className="flex items-center gap-10 ml-auto">
          <div className="flex gap-8 text-gray-300">
            <span onClick={() => navigate("/")} className="cursor-pointer hover:text-white">
              Home
            </span>

            <span className="text-white font-medium">
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

      {/* 🚀 TITLE */}
      <div className="text-center mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          Features
        </motion.h1>
      </div>

      {/* 💎 FEATURES GRID */}
      <div className="mt-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-purple-500/20 transition"
          >
            <h3 className="text-lg font-semibold mb-2">
              {f.title}
            </h3>

            <p className="text-gray-400 text-sm">
              {f.desc}
            </p>
          </motion.div>
        ))}

      </div>

    </div>
  );
}