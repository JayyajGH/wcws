"use client";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-baseline gap-6"
        >
          <span className="text-blue-500 font-mono text-2xl font-bold">EST. 2004</span>
          <h2 className="text-4xl md:text-6xl font-medium leading-tight tracking-tight">
            Two decades of digital craft. <br />
            <span className="text-slate-400">
              I’ve been building for the web for <span className="text-white underline decoration-blue-500 underline-offset-8">over 20 years</span>.
            </span>
          </h2>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-800 pt-12">
          <div>
            <h3 className="text-slate-500 uppercase tracking-widest text-sm mb-4">Evolution</h3>
            <p className="text-lg text-slate-300">From Flash and tables to Next.js and AI—I've mastered the shift to keep your brand ahead.</p>
          </div>
          <div>
            <h3 className="text-slate-500 uppercase tracking-widest text-sm mb-4">Trust</h3>
            <p className="text-lg text-slate-300">20+ years means I don't just build sites; I build digital assets that actually survive the test of time.</p>
          </div>
          <div>
            <h3 className="text-slate-500 uppercase tracking-widest text-sm mb-4) ">Precision</h3>
            <p className="text-lg text-slate-300">Clean code, pixel-perfect layouts, and SEO strategies built on two decades of data.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
