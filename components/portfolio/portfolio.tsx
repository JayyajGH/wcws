"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Project {
  title: string;
  category: string;
  image: string;
  href?: string;
}

const projects: Project[] = [
  {
    title: "82Electrical",
    category: "Electrician",
    image: "/82electrical.png",
    href: "https://82electrical.co.uk",
  },
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
              A look at how I&apos;ve helped small businesses establish a premium digital presence.
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
              className={project.href ? "group" : ""}
            >
              {/* If href exists, wrap in a Link; otherwise just a div */}
              {project.href ? (
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  <ProjectContent project={project} />
                </Link>
              ) : (
                <div className="block cursor-default">
                  <ProjectContent project={project} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Reusable UI content to keep the code clean
function ProjectContent({ project }: { project: Project }) {
  return (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:ring-2 group-hover:ring-slate-300">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-6 px-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {project.category}
        </span>
        <h3 className="text-xl font-bold text-slate-900 mt-1 transition-colors group-hover:text-blue-700">
          {project.title}
        </h3>
      </div>
    </>
  );
}
