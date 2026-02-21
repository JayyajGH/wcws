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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="name" placeholder="Name" required disabled={isLoading} className="p-4 rounded-xl ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-100 transition-all" />
      <input name="email" type="email" placeholder="Email" required disabled={isLoading} className="p-4 rounded-xl ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-100 transition-all" />
      <textarea name="message" placeholder="Project details..." rows={5} required disabled={isLoading} className="p-4 rounded-xl ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 resize-none disabled:bg-slate-100 transition-all" />
      
      <button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:bg-blue-400">
        {isLoading ? <><Loader2 className="animate-spin" size={20} /> Sending...</> : <><Send size={18} /> Send Message</>}
      </button>

      {status === "error" && (
        <div data-testid="error-container" className="flex items-center justify-center gap-2 text-red-500 text-sm font-medium animate-pulse">
          <AlertCircle size={16} />
          <span>Something went wrong. Please try again.</span>
        </div>
      )}
    </form>
  );
}

export default function ContactPage() {
  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-xl mx-auto px-6">
        <GoogleReCaptchaProvider reCaptchaKey="6LcmFHMsAAAAAF6cHn7wqGxFkJTv0Kcw8De2EPP6">
          <ContactForm />
        </GoogleReCaptchaProvider>
      </div>
    </section>
  );
}
