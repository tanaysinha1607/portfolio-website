// src/components/AvatarFace.jsx
// The smiley profile avatar used on the "Who's watching?" screen and in headers.
export default function AvatarFace({ color = "#555", id = "x" }) {
  const gradId = `grad-${id}`;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full block">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill={`url(#${gradId})`} />
      <circle cx="32" cy="40" r="6" fill="white" />
      <circle cx="68" cy="40" r="6" fill="white" />
      <path d="M 30 62 Q 50 78 70 62" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
