import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#07070d]">
      <div className="mx-auto flex max-w-7xl flex items-center justify-center gap-5 px-5 py-6 text-center">
        <p className="text-xs text-slate-500">
          © {year} Fazar AI. All rights reserved.
        </p>

        <p className="text-xs text-slate-500">
          Made with <span className="text-blue-400">♥</span> by{" "}
          <a
            href="https://shivamkasaudhan.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium text-slate-300 transition-colors hover:text-white"
          >
            Shivam Kasaudhan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;