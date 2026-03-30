import { motion } from "framer-motion";
import { ScanSearch, Zap, Eye, ShieldCheck, Clock, UserCheck } from "lucide-react";

export default function Features() {

  const features = [
    {
      title: "AI Detection",
      desc: "Detect manipulated images using advanced deep learning models.",
      icon: <ScanSearch className="w-8 h-8 text-purple-400 mb-4" />
    },
    {
      title: "Fast Processing",
      desc: "Get instant results with optimized backend performance.",
      icon: <Zap className="w-8 h-8 text-yellow-400 mb-4" />
    },
    {
      title: "Visual Insights",
      desc: "View confidence scores and highlighted tampered regions.",
      icon: <Eye className="w-8 h-8 text-blue-400 mb-4" />
    },
    {
      title: "Secure Upload",
      desc: "Your uploaded data is processed securely and privately.",
      icon: <ShieldCheck className="w-8 h-8 text-green-400 mb-4" />
    },
    {
      title: "Real-time Results",
      desc: "Immediate analysis with high accuracy predictions.",
      icon: <Clock className="w-8 h-8 text-orange-400 mb-4" />
    },
    {
      title: "User Friendly UI",
      desc: "Simple and clean interface for easy interaction.",
      icon: <UserCheck className="w-8 h-8 text-pink-400 mb-4" />
    },
  ];

  return (
    <div className="flex flex-col flex-1 px-4 py-20 pb-32">
      
      {/* 🚀 TITLE */}
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Features</span>
        </motion.h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Everything you need to confidently verify image authenticity.
        </p>
      </div>

      {/* 💎 FEATURES GRID */}
      <div className="mt-16 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="flex flex-col items-start backdrop-blur-xl bg-white/5 border border-white/10 border-t-purple-500/50 rounded-2xl p-8 shadow-lg hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] transition-all duration-300"
          >
            {f.icon}
            <h3 className="text-xl font-bold mb-3 text-white">
              {f.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}