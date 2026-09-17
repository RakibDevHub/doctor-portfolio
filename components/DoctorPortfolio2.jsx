"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════ */
const Icon = ({ path, className = "w-5 h-5", strokeWidth = 1.5 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

const ICONS = {
  stethoscope:
    "M6 3v6a5 5 0 0010 0V3M6 3H4M6 3h2M16 3h-2M16 3h2M19 3v4a6 6 0 01-6 6h-1a6 6 0 01-6-6V3M12 15v4a3 3 0 006 0v-2",
  heart:
    "M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z",
  pulse: "M22 12h-4l-3 9L9 3l-3 9H2",
  tooth:
    "M12 5.5c-1.8-1.6-4-2-5.5-1C4.5 5.8 4 9 5 12c.8 2.4 1 4 1.3 6 .2 1.4.6 2.5 1.7 2.5 1.3 0 1.5-1.6 1.8-3.2.2-1.3.5-2.3 2.2-2.3s2 1 2.2 2.3c.3 1.6.5 3.2 1.8 3.2 1.1 0 1.5-1.1 1.7-2.5.3-2 .5-3.6 1.3-6 1-3 .5-6.2-1.5-7.5-1.5-1-3.7-.6-5.5 1z",
  shield: "M12 2.5l8 3.5v6c0 5-3.4 8.9-8 10-4.6-1.1-8-5-8-10V6l8-3.5z",
  award: "M12 15a6 6 0 100-12 6 6 0 000 12zM8.2 13.9L7 22l5-3 5 3-1.2-8.1",
  clock: "M12 7v5l3.2 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  pin: "M12 21.5s7-5.6 7-11.2A7 7 0 005 10.3c0 5.6 7 11.2 7 11.2z M12 10.5a2 2 0 100-4 2 2 0 000 4z",
  phone:
    "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .4 1.9.7 2.8a2 2 0 01-.5 2.1L8.1 9.9a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.8.7a2 2 0 011.7 2z",
  calendar:
    "M8 2.5v3M16 2.5v3M3.5 9.5h17M5.5 4.5h13a2 2 0 012 2v12a2 2 0 01-2 2h-13a2 2 0 01-2-2v-12a2 2 0 012-2z",
  check: "M20 6.5L9.2 17.3 4 12.1",
  chevron: "M6 9.5l6 6 6-6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6L6 18",
  arrow: "M5 12h14M13 6l6 6-6 6",
  arrowUp: "M12 19V5M6 11l6-6 6 6",
  star: "M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5z",
  quote: "M7 7h4v4c0 3.3-1.8 5.5-5 6.5M13 7h4v4c0 3.3-1.8 5.5-5 6.5",
  sparkle: "M12 3l1.7 4.6L18.3 9l-4.6 1.7L12 15l-1.7-4.3L5.7 9l4.6-1.4L12 3z",
  crown: "M3 8l4.2 3L12 5l4.8 6L21 8l-2 11H5L3 8z",
  braces: "M4 7v10M20 7v10M4 12h16M9 9v6M15 9v6",
  scan: "M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 12h10",
  mail: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zM22 6l-10 7L2 6",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  globe:
    "M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18 15 15 0 010-18z",
  book: "M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5V5a2 2 0 012-2h14v14H6.5A2.5 2.5 0 004 19.5z",
};

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   ANIMATION COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* ── Mask Reveal ── content slides up from a clipped mask ── */
function MaskReveal({ children, delay = 0, className = "", duration = 1200 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`overflow-hidden leading-normal ${className}`}>
      <div
        style={{
          transitionDelay: `${delay}ms`,
          transitionDuration: `${duration}ms`,
        }}
        className={`transition-transform ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform ${
          shown ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Fade + Blur Reveal ── subtle premium appearance ── */
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  once = true,
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) setShown(false);
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const dir = {
    up: "translate-y-8",
    down: "-translate-y-8",
    left: "translate-x-8",
    right: "-translate-x-8",
    none: "",
  }[direction];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        shown
          ? "opacity-100 blur-0 translate-x-0 translate-y-0"
          : `opacity-0 blur-[6px] ${dir}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Split Text (word reveal from mask) ── */
function SplitText({
  text,
  className = "",
  delay = 0,
  wordDelay = 90,
  accentWords = [],
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => {
        const isAccent = accentWords.includes(word);
        return (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom pb-[0.1em]"
          >
            <span
              style={{ transitionDelay: `${delay + i * wordDelay}ms` }}
              className={`inline-block transition-transform duration-[900ms] ease-[cubic-bezier(0.77,0,0.175,1)] will-change-transform ${
                shown ? "translate-y-0" : "translate-y-full"
              } ${isAccent ? "text-[#c9a961] italic" : ""}`}
            >
              {word}
            </span>
            {i < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}

/* ── Counter ── */
function Counter({ value, duration = 2200, className = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const num = parseFloat(value.toString().replace(/[^\d.]/g, ""));
    if (isNaN(num)) {
      setCount(value);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(num * eased));
      if (p < 1) requestAnimationFrame(tick);
      else setCount(num);
    };
    requestAnimationFrame(tick);
  }, [started, value, duration]);

  const suffix = value.toString().replace(/[\d,. ]/g, "");
  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Parallax ── */
function Parallax({ children, speed = 0.15, className = "" }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = null;
    const update = () => {
      raf = null;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      setOffset((window.innerHeight / 2 - center) * speed);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translate3d(0, ${offset}px, 0)`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Tilt Card ── 3D mouse-tracking ── */
function TiltCard({ children, className = "", max = 10 }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (y - 0.5) * -max;
      const ry = (x - 0.5) * max;
      setStyle({
        transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`,
      });
    },
    [max],
  );

  const handleLeave = () =>
    setStyle({
      transform: "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)",
    });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        transition: "transform 300ms cubic-bezier(0.16,1,0.3,1)",
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Magnetic Button ── follows cursor slightly ── */
function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setStyle({ transform: `translate3d(${x}px, ${y}px, 0)` });
  };
  const onLeave = () => setStyle({ transform: "translate3d(0,0,0)" });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        transition: "transform 400ms cubic-bezier(0.16,1,0.3,1)",
      }}
      className={className}
    >
      {children}
    </div>
  );
}

/* ── Image Reveal (clip-path curtain) ── */
function ImageReveal({
  src,
  alt = "",
  className = "",
  imgClassName = "",
  delay = 0,
  direction = "bottom",
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const clips = {
    top: {
      start: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      end: "polygon(0 0, 100% 0, 100% 0, 0 0)",
    },
    bottom: {
      start: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      end: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
    left: {
      start: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      end: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
    right: {
      start: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      end: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
  };
  const clip = clips[direction] || clips.bottom;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shown ? "scale-100" : "scale-110"
        } ${imgClassName}`}
      />
      <div
        style={{
          transitionDelay: `${delay}ms`,
          clipPath: shown ? clip.start : clip.end,
        }}
        className="pointer-events-none absolute inset-0 bg-[#faf7f2] transition-[clip-path] duration-[1400ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
      />
    </div>
  );
}

/* ── Marquee ── */
function Marquee({ items, className = "", speed = "30s" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="flex w-max gap-16"
        style={{
          animation: `marquee-${speed.replace(/\W/g, "")} ${speed} linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-4 whitespace-nowrap"
          >
            {item}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-${speed.replace(/\W/g, "")} {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ── Circular Scroll Progress ── */
function ScrollRing() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(window.scrollY / h, 1) : 0);
      setVisible(window.scrollY > 400);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const r = 22;
  const c = 2 * Math.PI * r;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`fixed bottom-24 right-6 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#1a3a2e] text-[#c9a961] shadow-2xl transition-all duration-500 hover:scale-110 md:grid ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg viewBox="0 0 56 56" className="absolute inset-0 -rotate-90">
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="rgba(201,169,97,0.15)"
          strokeWidth="2"
        />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="#c9a961"
          strokeWidth="2"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-150"
        />
      </svg>
      <Icon path={ICONS.arrowUp} className="relative h-4 w-4" />
    </button>
  );
}

/* ── Animated Heartbeat Line ── */
function Heartbeat({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 40"
      className={className}
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M0 20 L40 20 L48 8 L56 32 L64 20 L96 20 L104 4 L112 36 L120 20 L200 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="[stroke-dasharray:400] [stroke-dashoffset:400] animate-[dash_3s_ease-in-out_infinite]"
      />
      <style>{`
        @keyframes dash {
          0%, 100% { stroke-dashoffset: 400; }
          50% { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function DoctorPortfolioPrestige() {
  const [lang, setLang] = useState("bn");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeTreat, setActiveTreat] = useState(0);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    preferredDate: "",
    slot: "",
    chamberIndex: 0,
    problem: "",
  });

  /* ── CONTENT ── */
  const content = {
    bn: {
      name: "ডাঃ মোঃ আরিফুর রহমান",
      shortName: "ডাঃ আরিফ",
      initials: "AR",
      specialty: "দন্ত বিশেষজ্ঞ ও ওরাল সার্জন",
      degrees: "BDS (DU), PGT (Oral & Maxillofacial Surgery), FCPS (F-1)",
      bmdc: "BMDC Reg. A-12345",
      kicker: "ডেন্টাল কেয়ার · ঢাকা",
      heroLead1: "আপনার হাসির",
      heroLead2: "প্রিমিয়াম",
      heroLead3: "যত্ন, এখন",
      heroAccent: "আরও কাছাকাছি।",
      heroSub:
        "বিশ বছরের অভিজ্ঞতা, রোটারি প্রযুক্তি এবং সম্পূর্ণ জীবাণুমুক্ত পরিবেশে যন্ত্রণাহীন ডেন্টাল চিকিৎসা — প্রতিটি রোগীর জন্য ব্যক্তিগতভাবে পরিকল্পিত।",
      ctaPrimary: "অ্যাপয়েন্টমেন্ট বুক করুন",
      ctaSecondary: "ডাক্তারের সাথে কথা বলুন",
      scroll: "নিচে স্ক্রোল করুন",
      nav: {
        treatments: "চিকিৎসা",
        journey: "অভিজ্ঞতা",
        spaces: "চেম্বার",
        reviews: "রিভিউ",
        faq: "প্রশ্ন",
        book: "বুকিং",
      },
      marquee: [
        "রুট ক্যানেল · যন্ত্রণাহীন",
        "ডিজিটাল এক্স-রে",
        "জিরকোনিয়া ক্রাউন",
        "ইমপ্লান্ট সার্জারি",
        "পেডিয়াট্রিক ডেন্টিস্ট্রি",
        "কসমেটিক ভিনিয়ার",
      ],
      aboutKicker: "পরিচিতি",
      aboutTitle1: "বিশ বছরের",
      aboutTitle2: "নিবেদিত সেবা",
      about:
        "ঢাকা বিশ্ববিদ্যালয় থেকে BDS সম্পন্ন করে লন্ডনে ওরাল সার্জারিতে উচ্চতর প্রশিক্ষণ নিয়েছেন ডাঃ আরিফ। তিনি মনে করেন — আধুনিক ডেন্টিস্ট্রি শুধু যন্ত্রপাতির নয়, রোগীর সাথে সময় দেওয়া ও সঠিক পরামর্শেরও।",
      timeline: [
        {
          year: "২০০৪",
          title: "BDS — ঢাকা বিশ্ববিদ্যালয়",
          desc: "প্রথম শ্রেণীতে স্নাতক সম্পন্ন।",
        },
        {
          year: "২০০৮",
          title: "PGT — ওরাল সার্জারি",
          desc: "লন্ডন ডেন্টাল স্কুলে দুই বছরের ট্রেনিং।",
        },
        {
          year: "২০১৩",
          title: "নিজস্ব চেম্বার প্রতিষ্ঠা",
          desc: "ধানমন্ডিতে আধুনিক ডেন্টাল স্টুডিও।",
        },
        {
          year: "২০১৮",
          title: "FCPS পার্ট-১",
          desc: "বাংলাদেশ কলেজ অব ফিজিশিয়ানস অ্যান্ড সার্জনস।",
        },
        {
          year: "২০২৪",
          title: "৮,০০০+ সফল চিকিৎসা",
          desc: "নিজস্ব ডিজিটাল ল্যাব ও ৪-চেয়ার স্টুডিও।",
        },
      ],
      treatmentsKicker: "চিকিৎসা",
      treatmentsTitle: "যা আমরা করি",
      treatmentsSub:
        "প্রতিটি চিকিৎসা আন্তর্জাতিক মান অনুসরণ করে এবং আপনার আরামকে সর্বোচ্চ গুরুত্ব দেওয়া হয়।",
      treatments: [
        {
          icon: "tooth",
          name: "রুট ক্যানেল",
          dur: "১–২ সিটিং",
          note: "যন্ত্রণাহীন রোটারি টেকনিক",
          desc: "সংক্রমিত দাঁত সংরক্ষণের সবচেয়ে আধুনিক পদ্ধতি — কয়েক ঘণ্টায় ফিরে পাবেন স্বস্তি।",
        },
        {
          icon: "sparkle",
          name: "স্কেলিং ও পলিশিং",
          dur: "৪৫ মিনিট",
          note: "আল্ট্রাসনিক ক্লিনিং",
          desc: "দাঁতের পাথর ও দাগ দূর করে মাড়ির স্বাস্থ্য ফিরিয়ে আনা — বছরে দুবার সুপারিশকৃত।",
        },
        {
          icon: "crown",
          name: "জিরকোনিয়া ক্রাউন",
          dur: "২ ভিজিট",
          note: "ডিজিটাল স্ক্যান",
          desc: "মেটাল-ফ্রি, ট্রান্সলুসেন্ট ও দীর্ঘস্থায়ী — প্রাকৃতিক দাঁতের মতোই দেখতে।",
        },
        {
          icon: "braces",
          name: "ক্লিয়ার এলাইনার",
          dur: "৬–১৮ মাস",
          note: "ইনভিসিবল ট্রিটমেন্ট",
          desc: "খুব কম দৃশ্যমান, খুলে ফেলা যায় — আঁকাবাঁকা দাঁত সোজা করার আধুনিক উপায়।",
        },
        {
          icon: "scan",
          name: "ইমপ্লান্ট সার্জারি",
          dur: "১ দিন",
          note: "টাইটেনিয়াম ফিক্সচার",
          desc: "নিখোঁজ দাঁতের স্থায়ী সমাধান — স্বাভাবিক চিবানোর ক্ষমতা ফিরে আসে।",
        },
      ],
      spacesKicker: "চেম্বার",
      spacesTitle: "যেখানে যত্ন",
      spacesSub: "ঢাকা শহরে দুটি আধুনিক, জীবাণুমুক্ত ডেন্টাল স্টুডিও।",
      spaces: [
        {
          name: "ধানমন্ডি স্টুডিও",
          addr: "রোড ৭, ধানমন্ডি, ঢাকা ১২০৫",
          hours: "শনি–বৃহস্পতি · বিকাল ৫:০০ – রাত ৯:০০",
          phone: "+8801711000000",
          tag: "মূল চেম্বার",
        },
        {
          name: "বাড্ডা ক্লিনিক",
          addr: "প্রগতি স্বরনী, বাড্ডা, ঢাকা ১২১২",
          hours: "শনি–বুধবার · বিকাল ৪:০০ – রাত ৮:০০",
          phone: "+8801811000000",
          tag: "উপ-চেম্বার",
        },
      ],
      reviewsKicker: "রোগীদের কণ্ঠ",
      reviewsTitle: "ভালোবাসা",
      reviewsSub: "৮,০০০+ রোগীর বিশ্বাসের অংশীদার।",
      reviews: [
        {
          name: "তানভীর হোসেন",
          area: "বাড্ডা",
          text: "রুট ক্যানেলে একটুও ব্যথা লাগেনি। ডাক্তার খুব সময় দিয়ে বুঝিয়েছেন।",
          rating: 5,
        },
        {
          name: "নুসরাত জাহান",
          area: "ধানমন্ডি",
          text: "ব্রেসেসের জন্য এক বছরের বেশি সময় আছি — ফলাফল দেখে অভিভূত।",
          rating: 5,
        },
        {
          name: "মাহবুব আলম",
          area: "মিরপুর",
          text: "সময়মতো সিরিয়াল, লুকানো চার্জ নেই, ব্যবহার অত্যন্ত আন্তরিক।",
          rating: 5,
        },
      ],
      bookKicker: "অ্যাপয়েন্টমেন্ট",
      bookTitle1: "একটি সময় বেছে নিন",
      bookTitle2: "আমরা বাকিটা দেখব",
      bookSub: "WhatsApp-এ আপনার অনুরোধ সরাসরি আমাদের রিসেপশনে চলে যাবে।",
      form: {
        name: "রোগীর নাম",
        namePh: "যেমন: তানভীর হোসেন",
        phone: "মোবাইল নম্বর",
        phonePh: "01700000000",
        date: "পছন্দের তারিখ",
        slot: "পছন্দের সময়",
        slots: [
          "সন্ধ্যা ৫:০০ – ৬:০০",
          "সন্ধ্যা ৬:০০ – ৭:০০",
          "সন্ধ্যা ৭:০০ – ৮:০০",
          "রাত ৮:০০ – ৯:০০",
        ],
        chamber: "চেম্বার",
        problem: "সমস্যার সংক্ষিপ্ত বিবরণ (ঐচ্ছিক)",
        problemPh: "যেমন: উপরের ডান দিকের দাঁতে ব্যথা",
        submit: "WhatsApp-এ পাঠান",
        sending: "পাঠানো হচ্ছে…",
        success: "ধন্যবাদ! আপনার অনুরোধ প্রস্তুত হয়েছে — শুধু Send চাপুন।",
        errName: "অনুগ্রহ করে নাম লিখুন।",
        errPhone: "সঠিক মোবাইল নম্বর দিন।",
        errDate: "তারিখ নির্বাচন করুন।",
        secure: "🔒 তথ্য শুধুমাত্র অ্যাপয়েন্টমেন্টের জন্য সংরক্ষিত।",
      },
      faqKicker: "প্রশ্নোত্তর",
      faqTitle: "যা প্রায়ই",
      faqTitle2: "জিজ্ঞেস করা হয়",
      faqs: [
        {
          q: "অ্যাপয়েন্টমেন্ট ছাড়া কি আসা যাবে?",
          a: "যাওয়া যায়, তবে অপেক্ষা করতে হতে পারে। আগে থেকে বুক করলে নির্দিষ্ট সময়ে সিরিয়াল পাবেন।",
        },
        {
          q: "রুট ক্যানেলে কত সময় লাগে?",
          a: "সাধারণত ১–২ সিটিং, প্রতিটি ৪৫–৬০ মিনিট। দাঁতের অবস্থা অনুযায়ী ভিন্ন হতে পারে।",
        },
        {
          q: "খরচ কেমন?",
          a: "প্রথম পরামর্শ ও এক্স-রে এর পর সঠিক খরচ জানিয়ে দেওয়া হয় — কোনো লুকানো চার্জ নেই।",
        },
        {
          q: "বাচ্চাদের চিকিৎসা হয়?",
          a: "হ্যাঁ, ৬ বছর বয়স থেকেই পেডিয়াট্রিক ডেন্টিস্ট্রি সেবা প্রদান করা হয়।",
        },
      ],
      footerNote:
        "এই ওয়েবসাইটের তথ্য সাধারণ পরামর্শের জন্য; চিকিৎসার জন্য সরাসরি পরামর্শ নিন।",
      rights: "সর্বস্বত্ব সংরক্ষিত।",
      hours: "সময়সূচী",
      contact: "যোগাযোগ",
      location: "লোকেশন",
    },
    en: {
      name: "Dr. Md. Arifur Rahman",
      shortName: "Dr. Arif",
      initials: "AR",
      specialty: "Dental Specialist & Oral Surgeon",
      degrees: "BDS (DU), PGT (Oral & Maxillofacial Surgery), FCPS (F-1)",
      bmdc: "BMDC Reg. A-12345",
      kicker: "Dental Care · Dhaka",
      heroLead1: "Premium",
      heroLead2: "care for",
      heroLead3: "your",
      heroAccent: "confident smile.",
      heroSub:
        "Twenty years of experience, rotary technology, and a fully sterilized environment. Every treatment plan is tailored personally — because your smile deserves nothing less.",
      ctaPrimary: "Book Appointment",
      ctaSecondary: "Talk to the Doctor",
      scroll: "Scroll to explore",
      nav: {
        treatments: "Treatments",
        journey: "Journey",
        spaces: "Chambers",
        reviews: "Reviews",
        faq: "FAQ",
        book: "Book",
      },
      marquee: [
        "Painless Root Canal",
        "Digital X-Ray",
        "Zirconia Crowns",
        "Implant Surgery",
        "Pediatric Dentistry",
        "Cosmetic Veneers",
      ],
      aboutKicker: "Profile",
      aboutTitle1: "Two decades of",
      aboutTitle2: "dedicated care",
      about:
        "Dr. Arif completed his BDS at the University of Dhaka and received advanced training in oral surgery in London. He believes modern dentistry is not only about equipment — it is about time spent with the patient and the right advice.",
      timeline: [
        {
          year: "2004",
          title: "BDS — University of Dhaka",
          desc: "Graduated with first-class honours.",
        },
        {
          year: "2008",
          title: "PGT — Oral Surgery",
          desc: "Two-year training at London Dental School.",
        },
        {
          year: "2013",
          title: "Opened Private Studio",
          desc: "A modern dental studio in Dhanmondi.",
        },
        {
          year: "2018",
          title: "FCPS Part-1",
          desc: "Bangladesh College of Physicians and Surgeons.",
        },
        {
          year: "2024",
          title: "8,000+ Successful Cases",
          desc: "Own digital lab and 4-chair studio.",
        },
      ],
      treatmentsKicker: "Treatments",
      treatmentsTitle: "What We Do",
      treatmentsSub:
        "Each treatment follows international standards with your comfort as the highest priority.",
      treatments: [
        {
          icon: "tooth",
          name: "Root Canal",
          dur: "1–2 sittings",
          note: "Painless rotary technique",
          desc: "The most modern method of saving an infected tooth — relief within hours.",
        },
        {
          icon: "sparkle",
          name: "Scaling & Polishing",
          dur: "45 minutes",
          note: "Ultrasonic cleaning",
          desc: "Removes tartar and stains, restoring gum health — recommended twice a year.",
        },
        {
          icon: "crown",
          name: "Zirconia Crowns",
          dur: "2 visits",
          note: "Digital scan",
          desc: "Metal-free, translucent, and long-lasting — looks just like a natural tooth.",
        },
        {
          icon: "braces",
          name: "Clear Aligners",
          dur: "6–18 months",
          note: "Invisible treatment",
          desc: "Barely visible, removable — the modern way to straighten crooked teeth.",
        },
        {
          icon: "scan",
          name: "Implant Surgery",
          dur: "1 day",
          note: "Titanium fixture",
          desc: "A permanent solution for missing teeth — full chewing function restored.",
        },
      ],
      spacesKicker: "Chambers",
      spacesTitle: "Where We Care",
      spacesSub: "Two modern, sterilized dental studios in the heart of Dhaka.",
      spaces: [
        {
          name: "Dhanmondi Studio",
          addr: "Road 7, Dhanmondi, Dhaka 1205",
          hours: "Sat–Thu · 5:00 PM – 9:00 PM",
          phone: "+8801711000000",
          tag: "Main chamber",
        },
        {
          name: "Badda Clinic",
          addr: "Pragati Sarani, Badda, Dhaka 1212",
          hours: "Sat–Wed · 4:00 PM – 8:00 PM",
          phone: "+8801811000000",
          tag: "Branch",
        },
      ],
      reviewsKicker: "Patient Voices",
      reviewsTitle: "Loved by",
      reviewsSub: "Trusted by more than 8,000 patients.",
      reviews: [
        {
          name: "Tanvir Hossain",
          area: "Badda",
          text: "Not a single moment of pain during my root canal. The doctor explained everything with patience.",
          rating: 5,
        },
        {
          name: "Nusrat Jahan",
          area: "Dhanmondi",
          text: "Under his care for over a year for braces — the results are stunning.",
          rating: 5,
        },
        {
          name: "Mahbub Alam",
          area: "Mirpur",
          text: "On-time slots, no hidden charges, and genuinely warm behaviour.",
          rating: 5,
        },
      ],
      bookKicker: "Appointment",
      bookTitle1: "Pick a time",
      bookTitle2: "we'll handle the rest",
      bookSub: "Your request goes straight to our reception via WhatsApp.",
      form: {
        name: "Patient Name",
        namePh: "e.g. Tanvir Hossain",
        phone: "Mobile Number",
        phonePh: "01700000000",
        date: "Preferred Date",
        slot: "Preferred Time",
        slots: [
          "5:00 PM – 6:00 PM",
          "6:00 PM – 7:00 PM",
          "7:00 PM – 8:00 PM",
          "8:00 PM – 9:00 PM",
        ],
        chamber: "Chamber",
        problem: "Brief description (optional)",
        problemPh: "e.g. Pain on upper right molar",
        submit: "Send via WhatsApp",
        sending: "Sending…",
        success:
          "Thank you! Your request is ready — just press Send in WhatsApp.",
        errName: "Please enter a name.",
        errPhone: "Please enter a valid mobile number.",
        errDate: "Please select a date.",
        secure:
          "🔒 Information is kept confidential and used only for appointments.",
      },
      faqKicker: "FAQ",
      faqTitle: "Questions we",
      faqTitle2: "often receive",
      faqs: [
        {
          q: "Can I visit without an appointment?",
          a: "Yes, but you may need to wait. Booking ahead guarantees your preferred time slot.",
        },
        {
          q: "How long does a root canal take?",
          a: "Usually 1–2 sittings, each 45–60 minutes, depending on the condition of the tooth.",
        },
        {
          q: "What about the cost?",
          a: "The exact cost is shared after the first consultation and X-ray — no hidden charges.",
        },
        {
          q: "Do you treat children?",
          a: "Yes, pediatric dentistry is available for children from 6 years of age onwards.",
        },
      ],
      footerNote:
        "Information on this site is general guidance; please consult in person for treatment.",
      rights: "All rights reserved.",
      hours: "Hours",
      contact: "Contact",
      location: "Location",
    },
  };

  const t = content[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const todayISO = new Date().toISOString().slice(0, 10);

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((p) => (p[key] ? { ...p, [key]: undefined } : p));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const errs = {};
    if (!form.patientName.trim()) errs.patientName = t.form.errName;
    if ((form.phone || "").replace(/\D/g, "").length < 10)
      errs.phone = t.form.errPhone;
    if (!form.preferredDate) errs.preferredDate = t.form.errDate;
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus("sending");
    const chamberName = t.spaces[form.chamberIndex]?.name ?? "";
    const lines = [
      `*${lang === "bn" ? "নতুন অ্যাপয়েন্টমেন্ট" : "New Appointment Request"}*`,
      "",
      `*${t.form.name}:* ${form.patientName}`,
      `*${t.form.phone}:* ${form.phone}`,
      `*${t.form.chamber}:* ${chamberName}`,
      `*${t.form.date}:* ${form.preferredDate}`,
    ];
    if (form.slot) lines.push(`*${t.form.slot}:* ${form.slot}`);
    if (form.problem.trim()) lines.push(`*${t.form.problem}:* ${form.problem}`);

    window.open(
      `https://wa.me/8801711000000?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setTimeout(() => setStatus("done"), 600);
  };

  const fontStack =
    lang === "bn"
      ? "'Hind Siliguri', 'Noto Sans Bengali', system-ui, sans-serif"
      : "'Inter', system-ui, -apple-system, sans-serif";

  const serifStack = "'Playfair Display', Georgia, 'Times New Roman', serif";

  const inputBase =
    "w-full border-b bg-transparent px-0 py-3 text-sm text-[#1a3a2e] outline-none transition-all duration-300 " +
    "placeholder:text-[#1a3a2e]/30 focus:border-[#c9a961] focus:pl-2";

  const navKeys = ["treatments", "journey", "spaces", "reviews", "faq"];

  return (
    <div
      style={{ fontFamily: fontStack }}
      className="min-h-screen bg-[#faf7f2] text-[#1a3a2e] antialiased selection:bg-[#c9a961]/30"
    >
      <ScrollRing />

      {/* ═══════════ HEADER ═══════════ */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-[#1a3a2e]/10 bg-[#faf7f2]/90 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 lg:px-10">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#1a3a2e]/20 bg-[#1a3a2e] text-[11px] font-black tracking-wider text-[#c9a961] transition-transform duration-500 group-hover:rotate-[15deg]">
              {t.initials}
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span
                style={{ fontFamily: serifStack }}
                className="block text-[15px] font-semibold italic text-[#1a3a2e]"
              >
                {t.shortName}
              </span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-[#1a3a2e]/50">
                {t.specialty}
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {navKeys.map((key) => (
              <button
                key={key}
                onClick={() => scrollTo(key)}
                className="group relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1a3a2e]/60 transition hover:text-[#1a3a2e]"
              >
                {t.nav[key]}
                <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-[#c9a961] transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "bn" ? "en" : "bn")}
              className="rounded-full border border-[#1a3a2e]/15 px-3.5 py-2 text-[10px] font-black uppercase tracking-widest text-[#1a3a2e]/60 transition hover:border-[#c9a961] hover:text-[#1a3a2e]"
            >
              {lang === "bn" ? "EN" : "বাং"}
            </button>

            <Magnetic strength={0.25}>
              <button
                onClick={() => scrollTo("book")}
                className="group relative hidden overflow-hidden rounded-full bg-[#1a3a2e] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#faf7f2] transition-colors duration-300 hover:text-[#c9a961] sm:block"
              >
                <span className="relative z-10">{t.nav.book}</span>
                <span className="absolute inset-0 -translate-x-full bg-[#c9a961]/20 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
            </Magnetic>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center rounded-full text-[#1a3a2e]/70 transition hover:bg-[#1a3a2e]/5 lg:hidden"
            >
              <Icon
                path={menuOpen ? ICONS.close : ICONS.menu}
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden border-t border-[#1a3a2e]/10 bg-[#faf7f2] transition-[max-height] duration-500 lg:hidden ${
            menuOpen ? "max-h-[26rem]" : "max-h-0"
          }`}
        >
          <nav className="grid gap-0 px-6 py-4">
            {[...navKeys, "book"].map((key) => (
              <button
                key={key}
                onClick={() => scrollTo(key)}
                className="border-b border-[#1a3a2e]/5 py-3.5 text-left text-[12px] font-bold uppercase tracking-[0.16em] text-[#1a3a2e]/70 transition hover:text-[#c9a961]"
              >
                {t.nav[key]}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ═══════════ HERO — Editorial split ═══════════ */}
      <section className="relative overflow-hidden bg-[#faf7f2] pb-24 pt-32 lg:pb-32 lg:pt-40">
        {/* Decorative grid lines */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <div className="absolute left-1/2 top-0 h-full w-px bg-[#1a3a2e]/5" />
          <div className="absolute left-1/4 top-0 h-full w-px bg-[#1a3a2e]/5" />
          <div className="absolute left-3/4 top-0 h-full w-px bg-[#1a3a2e]/5" />
        </div>

        {/* Floating decorative icons */}
        <Parallax
          speed={0.3}
          className="pointer-events-none absolute right-[8%] top-[22%] hidden lg:block"
        >
          <Icon
            path={ICONS.tooth}
            className="h-16 w-16 text-[#c9a961]/15"
            strokeWidth={0.8}
          />
        </Parallax>
        <Parallax
          speed={-0.2}
          className="pointer-events-none absolute left-[10%] top-[65%] hidden lg:block"
        >
          <Icon
            path={ICONS.pulse}
            className="h-20 w-20 text-[#1a3a2e]/8"
            strokeWidth={0.6}
          />
        </Parallax>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <div className="mb-10 flex items-center gap-4">
              <span className="h-px w-12 bg-[#c9a961]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9a961]">
                {t.kicker}
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <h1
                style={{ fontFamily: serifStack }}
                className="text-[2.75rem] font-medium leading-[1.02] tracking-tight text-[#1a3a2e] sm:text-[4rem] lg:text-[5rem]"
              >
                <MaskReveal>
                  <span className="block">
                    {t.heroLead1}{" "}
                    <em className="text-[#c9a961]">{t.heroLead2}</em>
                  </span>
                </MaskReveal>
                <MaskReveal delay={150}>
                  <span className="block">{t.heroLead3}</span>
                </MaskReveal>
                <MaskReveal delay={300}>
                  <span className="block italic text-[#c9a961]">
                    {t.heroAccent}
                  </span>
                </MaskReveal>
              </h1>

              <Reveal delay={500} direction="left">
                <p className="mt-10 max-w-lg text-[15px] leading-relaxed text-[#1a3a2e]/65">
                  {t.heroSub}
                </p>
              </Reveal>

              <Reveal delay={700}>
                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <Magnetic strength={0.3}>
                    <button
                      onClick={() => scrollTo("book")}
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#1a3a2e] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#faf7f2]"
                    >
                      <span className="relative z-10 transition-colors duration-500 group-hover:text-[#1a3a2e]">
                        {t.ctaPrimary}
                      </span>
                      <Icon
                        path={ICONS.arrow}
                        className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                      />
                      <span className="absolute inset-0 -translate-x-full bg-[#c9a961] transition-transform duration-500 group-hover:translate-x-0" />
                    </button>
                  </Magnetic>

                  <a
                    href="tel:+8801711000000"
                    className="group inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.15em] text-[#1a3a2e] transition hover:text-[#c9a961]"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-[#1a3a2e]/20 transition group-hover:border-[#c9a961] group-hover:bg-[#c9a961]">
                      <Icon
                        path={ICONS.phone}
                        className="h-3.5 w-3.5 transition group-hover:text-[#faf7f2]"
                      />
                    </span>
                    {t.ctaSecondary}
                  </a>
                </div>
              </Reveal>

              {/* Heartbeat + stats */}
              <Reveal delay={900}>
                <div className="mt-16 border-t border-[#1a3a2e]/10 pt-8">
                  <Heartbeat className="h-8 w-32 text-[#c65d5d]" />
                  <dl className="mt-6 grid max-w-lg grid-cols-3 gap-6">
                    {[
                      {
                        v: "20+",
                        l: lang === "bn" ? "বছরের অভিজ্ঞতা" : "Years of care",
                      },
                      {
                        v: "8000+",
                        l: lang === "bn" ? "সন্তুষ্ট রোগী" : "Happy patients",
                      },
                      {
                        v: "4.9",
                        l: lang === "bn" ? "গড় রেটিং" : "Average rating",
                      },
                    ].map((s) => (
                      <div key={s.l}>
                        <dt
                          style={{ fontFamily: serifStack }}
                          className="text-3xl font-medium italic text-[#1a3a2e] sm:text-4xl"
                        >
                          <Counter value={s.v} />
                        </dt>
                        <dd className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a3a2e]/40">
                          {s.l}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>

            {/* Portrait */}
            <Reveal delay={300} direction="right">
              <div className="relative">
                {/* Offset frame */}
                <div className="absolute -inset-4 translate-x-4 translate-y-4 rounded-[2rem] border border-[#c9a961]/30" />
                <ImageReveal
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80"
                  alt={t.name}
                  direction="bottom"
                  delay={200}
                  className="relative aspect-[4/5] rounded-[2rem] -scale-x-100"
                />
                {/* Badges */}
                <div className="absolute -left-6 bottom-8 flex items-center gap-3 rounded-2xl border border-[#1a3a2e]/10 bg-[#faf7f2] px-4 py-3 shadow-2xl shadow-[#1a3a2e]/10">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1a3a2e] text-[#c9a961]">
                    <Icon path={ICONS.shield} className="h-5 w-5" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[12px] font-bold text-[#1a3a2e]">
                      BMDC Verified
                    </span>
                    <span className="block text-[10px] text-[#1a3a2e]/50">
                      {t.bmdc}
                    </span>
                  </span>
                </div>

                <div className="absolute -right-4 top-8 flex items-center gap-2 rounded-full border border-[#1a3a2e]/10 bg-[#faf7f2] px-4 py-2.5 shadow-xl">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon
                      key={i}
                      path={ICONS.star}
                      className="h-3.5 w-3.5 fill-[#c9a961] text-[#c9a961]"
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <Reveal delay={1200}>
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#1a3a2e]/30">
              {t.scroll}
            </span>
            <span className="block h-10 w-px overflow-hidden bg-[#1a3a2e]/10">
              <span className="block h-full w-full animate-[scrollDown_2s_ease-in-out_infinite] bg-[#c9a961]" />
            </span>
            <style>{`@keyframes scrollDown { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }`}</style>
          </div>
        </Reveal>
      </section>

      {/* ═══════════ TRUST MARQUEE ═══════════ */}
      <section className="relative overflow-hidden border-y border-[#1a3a2e]/10 bg-[#1a3a2e] py-6">
        <Marquee
          speed="40s"
          items={t.marquee.map((label) => (
            <span
              key={label}
              className="flex items-center gap-6 text-[12px] font-bold uppercase tracking-[0.2em] text-[#faf7f2]/70"
            >
              <Icon
                path={ICONS.sparkle}
                className="h-3.5 w-3.5 text-[#c9a961]"
              />
              {label}
            </span>
          ))}
        />
      </section>

      {/* ═══════════ ABOUT + TIMELINE ═══════════ */}
      <section
        id="journey"
        className="relative scroll-mt-24 overflow-hidden bg-[#faf7f2] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9a961]">
                  {t.aboutKicker}
                </span>
              </Reveal>
              <h2
                style={{ fontFamily: serifStack }}
                className="mt-6 text-[2.25rem] font-medium leading-[1.05] tracking-tight text-[#1a3a2e] sm:text-[3rem] lg:text-[3.5rem]"
              >
                <MaskReveal>
                  <span className="block">{t.aboutTitle1}</span>
                </MaskReveal>
                <MaskReveal delay={150}>
                  <span className="block italic text-[#c9a961]">
                    {t.aboutTitle2}
                  </span>
                </MaskReveal>
              </h2>
              <Reveal delay={300}>
                <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[#1a3a2e]/65">
                  {t.about}
                </p>
              </Reveal>

              {/* Signature-style stat card */}
              <Reveal delay={450}>
                <div className="mt-10 flex items-center gap-6 rounded-2xl border border-[#1a3a2e]/10 bg-white/50 p-6 backdrop-blur">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-[#1a3a2e] text-[#c9a961]">
                    <Icon path={ICONS.award} className="h-6 w-6" />
                  </span>
                  <div>
                    <p
                      style={{ fontFamily: serifStack }}
                      className="text-xl font-medium italic text-[#1a3a2e]"
                    >
                      FCPS Part-1
                    </p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[#1a3a2e]/50">
                      {lang === "bn"
                        ? "বাংলাদেশ কলেজ অব ফিজিশিয়ানস অ্যান্ড সার্জনস"
                        : "Bangladesh College of Physicians & Surgeons"}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-[7px] top-2 h-full w-px bg-[#1a3a2e]/10" />
              {t.timeline.map((item, idx) => (
                <Reveal key={idx} delay={idx * 120} direction="left">
                  <div className="group relative flex gap-8 pb-12 pl-0">
                    <span className="relative z-10 mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 border-[#faf7f2] bg-[#c9a961] transition-all duration-500 group-hover:scale-125 group-hover:bg-[#1a3a2e]">
                      <span className="absolute inset-0 rounded-full bg-[#c9a961]/40 opacity-0 transition group-hover:animate-ping group-hover:opacity-100" />
                    </span>
                    <div className="min-w-0 flex-1 border-b border-[#1a3a2e]/10 pb-8">
                      <span
                        style={{ fontFamily: serifStack }}
                        className="text-[13px] font-medium italic text-[#c9a961]"
                      >
                        {item.year}
                      </span>
                      <h3 className="mt-2 text-lg font-bold tracking-tight text-[#1a3a2e] sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#1a3a2e]/55">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ TREATMENTS — Horizontal tabs + big display ═══════════ */}
      <section
        id="treatments"
        className="relative scroll-mt-24 overflow-hidden bg-[#1a3a2e] px-6 py-24 lg:px-10 lg:py-32"
      >
        {/* Subtle decorative pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #c9a961 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <Parallax
          speed={0.2}
          className="pointer-events-none absolute -right-20 top-1/3 hidden lg:block"
        >
          <Icon
            path={ICONS.tooth}
            className="h-64 w-64 text-[#c9a961]/5"
            strokeWidth={0.4}
          />
        </Parallax>

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9a961]">
                  {t.treatmentsKicker}
                </span>
                <h2
                  style={{ fontFamily: serifStack }}
                  className="mt-4 text-[2.25rem] font-medium italic leading-tight text-[#faf7f2] sm:text-[3rem] lg:text-[3.5rem]"
                >
                  {t.treatmentsTitle}
                </h2>
              </div>
              <p className="max-w-md text-[13px] leading-relaxed text-[#faf7f2]/50">
                {t.treatmentsSub}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.4fr_0.6fr] lg:gap-16">
            {/* Tab list */}
            <div>
              <ul className="space-y-0">
                {t.treatments.map((tr, idx) => {
                  const active = activeTreat === idx;
                  return (
                    <li key={tr.name}>
                      <Reveal delay={idx * 60}>
                        <button
                          onClick={() => setActiveTreat(idx)}
                          onMouseEnter={() => setActiveTreat(idx)}
                          className={`group flex w-full items-center justify-between gap-6 border-b border-[#faf7f2]/10 py-5 text-left transition-all duration-300 ${
                            active ? "pl-4" : "pl-0"
                          }`}
                        >
                          <span className="flex items-center gap-4">
                            <span
                              className={`grid h-9 w-9 place-items-center rounded-full border transition-all duration-500 ${
                                active
                                  ? "border-[#c9a961] bg-[#c9a961] text-[#1a3a2e]"
                                  : "border-[#faf7f2]/20 text-[#faf7f2]/50"
                              }`}
                            >
                              <Icon path={ICONS[tr.icon]} className="h-4 w-4" />
                            </span>
                            <span
                              className={`text-[15px] font-bold tracking-tight transition-colors sm:text-base ${
                                active ? "text-[#c9a961]" : "text-[#faf7f2]/60"
                              }`}
                            >
                              {tr.name}
                            </span>
                          </span>
                          <span
                            className={`hidden text-[10px] font-bold uppercase tracking-wider transition sm:block ${
                              active ? "text-[#c9a961]" : "text-[#faf7f2]/30"
                            }`}
                          >
                            {tr.dur}
                          </span>
                        </button>
                      </Reveal>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Display panel */}
            <Reveal direction="right">
              <div className="relative min-h-[28rem] rounded-3xl border border-[#faf7f2]/10 bg-[#122a20] p-10">
                {/* decorative corner accents */}
                <span className="absolute left-6 top-6 h-6 w-6 border-l border-t border-[#c9a961]/40" />
                <span className="absolute right-6 top-6 h-6 w-6 border-r border-t border-[#c9a961]/40" />
                <span className="absolute bottom-6 left-6 h-6 w-6 border-b border-l border-[#c9a961]/40" />
                <span className="absolute bottom-6 right-6 h-6 w-6 border-b border-r border-[#c9a961]/40" />

                <div
                  key={activeTreat}
                  className="animate-[fadeSlide_500ms_cubic-bezier(0.16,1,0.3,1)]"
                >
                  <style>{`@keyframes fadeSlide { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a961]">
                    0{activeTreat + 1} / 0{t.treatments.length}
                  </span>
                  <div className="mt-8 flex items-center gap-5">
                    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#c9a961] text-[#1a3a2e]">
                      <Icon
                        path={ICONS[t.treatments[activeTreat].icon]}
                        className="h-8 w-8"
                      />
                    </span>
                    <div>
                      <h3
                        style={{ fontFamily: serifStack }}
                        className="text-2xl font-medium italic text-[#faf7f2] sm:text-3xl"
                      >
                        {t.treatments[activeTreat].name}
                      </h3>
                      <p className="mt-1 text-[11px] font-bold uppercase tracking-wider text-[#c9a961]/70">
                        {t.treatments[activeTreat].note}
                      </p>
                    </div>
                  </div>

                  <p className="mt-8 max-w-md text-[15px] leading-relaxed text-[#faf7f2]/60">
                    {t.treatments[activeTreat].desc}
                  </p>

                  <div className="mt-8 flex items-center gap-3 border-t border-[#faf7f2]/10 pt-6">
                    <Icon
                      path={ICONS.clock}
                      className="h-4 w-4 text-[#c9a961]"
                    />
                    <span className="text-[12px] font-bold uppercase tracking-wider text-[#faf7f2]/60">
                      {t.treatments[activeTreat].dur}
                    </span>
                  </div>

                  <button
                    onClick={() => scrollTo("book")}
                    className="group mt-8 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#c9a961] transition hover:text-[#faf7f2]"
                  >
                    {t.ctaPrimary}
                    <Icon
                      path={ICONS.arrow}
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ SPACES (Chambers) ═══════════ */}
      <section
        id="spaces"
        className="relative scroll-mt-24 overflow-hidden bg-[#faf7f2] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9a961]">
                {t.spacesKicker}
              </span>
              <h2
                style={{ fontFamily: serifStack }}
                className="mt-6 text-[2.25rem] font-medium italic leading-tight text-[#1a3a2e] sm:text-[3rem] lg:text-[3.5rem]"
              >
                {t.spacesTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#1a3a2e]/50">
                {t.spacesSub}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {t.spaces.map((sp, idx) => (
              <Reveal
                key={sp.name}
                delay={idx * 150}
                direction={idx === 0 ? "left" : "right"}
              >
                <TiltCard max={6}>
                  <article className="group relative h-full overflow-hidden rounded-3xl border border-[#1a3a2e]/10 bg-white p-8 transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#1a3a2e]/10 lg:p-10">
                    {/* Corner accent */}
                    <span className="absolute right-0 top-0 h-24 w-24 rounded-bl-[6rem] bg-[#c9a961]/10 transition-all duration-500 group-hover:rounded-bl-[3rem] group-hover:bg-[#c9a961]/20" />

                    <div className="relative">
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#c9a961]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#c9a961]" />
                        {sp.tag}
                      </div>

                      <h3
                        style={{ fontFamily: serifStack }}
                        className="mt-6 text-2xl font-medium italic text-[#1a3a2e] sm:text-3xl"
                      >
                        {sp.name}
                      </h3>

                      <ul className="mt-8 space-y-4">
                        <li className="flex items-start gap-3 text-[13px] text-[#1a3a2e]/70">
                          <Icon
                            path={ICONS.pin}
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a961]"
                          />
                          {sp.addr}
                        </li>
                        <li className="flex items-start gap-3 text-[13px] text-[#1a3a2e]/70">
                          <Icon
                            path={ICONS.clock}
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a961]"
                          />
                          {sp.hours}
                        </li>
                        <li className="flex items-start gap-3 text-[13px] text-[#1a3a2e]/70">
                          <Icon
                            path={ICONS.phone}
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#c9a961]"
                          />
                          <a
                            href={`tel:${sp.phone}`}
                            className="font-semibold hover:text-[#c9a961]"
                          >
                            {sp.phone}
                          </a>
                        </li>
                      </ul>

                      <div className="mt-8 flex flex-wrap gap-3 border-t border-[#1a3a2e]/10 pt-6">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sp.addr)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#1a3a2e] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#faf7f2] transition hover:bg-[#122a20]"
                        >
                          <Icon path={ICONS.pin} className="h-3.5 w-3.5" />
                          {lang === "bn" ? "ম্যাপ" : "Map"}
                        </a>
                        <button
                          onClick={() => {
                            setForm((f) => ({ ...f, chamberIndex: idx }));
                            scrollTo("book");
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-[#1a3a2e]/20 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1a3a2e] transition hover:border-[#c9a961] hover:bg-[#c9a961] hover:text-[#1a3a2e]"
                        >
                          <Icon path={ICONS.calendar} className="h-3.5 w-3.5" />
                          {t.nav.book}
                        </button>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ REVIEWS ═══════════ */}
      <section
        id="reviews"
        className="relative scroll-mt-24 overflow-hidden bg-white px-6 py-24 lg:px-10 lg:py-32"
      >
        <Icon
          path={ICONS.quote}
          className="pointer-events-none absolute -left-10 top-20 h-64 w-64 text-[#c9a961]/5"
        />

        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9a961]">
                  {t.reviewsKicker}
                </span>
                <h2
                  style={{ fontFamily: serifStack }}
                  className="mt-4 text-[2.25rem] font-medium leading-tight text-[#1a3a2e] sm:text-[3rem] lg:text-[3.5rem]"
                >
                  {t.reviewsTitle} <em className="text-[#c9a961]">—</em>
                </h2>
              </div>
              <p className="max-w-md text-[13px] leading-relaxed text-[#1a3a2e]/50">
                {t.reviewsSub}
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.reviews.map((r, idx) => (
              <Reveal key={r.name} delay={idx * 120}>
                <figure className="group relative h-full rounded-3xl border border-[#1a3a2e]/10 bg-[#faf7f2]/60 p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-[#faf7f2] hover:shadow-2xl hover:shadow-[#1a3a2e]/5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Icon
                        key={i}
                        path={ICONS.star}
                        className="h-4 w-4 fill-[#c9a961] text-[#c9a961]"
                      />
                    ))}
                  </div>
                  <blockquote
                    style={{ fontFamily: serifStack }}
                    className="mt-6 flex-1 text-[17px] italic leading-relaxed text-[#1a3a2e]/80"
                  >
                    "{r.text}"
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3 border-t border-[#1a3a2e]/10 pt-6">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1a3a2e] text-[12px] font-bold text-[#c9a961]">
                      {r.name.charAt(0)}
                    </span>
                    <span className="leading-tight">
                      <span className="block text-[13px] font-bold text-[#1a3a2e]">
                        {r.name}
                      </span>
                      <span className="block text-[11px] text-[#1a3a2e]/50">
                        {r.area}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BOOKING ═══════════ */}
      <section
        id="book"
        className="relative scroll-mt-24 overflow-hidden bg-[#1a3a2e] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #c9a961 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <Parallax
          speed={0.25}
          className="pointer-events-none absolute -left-20 bottom-0 hidden lg:block"
        >
          <Heartbeat className="h-24 w-64 text-[#c9a961]/20" />
        </Parallax>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9a961]">
                {t.bookKicker}
              </span>
              <h2
                style={{ fontFamily: serifStack }}
                className="mt-6 text-[2.25rem] font-medium leading-[1.05] text-[#faf7f2] sm:text-[3rem] lg:text-[3.5rem]"
              >
                <MaskReveal>
                  <span className="block">{t.bookTitle1}</span>
                </MaskReveal>
                <MaskReveal delay={150}>
                  <span className="block italic text-[#c9a961]">
                    {t.bookTitle2}
                  </span>
                </MaskReveal>
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-relaxed text-[#faf7f2]/50">
                {t.bookSub}
              </p>

              <div className="mt-10 space-y-4">
                {t.spaces.map((sp) => (
                  <div
                    key={sp.name}
                    className="flex items-center justify-between rounded-2xl border border-[#faf7f2]/10 bg-[#faf7f2]/[0.03] px-5 py-4 backdrop-blur transition hover:border-[#c9a961]/40"
                  >
                    <span className="text-[12px] text-[#faf7f2]/70">
                      {sp.name}
                    </span>
                    <span className="text-[12px] font-bold text-[#c9a961]">
                      {sp.hours.split("·")[0]}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={150} direction="right">
              <div className="rounded-3xl border border-[#faf7f2]/10 bg-[#faf7f2] p-8 lg:p-10">
                {status === "done" && (
                  <div className="mb-6 animate-[fadeSlide_400ms] rounded-xl border-l-4 border-[#c9a961] bg-[#faf7f2] p-4">
                    <p className="text-[13px] font-medium text-[#1a3a2e]">
                      {t.form.success}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a3a2e]/60">
                        {t.form.name} *
                      </label>
                      <input
                        type="text"
                        value={form.patientName}
                        onChange={setField("patientName")}
                        placeholder={t.form.namePh}
                        className={`${inputBase} ${errors.patientName ? "border-[#c65d5d]" : "border-[#1a3a2e]/15"}`}
                      />
                      {errors.patientName && (
                        <p className="mt-1.5 text-[11px] font-bold text-[#c65d5d]">
                          {errors.patientName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a3a2e]/60">
                        {t.form.phone} *
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={setField("phone")}
                        placeholder={t.form.phonePh}
                        className={`${inputBase} ${errors.phone ? "border-[#c65d5d]" : "border-[#1a3a2e]/15"}`}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-[11px] font-bold text-[#c65d5d]">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a3a2e]/60">
                        {t.form.date} *
                      </label>
                      <input
                        type="date"
                        min={todayISO}
                        value={form.preferredDate}
                        onChange={setField("preferredDate")}
                        className={`${inputBase} ${errors.preferredDate ? "border-[#c65d5d]" : "border-[#1a3a2e]/15"}`}
                      />
                      {errors.preferredDate && (
                        <p className="mt-1.5 text-[11px] font-bold text-[#c65d5d]">
                          {errors.preferredDate}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a3a2e]/60">
                        {t.form.chamber}
                      </label>
                      <select
                        value={form.chamberIndex}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            chamberIndex: Number(e.target.value),
                          }))
                        }
                        className={`${inputBase} border-[#1a3a2e]/15`}
                      >
                        {t.spaces.map((s, i) => (
                          <option key={s.name} value={i}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Animated slot picker */}
                  <div>
                    <label className="mb-3 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a3a2e]/60">
                      {t.form.slot}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {t.form.slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, slot }))}
                          className={`rounded-full border px-4 py-2.5 text-[11px] font-bold transition-all duration-300 ${
                            form.slot === slot
                              ? "scale-105 border-[#1a3a2e] bg-[#1a3a2e] text-[#c9a961]"
                              : "border-[#1a3a2e]/15 text-[#1a3a2e]/70 hover:border-[#c9a961] hover:text-[#1a3a2e]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#1a3a2e]/60">
                      {t.form.problem}
                    </label>
                    <textarea
                      rows={3}
                      value={form.problem}
                      onChange={setField("problem")}
                      placeholder={t.form.problemPh}
                      className={`${inputBase} resize-none border-[#1a3a2e]/15`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex w-full items-center justify-center gap-3 rounded-full bg-[#1a3a2e] py-4 text-[12px] font-bold uppercase tracking-[0.15em] text-[#faf7f2] transition-all duration-300 hover:bg-[#122a20] disabled:opacity-50"
                  >
                    <WhatsAppIcon className="h-4 w-4 transition group-hover:scale-110" />
                    {status === "sending" ? t.form.sending : t.form.submit}
                  </button>

                  <p className="text-center text-[10px] text-[#1a3a2e]/40">
                    {t.form.secure}
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section
        id="faq"
        className="relative scroll-mt-24 bg-[#faf7f2] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <div className="text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#c9a961]">
                {t.faqKicker}
              </span>
              <h2
                style={{ fontFamily: serifStack }}
                className="mt-6 text-[2.25rem] font-medium leading-tight text-[#1a3a2e] sm:text-[3rem]"
              >
                {t.faqTitle} <em className="text-[#c9a961]">{t.faqTitle2}</em>
              </h2>
            </div>
          </Reveal>

          <div className="mt-16 space-y-0">
            {t.faqs.map((item, idx) => {
              const open = openFaq === idx;
              return (
                <Reveal key={item.q} delay={idx * 60}>
                  <div className="border-b border-[#1a3a2e]/10">
                    <button
                      onClick={() => setOpenFaq(open ? -1 : idx)}
                      aria-expanded={open}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-[11px] font-bold tabular-nums text-[#c9a961]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[15px] font-semibold text-[#1a3a2e] transition group-hover:text-[#c9a961] sm:text-base">
                          {item.q}
                        </span>
                      </span>
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          open
                            ? "border-[#c9a961] bg-[#c9a961] text-[#1a3a2e] rotate-45"
                            : "border-[#1a3a2e]/15 text-[#1a3a2e]/50 group-hover:border-[#c9a961]"
                        }`}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        open
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <p className="overflow-hidden pl-10 pb-6 text-[13.5px] leading-relaxed text-[#1a3a2e]/60">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative overflow-hidden border-t border-[#1a3a2e]/10 bg-[#faf7f2] px-6 pb-28 pt-20 lg:px-10 md:pb-20">
        <div className="mx-auto max-w-7xl">
          {/* Big signature */}
          <Reveal>
            <h3
              style={{ fontFamily: serifStack }}
              className="text-[3rem] font-medium italic leading-[0.9] tracking-tight text-[#1a3a2e]/10 lg:text-[5.5rem]"
            >
              {t.name}
            </h3>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-12 border-t border-[#1a3a2e]/10 pt-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#1a3a2e] text-[11px] font-black tracking-wider text-[#c9a961]">
                  {t.initials}
                </span>
                <span className="leading-tight">
                  <span
                    style={{ fontFamily: serifStack }}
                    className="block text-[15px] font-medium italic text-[#1a3a2e]"
                  >
                    {t.shortName}
                  </span>
                  <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-[#1a3a2e]/50">
                    {t.specialty}
                  </span>
                </span>
              </div>
              <p className="mt-5 text-[12px] leading-relaxed text-[#1a3a2e]/50">
                {t.degrees}
              </p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#c9a961]">
                {t.bmdc}
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1a3a2e]/40">
                {lang === "bn" ? "দ্রুত লিংক" : "Navigate"}
              </h4>
              <ul className="mt-5 space-y-2.5">
                {navKeys.map((key) => (
                  <li key={key}>
                    <button
                      onClick={() => scrollTo(key)}
                      className="group flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#1a3a2e]/60 transition hover:translate-x-1 hover:text-[#c9a961]"
                    >
                      <span className="h-px w-0 bg-[#c9a961] transition-all duration-300 group-hover:w-4" />
                      {t.nav[key]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1a3a2e]/40">
                {t.contact}
              </h4>
              <ul className="mt-5 space-y-4">
                {t.spaces.map((sp) => (
                  <li
                    key={sp.name}
                    className="text-[12px] leading-relaxed text-[#1a3a2e]/60"
                  >
                    <span className="block font-bold text-[#1a3a2e]">
                      {sp.name}
                    </span>
                    <span className="flex items-start gap-2 mt-1">
                      <Icon
                        path={ICONS.pin}
                        className="mt-0.5 h-3 w-3 shrink-0 text-[#c9a961]"
                      />
                      {sp.addr}
                    </span>
                    <a
                      href={`tel:${sp.phone}`}
                      className="mt-1 flex items-center gap-2 hover:text-[#c9a961]"
                    >
                      <Icon
                        path={ICONS.phone}
                        className="h-3 w-3 text-[#c9a961]"
                      />
                      {sp.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[#1a3a2e]/10 pt-8 sm:flex-row sm:items-center">
            <p className="text-[11px] leading-relaxed text-[#1a3a2e]/40">
              {t.footerNote}
            </p>
            <p className="text-[11px] text-[#1a3a2e]/40">
              © {new Date().getFullYear()} {t.name}. {t.rights}
            </p>
          </div>
        </div>
      </footer>

      {/* ═══════════ FLOATING WHATSAPP ═══════════ */}
      <Magnetic
        strength={0.35}
        className="fixed bottom-6 right-6 z-40 hidden md:block"
      >
        <a
          href="https://wa.me/8801711000000"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-900/30"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          <WhatsAppIcon className="relative h-6 w-6" />
        </a>
      </Magnetic>

      {/* ═══════════ MOBILE BAR ═══════════ */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#1a3a2e]/10 bg-[#faf7f2]/95 backdrop-blur-lg md:hidden">
        <div className="grid grid-cols-3 divide-x divide-[#1a3a2e]/10">
          <a
            href="tel:+8801711000000"
            className="flex flex-col items-center gap-1 py-3 text-[#1a3a2e]/70 active:bg-[#1a3a2e]/5"
          >
            <Icon path={ICONS.phone} className="h-4 w-4" />
            <span className="text-[9px] font-bold uppercase tracking-wider">
              {lang === "bn" ? "কল" : "Call"}
            </span>
          </a>
          <a
            href="https://wa.me/8801711000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 py-3 text-[#25D366] active:bg-[#1a3a2e]/5"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="text-[9px] font-bold uppercase tracking-wider">
              WhatsApp
            </span>
          </a>
          <button
            onClick={() => scrollTo("book")}
            className="flex flex-col items-center gap-1 py-3 text-[#c9a961] active:bg-[#1a3a2e]/5"
          >
            <Icon path={ICONS.calendar} className="h-4 w-4" />
            <span className="text-[9px] font-bold uppercase tracking-wider">
              {lang === "bn" ? "বুকিং" : "Book"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
