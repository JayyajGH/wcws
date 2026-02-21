"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Pops Place",
    category: "Burger Bar",
    image: "/pops.png",
  },
  {
    title: "Brendan's Brewtique",
    category: "Beer retailer",
    image: "/brewtique.png",
  },
  {
    title: "82Electrical",
    category: "Electrician",
    image: "/82electrical.png",
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Selected Projects
            </h2>
            <p className="text-lg text-slate-500">
              A look at how I've helped small businesses establish a premium digital presence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-6 px-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
