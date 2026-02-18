"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("YOUR_LAMBDA_FUNCTION_URL", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) setStatus("success");
      else setStatus("error");
    } catch (err) {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-24 text-center">
        <CheckCircle className="mx-auto text-blue-600 mb-4" size={48} />
        <h2 className="text-2xl font-bold">Talk soon.</h2>
        <p className="text-slate-500">Your message is in my inbox.</p>
      </div>
    );
  }

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-xl mx-auto px-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" placeholder="Name" required className="p-4 rounded-xl border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600" />
          <input name="email" type="email" placeholder="Email" required className="p-4 rounded-xl border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600" />
          <textarea name="message" placeholder="Project details..." rows={5} required className="p-4 rounded-xl border-none ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 resize-none" />
          
          <button 
            disabled={status === "loading"}
            className="bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            {status === "loading" ? "Sending..." : "Send Message"} <Send size={16} />
          </button>
          {status === "error" && <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  );
}
