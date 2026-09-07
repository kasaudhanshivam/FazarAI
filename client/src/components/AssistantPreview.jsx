import React, { useState } from "react";

const themes = {
  dark: {
    name: "Dark",

    bg: "bg-[#080a14]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(139,92,246,0.20),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(34,211,238,0.08),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 shadow-[0_0_55px_rgba(139,92,246,0.35)]",

    cardBorder: "border-white/[0.10]",

    text: "text-white",
    sub: "text-slate-400",

    listening: "text-emerald-400",
    wave: "bg-emerald-400",

    button:
      "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_35px_rgba(139,92,246,0.35)]",

    micGlow: "bg-violet-500/20",
  },

  light: {
    name: "Light",

    bg: "bg-[#f5f7fb]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(139,92,246,0.16),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(34,211,238,0.12),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-400 shadow-[0_0_45px_rgba(139,92,246,0.25)]",

    cardBorder: "border-black/[0.08]",

    text: "text-slate-900",
    sub: "text-slate-500",

    listening: "text-emerald-600",
    wave: "bg-emerald-500",

    button:
      "bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_30px_rgba(139,92,246,0.25)]",

    micGlow: "bg-violet-500/10",
  },

  glass: {
    name: "Glass",

    bg: "bg-[#10121b]/80 backdrop-blur-xl",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(139,92,246,0.25),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(34,211,238,0.14),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-cyan-300/90 via-violet-400/90 to-fuchsia-400/90 shadow-[0_0_60px_rgba(139,92,246,0.40)]",

    cardBorder: "border-white/20",

    text: "text-white",
    sub: "text-white/55",

    listening: "text-emerald-400",
    wave: "bg-emerald-400",

    button:
      "border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_0_30px_rgba(139,92,246,0.25)]",

    micGlow: "bg-violet-500/20",
  },

  midnight: {
    name: "Midnight",

    bg: "bg-[#050510]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(99,102,241,0.22),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(59,130,246,0.10),transparent_38%)]",

    orb:
      "bg-gradient-to-br from-indigo-300 via-blue-500 to-violet-600 shadow-[0_0_60px_rgba(79,70,229,0.35)]",

    cardBorder: "border-indigo-400/15",

    text: "text-white",
    sub: "text-indigo-200/55",

    listening: "text-cyan-400",
    wave: "bg-cyan-400",

    button:
      "bg-gradient-to-br from-indigo-500 to-blue-600 shadow-[0_0_35px_rgba(59,130,246,0.30)]",

    micGlow: "bg-blue-500/20",
  },

  ocean: {
    name: "Ocean",

    bg: "bg-[#041316]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(6,182,212,0.20),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(20,184,166,0.12),transparent_38%)]",

    orb:
      "bg-gradient-to-br from-cyan-300 via-teal-400 to-blue-600 shadow-[0_0_60px_rgba(6,182,212,0.35)]",

    cardBorder: "border-cyan-400/15",

    text: "text-white",
    sub: "text-cyan-100/55",

    listening: "text-emerald-400",
    wave: "bg-emerald-400",

    button:
      "bg-gradient-to-br from-cyan-400 to-teal-500 shadow-[0_0_35px_rgba(20,184,166,0.30)]",

    micGlow: "bg-cyan-500/20",
  },

  aurora: {
    name: "Aurora",

    bg: "bg-[#07100e]",
    overlay:
      "bg-[radial-gradient(circle_at_35%_15%,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_70%_20%,rgba(139,92,246,0.18),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(6,182,212,0.10),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-emerald-300 via-cyan-400 to-violet-500 shadow-[0_0_60px_rgba(16,185,129,0.30)]",

    cardBorder: "border-emerald-400/15",

    text: "text-white",
    sub: "text-emerald-100/55",

    listening: "text-lime-400",
    wave: "bg-lime-400",

    button:
      "bg-gradient-to-br from-emerald-400 to-violet-500 shadow-[0_0_35px_rgba(16,185,129,0.28)]",

    micGlow: "bg-emerald-500/20",
  },

  sunset: {
    name: "Sunset",

    bg: "bg-[#13090d]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(244,114,182,0.20),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(249,115,22,0.12),transparent_38%)]",

    orb:
      "bg-gradient-to-br from-orange-300 via-pink-500 to-violet-600 shadow-[0_0_60px_rgba(236,72,153,0.35)]",

    cardBorder: "border-pink-400/15",

    text: "text-white",
    sub: "text-pink-100/55",

    listening: "text-amber-400",
    wave: "bg-amber-400",

    button:
      "bg-gradient-to-br from-pink-500 to-orange-500 shadow-[0_0_35px_rgba(236,72,153,0.30)]",

    micGlow: "bg-pink-500/20",
  },

    cyber: {
    name: "Cyber",

    bg: "bg-[#080711]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(217,70,239,0.20),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(6,182,212,0.12),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-fuchsia-400 via-purple-500 to-cyan-400 shadow-[0_0_65px_rgba(217,70,239,0.35)]",

    cardBorder: "border-fuchsia-400/15",

    text: "text-white",
    sub: "text-purple-100/55",

    listening: "text-cyan-400",
    wave: "bg-cyan-400",

    button:
      "bg-gradient-to-br from-fuchsia-500 to-cyan-400 shadow-[0_0_35px_rgba(217,70,239,0.30)]",

    micGlow: "bg-fuchsia-500/20",
  },

  emerald: {
    name: "Emerald",

    bg: "bg-[#06110d]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(16,185,129,0.20),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(52,211,153,0.10),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-emerald-300 via-green-500 to-teal-600 shadow-[0_0_60px_rgba(16,185,129,0.35)]",

    cardBorder: "border-emerald-400/15",

    text: "text-white",
    sub: "text-emerald-100/55",

    listening: "text-lime-400",
    wave: "bg-lime-400",

    button:
      "bg-gradient-to-br from-emerald-400 to-green-600 shadow-[0_0_35px_rgba(16,185,129,0.30)]",

    micGlow: "bg-emerald-500/20",
  },

  rose: {
    name: "Rose",

    bg: "bg-[#12070d]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(244,63,94,0.20),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(236,72,153,0.12),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-rose-300 via-pink-500 to-fuchsia-600 shadow-[0_0_60px_rgba(244,63,94,0.35)]",

    cardBorder: "border-rose-400/15",

    text: "text-white",
    sub: "text-rose-100/55",

    listening: "text-pink-400",
    wave: "bg-pink-400",

    button:
      "bg-gradient-to-br from-rose-500 to-pink-600 shadow-[0_0_35px_rgba(244,63,94,0.30)]",

    micGlow: "bg-rose-500/20",
  },

  royal: {
    name: "Royal",

    bg: "bg-[#0b0715]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(124,58,237,0.24),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(168,85,247,0.12),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-violet-300 via-purple-500 to-indigo-700 shadow-[0_0_65px_rgba(124,58,237,0.40)]",

    cardBorder: "border-violet-400/20",

    text: "text-white",
    sub: "text-violet-100/55",

    listening: "text-fuchsia-400",
    wave: "bg-fuchsia-400",

    button:
      "bg-gradient-to-br from-violet-500 to-indigo-600 shadow-[0_0_35px_rgba(124,58,237,0.35)]",

    micGlow: "bg-violet-500/20",
  },

  ice: {
    name: "Ice",

    bg: "bg-[#071017]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(125,211,252,0.20),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(56,189,248,0.10),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-white via-sky-300 to-blue-500 shadow-[0_0_60px_rgba(125,211,252,0.35)]",

    cardBorder: "border-sky-300/15",

    text: "text-white",
    sub: "text-sky-100/55",

    listening: "text-sky-300",
    wave: "bg-sky-300",

    button:
      "bg-gradient-to-br from-sky-300 to-blue-500 shadow-[0_0_35px_rgba(56,189,248,0.30)]",

    micGlow: "bg-sky-400/20",
  },

  monochrome: {
    name: "Mono",

    bg: "bg-[#0b0b0b]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(255,255,255,0.10),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.05),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-white via-slate-300 to-slate-600 shadow-[0_0_55px_rgba(255,255,255,0.20)]",

    cardBorder: "border-white/[0.12]",

    text: "text-white",
    sub: "text-white/45",

    listening: "text-white/80",
    wave: "bg-white/80",

    button:
      "bg-gradient-to-br from-white to-slate-400 shadow-[0_0_30px_rgba(255,255,255,0.20)]",

    micGlow: "bg-white/10",
  },

  cherry: {
    name: "Cherry",

    bg: "bg-[#110607]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(220,38,38,0.20),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(190,24,93,0.12),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-red-300 via-rose-500 to-red-700 shadow-[0_0_60px_rgba(220,38,38,0.35)]",

    cardBorder: "border-red-400/15",

    text: "text-white",
    sub: "text-red-100/55",

    listening: "text-orange-400",
    wave: "bg-orange-400",

    button:
      "bg-gradient-to-br from-red-500 to-rose-600 shadow-[0_0_35px_rgba(220,38,38,0.30)]",

    micGlow: "bg-red-500/20",
  },

  lavender: {
    name: "Lavender",

    bg: "bg-[#0e0a16]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(192,132,252,0.20),transparent_32%),radial-gradient(circle_at_50%_85%,rgba(167,139,250,0.10),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-pink-200 via-purple-400 to-violet-600 shadow-[0_0_60px_rgba(192,132,252,0.35)]",

    cardBorder: "border-purple-300/15",

    text: "text-white",
    sub: "text-purple-100/55",

    listening: "text-pink-300",
    wave: "bg-pink-300",

    button:
      "bg-gradient-to-br from-purple-400 to-violet-600 shadow-[0_0_35px_rgba(167,139,250,0.30)]",

    micGlow: "bg-purple-500/20",
  },

  neon: {
    name: "Neon",

    bg: "bg-[#050b0b]",
    overlay:
      "bg-[radial-gradient(circle_at_50%_15%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_35%_70%,rgba(132,204,22,0.10),transparent_30%),radial-gradient(circle_at_70%_85%,rgba(168,85,247,0.12),transparent_35%)]",

    orb:
      "bg-gradient-to-br from-lime-300 via-cyan-400 to-purple-500 shadow-[0_0_65px_rgba(34,211,238,0.35)]",

    cardBorder: "border-cyan-400/15",

    text: "text-white",
    sub: "text-cyan-100/50",

    listening: "text-lime-400",
    wave: "bg-lime-400",

    button:
      "bg-gradient-to-br from-cyan-400 to-lime-400 shadow-[0_0_35px_rgba(34,211,238,0.30)]",

    micGlow: "bg-cyan-400/20",
  },
};

const AssistantPreview = () => {
  const [theme, setTheme] = useState("dark");

  const current = themes[theme];

  return (
    <div className="w-full">

      {/* THEME SELECTOR */}
      <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">

          <span className="mr-2 text-xs font-medium text-slate-500">
            Themes
          </span>

          {Object.entries(themes).map(([key, value]) => {
            const active = theme === key;

            return (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? "bg-gradient-to-r from-violet-500/20 to-cyan-400/20 text-white ring-1 ring-violet-400/25"
                    : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
                }`}
              >
                {value.name}
              </button>
            );
          })}

        </div>
      </div>

      {/* PREVIEW AREA */}
      <div className="flex min-h-[520px] items-center justify-center bg-[#050509] px-5 py-8 sm:px-10">

        {/* ASSISTANT CARD */}
        <div
          className={`relative w-full max-w-[330px] overflow-hidden rounded-[26px] border ${current.cardBorder} ${current.bg} shadow-2xl shadow-black/30`}
        >

          {/* BACKGROUND OVERLAY */}
          <div
            className={`pointer-events-none absolute inset-0 ${current.overlay}`}
          />

          {/* CONTENT */}
          <div className="relative flex flex-col items-center px-6 pb-7 pt-7">

            {/* ORB */}
            <div
              className={`h-24 w-24 rounded-full ${current.orb}`}
            />

            {/* GREETING */}
            <h2
              className={`mt-6 text-center text-[22px] font-semibold tracking-tight ${current.text}`}
            >
              Hello! I'm Fazar AI
            </h2>

            {/* DESCRIPTION */}
            <p
              className={`mt-3 max-w-[250px] text-center text-[13px] leading-5 ${current.sub}`}
            >
              Your smart voice assistant.
              <br />
              Ask anything about your website.
            </p>

            {/* LISTENING */}
            <p
              className={`mt-5 text-[13px] font-semibold ${current.listening}`}
            >
              Listening...
            </p>

            {/* WAVEFORM */}
            <div className="mt-3 flex h-7 items-center gap-1.5">
              <Wave height="8" color={current.wave} />
              <Wave height="17" color={current.wave} />
              <Wave height="27" color={current.wave} />
              <Wave height="16" color={current.wave} />
              <Wave height="23" color={current.wave} />
              <Wave height="12" color={current.wave} />
              <Wave height="7" color={current.wave} />
            </div>

            {/* MIC */}
            <div className="relative mt-5">

              <div
                className={`absolute inset-[-12px] rounded-full blur-2xl ${current.micGlow}`}
              />

              <button
                className={`relative flex h-14 w-14 items-center justify-center rounded-full ${current.button} transition-transform duration-300 hover:scale-105`}
              >
                <MicIcon />
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};


/* WAVE */

const Wave = ({ height, color }) => {
  return (
    <span
      className={`w-[3px] rounded-full ${color}`}
      style={{
        height: `${height}px`,
      }}
    />
  );
};


/* MIC */

const MicIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    className="text-white"
  >
    <rect
      x="9"
      y="3"
      width="6"
      height="11"
      rx="3"
    />

    <path d="M5 11a7 7 0 0 0 14 0" />

    <path d="M12 18v3" />

    <path d="M9 21h6" />
  </svg>
);

export default AssistantPreview;