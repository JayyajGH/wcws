"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-0 lg:min-h-[90vh] flex flex-col justify-center bg-white pt-28 pb-0 lg:pt-32 lg:pb-0">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Right Side: Image - order-1 on mobile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative group order-1 lg:order-2"
        >
          {/* Subtle decoration hidden on mobile to save vertical space */}
          <div className="absolute -inset-4 bg-slate-50 rounded-[2rem] -z-10 hidden lg:block transition-transform group-hover:scale-105" />
          
          {/* Reduced mobile aspect ratio to 16/9 to keep it punchy and short */}
          <div className="relative aspect-video lg:aspect-[4/5] w-full rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-xl lg:shadow-2xl border border-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
              alt="Local retail boutique"
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          </div>
        </motion.div>

        {/* Left Side: Content - order-2 on mobile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 order-2 lg:order-1"
        >
          <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-blue-600 mb-4 lg:mb-6 block">
            Established 2004 // Made in Bristol
          </span>
          <h1 className="text-4xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
            Expert web design for <br />
            <span className="text-blue-600">small businesses.</span>
          </h1>

          <p className="mt-6 lg:mt-8 text-base lg:text-lg text-slate-500 max-w-lg leading-relaxed">
            I spent 20 years building high-performance systems for multinationals. 
            Now, I'm bringing that same big-budget expertise to local businesses.
          </p>

          <div className="mt-8 lg:mt-10">
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-slate-200"
            >
              Get Started 
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
