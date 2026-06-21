import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) return;
    setLoading(true);

    try {
      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/login`,
  { email, password }
);


      localStorage.setItem("token", response.data.access_token);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("ACCESS DENIED: Credentials mismatch on core server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0d0614] p-4 overflow-hidden select-none font-mono">
      {/* 80s Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a1147_1px,transparent_1px),linear-gradient(to_bottom,#2a1147_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

      {/* Neon Atmospheric Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-pink-600/10 to-cyan-500/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-[#120620] border-2 border-pink-500 p-8 shadow-[0_0_35px_rgba(236,72,153,0.25)] w-full max-w-md relative"
      >
        {/* Neon Title Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase bg-gradient-to-r from-pink-500 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(219,39,119,0.5)]">
            VICE MAINFRAME
          </h1>
          <p className="text-cyan-400 text-[10px] uppercase tracking-widest mt-1 font-bold">
            // Secure Operator Sign-In
          </p>
        </div>

        {/* Input Matrix */}
        <div className="space-y-5">
          <div className="relative">
            <span className="text-[10px] uppercase text-pink-500 font-bold block mb-1 tracking-wider">Operator Email</span>
            <input
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#1b0a2e] border-2 border-pink-500/40 text-cyan-300 placeholder-pink-900/40 text-xs focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(34,211,238,0.3)] transition-all"
            />
          </div>

          <div className="relative">
            <span className="text-[10px] uppercase text-pink-500 font-bold block mb-1 tracking-wider">Passphrase Key</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#1b0a2e] border-2 border-pink-500/40 text-cyan-300 placeholder-pink-900/40 text-xs focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_12px_rgba(34,211,238,0.3)] transition-all"
            />
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={login}
            disabled={loading || !email || !password}
            className="w-full mt-6 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-500 hover:to-fuchsia-500 disabled:from-slate-900 disabled:to-slate-950 disabled:text-slate-700 disabled:border-slate-800 text-white text-xs font-black uppercase tracking-widest py-4 border-2 border-fuchsia-400 skew-x-[-12deg] transition-all shadow-[0_0_15px_rgba(219,39,119,0.4)] active:scale-95"
          >
            <span className="inline-block skew-x-[12deg]">
              {loading ? "INITIALIZING LINK..." : "BOOT INTO CORE SYSTEM"}
            </span>
          </button>
        </div>

        {/* Alternate Navigation Link */}
        <p className="text-center text-xs text-slate-500 mt-6 font-sans">
          New terminal user?{" "}
          <Link
            to="/register"
            className="text-cyan-400 font-mono font-bold hover:text-cyan-300 transition-colors underline decoration-cyan-500/30 underline-offset-4"
          >
            Create Grid Node
          </Link>
        </p>

        {/* Outer Tech Diagnostics Footer */}
        <div className="mt-6 pt-4 border-t border-pink-950/40 flex justify-between text-[8px] text-pink-500/30 uppercase tracking-widest select-none">
          <span>PORT: 8000</span>
          <span>STATUS: STANDBY</span>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;