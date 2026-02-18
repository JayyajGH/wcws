"use client";
import { motion } from "framer-motion";
import { Monitor, Smartphone, PenTool, Zap } from "lucide-react";

const services = [
  {
    title: "Bespoke Web Design",
    description: "No templates. Every site is built from scratch to fit your brand's unique personality and local West Country roots.",
    icon: <PenTool className="text-blue-600" size={24} />,
  },
  {
    title: "Small Business Focus",
    description: "I specialize in sites for local shops, cafes, and services. High-end digital presence without the agency overhead.",
    icon: <Monitor className="text-blue-600" size={24} />,
  },
  {
    title: "Mobile-First Build",
    description: "Most of your customers are on their phones. I ensure your site looks and works perfectly on every device.",
    icon: <Smartphone className="text-blue-600" size={24} />,
  },
  {
    title: "20 Years of Speed",
    description: "Built using modern tech (Next.js & AWS) so your site loads instantly—crucial for keeping customers on your page.",
    icon: <Zap className="text-blue-600" size={24} />,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Bespoke digital for the local high street.
          </h2>
          <p className="text-lg text-slate-500">
            I build a professional home for your business online. No templates and no clutter—just a clean,
            custom-coded site that helps your customers find you and trust you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
