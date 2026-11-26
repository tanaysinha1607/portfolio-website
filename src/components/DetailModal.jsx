// src/components/DetailModal.jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ExternalLink, VideoOff } from "lucide-react";
import Poster from "./Poster";
import { GithubIcon } from "./BrandIcons";

function VideoBanner({ item, onMediaPlay }) {
  const [failed, setFailed] = useState(false);
  if (item.youtube) {
    return (
      <div className="relative aspect-video w-full bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${item.youtube}?autoplay=1&rel=0`}
          title={item.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  if (failed) {
    return (
      <div className="relative h-56 md:h-[380px]">
        <Poster item={{ ...item, brand: undefined, title: "" }} large />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 text-gray-200">
          <VideoOff size={36} />
          <p className="font-semibold">Video coming soon</p>
        </div>
      </div>
    );
  }
  return (
    <video
      className="max-h-[75vh] min-h-[240px] w-full bg-black object-contain"
      src={item.video}
      poster={item.poster}
      controls
      autoPlay
      playsInline
      onPlay={onMediaPlay}
      onError={() => setFailed(true)}
    />
  );
}

export default function DetailModal({ item, onClose, onMediaPlay }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start md:items-center justify-center overflow-y-auto bg-black/80 px-3 py-6 md:py-10"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={item.title}
            className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-netflixDark shadow-2xl"
          >
            {/* Banner */}
            {item.video || item.youtube ? (
              <div className="relative">
                <VideoBanner key={item.id} item={item} onMediaPlay={onMediaPlay} />
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-netflixDark/90 text-white hover:bg-black"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
            <div className="relative h-56 md:h-[380px]">
              <Poster item={item} large />
              <div className="absolute inset-0 bg-gradient-to-t from-netflixDark via-netflixDark/30 to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-netflixDark/90 text-white hover:bg-black"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-5 left-6 right-6 md:left-10">
                {(item.poster || item.brand) && (
                  <h2 className="mb-3 font-display text-4xl md:text-6xl leading-none tracking-wide drop-shadow-lg">
                    {item.title}
                  </h2>
                )}
                <div className="flex flex-wrap gap-3">
                  {item.demoLink && (
                    <a
                      href={item.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded bg-white px-5 py-2 font-semibold text-black hover:bg-white/80"
                    >
                      <Play size={18} fill="black" /> Live Demo
                    </a>
                  )}
                  {item.githubLink && (
                    <a
                      href={item.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded bg-gray-500/60 px-5 py-2 font-semibold text-white hover:bg-gray-500/40"
                    >
                      <GithubIcon size={18} /> View Code
                    </a>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded bg-white px-5 py-2 font-semibold text-black hover:bg-white/80"
                    >
                      <ExternalLink size={18} /> {item.linkLabel || "Open"}
                    </a>
                  )}
                  {item.extraLinks?.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded bg-gray-500/60 px-5 py-2 font-semibold text-white hover:bg-gray-500/40"
                    >
                      <ExternalLink size={18} /> {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            )}

            {/* Body */}
            <div className="grid gap-6 px-6 pb-8 pt-2 md:grid-cols-[2fr_1fr] md:px-10">
              <div>
                {(item.video || item.youtube) && (
                  <h2 className="mb-2 text-2xl md:text-3xl font-bold">{item.title}</h2>
                )}
                <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  {item.badge && <span className="font-semibold text-green-400">{item.badge}</span>}
                  {item.meta && <span className="text-gray-400">{item.meta}</span>}
                  {item.subtitle && (
                    <span className="rounded border border-gray-500 px-1.5 text-xs text-gray-300">{item.subtitle}</span>
                  )}
                </div>
                {item.pitch && <p className="mb-4 text-base leading-relaxed text-gray-100">{item.pitch}</p>}
                {item.detail && <p className="mb-4 text-sm leading-relaxed text-gray-300">{item.detail}</p>}
                {item.bullets && (
                  <ul className="space-y-2 text-sm leading-relaxed text-gray-300">
                    {item.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-netflixRed" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {item.items && (
                  <div className="flex flex-wrap gap-2">
                    {item.items.map((s) => (
                      <span key={s} className="rounded bg-white/10 px-2.5 py-1 text-sm text-gray-100">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {item.tags && (
                <div className="text-sm">
                  <span className="text-gray-500">Built with: </span>
                  <span className="text-gray-200">{item.tags.join(", ")}</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
