// src/components/MusicPlayer.jsx
// Fixed "Now Playing" pill, bottom-right. It lives outside the page flow, so nothing can
// cover it (the old hero button sat underneath the rows and couldn't be clicked).
// Hides itself if the song file doesn't exist yet.
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music } from "lucide-react";

export default function MusicPlayer({ song, cover, ref }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [coverFailed, setCoverFailed] = useState(false);

  useImperativeHandle(ref, () => ({
    pause() {
      audioRef.current?.pause();
    },
  }));

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song?.src) return;
    audio.volume = 0.7;
    const t = window.setTimeout(() => {
      audio.play().then(
        () => setBlocked(false),
        () => setBlocked(true) // browser blocked autoplay — show "tap to play"
      );
    }, 400);
    return () => {
      window.clearTimeout(t);
      audio.pause();
    };
  }, [song?.src]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setBlocked(false)).catch(() => {});
    } else {
      audio.pause();
    }
  }

  if (!song?.src) return null;

  const title = song.title || "Tanay's pick";
  const artist = song.artist;

  return (
    <>
      <audio
        ref={audioRef}
        src={song.src}
        preload="auto"
        loop
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setMissing(true)}
      />
      <AnimatePresence>
        {!missing && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="fixed bottom-4 right-4 z-40 flex items-center gap-3 rounded-full bg-black/80 py-1.5 pl-1.5 pr-1.5 shadow-2xl shadow-black/70 ring-1 ring-white/15 backdrop-blur-md md:bottom-6 md:right-6 md:pr-2"
          >
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-netflixRed/80">
              {cover && !coverFailed ? (
                <img
                  src={cover}
                  alt=""
                  onError={() => setCoverFailed(true)}
                  className={`h-full w-full object-cover object-top ${playing ? "animate-[spin_8s_linear_infinite]" : ""}`}
                />
              ) : (
                <Music size={18} className="absolute inset-0 m-auto text-white" />
              )}
            </div>

            <div className="hidden min-w-0 max-w-[11rem] sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-netflixRed">
                {blocked && !playing ? "Tap to play" : "Now Playing"}
              </p>
              <p className="truncate text-sm font-semibold leading-tight text-white">{title}</p>
              {artist && <p className="truncate text-xs leading-tight text-gray-400">{artist}</p>}
            </div>

            <div className={`flex h-4 items-end gap-[3px] ${playing ? "" : "opacity-40"}`} aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="eq-bar w-[3px] rounded-sm bg-netflixRed"
                  style={{ animationDelay: `${i * 0.15}s`, animationPlayState: playing ? "running" : "paused" }}
                />
              ))}
            </div>

            <button
              onClick={toggle}
              aria-label={playing ? `Pause ${title}` : `Play ${title}`}
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-netflixRed text-white transition hover:scale-105 hover:bg-red-700 ${
                blocked && !playing ? "animate-pulse" : ""
              }`}
            >
              {playing ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" className="ml-0.5" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
