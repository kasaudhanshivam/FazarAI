import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import axios from "axios";
import { serverUrl } from "../App";


const clientUrl = import.meta.env.VITE_CLIENT_URL;
// console.log(clientUrl);

const themes = [
  ["dark", "Dark"],
  ["light", "Light"],
  ["glass", "Glass"],
  ["midnight", "Midnight"],
  ["ocean", "Ocean"],
  ["aurora", "Aurora"],
  ["sunset", "Sunset"],
  ["cyber", "Cyber"],
  ["emerald", "Emerald"],
  ["rose", "Rose"],
  ["royal", "Royal"],
  ["ice", "Ice"],
  ["monochrome", "Mono"],
  ["cherry", "Cherry"],
  ["lavender", "Lavender"],
  ["neon", "Neon"],
  // ["amethyst", "Amethyst"],
];

const Builder = ({ user, setUser }) => {

  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    assistantName: "Fazar AI",
    bussinessName: "",
    bussinessType: "",
    bussinessDescription: "",
    theme: "dark",
    tone: "friendly",
    geminiApiKey: "",
  });

  const [pages, setPages] = useState([]);

  const [newPage, setNewPage] = useState({
    name: "",
    path: "",
    keywords: "",
  });

  const [assistant, setAssistant] = useState(null);


  useEffect(() => {
    if (!user) return;

    setForm({
      assistantName: user.assistantName || "Fazar AI",
      bussinessName: user.bussinessName || "",
      bussinessType: user.bussinessType || "",
      bussinessDescription: user.bussinessDescription || "",
      theme: user.theme || "dark",
      tone: user.tone || "friendly",
      geminiApiKey: user.geminiApiKey || "",
    });

    setPages(user.pages || []);

    // Keep the saved assistant available for the edit flow
    setAssistant(user);
  }, [user]);



  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addPage = () => {
    if (!newPage.name || !newPage.path) return;

    const page = {
      name: newPage.name,
      path: newPage.path,
      keywords: newPage.keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    };

    setPages((prev) => [...prev, page]);

    setNewPage({
      name: "",
      path: "",
      keywords: "",
    });
  };

  const removePage = (index) => {
    setPages((prev) => prev.filter((_, i) => i !== index));
  };



  const saveAssistant = async () => {
    try {
      // Basic validation
      if (!form.assistantName.trim()) {
        toast.error("Please enter an assistant name");
        return;
      }

      if (!form.bussinessName.trim()) {
        toast.error("Please enter your business name");
        return;
      }

      if (!form.bussinessType.trim()) {
        toast.error("Please enter your business type");
        return;
      }

      if (!form.bussinessDescription.trim()) {
        toast.error("Please enter your business description");
        return;
      }

      if (!form.geminiApiKey.trim()) {
        toast.error("Please enter your Gemini API key");
        return;
      }

      const savedData = {
        assistantName: form.assistantName.trim(),

        bussinessName: form.bussinessName.trim(),

        bussinessType: form.bussinessType.trim(),

        bussinessDescription: form.bussinessDescription.trim(),

        tone: form.tone,

        theme: form.theme,

        geminiApiKey: form.geminiApiKey.trim(),

        pages,
      };

      const response = await axios.post(
        serverUrl + "/api/user/assistant",
        savedData,
        {
          withCredentials: true,
        }
      );

      console.log("Assistant saved:", response.data);

      // Backend returns the updated MongoDB user
      setAssistant(response.data.user);

      // Update parent user if needed
      if (setUser && response.data.user) {
        setUser(response.data.user);
      }

      setSaved(true);

      toast.success("Assistant saved successfully!");

    } catch (error) {
      console.error(
        "Save assistant error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to save assistant"
      );
    }
  };

  if ((saved || user?.isSetupComplete) && assistant){
  // if (saved && assistant) {
    return (
      <EmbedCode
        assistant={assistant}
        onEdit={() => {
          setSaved(false);
          setUser({ ...user, isSetupComplete: false });
        }}
      />
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#07070d] text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 top-[35%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="pointer-events-none absolute bottom-[-180px] left-[35%] h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[130px]" />

      {/* Grid */}
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

      <div className="relative mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:py-14">

        {/* HEADER */}
        <div className="mb-8">

          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

            <span className="text-xs font-medium tracking-wide text-slate-500">
              Fazar AI
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Assistant Builder
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Customize your AI assistant and add it to your website.
          </p>
        </div>

        {/* BASIC INFORMATION */}
        <section className="mb-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 shadow-2xl shadow-black/20 sm:p-6">

          <SectionHeader
            title="Basic Information"
            description="Tell us about your assistant and your business."
          />

          <div className="space-y-4">

            <Input
              label="Assistant Name"
              value={form.assistantName}
              placeholder="Fazar AI"
              onChange={(e) =>
                updateForm("assistantName", e.target.value)
              }
            />

            <Input
              label="Business Name"
              value={form.bussinessName}
              placeholder="Your business name"
              onChange={(e) =>
                updateForm("bussinessName", e.target.value)
              }
            />

            <Input
              label="Business Type"
              value={form.bussinessType}
              placeholder="e.g. SaaS, Restaurant, E-commerce"
              onChange={(e) =>
                updateForm("bussinessType", e.target.value)
              }
            />

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Business Description
              </label>

              <textarea
                value={form.bussinessDescription}
                onChange={(e) =>
                  updateForm(
                    "bussinessDescription",
                    e.target.value
                  )
                }
                placeholder="Describe your business, products, services, and anything your assistant should know..."
                rows={5}
                className="w-full resize-none rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/10"
              />
            </div>

          </div>
        </section>

        {/* APPEARANCE */}
        <section className="mb-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 shadow-2xl shadow-black/20 sm:p-6">

          <SectionHeader
            title="Appearance"
            description="Customize how your assistant looks and sounds."
          />

          {/* THEMES */}
          <div className="mb-7">

            <label className="mb-3 block text-xs font-medium text-slate-400">
              Theme
            </label>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

              {themes.map(([value, label]) => (
                <ChoiceButton
                  key={value}
                  active={form.theme === value}
                  onClick={() =>
                    updateForm("theme", value)
                  }
                >
                  {label}
                </ChoiceButton>
              ))}

            </div>
          </div>

          {/* TONE */}
          <div>

            <label className="mb-3 block text-xs font-medium text-slate-400">
              Assistant Tone
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

              {[
                ["friendly", "Friendly"],
                ["professional", "Professional"],
                ["sales", "Sales"],
              ].map(([value, label]) => (
                <ChoiceButton
                  key={value}
                  active={form.tone === value}
                  onClick={() =>
                    updateForm("tone", value)
                  }
                >
                  {label}
                </ChoiceButton>
              ))}

            </div>
          </div>

        </section>

        {/* GEMINI API */}
        <section className="mb-5 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 shadow-2xl shadow-black/20 sm:p-6">

          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

            <SectionHeader
              title="Gemini API Key"
              description="Add your Gemini API key to power your assistant."
            />

            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit shrink-0 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-500/10 transition hover:-translate-y-0.5"
            >
              Get API Key
            </a>

          </div>

          <input
            type="password"
            value={form.geminiApiKey}
            onChange={(e) =>
              updateForm("geminiApiKey", e.target.value)
            }
            placeholder="AIza..."
            className="w-full rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/10"
          />

          <p className="mt-3 text-xs leading-5 text-slate-600">
            Your API key is securely stored and only used for generating AI
            responses.
          </p>

        </section>

        {/* NAVIGATION */}
        <section className="mb-6 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 shadow-2xl shadow-black/20 sm:p-6">

          <div className="mb-5 flex items-center justify-between gap-4">

            <SectionHeader
              title="Navigation Pages"
              description="Let your assistant guide visitors to specific pages."
            />

            <button
              onClick={addPage}
              disabled={!newPage.name || !newPage.path}
              className="flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-3.5 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <PlusIcon />
              Add
            </button>

          </div>

          {/* PAGE INPUTS */}
          <div className="grid gap-3 sm:grid-cols-3">

            <Input
              value={newPage.name}
              placeholder="Page Name"
              onChange={(e) =>
                setNewPage((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />

            <Input
              value={newPage.path}
              placeholder="/pricing"
              onChange={(e) =>
                setNewPage((prev) => ({
                  ...prev,
                  path: e.target.value,
                }))
              }
            />

            <Input
              value={newPage.keywords}
              placeholder="pricing, plans, cost"
              onChange={(e) =>
                setNewPage((prev) => ({
                  ...prev,
                  keywords: e.target.value,
                }))
              }
            />

          </div>

          <p className="mt-2 text-[11px] text-slate-600">
            Separate keywords with commas.
          </p>

          {/* ADDED PAGES */}
          {pages.length > 0 && (
            <div className="mt-4 space-y-2">

              {pages.map((page, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3"
                >

                  <div className="min-w-0">

                    <p className="truncate text-sm font-medium text-white">
                      {page.name}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-600">

                      <span>{page.path}</span>

                      {page.keywords?.length > 0 && (
                        <>
                          <span>•</span>

                          <span>
                            {page.keywords.join(", ")}
                          </span>
                        </>
                      )}

                    </div>
                  </div>

                  <button
                    onClick={() => removePage(index)}
                    className="ml-4 shrink-0 rounded-lg p-2 text-slate-600 transition hover:bg-red-500/10 hover:text-red-400"
                  >
                    <TrashIcon />
                  </button>

                </div>
              ))}

            </div>
          )}

          {pages.length === 0 && (
            <div className="mt-4 rounded-xl border border-dashed border-white/[0.07] px-4 py-5 text-center">
              <p className="text-xs text-slate-600">
                No navigation pages added yet.
              </p>
            </div>
          )}

        </section>

        {/* SAVE */}
        <button
          onClick={saveAssistant}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-500/25"
        >
          {user.isSetupComplete? "Update Assistant" : "Save Assistant"}
          <ArrowIcon />
        </button>

        <p className="mt-3 text-center text-xs text-slate-600">
          You can update your assistant configuration later.
        </p>

      </div>
    </main>
  );
};


/* -------------------------------------------------------------------------- */
/* EMBED CODE                                                                 */
/* -------------------------------------------------------------------------- */

const EmbedCode = ({ assistant, onEdit }) => {
  const [copied, setCopied] = useState(false);

  const messagesLeft = Math.max(
    (assistant.requestLimits || 0) -
      (assistant.totalMessages || 0),
    0
  );

  const daysLeft =
    assistant.proExpiresAt
      ? Math.max(
          Math.ceil(
            (new Date(assistant.proExpiresAt) - new Date()) /
              (1000 * 60 * 60 * 24)
          ),
          0
        )
      : 0;

  const script = `<script src="${clientUrl}/assistant.js" data-assistant-id="${assistant._id}"></script>`;

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(script);

      setCopied(true);

      toast.success("Script Copied!")

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#07070d] text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 top-[35%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />

      {/* Grid */}
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

      <div className="relative mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:py-14">

        {/* HEADER */}
        <div className="mb-8">

          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

            <span className="text-xs font-medium tracking-wide text-emerald-400">
              Assistant Saved
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {assistant.assistantName || "Your Assistant"} is ready.
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add the script below to your website to activate your AI assistant.
          </p>

        </div>

        {/* MAIN CARD */}
        <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 shadow-2xl shadow-black/20 sm:p-6">

          {/* STATUS */}
          <div className="mb-6 grid gap-3 sm:grid-cols-3">

            <InfoCard
              label="Current Plan"
              value={assistant.plan=='free'? "Free" : "Pro"}
            />

            <InfoCard
              label="Gemini Status"
              value={
                assistant.geminiStatus === "active"
                  ? "Active"
                  : assistant.geminiStatus === "quota_exceeded"
                  ? "Quota Exceeded"
                  : "Invalid"
              }
              active={assistant.geminiStatus === "active"}
            />

            {assistant.plan === "free" ? (
              <InfoCard
                label="Messages Left"
                value={messagesLeft}
              />
            ) : (
              <InfoCard
                label="Days Left"
                value={daysLeft}
              />
            )}

          </div>

          {/* INSTRUCTIONS */}
          <div className="rounded-2xl border border-amber-400/10 bg-amber-400/[0.04] p-5">

            <h3 className="text-sm font-semibold text-amber-300">
              Where to paste this script?
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Paste this script before the closing{" "}
              <code className="text-amber-300/80">
                &lt;/body&gt;
              </code>{" "}
              tag of your website's HTML file.
            </p>

            <p className="mt-5 text-xs font-medium text-slate-500">
              Example:
            </p>

            <div className="mt-3 overflow-x-auto rounded-xl border border-white/[0.06] bg-[#050509] p-4 scrollbar-none">

              <pre className="text-xs leading-7 text-emerald-400">
                <code>
{`<body>
  Your Website Content
  // 👇 Paste the script here, above the closing body tag.
  ${script}
</body>`}
                </code>
              </pre>

            </div>

          </div>

          {/* EMBED CODE */}
          <div className="mt-6">

            <div className="mb-2 flex items-center justify-between">

              <p className="text-xs font-semibold text-slate-400">
                Embed Code
              </p>

              {copied && (
                <span className="text-xs font-medium text-emerald-400">
                  Copied!
                </span>
              )}

            </div>

            <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#050509] p-3">

              <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap px-2 text-xs text-emerald-400 scrollbar-none">
                {script}
              </code>

              <button
                onClick={copyScript}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-900 transition hover:bg-slate-200"
                title="Copy script"
              >
                <CopyIcon />
              </button>

            </div>

          </div>

        </section>

        {/* EDIT CONFIGURATION */}
        <div className="mt-5">
          <button
            onClick={onEdit}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-500/25"
          >
            <EditIcon />
            Edit Assistant Configuration
          </button>
        </div>

      </div>
    </main>
  );
};


/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

const SectionHeader = ({ title, description }) => {
  return (
    <div className="mb-5">

      <h2 className="text-base font-semibold text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-1 text-xs text-slate-600">
          {description}
        </p>
      )}

    </div>
  );
};


const Input = ({
  label,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div>

      {label && (
        <label className="mb-2 block text-xs font-medium text-slate-400">
          {label}
        </label>
      )}

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-violet-400/40 focus:ring-2 focus:ring-violet-500/10"
      />

    </div>
  );
};


const ChoiceButton = ({
  active,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
        active
          ? "border-violet-400/50 bg-gradient-to-r from-violet-500/10 to-cyan-400/10 text-violet-300 shadow-[0_0_20px_rgba(139,92,246,0.06)]"
          : "border-white/[0.07] bg-white/[0.015] text-slate-500 hover:border-white/[0.12] hover:bg-white/[0.03] hover:text-slate-300"
      }`}
    >
      {children}
    </button>
  );
};


const InfoCard = ({
  label,
  value,
  active,
}) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">

      <p className="text-xs text-slate-600">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-semibold ${
          active
            ? "text-emerald-400"
            : "text-white"
        }`}
      >
        {value}
      </p>

    </div>
  );
};


const PlusIcon = () => (
  <svg
    width="14"
    height="14"
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


const EditIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
  </svg>
);


const TrashIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M19 6l-1 15H6L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);


const CopyIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export default Builder;