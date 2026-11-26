// src/components/ContactModal.jsx
// Sends via EmailJS when the VITE_EMAILJS_* keys are set (see .env.example).
// Without keys it falls back to opening the visitor's mail app with the message pre-filled,
// so the form always works.
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { X } from "lucide-react";
import { links } from "../data/content";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_READY = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

const inputCls =
  "rounded bg-[#333] px-4 py-3 text-white placeholder-gray-400 outline-none focus:bg-[#454545] focus:ring-2 focus:ring-netflixRed";

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!EMAILJS_READY) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${links.email}?subject=${subject}&body=${body}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        PUBLIC_KEY
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }

  function close() {
    onClose();
    setTimeout(() => setStatus("idle"), 300);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Contact form"
            className="relative w-full max-w-md rounded-lg bg-black/90 p-8 ring-1 ring-white/10"
          >
            <button onClick={close} aria-label="Close" className="absolute right-4 top-4 text-gray-400 hover:text-white">
              <X size={22} />
            </button>
            <h2 className="mb-1 text-3xl font-bold">Reach Out</h2>
            <p className="mb-6 text-sm text-gray-400">
              Or email me directly at{" "}
              <a href={`mailto:${links.email}`} className="text-white hover:underline">
                {links.email}
              </a>
            </p>

            {status === "sent" ? (
              <p className="text-green-400">
                {EMAILJS_READY ? "Message sent. I'll get back to you soon." : "Your mail app should open with the message ready to send."}
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputCls} />
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Your email" className={inputCls} />
                <textarea name="message" value={form.message} onChange={handleChange} required rows={4} placeholder="Your message" className={inputCls} />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 rounded bg-netflixRed py-3 font-semibold transition hover:bg-red-700 disabled:opacity-50"
                >
                  {status === "sending" ? "Sending..." : "Send"}
                </button>
                {status === "error" && <p className="text-sm text-red-400">Something went wrong. Try emailing me directly.</p>}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
