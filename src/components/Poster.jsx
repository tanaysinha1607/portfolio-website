// src/components/Poster.jsx
// Renders the artwork for any item: a screenshot (cover), a logo (contain on a solid
// background), or — when there is no image — a generated Netflix-style title card.
import { BrandIcon } from "./BrandIcons";

function titleSize(title = "", large, compact) {
  const n = title.length;
  const longestWord = Math.max(...title.split(/\s+/).map((w) => w.length));
  if (compact) return longestWord > 6 ? "text-[1.35rem] md:text-2xl" : "text-3xl md:text-4xl";
  if (large) return n > 18 ? "text-5xl md:text-7xl" : "text-6xl md:text-8xl";
  if (n > 22 || longestWord > 11) return "text-2xl md:text-[1.7rem]";
  if (n > 14) return "text-[1.7rem] md:text-3xl";
  return "text-3xl md:text-4xl";
}

export default function Poster({ item, large = false, compact = false }) {
  const { poster, fit, posterBg, posterPosition, art, brand } = item;

  if (poster) {
    const isLogo = fit === "contain";
    return (
      <div className="absolute inset-0" style={{ background: posterBg || "#111" }}>
        <img
          src={poster}
          alt=""
          loading="lazy"
          className={`h-full w-full ${isLogo ? "object-contain px-6 pt-4 pb-14 md:pb-16" : "object-cover"}`}
          style={!isLogo ? { objectPosition: posterPosition || "center top" } : undefined}
        />
      </div>
    );
  }

  const from = art?.from || "#e50914";
  const to = art?.to || "#141414";

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: `radial-gradient(120% 90% at 15% 0%, ${from} 0%, ${to} 70%)` }}
    >
      {/* subtle grain / sheen */}
      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.18)_50%,transparent_70%)]" />
      {item.stat ? (
        <div className="absolute inset-0 flex flex-col justify-center px-5 pb-8 pt-4">
          <span
            className={`font-display leading-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] ${
              large ? "text-8xl md:text-9xl" : "text-5xl md:text-6xl"
            }`}
          >
            {item.stat}
          </span>
          <span className={`mt-1 font-semibold leading-tight text-white/90 ${large ? "text-xl md:text-2xl" : "text-sm md:text-base"}`}>
            {item.title}
          </span>
        </div>
      ) : brand ? (
        <div className="absolute inset-0 flex items-center justify-center pb-6">
          <BrandIcon brand={brand} size={large ? 96 : 52} className="text-white/90 drop-shadow-lg" />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center px-5 pt-5 pb-10">
          <span
            className={`font-display uppercase leading-[0.92] text-white break-words drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] ${titleSize(
              item.title,
              large,
              compact
            )}`}
            style={{ letterSpacing: "0.04em" }}
          >
            {item.title}
          </span>
        </div>
      )}
      {/* Netflix "N" badge */}
      <span className="absolute left-2.5 top-2 font-display text-xl text-netflixRed drop-shadow">N</span>
    </div>
  );
}
