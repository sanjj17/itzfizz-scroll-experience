export default function CarIllustration() {
  return (
    <svg
      className="car-art"
      viewBox="0 0 252 92"
      role="img"
      aria-label="Stylized lime sports car"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="carPaint" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4ffb1" />
          <stop offset="0.48" stopColor="#d9ff58" />
          <stop offset="1" stopColor="#8ebd27" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a5650" />
          <stop offset="1" stopColor="#111815" />
        </linearGradient>
        <filter id="carGlow" x="-30%" y="-50%" width="160%" height="200%">
          <feGaussianBlur stdDeviation="3.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Wheels sit behind the body so the vector stays crisp at every viewport size. */}
      <g className="car-wheel" fill="#080a09" stroke="#414940" strokeWidth="2">
        <rect x="49" y="7" width="34" height="17" rx="7" />
        <rect x="49" y="68" width="34" height="17" rx="7" />
        <rect x="170" y="7" width="34" height="17" rx="7" />
        <rect x="170" y="68" width="34" height="17" rx="7" />
      </g>
      <path
        d="M18 46c0-7 7-12 17-15l29-9c15-5 27-8 48-8h38c20 0 31 5 43 12l26 15c7 4 12 10 12 16v5c0 5-4 8-10 8H30c-7 0-12-4-12-10v-8Z"
        fill="#060807"
        opacity=".7"
        transform="translate(0 3)"
      />
      <path
        d="M16 45c0-7 7-12 17-15l29-9c15-5 27-8 48-8h38c20 0 31 5 43 12l26 15c7 4 12 10 12 16v5c0 5-4 8-10 8H28c-7 0-12-4-12-10v-8Z"
        fill="url(#carPaint)"
        stroke="#efffa3"
        strokeWidth="1.2"
      />
      <path d="M77 22c13-4 24-6 37-6h34c13 0 24 3 34 9l-14 20H63l14-23Z" fill="url(#glass)" stroke="#a8ba7c" strokeWidth="1" />
      <path d="m78 23-11 19h40V17c-10 1-19 3-29 6Z" fill="#28342d" opacity=".9" />
      <path d="M115 17v25h48l15-18c-10-5-20-7-30-7h-33Z" fill="#1d2923" opacity=".88" />
      <path d="M113 17v25" stroke="#91a77b" strokeWidth="1.2" />
      <path d="M26 43 52 34l-8 13H25Z" fill="#f2ffd0" opacity=".85" filter="url(#carGlow)" />
      <path d="m225 52-10 4 1 5h12l2-4Z" fill="#f7ffcb" />
      <path d="M22 54h16l-4 7H22Z" fill="#ff5b55" />
      <path d="M47 63h157" stroke="#648920" strokeWidth="1.2" opacity=".85" />
      <path d="M91 55h65" stroke="#f1ffbc" strokeWidth="1.3" opacity=".5" />
      <path d="M113 45v12" stroke="#9bbd4a" strokeWidth="1.4" />
      <path d="M17 47c4-2 8-3 14-4M210 40l12 8" stroke="#fffbc9" strokeWidth="1.2" opacity=".6" />
    </svg>
  );
}
