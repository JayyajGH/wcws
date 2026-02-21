"use client";
import { useState } from "react";
import { Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget; 
    const formData = new FormData(formElement);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    if (!executeRecaptcha) {
      console.error("reCAPTCHA not ready");
      return;
    }

    setStatus("loading");

    try {
      const token = await executeRecaptcha('contact_submit');
      const response = await fetch("https://h95xjanbk7.execute-api.eu-west-1.amazonaws.com/default/contactHandler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, recaptchaToken: token }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const errorData = await response.json();
        console.error("Server Error:", errorData);
        setStatus("error");
      }
    } catch (err) {
      console.error("Network Error:", err);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div data-testid="success-container" className="py-24 text-center animate-in fade-in zoom-in duration-300">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={56} />
        <h2 className="text-2xl font-bold text-slate-900">Talk soon.</h2>
        <p className="text-slate-500 mt-2">Your message is in my inbox.</p>
        <button 
          onClick={() => setStatus("idle")} 
          className="mt-6 text-sm text-blue-600 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const isLoading = status === "loading";

  return (
    <section id="contact">
      <div className="max-w-2xl mb-16">
        <h2 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
          Let’s start a conversation.
        </h2>
        <p className="text-lg text-slate-500">
          Ready to give your business the digital home it deserves? 
          Drop me a message below and I'll get back to you.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
          Full Name
        </label>
        <input
          name="name"
          type="text"
          id="name"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
        />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            id="email"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
            How can I help?
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none"
          ></textarea>
        </div>
        
        <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:bg-blue-400">
          {isLoading ? <><Loader2 className="animate-spin" size={20} /> Sending...</> : <><Send size={18} /> Send Message</>}
        </button>

        <p className="text-[11px] text-center text-slate-400 leading-relaxed mt-4">
          This site is protected by reCAPTCHA and the Google{" "}
          <a 
            href="https://policies.google.com/privacy" 
            target="_blank" 
            rel="noreferrer" 
            className="underline hover:text-blue-600 transition-colors"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a 
            href="https://policies.google.com/terms" 
            target="_blank" 
            rel="noreferrer" 
            className="underline hover:text-blue-600 transition-colors"
          >
            Terms of Service
          </a>{" "}
          apply.
        </p>

        {status === "error" && (
          <div data-testid="error-container" className="flex items-center justify-center gap-2 text-red-500 text-sm font-medium animate-pulse">
            <AlertCircle size={16} />
            <span>Something went wrong. Please try again.</span>
          </div>
        )}
      </form>
    </section>
  );
}

export default function ContactPage() {
  return (
    <section id="contact" className="py-12 bg-slate-50">
      <div className="max-w-xl mx-auto px-6">
        <GoogleReCaptchaProvider reCaptchaKey="6LcmFHMsAAAAAF6cHn7wqGxFkJTv0Kcw8De2EPP6">
          <ContactForm />
        </GoogleReCaptchaProvider>
      </div>
    </section>
  );
}
