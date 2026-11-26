// src/components/Hero.jsx
// One hero for all four profiles: your photo on the right, headline + buttons on the left.
// Everything per-profile (photo, song, copy, buttons) comes from `heroByProfile` in content.js.
// photoFit: "figure" = tall cut-out of you, shown whole; default = photo fills the panel (cropped).
// mobilePosition / photoPosition: CSS object-position, to keep you in frame.
// photoMobile (optional): a different crop for phones.
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Mail, Play } from "lucide-react";
import { links, socials } from "../data/content";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./BrandIcons";

const btn = "flex items-center gap-2 rounded-md px-5 py-3 font-semibold shadow-lg";
const styles = {
  primary: `${btn} bg-white text-black hover:bg-white/85`,
  secondary: `${btn} bg-gray-600/70 text-white hover:bg-gray-600/50`,
  red: `${btn} bg-netflixRed text-white hover:bg-red-700`,
};

function resolveAction(action, { profile, onOpen, onContact }) {
  if (typeof action === "object" && action.type === "open") {
    return { key: action.item, label: action.label, icon: <Play size={18} fill="currentColor" />, onClick: () => onOpen(action.item), style: "primary" };
  }
  switch (action) {
    case "resume":
      return profile.resume && { key: "resume", label: "Open Resume", icon: <FileText size={18} />, href: profile.resume, style: "primary" };
    case "linkedin":
      return { key: "linkedin", label: "LinkedIn", icon: <LinkedinIcon size={18} />, href: links.linkedin, style: "secondary" };
    case "github":
      return { key: "github", label: "GitHub", icon: <GithubIcon size={18} />, href: links.github, style: "secondary" };
    case "instagram": {
      const ig = socials.find((s) => s.id === "instagram");
      return ig?.url && { key: "instagram", label: "Instagram", icon: <InstagramIcon size={18} />, href: ig.url, style: "secondary" };
    }
    case "contact":
      return { key: "contact", label: "Contact", icon: <Mail size={18} />, onClick: onContact, style: "red" };
    default:
      return null;
  }
}

export default function Hero({ profile, hero, onOpen, onContact }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const actions = (hero.actions || []).map((a) => resolveAction(a, { profile, onOpen, onContact })).filter(Boolean);

  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-black">
      {/* Backdrop when there's no photo yet */}
      {photoFailed && (
        <div className="absolute inset-0" style={{ background: `radial-gradient(90% 80% at 80% 30%, ${profile.color}55 0%, #000 65%)` }}>
          <span
            className="pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 select-none font-display leading-none text-transparent md:block"
            style={{ fontSize: "clamp(8rem, 20vw, 20rem)", WebkitTextStroke: "2px rgba(255,255,255,0.12)" }}
          >
            TANAY
          </span>
        </div>
      )}

      {/* Photo: full-bleed on mobile; on desktop a figure on the right, feathered into black */}
      {!photoFailed && (
        <div
          className={`absolute inset-x-0 top-0 h-[60vh] md:inset-y-0 md:left-auto md:right-[8%] md:flex md:h-auto md:w-[44%] md:justify-center ${
            ""
          }`}
        >
          <picture className="contents">
          {hero.photoMobile && <source media="(max-width: 767px)" srcSet={hero.photoMobile} />}
          <img
            src={hero.photo}
            alt="Tanay Sinha"
            onError={() => setPhotoFailed(true)}
            className={`hero-photo h-full w-full object-cover ${
              hero.photoFit === "figure" ? "md:w-auto md:max-w-full md:object-contain md:object-bottom" : ""
            }`}
            style={{
              filter: "brightness(1.05) contrast(1.04) saturate(1.05)",
              "--pos-mobile": hero.mobilePosition || "50% 20%",
              "--pos-desktop": hero.photoPosition || "50% 50%",
            }}
          />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/40 md:hidden" />
          <div className="absolute inset-x-0 top-0 hidden h-40 bg-gradient-to-b from-black to-transparent md:block" />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-netflixBlack to-transparent" />

      <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-28 pt-[44vh] md:justify-center md:pt-0 md:px-12 md:pb-0">
        <motion.div
          key={profile.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-gray-300">
            <span className="font-display text-2xl tracking-normal text-netflixRed">N</span>
            {profile.name} Edition
          </p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-netflixRed md:text-6xl">{hero.headline}</h1>
          <p className="mb-4 text-base text-gray-200 md:text-lg">{hero.blurb}</p>
          {hero.chips?.length > 0 && (
            <div className="mb-7 flex flex-wrap gap-2">
              {hero.chips.map((c) => (
                <span key={c} className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-gray-200 backdrop-blur">
                  {c}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            {actions.map((a) =>
              a.href ? (
                <motion.a key={a.key} href={a.href} target="_blank" rel="noreferrer" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} className={styles[a.style]}>
                  {a.icon} {a.label}
                </motion.a>
              ) : (
                <motion.button key={a.key} onClick={a.onClick} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }} className={styles[a.style]}>
                  {a.icon} {a.label}
                </motion.button>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
