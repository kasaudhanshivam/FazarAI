import React from "react";
import { useNavigate } from "react-router-dom";
import AssistantPreview from "../components/AssistantPreview.jsx";

const Home = ({ user }) => {
  const navigate = useNavigate();

  const userName =
    user?.displayName?.split(" ")[0] ||
    user?.name?.split(" ")[0] ||
    "there";

  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#07070d] text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 top-[35%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-[-180px] left-[35%] h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[130px]" />

      {/* Subtle Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <section className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

          <div>

            {/* Label */}
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

              <span className="text-xs font-medium tracking-wide text-slate-500">
                Fazar AI
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {userName}
              </span>
              .
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Create an AI assistant for your website that helps visitors
              find information, navigate, and get answers in real time.
            </p>

            {/* Free Plan */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-violet-400/10 bg-violet-500/[0.05] px-3 py-1.5">
              <SparkIcon />

              <span className="text-xs font-medium text-violet-300">
                Free plan includes
              </span>

              <span className="text-xs font-semibold text-white">
                200 AI responses.
              </span>
            </div>

          </div>

          {/* Create Button */}
          <button
            onClick={() => navigate("/builder")}
            className="group flex w-fit items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
          >
            <PlusIcon />

            Create Assistant

            <ArrowIcon />
          </button>

        </section>


        {/* =====================================================
            ASSISTANT PREVIEW
        ===================================================== */}

        <section className="mt-10">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-base font-semibold text-white">
                Assistant Preview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Choose a look that fits your website.
              </p>
            </div>

            {/* <button
              onClick={() => navigate("/builder")}
              className="hidden items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-white sm:flex"
            >
              Open Builder
              <ArrowIcon />
            </button> */}

          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018] shadow-2xl shadow-black/20">

            {/* Preview Glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-96 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[90px]" />

            <div className="relative">
              <AssistantPreview />
            </div>

          </div>

        </section>


        {/* =====================================================
            HOW IT WORKS
        ===================================================== */}

        <section className="mx-auto mt-20 max-w-4xl">

          {/* Section Heading */}
          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              How it works
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Your AI assistant, in three simple steps.
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
              No complicated setup. Create, configure, and add it to your
              website.
            </p>

          </div>


          {/* Steps */}
          <div className="relative mt-12">

            {/* Connecting Line */}
            <div className="absolute left-[20px] top-6 hidden h-[calc(100%-48px)] w-px bg-gradient-to-b from-violet-500/40 via-purple-500/20 to-cyan-400/40 sm:block" />

            <div className="space-y-8">

              {/* STEP 1 */}
              <Step
                number="01"
                title="Create your AI assistant"
                description="Create your assistant on Fazar AI and customize its look to match your website's theme."
              />

              {/* STEP 2 */}
              <Step
                number="02"
                title="Define its capabilities"
                description="Provide training data, define what your assistant can do, and set the navigation paths it can guide visitors through."
              />

              {/* STEP 3 */}
              <Step
                number="03"
                title="Add it to your website"
                description="Copy the generated script and add it to your website. Your AI assistant is ready to go."
              />

            </div>

          </div>

        </section>


        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="relative mt-20 overflow-hidden rounded-2xl border border-violet-400/10 bg-gradient-to-r from-violet-500/[0.07] via-purple-500/[0.04] to-cyan-400/[0.06] px-6 py-8 sm:px-8">

          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-[80px]" />

          <div className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-violet-500/10 blur-[80px]" />

          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-300">
                Ready to get started?
              </p>

              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Ready to give your website an AI assistant?
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Create your first assistant and make your website smarter.
              </p>

            </div>

            <button
              onClick={() => navigate("/builder")}
              className="group flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-violet-500/30"
            >
              Start Building
              <ArrowIcon />
            </button>

          </div>

        </section>

      </div>
    </main>
  );
};


/* =========================================================
   STEP COMPONENT
========================================================= */

const Step = ({ number, title, description }) => {
  return (
    <div className="relative flex gap-5 sm:gap-7">

      {/* Number */}
      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/15 bg-[#0b0b13] text-xs font-semibold text-violet-300 shadow-lg shadow-violet-500/5">
        {number}
      </div>

      {/* Content */}
      <div className="pt-0.5">

        <h3 className="text-base font-semibold text-white sm:text-lg">
          {title}
        </h3>

        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
};


/* =========================================================
   ICONS
========================================================= */

const PlusIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);


const ArrowIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);


const SparkIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="text-violet-400"
  >
    <path d="m12 3-1.5 6.5L4 11l6.5 1.5L12 19l1.5-6.5L20 11l-6.5-1.5L12 3Z" />
  </svg>
);


export default Home;