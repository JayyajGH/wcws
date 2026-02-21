"use client";
import { motion } from "framer-motion";
import { ShieldCheck, ShoppingBag, History } from "lucide-react";

export default function AuthoritySection() {
  const sectors = [
    { name: "Online Retail", icon: <ShoppingBag size={20} />, desc: "High-conversion e-commerce engines." },
    { name: "Financial Services", icon: <ShieldCheck size={20} />, desc: "Secure, compliant, and robust architecture." },
    { name: "20+ Years Experience", icon: <History size={20} />, desc: "Two decades of digital evolution." }
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight"
          >
            Deep expertise in <br />
            <span className="text-blue-600">regulated industries.</span>
          </motion.h2>
          <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-md">
            Since 2004, I’ve been engineering high-stakes digital platforms. 
            From the fast-paced world of online retail to the precision-driven 
            requirements of financial services.
          </p>
        </div>

        <div className="grid gap-4">
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {sector.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{sector.name}</h4>
                  <p className="text-sm text-slate-500">{sector.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
