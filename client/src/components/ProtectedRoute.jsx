import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070d] text-white">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />

        {/* Loader */}
        <div className="relative flex flex-col items-center">
          {/* Spinner */}
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />

            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-violet-500 border-r-cyan-400" />

            {/* Center */}
            <div className="absolute inset-[6px] flex items-center justify-center rounded-full bg-[#0d0d16]">
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-sm font-black text-transparent">
                F
              </span>
            </div>
          </div>

          {/* Text */}
          <p className="mt-5 text-sm font-medium text-slate-300">
            Loading Fazar AI
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Setting things up...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;