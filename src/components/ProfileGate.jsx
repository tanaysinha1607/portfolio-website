// src/components/ProfileGate.jsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { profiles } from "../data/content";
import { useProfile } from "../context/ProfileContext";
import AvatarFace from "./AvatarFace";

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-netflixBlack px-4 text-white">
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
            onClick={() => selectProfile(p)}
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
