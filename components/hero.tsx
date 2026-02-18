"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="uppercase tracking-widest text-xs font-bold text-blue-600 mb-4 block">
            Established 2004 // Made in Bristol
          </span>
         <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1]">
            Expert web design for <br />
            <span className="text-blue-600">small businesses.</span>
          </h1>

          <p className="mt-8 text-lg text-slate-500 max-w-lg leading-relaxed">
            I’ve spent 20 years building high-performance websites. Now, I’m bringing that 
            big-budget expertise to local businesses across the West Country.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-600 transition-all flex items-center gap-2"
            >
              Get Started <ArrowUpRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Right Side: The "Cool" Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Replace the src with a real image URL later */}
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
            alt="Modern Office Architecture"
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
          />
          {/* Subtle overlay for that "Premium" feel */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}
