import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {serverUrl} from "../App.jsx"
import { Navigate, useNavigate } from "react-router-dom";





const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
// console.log(razorpayKey)



const Billing = ({ user, setUser }) => {
  const navigate = useNavigate()



  const isPro = user?.plan === "pro";
  
  const getDaysLeft = () => {
    if (!user?.proExpiresAt) return 0;

    const expiry = new Date(user.proExpiresAt);
    const now = new Date();

    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return 0;

    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysLeft();

  const messagesLeft = Math.max(
    (user?.requestLimits || 0) -
      (user?.totalMessages || 0),
    0
  );


  const handleUpgrade = async () => {
    try {

      if (user?.isSetupComplete === false) {
        toast.error("Create your assistant first");
        navigate("/builder");
        return;
      }

      if (!razorpayKey) {
        toast.error("Razorpay key is missing!");
        return;
      }

      // Create order on backend
      const orderResponse = await axios.post(
        serverUrl + "/api/billing/pay",
        {
          plan: "pro",
        },
        {
          withCredentials: true,
        }
      );

      if (!orderResponse.data?.success) {
        throw new Error(
          orderResponse.data?.message ||
          "Failed to create payment order."
        );
      }

      const order = orderResponse.data.order;

      // Open Razorpay Checkout
      const options = {
        key: razorpayKey,

        amount: order.amount,

        currency: order.currency,

        name: "Fazar AI",

        description: "Fazar AI Pro Plan - 3 Months",

        order_id: order.id,

        handler: async function (paymentResponse) {
          try {
            // Verify payment on backend
            const verifyResponse = await axios.post(
              serverUrl + "/api/billing/verify",
              {
                razorpay_order_id:
                  paymentResponse.razorpay_order_id,

                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,

                razorpay_signature:
                  paymentResponse.razorpay_signature,
              },
              {
                withCredentials: true,
              }
            );

            if (!verifyResponse.data?.success) {
              throw new Error(
                verifyResponse.data?.message ||
                "Payment verification failed."
              );
            }

            // Update user in React state
            if (
              setUser &&
              verifyResponse.data.user
            ) {
              setUser(
                verifyResponse.data.user
              );
            }

            toast.success(
              "Payment successful! Pro plan activated."
            );

          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            toast.error(
              error.response?.data?.message ||
              error.message ||
              "Payment verification failed."
            );
          }
        },

        modal: {
          ondismiss: function () {
            console.log(
              "Razorpay checkout closed."
            );
          },
        },

        theme: {
          color: "#8b5cf6",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Razorpay payment failed:",
            response
          );

          toast.error(
            response.error?.description ||
            "Payment failed. Please try again."
          );
        }
      );

      razorpay.open();

    } catch (error) {
      console.error(
        "Upgrade error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Unable to start payment."
      );
    }
  };


  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-[#07070d] text-white">

      {/* ------------------------------------------------------------------ */}
      {/* BACKGROUND                                                          */}
      {/* ------------------------------------------------------------------ */}

      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-600/10 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 top-[35%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />

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


      {/* ------------------------------------------------------------------ */}
      {/* CONTENT                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-14">


        {/* HEADER */}

        <div className="mb-8">

          <div className="mb-3 flex items-center gap-2">

            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

            <span className="text-xs font-medium tracking-wide text-slate-500">
              Fazar AI
            </span>

          </div>


          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Billing & Subscription
          </h1>


          <p className="mt-2 text-sm text-slate-500">
            Manage your AI assistant plan and usage.
          </p>

        </div>


        {/* ---------------------------------------------------------------- */}
        {/* CURRENT STATUS                                                    */}
        {/* ---------------------------------------------------------------- */}

        <div className="mb-8 grid gap-4 md:grid-cols-3">


          {/* CURRENT PLAN */}

          <StatusCard
            label="Current Plan"
            value={isPro ? "Pro" : "Free"}
            valueClass={
              isPro
                ? "text-violet-300"
                : "text-white"
            }
          />


          {/* GEMINI STATUS */}

          <StatusCard
            label="Gemini Status"
            value={
              user?.geminiStatus === "active"
                ? "Active"
                : user?.geminiStatus === "quota_exceeded"
                ? "Quota Exceeded"
                : "Invalid"
            }
            valueClass={
              user?.geminiStatus === "active"
                ? "text-emerald-400"
                : "text-red-400"
            }
          />


          {/* USAGE / EXPIRY */}

          <StatusCard
            label={
              isPro
                ? "Plan Expiry"
                : "Messages Left"
            }
            value={
              isPro
                ? `${daysLeft} Days`
                : messagesLeft
            }
            valueClass="text-white"
          />

        </div>


        {/* ---------------------------------------------------------------- */}
        {/* PLANS                                                              */}
        {/* ---------------------------------------------------------------- */}

        <div className="grid gap-5 lg:grid-cols-2">


          {/* ================================================================ */}
          {/* FREE PLAN                                                        */}
          {/* ================================================================ */}

          <section className="relative flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6 shadow-2xl shadow-black/20 sm:p-7">

            {/* subtle glow */}

            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/5 blur-3xl" />


            <div className="relative">

              <div className="mb-6 flex items-start justify-between gap-4">

                <div>

                  <h2 className="text-xl font-semibold text-white">
                    Free Plan
                  </h2>

                  <p className="mt-1 text-xs text-slate-600">
                    Start building with Fazar AI.
                  </p>

                </div>


                {!isPro && (
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    Current
                  </span>
                )}

              </div>


              {/* PRICE */}

              <div className="mb-8">

                <div className="flex items-end gap-1">

                  <span className="text-5xl font-bold tracking-tight text-white">
                    ₹0
                  </span>

                </div>

                <p className="mt-2 text-xs text-slate-600">
                  Forever free
                </p>

              </div>


              {/* FEATURES */}

              <div className="space-y-4">

                <Feature
                  text="200 AI responses"
                />

                <Feature
                  text="Voice assistant"
                />

                <Feature
                  text="Navigation support"
                />

                <Feature
                  text="Basic customization"
                />

                <Feature
                  text="Website embed"
                />

              </div>

            </div>


            {/* BOTTOM */}

            <div className="mt-auto pt-8">

              <div className="rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3">

                <div className="flex items-center justify-between">

                  <span className="text-xs text-slate-500">
                    Messages remaining
                  </span>

                  <span className="text-sm font-semibold text-white">
                    {messagesLeft}
                  </span>

                </div>

              </div>

            </div>

          </section>


          {/* ================================================================ */}
          {/* PRO PLAN                                                          */}
          {/* ================================================================ */}

          <section className="relative flex min-h-[430px] flex-col overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-600 via-purple-500 to-cyan-400 p-[1px] shadow-2xl shadow-violet-900/20">


            {/* Inner card */}

            <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-[#0a0913]/85 p-6 backdrop-blur-xl sm:p-7">


              {/* ambient gradients */}

              <div className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full bg-violet-500/20 blur-[90px]" />

              <div className="pointer-events-none absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-cyan-400/15 blur-[90px]" />


              <div className="relative">

                {/* HEADER */}

                <div className="mb-6 flex items-start justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-2">

                      <h2 className="text-xl font-semibold text-white">
                        Pro Plan
                      </h2>

                      <span className="rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-slate-950">
                        Premium
                      </span>

                    </div>

                    <p className="mt-1 text-xs text-slate-400">
                      Unlock the full power of Fazar AI.
                    </p>

                  </div>


                  {isPro && (
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold text-emerald-300">
                      Active
                    </span>
                  )}

                </div>


                {/* PRICE */}

                <div className="mb-8">

                  <div className="flex items-end gap-2">

                    <span className="text-5xl font-bold tracking-tight text-white">
                      ₹599
                    </span>

                    <span className="pb-1 text-sm text-slate-400">
                      / 3 months
                    </span>

                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    One-time payment • 3 months access
                  </p>

                </div>


                {/* FEATURES */}

                <div className="space-y-4">

                  <Feature
                    text="Unlimited AI messages"
                    premium
                  />

                  <Feature
                    text="Advanced AI assistant"
                    premium
                  />

                  <Feature
                    text="Priority performance"
                    premium
                  />

                  <Feature
                    text="Unlimited navigation"
                    premium
                  />

                  <Feature
                    text="Premium support"
                    premium
                  />

                </div>

              </div>


              {/* BOTTOM */}

              <div className="relative mt-auto pt-8">

                {isPro ? (

                  <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.08] px-4 py-3 text-center">

                    <p className="text-sm font-semibold text-emerald-300">
                      Pro Plan Active
                    </p>

                    <p className="mt-1 text-[11px] text-slate-500">
                      {daysLeft} days remaining
                    </p>

                  </div>

                ) : (

                  <button
                    onClick={handleUpgrade}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-500/30"
                  >

                    Upgrade to Pro

                    <ArrowIcon />

                  </button>

                )}

              </div>

            </div>

          </section>

        </div>


        {/* ---------------------------------------------------------------- */}
        {/* NOTE                                                               */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-6 flex items-center justify-center">

          <p className="max-w-xl text-center text-[11px] leading-5 text-slate-600">
            Your subscription powers your AI assistant, voice responses,
            navigation, and advanced capabilities across your website.
          </p>

        </div>

      </div>

    </main>
  );
};


/* ========================================================================= */
/* STATUS CARD                                                               */
/* ========================================================================= */

const StatusCard = ({
  label,
  value,
  valueClass = "text-white",
}) => {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 shadow-xl shadow-black/10">

      <p className="text-xs text-slate-600">
        {label}
      </p>

      <p
        className={`mt-1 text-base font-semibold ${valueClass}`}
      >
        {value}
      </p>

    </div>
  );
};


/* ========================================================================= */
/* FEATURE                                                                  */
/* ========================================================================= */

const Feature = ({
  text,
  premium = false,
}) => {
  return (
    <div className="flex items-center gap-3">

      <div
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          premium
            ? "bg-cyan-400/10 text-cyan-300"
            : "bg-white/[0.05] text-slate-400"
        }`}
      >
        <CheckIcon />
      </div>

      <span className="text-sm text-slate-300">
        {text}
      </span>

    </div>
  );
};


/* ========================================================================= */
/* ICONS                                                                     */
/* ========================================================================= */

const CheckIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
  >
    <path d="m5 12 4 4L19 6" />
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


export default Billing;