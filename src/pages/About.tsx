import { motion } from "framer-motion";

// ✅ IMPORT YOUR IMAGES
import srishtiImg from "../assets/srishti.jpeg";
import rinavImg from "../assets/rinav.jpeg";
import anushkaImg from "../assets/anushka.jpeg";
import shaiviImg from "../assets/shaivi.jpeg";

export default function About() {
  const team = [
    {
      name: "Srishti Sinha",
      role: "Frontend Developer",
      desc: "Developed the user interface for uploading documents and visualizing tampering results.",
      img: srishtiImg,
    },
    {
      name: "Rinav Vaish",
      role: "Backend Developer",
      desc: "Develop the API layer that connects the ML model with the frontend interface.",
      img: rinavImg,
    },
    {
      name: "Shaivi Pandey",
      role: "ML Engineer",
      desc: "Developed and finalized the machine learning pipeline for document forgery detection using deep learning.",
      img: shaiviImg,
    },
    {
      name: "Anushka Gahlowt",
      role: "Research & Testing",
      desc: "Handled System integration and project documentation.",
      img: anushkaImg,
    },
  ];

  return (
    <div className="flex flex-col flex-1 px-4 py-20 pb-32">
      
      {/* 📖 PROJECT DESCRIPTION */}
      <div className="text-center max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          About Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Project</span>
        </motion.h1>

        <p className="mt-6 text-lg text-gray-400 leading-relaxed">
        Our AI-driven deepfake detection system leverages advanced computer vision and deep neural networks to identify manipulated imagery. It delivers real-time predictions, confidence scoring, and precise localization of tampered regions for enhanced interpretability.
        </p>
      </div>

      {/* 👥 TEAM SECTION */}
      <div className="mt-24 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-center mb-16 text-white tracking-tight">
          Meet the Team
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              className="flex flex-col items-center backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 text-center
              shadow-lg hover:shadow-[0_15px_40px_rgba(168,85,247,0.2)] 
              hover:border-purple-500/40 hover:bg-white/10 transition-all duration-300 relative overflow-hidden group"
            >
              {/* Subtle background glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                <img
                  src={member.img}
                  alt={member.name}
                  className="relative w-32 h-32 mx-auto rounded-full object-cover border-2 border-white/20 shadow-xl group-hover:border-white/50 transition-colors duration-300"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                {member.name}
              </h3>

              <p className="text-purple-400 font-medium tracking-wide text-sm mt-1 uppercase">
                {member.role}
              </p>

              <p className="text-gray-400 text-sm mt-4 leading-relaxed line-clamp-4">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}