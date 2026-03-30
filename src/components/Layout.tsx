import { type ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkHealth } from "../api";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

export default function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [healthStatus, setHealthStatus] = useState<'checking' | 'ok' | 'error'>('checking');

  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        await checkHealth();
        setHealthStatus('ok');
      } catch (error) {
        setHealthStatus('error');
        console.error('Backend health check failed:', error);
      }
    };

    checkBackendHealth();
    // Check health every 30 seconds
    const interval = setInterval(checkBackendHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col text-white bg-[#020617] font-sans">
      {/* 🌊 GLOBAL BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10 fixed">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600 opacity-20 blur-[200px] rounded-full" />
        <div className="absolute bottom-[-200px] right-1/2 translate-x-1/2 w-[800px] h-[800px] bg-blue-600 opacity-20 blur-[200px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.15),transparent_60%)]" />
      </div>

      {/* 🔝 GLOBAL NAVBAR */}
      <nav className="sticky top-0 z-50 flex items-center bg-[#020617]/80 backdrop-blur-md border-b border-white/10 text-white px-8 md:px-12 py-4">
        <h1 className="text-xl font-bold cursor-pointer transition-transform hover:scale-105" onClick={() => navigate("/")}>
          DeepFake <span className="text-purple-400">Detection</span>
        </h1>

        <div className="hidden md:flex items-center gap-10 ml-auto">
          {/* Backend Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-full border border-white/10">
            {healthStatus === 'checking' && (
              <>
                <Loader2 className="w-3.5 h-3.5 text-yellow-400 animate-spin" />
                <span className="text-xs text-gray-300">Connecting...</span>
              </>
            )}
            {healthStatus === 'ok' && (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs text-green-300">Backend OK</span>
              </>
            )}
            {healthStatus === 'error' && (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                <span className="text-xs text-red-300">Backend Error</span>
              </>
            )}
          </div>

          <div className="flex gap-8 text-gray-300 font-medium">
            <span onClick={() => navigate("/")} className="cursor-pointer hover:text-white transition-colors">
              Home
            </span>
            <span onClick={() => navigate("/features")} className="cursor-pointer hover:text-white transition-colors">
              Features
            </span>
            <span onClick={() => navigate("/about")} className="cursor-pointer hover:text-white transition-colors">
              About
            </span>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]"
          >
            Try Now
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>

      {/* 🔻 GLOBAL FOOTER */}
      <footer className="w-full bg-[#020617]/90 backdrop-blur-sm border-t border-white/10 text-gray-400 text-center py-6 text-sm">
        © 2026 DeepFake Detection • Built by Team
      </footer>
    </div>
  );
}
