// src/components/Row.jsx
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./Card";

export default function Row({ title, items, variant, onCardClick }) {
  const scroller = useRef(null);
  const list = (items || []).filter(Boolean);
  if (list.length === 0) return null;

  const scroll = (dir) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section className="group/row relative mb-8 md:mb-10">
      <h2 className="mb-2 px-6 md:px-12 text-lg md:text-2xl font-semibold text-gray-100">{title}</h2>

      <button
        onClick={() => scroll(-1)}
        aria-label={`Scroll ${title} left`}
        className="absolute left-0 top-9 bottom-2 z-10 hidden w-10 md:w-12 items-center justify-center bg-black/50 opacity-0 transition hover:bg-black/70 group-hover/row:opacity-100 md:flex"
      >
        <ChevronLeft size={34} />
      </button>

      <div
        ref={scroller}
        className={`flex overflow-x-auto scrollbar-hide px-6 md:px-12 py-4 ${variant === "top10" ? "gap-2 md:gap-4" : "gap-2 md:gap-3"}`}
      >
        {list.map((item, i) => (
          <Card key={item.id} item={item} onClick={onCardClick} rank={variant === "top10" ? i + 1 : undefined} />
        ))}
      </div>

      <button
        onClick={() => scroll(1)}
        aria-label={`Scroll ${title} right`}
        className="absolute right-0 top-9 bottom-2 z-10 hidden w-10 md:w-12 items-center justify-center bg-black/50 opacity-0 transition hover:bg-black/70 group-hover/row:opacity-100 md:flex"
      >
        <ChevronRight size={34} />
      </button>
    </section>
  );
}
