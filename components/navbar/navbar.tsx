"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 px-6 py-6"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/70 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full shadow-sm">
        
        {/* The Wordmark Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">
            W
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900">
            West Country <span className="text-blue-600">Web Solutions</span>
          </span>
        </div>

        {/* Minimal Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#contact" className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-all">
            Get in Touch
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
