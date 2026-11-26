// src/components/Card.jsx
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Poster from "./Poster";

export default function Card({ item, onClick, rank }) {
  const hasImage = Boolean(item.poster);
  const subtitle = item.subtitle || (item.items ? item.items.slice(0, 3).join(" · ") + (item.items.length > 3 ? " …" : "") : null);
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(item);
    }
  };

  // Netflix "Top 10" style: big outlined number + portrait card
  if (rank) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        onClick={() => onClick(item)}
        onKeyDown={handleKey}
        role="button"
        tabIndex={0}
        aria-label={item.title}
        className="group relative flex flex-shrink-0 cursor-pointer items-end outline-none"
      >
        <span
          className="select-none font-display leading-none text-[150px] md:text-[200px] -mr-6 md:-mr-8"
          style={{ color: "#141414", WebkitTextStroke: "3px #6b6b6b" }}
        >
          {rank}
        </span>
        <div className="relative h-[200px] w-[135px] md:h-[250px] md:w-[170px] overflow-hidden rounded-md shadow-2xl shadow-black/60 ring-1 ring-white/10 group-hover:ring-white/50 group-focus-visible:ring-2 group-focus-visible:ring-white transition">
          <Poster item={item.art ? { ...item, poster: undefined } : item} compact />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent px-3 pb-3 pt-10">
            {hasImage && !item.art && <p className="text-sm font-semibold leading-tight">{item.title}</p>}
            {item.subtitle && <p className="mt-0.5 text-[11px] leading-snug text-gray-300">{item.subtitle}</p>}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.06, zIndex: 5 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(item)}
      onKeyDown={handleKey}
      role="button"
      tabIndex={0}
      aria-label={item.title}
      className="group relative h-[140px] w-[248px] md:h-[170px] md:w-[300px] flex-shrink-0 cursor-pointer overflow-hidden rounded-md bg-netflixDark shadow-2xl shadow-black/50 ring-1 ring-white/5 outline-none hover:ring-white/40 focus-visible:ring-2 focus-visible:ring-white"
    >
      <Poster item={item} />

      {item.video && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 bg-black/40 backdrop-blur-sm transition group-hover:scale-110 group-hover:bg-netflixRed group-hover:border-netflixRed">
              <Play size={20} fill="white" className="ml-0.5" />
            </span>
          </div>
          {item.duration && (
            <span className="absolute right-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-semibold">{item.duration}</span>
          )}
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent px-3.5 pb-3 pt-12">
        {(hasImage || item.brand) && (
          <p className="text-sm md:text-base font-semibold leading-tight">{item.title}</p>
        )}
        {subtitle && <p className="mt-0.5 text-[11px] md:text-xs leading-snug text-gray-300 line-clamp-1">{subtitle}</p>}
        {(item.tags || item.items) && (
          <div className="mt-1.5 hidden gap-1.5 group-hover:flex">
            {(item.tags || item.items).slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] text-gray-200">
                <span className="text-green-400">•</span> {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
