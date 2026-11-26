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
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), ms);
    return () => window.clearInterval(t);
  }, [count, ms, paused, index]);
  return [index, setIndex, setPaused];
}

const slides = profiles.map((p) => ({ profile: p, hero: heroByProfile[p.id] }));

function usePreload() {
  useEffect(() => {
    slides.forEach((s) => {
      [s.hero.photo, s.hero.photoMobile].filter(Boolean).forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);
}

function MobileGate({ onSelect }) {
  const [index, setIndex] = useSlideshow(slides.length, SLIDE_MS);
  const current = slides[index];

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
  const [index, setIndex, setPaused] = useSlideshow(slides.length, SLIDE_MS);
  const current = slides[index];

  return (
    <div className="relative hidden h-screen min-h-[640px] w-full overflow-hidden bg-black text-white md:block">
      {/* Photo slideshow, right side, feathered into black */}
      <div className="absolute inset-y-0 right-[4%] w-[50%] lg:right-[6%] lg:w-[46%]">
        <AnimatePresence initial={false}>
          <motion.img
            key={current.profile.id}
            src={current.hero.photo}
            alt=""
            className="gate-photo absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: current.hero.photoPosition || "50% 50%" }}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1 }, scale: { duration: SLIDE_MS / 1000 + 1, ease: "linear" } }}
          />
        </AnimatePresence>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

      {/* Left column */}
      <div className="relative z-10 flex h-full max-w-2xl flex-col justify-center px-12 lg:px-20">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display leading-none text-netflixRed drop-shadow-[0_4px_24px_rgba(229,9,20,0.25)]"
          style={{ fontSize: "clamp(3.5rem, 7vw, 6.5rem)", letterSpacing: "0.12em", transform: "skewX(-8deg)", transformOrigin: "left" }}
        >
          TANAYSINHA
        </motion.span>

        <div className="mt-3 flex h-6 items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.profile.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-300"
            >
              {current.profile.name} Edition
            </motion.p>
          </AnimatePresence>
          <div className="flex gap-1.5" aria-hidden="true">
            {slides.map((s, i) => (
              <span
                key={s.profile.id}
                className={`h-1 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-white" : "w-2 bg-white/40"}`}
              />
            ))}
          </div>
        </div>

        <h1 className="mb-6 mt-12 text-3xl font-normal text-white lg:text-4xl">Who's watching?</h1>

        <div className="flex gap-5 lg:gap-7" onMouseLeave={() => setPaused(false)}>
          {profiles.map((p, i) => {
            const active = i === index;
            return (
              <motion.button
                key={p.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 1.02 }}
                onMouseEnter={() => {
                  setIndex(i);
                  setPaused(true);
                }}
                onFocus={() => setIndex(i)}
                onClick={() => onSelect(p)}
                className="group flex w-28 flex-col items-center outline-none lg:w-32"
              >
                <div
                  className={`mb-3 aspect-square w-full overflow-hidden rounded-xl transition-all duration-300 ${
                    active ? "ring-[3px] ring-white" : "ring-0"
                  }`}
                  style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4)" }}
                >
                  <AvatarFace color={p.color} id={`gate-${p.id}`} />
                </div>
                <span className={`text-base transition-colors lg:text-lg ${active ? "text-white" : "text-gray-400"}`}>
                  {p.name}
                </span>
                <span
                  className={`mt-1 text-center text-[11px] leading-snug transition-colors ${
                    active ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {p.summary}
                </span>
              </motion.button>
            );
          })}
        </div>
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

  usePreload();

  return (
    <>
      <MobileGate onSelect={selectProfile} />
      <DesktopGate onSelect={selectProfile} />
    </>
  );
}
