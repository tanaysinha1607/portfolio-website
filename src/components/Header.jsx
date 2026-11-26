// src/components/Header.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";
import { links } from "../data/content";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import AvatarFace from "./AvatarFace";
import Wordmark from "./Wordmark";

export default function Header({ profile }) {
  const navigate = useNavigate();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 transition-colors duration-300 ${
        solid ? "bg-netflixBlack" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <Wordmark />
      <div className="flex items-center gap-4 md:gap-5">
        <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hidden sm:block text-white hover:text-gray-300 transition">
          <GithubIcon size={22} />
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hidden sm:block text-white hover:text-gray-300 transition">
          <LinkedinIcon size={22} />
        </a>
        {profile?.resume && (
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded bg-netflixRed px-3 py-1.5 text-sm font-semibold hover:bg-red-700 transition"
          >
            <FileText size={16} />
            <span className="hidden sm:inline">Resume</span>
          </a>
        )}
        <button
          onClick={() => navigate("/")}
          title="Switch profile"
          aria-label="Switch profile"
          className="h-8 w-8 flex-shrink-0 md:h-9 md:w-9 overflow-hidden rounded"
        >
          <AvatarFace color={profile?.color} id={`hdr-${profile?.id}`} />
        </button>
      </div>
    </header>
  );
}
