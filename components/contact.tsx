"use client";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

// 1. Create a "Inner" component for the actual form logic
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { executeRecaptcha } = useGoogleReCaptcha();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // 1. Capture the form data IMMEDIATELY
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
      // 2. Now do the async work
      const token = await executeRecaptcha('contact_submit');

      const response = await fetch("https://h95xjanbk7.execute-api.eu-west-1.amazonaws.com/default/contactHandler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          recaptchaToken: token,
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        console.error("Server Error:", await response.text());
        setStatus("error");
      }
    } catch (err) {
      console.error("Network Error:", err);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input name="name" placeholder="Name" required className="p-4 rounded-xl ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600" />
      <input name="email" type="email" placeholder="Email" required className="p-4 rounded-xl ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600" />
      <textarea name="message" placeholder="Project details..." rows={5} required className="p-4 rounded-xl ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-blue-600 resize-none" />
      
      <button disabled={status === "loading"} className="bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2">
        {status === "loading" ? "Sending..." : "Send Message"} <Send size={16} />
      </button>
      {status === "error" && <p className="text-red-500 text-sm text-center">Something went wrong.</p>}
    </form>
  );
}

// 2. The main page export that provides the reCAPTCHA context
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
