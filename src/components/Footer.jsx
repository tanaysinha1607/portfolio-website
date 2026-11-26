// src/components/Footer.jsx
import { Mail, FileText } from "lucide-react";
import { links, socials } from "../data/content";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./BrandIcons";

export default function Footer({ onContact }) {
  return (
    <footer className="mx-auto max-w-5xl px-6 md:px-12 pb-12 pt-6 text-sm text-gray-500">
      <div className="mb-6 flex flex-col items-start gap-5 rounded-lg bg-netflixDark p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="text-xl md:text-2xl font-semibold text-white">Ready to build something?</p>
          <p className="mt-1 text-gray-400">Open to internships, roles and collaborations.</p>
        </div>
        <button
          onClick={onContact}
          className="flex items-center gap-2 rounded bg-netflixRed px-6 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <Mail size={18} /> Reach Out
        </button>
      </div>

      <div className="mb-4 flex gap-5 text-gray-400">
        <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-white"><GithubIcon size={22} /></a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-white"><LinkedinIcon size={22} /></a>
        {socials.find((x) => x.id === "instagram")?.url && (
          <a href={socials.find((x) => x.id === "instagram").url} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-white"><InstagramIcon size={22} /></a>
        )}
        <a href={`mailto:${links.email}`} aria-label="Email" className="hover:text-white"><Mail size={22} /></a>
        <a href={links.resume} target="_blank" rel="noreferrer" aria-label="Resume" className="hover:text-white"><FileText size={22} /></a>
      </div>
      <p>© {new Date().getFullYear()} Tanay Sinha · Built with React, Vite & Tailwind. Not affiliated with Netflix.</p>
    </footer>
  );
}
