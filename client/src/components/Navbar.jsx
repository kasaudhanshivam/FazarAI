import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { serverUrl } from "../App";
import toast from "react-hot-toast";
import axios from "axios"

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
        await axios.get(serverUrl + "/api/auth/logout", {withCredentials: true});

        setUser(null);
        setMenuOpen(false);
        toast.success("User logged out!")
        navigate("/login");
    } catch (error) {
        toast.error("Logout failed!")
        console.log(error)
    }
  };

  const goTo = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07070d] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* LEFT — LOGO */}
        <button
          onClick={() => goTo("/")}
          className="group flex items-center gap-3 cursor-pointer"
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-cyan-400 shadow-lg shadow-purple-500/20 transition-all duration-300 group-hover:shadow-purple-500/40">
            <span className="text-xl font-black text-white">F</span>
            <span className="absolute right-1 top-1 text-[9px] text-white">
              ✦
            </span>
          </div>

          <div className="text-xl text-white font-bold tracking-tight">
            Fazar{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              AI
            </span>
          </div>
        </button>

        {/* RIGHT — NAVIGATION + USER */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Builder */}
          <button
            onClick={() => goTo("/builder")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive("/builder")
                ? "bg-gradient-to-r from-violet-500/20 to-cyan-400/20 text-white ring-1 ring-violet-400/30"
                : "bg-gradient-to-r from-violet-500/10 to-cyan-400/10 text-slate-300 hover:from-violet-500/20 hover:to-cyan-400/20 hover:text-white"
            }`}
          >
            <BuilderIcon />
            Builder
          </button>

          {/* Billing */}
          <button
            onClick={() => goTo("/billing")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive("/billing")
                ? "bg-gradient-to-r from-violet-500/20 to-cyan-400/20 text-white ring-1 ring-violet-400/30"
                : "bg-gradient-to-r from-violet-500/10 to-cyan-400/10 text-slate-300 hover:from-violet-500/20 hover:to-cyan-400/20 hover:text-white"
            }`}
          >
            <BillingIcon />
            Billing
          </button>

          {/* USER */}
          <div className="ml-2 flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-bold text-white">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                getInitials(user?.displayName || user?.name)
              )}
            </div>

            <span className="max-w-[150px] truncate text-sm font-medium text-slate-300">
              {user?.displayName || user?.name || "User"}
            </span>
          </div>

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            title="Logout"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-slate-400 transition-all duration-200 hover:border-cyan-400/20 hover:bg-cyan-400/10 hover:text-cyan-300"
          >
            <LogoutIcon />
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-slate-300 transition hover:border-violet-400/30 hover:bg-violet-500/10 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-white/[0.06] bg-[#090910] px-5 py-4 md:hidden">
          <div className="space-y-2">

            {/* Builder */}
            <button
              onClick={() => goTo("/builder")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive("/builder")
                  ? "bg-gradient-to-r from-violet-500/20 to-cyan-400/20 text-white"
                  : "bg-gradient-to-r from-violet-500/10 to-cyan-400/10 text-slate-300 hover:text-white"
              }`}
            >
              <BuilderIcon />
              Builder
            </button>

            {/* Billing */}
            <button
              onClick={() => goTo("/billing")}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive("/billing")
                  ? "bg-gradient-to-r from-violet-500/20 to-cyan-400/20 text-white"
                  : "bg-gradient-to-r from-violet-500/10 to-cyan-400/10 text-slate-300 hover:text-white"
              }`}
            >
              <BillingIcon />
              Billing
            </button>

            <div className="my-3 h-px bg-white/[0.06]" />

            {/* USER */}
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 text-xs font-bold text-white">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getInitials(user?.displayName || user?.name)
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {user?.displayName || user?.name || "User"}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {user?.email || ""}
                </p>
              </div>
            </div>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};


/* ---------------- ICONS ---------------- */

const BuilderIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const BillingIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="2.5" y="5" width="19" height="14" rx="2" />
    <path d="M2.5 10h19" />
    <path d="M6 15h4" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M10 17l5-5-5-5" />
    <path d="M15 12H3" />
    <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </svg>
);

const getInitials = (name) => {
  if (!name) return "U";

  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

export default Navbar;