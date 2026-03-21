import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// ✅ IMPORT YOUR IMAGES
import srishtiImg from "../assets/srishti.jpeg";
import rinavImg from "../assets/rinav.jpeg";
import anushkaImg from "../assets/anushka.jpeg";
import shaiviImg from "../assets/shaivi.jpeg";

export default function About() {
  const navigate = useNavigate();

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
      desc: "Handle database storage, system integration, and project documentation.",
      img: anushkaImg,
    },
  ];

  return (
    <div className="relative min-h-screen text-white bg-[#020617] overflow-hidden pb-20">

      {/* 🌊 BACKGROUND GLOW */}
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
            <span
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-white"
            >
              Home
            </span>

            <span className="cursor-pointer hover:text-white">
              Features
            </span>

            <span className="text-white font-medium">
              About
            </span>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="px-5 py-2 rounded-full bg-white text-black font-medium hover:scale-105 transition"
          >
            Try Now
          </button>
        </div>
      </nav>

      {/* 📖 PROJECT DESCRIPTION */}
<div className="text-center mt-14 px-6 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          About Our Project
        </motion.h1>

        <p className="mt-6 text-gray-400">
        Our AI-driven deepfake detection system leverages advanced computer vision and deep neural networks to identify manipulated imagery. It delivers real-time predictions, confidence scoring, and precise localization of tampered regions for enhanced interpretability.
        </p>
      </div>

      {/* 👥 TEAM SECTION */}
<div className="mt-10 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Meet the Team
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, i) => (
         <motion.div
  key={i}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: i * 0.2 }}
  whileHover={{ scale: 1.05 }}
  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center
  shadow-lg shadow-purple-500/10 hover:shadow-purple-500/40 
  hover:border-purple-500/30 transition duration-300"
>
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full object-cover border-2 border-white/20 shadow-lg"
              />

              <h3 className="mt-4 text-lg font-semibold">
                {member.name}
              </h3>

              <p className="text-purple-400 text-sm">
                {member.role}
              </p>

              <p className="text-gray-400 text-sm mt-2">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}