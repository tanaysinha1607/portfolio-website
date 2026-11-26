// src/components/ProfileGate.jsx
// "Who's watching?" screen.
// Phones: Netflix-app style — your four hero photos crossfade full-screen every 3s,
//         with the profiles in a sheet at the bottom.
// Laptop/desktop: the classic centred layout.
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { profiles, heroByProfile } from "../data/content";
import { useProfile } from "../context/ProfileContext";
import AvatarFace from "./AvatarFace";

const SLIDE_MS = 3000;

function useSlideshow(count, ms) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), ms);
    return () => window.clearInterval(t);
  }, [count, ms]);
  return [index, setIndex];
}

function MobileGate({ onSelect }) {
  const slides = profiles.map((p) => ({ profile: p, hero: heroByProfile[p.id] }));
  const [index, setIndex] = useSlideshow(slides.length, SLIDE_MS);
  const current = slides[index];

  // Preload all four photos so the crossfade never flashes.
  useEffect(() => {
    slides.forEach((s) => {
      const img = new Image();
      img.src = s.hero.photoMobile || s.hero.photo;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black text-white md:hidden">
      {/* Photo slideshow */}
      <div className="absolute inset-x-0 top-0 h-[78%]">
        <AnimatePresence initial={false}>
          <motion.img
            key={current.profile.id}
            src={current.hero.photoMobile || current.hero.photo}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: current.hero.mobilePosition || "50% 20%" }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1 }, scale: { duration: SLIDE_MS / 1000 + 1, ease: "linear" } }}
          />
        </AnimatePresence>
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0">
      {/* Title art, like the show logo on Netflix */}
      <div className="mb-5 flex flex-col items-center px-6 text-center">
        <span
          className="font-display leading-none text-netflixRed drop-shadow-[0_4px_18px_rgba(0,0,0,0.8)]"
          style={{ fontSize: "clamp(2.6rem, 14vw, 4rem)", letterSpacing: "0.1em", transform: "skewX(-8deg)" }}
        >
          TANAYSINHA
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={current.profile.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-gray-200 drop-shadow"
          >
            {current.profile.name} Edition
          </motion.p>
        </AnimatePresence>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {slides.map((s, i) => (
            <button
              key={s.profile.id}
              tabIndex={-1}
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-white" : "w-2 bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      {/* Profile sheet */}
      <div className="rounded-t-[2rem] bg-[#141414]/95 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 shadow-[0_-20px_40px_rgba(0,0,0,0.6)] backdrop-blur">
        <p className="mb-4 text-center text-base text-gray-300">Choose your profile</p>
        <div className="grid grid-cols-4 gap-3">
          {profiles.map((p, i) => {
            const active = i === index;
            return (
              <motion.button
                key={p.id}
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => onSelect(p)}
                className="flex flex-col items-center outline-none"
              >
                <div
                  className={`aspect-square w-full overflow-hidden rounded-xl transition-all duration-300 ${
                    active ? "scale-105 ring-2 ring-white" : "ring-0"
                  }`}
                >
                  <AvatarFace color={p.color} id={`m-${p.id}`} />
                </div>
                <span
                  className={`mt-2 text-center text-[11px] font-semibold leading-tight transition-colors ${
                    active ? "text-white" : "text-gray-400"
                  }`}
                >
                  {p.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}

function DesktopGate({ onSelect }) {
  return (
    <div className="hidden min-h-screen flex-col items-center justify-center bg-netflixBlack px-4 text-white md:flex">
      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center text-4xl font-normal md:text-6xl"
      >
        Who's watching?
      </motion.h1>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {profiles.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            whileHover={{ scale: 1.12, rotateX: -4, rotateY: 4 }}
            whileTap={{ scale: 1.04 }}
            style={{ perspective: 800 }}
            className="group flex cursor-pointer flex-col items-center outline-none"
            onClick={() => onSelect(p)}
          >
            <div
              className="mb-4 h-28 w-28 overflow-hidden rounded-xl border-2 border-transparent transition-all duration-200 group-hover:border-white group-focus-visible:border-white md:h-44 md:w-44"
              style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4)" }}
            >
              <AvatarFace color={p.color} id={`gate-${p.id}`} />
            </div>
            <span className="text-lg text-gray-400 transition-colors group-hover:text-white md:text-xl">{p.name}</span>
            <span className="mt-1 max-w-[11rem] text-center text-xs text-gray-600 transition-colors group-hover:text-gray-400">
              {p.summary}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default function ProfileGate() {
  const navigate = useNavigate();
  const { setActiveProfile } = useProfile();

  useEffect(() => {
    document.title = "Tanay Sinha · Who's watching?";
  }, []);

  function selectProfile(p) {
    setActiveProfile(p);
    navigate(`/browse/${p.id}`);
  }

  return (
    <>
      <MobileGate onSelect={selectProfile} />
      <DesktopGate onSelect={selectProfile} />
    </>
  );
}
