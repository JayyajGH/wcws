"use client";
import { motion } from "framer-motion";

export default function Standards() {
  return (
    <section className="py-16 lg:py-32 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Row 1: The Design Focus */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center mb-24 lg:mb-40">
          <div className="w-full md:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="inline-block px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 mb-4 lg:mb-6">
                <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Aesthetic</span>
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Designed to be <br/><span className="text-blue-500 italic">distinct.</span>
              </h3>
              <p className="mt-6 lg:mt-8 text-lg text-slate-400 leading-relaxed max-w-md">
                Small businesses don't need "standard." I create unique digital 
                identities that capture the craft and personality behind your work.
              </p>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
             <div className="absolute -inset-10 bg-blue-600/20 blur-[100px] rounded-full opacity-50" />
             <div className="relative aspect-video bg-slate-800 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800" alt="Design detail" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
          </div>
        </div>

        {/* Row 2: The Tech Focus */}
        <div className="flex flex-col md:flex-row-reverse gap-12 lg:gap-16 items-center">
          <div className="w-full md:w-1/2 text-left md:text-right">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="inline-block px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 mb-4 lg:mb-6">
                <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">Architecture</span>
              </div>
              <h3 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Built for <br/><span className="text-blue-500 italic">performance.</span>
              </h3>
              <p className="mt-6 lg:mt-8 text-lg text-slate-400 leading-relaxed md:ml-auto max-w-md">
                Clean, custom code is my default. No bloated builders—just 
                lightning-fast loading speeds that keep your customers on the page.
              </p>
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/2 relative">
             <div className="absolute -inset-10 bg-blue-900/20 blur-[100px] rounded-full opacity-50" />
             <div className="relative aspect-video bg-slate-800 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800" alt="Code detail" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
