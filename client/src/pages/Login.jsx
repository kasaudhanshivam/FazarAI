import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import {auth, provider} from "../utils/firebases.js"
import { serverUrl } from "../App.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"
import toast from "react-hot-toast";

const Login = ({user, setUser}) => {

  const navigate = useNavigate()

  // when user is logged in take them to homepage
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);


  const handleGoogleLogin = async () => {
    console.log("Login with Google");
    try{
        const result = await signInWithPopup(auth, provider);
        // console.log(result)

        const {displayName, email} = result.user
        const res = await axios.post(serverUrl + "/api/auth/google_auth", {
            name: displayName,
            email
        }, {withCredentials: true})
        // console.log(res.data)
        setUser(res.data)
        navigate("/")
        toast.success("Logged in sucessfully!")
      }catch(err){
        toast.error("Logged in failed!")
        console.error("Error during Google login:", err);
    }

  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#07070d] text-white">
      {/* ==================== BACKGROUND ==================== */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Purple glow */}
        <div className="absolute -left-40 -top-40 h-[550px] w-[550px] rounded-full bg-purple-600/20 blur-[150px]" />

        {/* Cyan glow */}
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[150px]" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-250px] left-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[150px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* ==================== NAVBAR ==================== */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-400 shadow-lg shadow-purple-500/20">
            <span className="text-xl font-black text-white">F</span>

            <span className="absolute right-1 top-1 text-[9px] text-white">
              ✦
            </span>
          </div>

          <div className="text-xl font-bold tracking-tight">
            Fazar{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              AI
            </span>
          </div>
        </div>

        {/* Signup */}
        <p className="text-sm text-slate-400">
          New to Fazar?{" "}
          <a
            href="/signup"
            className="font-semibold text-violet-400 transition hover:text-violet-300"
          >
            Get started
          </a>
        </p>
      </header>

      {/* ==================== MAIN ==================== */}
      <main className="relative z-10 flex min-h-[calc(100vh-88px)] items-center justify-center px-6 py-3">
        <div className="grid w-full max-w-6xl items-center gap-20 lg:grid-cols-2">
          {/* ==================== LEFT SIDE ==================== */}
          <section className="hidden lg:block">
            <div className="max-w-xl">
              {/* Heading */}
              <h1 className="text-6xl font-black leading-[1.05] tracking-[-0.04em]">
                Your AI assistant,
                <br />

                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  everywhere.
                </span>
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-lg text-lg leading-8 text-slate-400">
                Build AI assistants that talk, guide users, navigate your
                website, and integrate into your digital experience.
              </p>

              {/* Features */}
              <div className="mt-10 grid max-w-lg grid-cols-2 gap-4">
                <Feature
                  icon="◉"
                  title="Voice AI"
                  description="Natural conversations"
                />

                <Feature
                  icon="✦"
                  title="Smart Navigation"
                  description="Control your website"
                />

                <Feature
                  icon="</>"
                  title="Easy Embed"
                  description="One script tag"
                />

                <Feature
                  icon="ϟ"
                  title="Fast Responses"
                  description="Powered by AI"
                />
              </div>
            </div>
          </section>

          {/* ==================== RIGHT SIDE ==================== */}
          <section className="w-full max-w-md justify-self-center lg:justify-self-end">
            {/* ==================== FREE PLAN PROMO ==================== */}
            <div className="relative mb-5">
              {/* Glow behind promo */}
              <div className="absolute inset-x-8 top-1/2 h-12 -translate-y-1/2 rounded-full bg-violet-500/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c14]/80 px-4 py-3 backdrop-blur-xl">
                {/* Top gradient line */}
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />

                <div className="flex items-center justify-between gap-4">
                  {/* Left */}
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Spark */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 ring-1 ring-violet-400/20">
                      <span className="text-sm text-violet-300">✦</span>
                    </div>

                    {/* Text */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                          Free to start
                        </span>

                        <span className="h-1 w-1 rounded-full bg-slate-600" />
                      </div>

                      <p className="mt-0.5 truncate text-sm font-medium text-slate-200">
                        Our free plan includes
                        <span className="font-bold text-white"> 200</span>{" "}
                        AI responses.
                      </p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="shrink-0">
                    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-500/15 to-cyan-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-violet-300 ring-1 ring-violet-400/15">
                      0 &#8377; / month
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================== LOGIN CARD ==================== */}
            <div className="relative">
              {/* Card glow */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-violet-600/25 via-purple-500/20 to-cyan-500/20 blur-2xl" />

              {/* Card */}
              <div className="relative rounded-[30px] border border-white/[0.08] bg-[#0d0d16]/90 p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-10">
                {/* Top accent */}
                <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400 to-transparent" />

                {/* ==================== MOBILE LOGO ==================== */}
                <div className="mb-8 flex justify-center lg:hidden">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-400 shadow-lg shadow-purple-500/20">
                      <span className="text-xl font-black text-white">
                        F
                      </span>

                      <span className="absolute right-1 top-1 text-[9px] text-white">
                        ✦
                      </span>
                    </div>

                    <div className="text-xl font-bold">
                      Fazar{" "}
                      <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                        AI
                      </span>
                    </div>
                  </div>
                </div>

                {/* ==================== HEADING ==================== */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight">
                    Welcome back
                  </h2>

                  <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
                    Sign in to build, manage, and deploy your AI assistants.
                  </p>
                </div>

                {/* ==================== GOOGLE LOGIN ==================== */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="group mt-9 flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-purple-500/10 active:translate-y-0"
                >
                  {/* Google Icon */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M21.805 12.23c0-.79-.065-1.556-.209-2.294H12v4.34h5.502a4.7 4.7 0 0 1-2.043 3.088v2.566h3.305c1.934-1.781 3.041-4.405 3.041-7.7Z"
                      fill="#4285F4"
                    />

                    <path
                      d="M12 22c2.754 0 5.064-.91 6.752-2.47l-3.305-2.566c-.916.614-2.087.978-3.447.978-2.65 0-4.895-1.79-5.7-4.194H2.883v2.647A10.19 10.19 0 0 0 12 22Z"
                      fill="#34A853"
                    />

                    <path
                      d="M6.3 13.748A6.13 6.13 0 0 1 5.98 12c0-.607.105-1.197.32-1.748V7.605H2.883A9.999 9.999 0 0 0 2 12c0 1.608.385 3.127.883 4.395L6.3 13.748Z"
                      fill="#FBBC05"
                    />

                    <path
                      d="M12 6.057c1.496 0 2.837.514 3.894 1.523l2.922-2.922C17.06 3.048 14.75 2 12 2a10.19 10.19 0 0 0-9.117 5.605L6.3 10.252c.805-2.404 3.05-4.195 5.7-4.195Z"
                      fill="#EA4335"
                    />
                  </svg>

                  <span>Continue with Google</span>

                  <span className="ml-1 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white">
                    →
                  </span>
                </button>

                {/* ==================== FIREBASE TRUST ==================== */}
                <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>

                  Secure authentication powered by Firebase
                </div>

                {/* ==================== DIVIDER ==================== */}
                <div className="my-7 flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/[0.07]" />

                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                    secure access
                  </span>

                  <div className="h-px flex-1 bg-white/[0.07]" />
                </div>

                {/* ==================== TERMS ==================== */}
                <p className="text-center text-xs leading-5 text-slate-500">
                  By continuing, you agree to our{" "}
                  <a
                    href="/terms"
                    className="font-medium text-slate-300 transition hover:text-violet-400"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="font-medium text-slate-300 transition hover:text-violet-400"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

/* ==================== FEATURE CARD ==================== */

const Feature = ({ icon, title, description }) => {
  return (
    <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.045]">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-purple-500/10">
        {icon}
      </div>

      <p className="text-sm font-bold text-slate-200">
        {title}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
};

export default Login;