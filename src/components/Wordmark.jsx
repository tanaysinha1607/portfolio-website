// src/components/Wordmark.jsx
import { Link } from "react-router-dom";

export default function Wordmark() {
  return (
    <Link
      to="/"
      aria-label="Tanay Sinha — back to profiles"
      className="font-display text-xl sm:text-2xl md:text-3xl tracking-[0.12em] sm:tracking-[0.24em]"
      style={{
        color: "#e50914",
        fontWeight: 700,
        transform: "skewX(-8deg)",
        textShadow: "0 0 16px rgba(229, 9, 20, 0.16)",
        lineHeight: 1,
      }}
    >
      <span style={{ display: "inline-block", transform: "scaleY(1.08)" }}>TANAYSINHA</span>
    </Link>
  );
}
