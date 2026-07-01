import React from "react";
import {
  Sun,
  ShieldCheck,
  Landmark,
  ArrowRight,
  Shield,
  Zap,
  Leaf,
  MapPin
} from "lucide-react";
import Link from "next/link";

// --- DATA CONFIGURATION (Professional DRY Approach) ---
const LOGIN_CARDS = [
  {
    id: "admin",
    title: "Admin Portal",
    description: "Secure access for administrators to manage and monitor the portal.",
    icon: ShieldCheck,

    loginHref: "/Alogin",
    signupHref: "/Asignup",

    cardTheme:
      "from-[#FFFDF8] to-[#FFF7E3] border-[#FDECBF] shadow-orange-500/5 hover:shadow-orange-500/10",
    iconTheme: "from-[#FFF4D4] to-[#FFE8A1] text-[#F5A623]",

    loginTheme:
      "bg-[#F5A623] hover:bg-[#E0931B] shadow-orange-500/20",
    signupTheme:
      "border border-[#F5A623] text-[#F5A623] hover:bg-[#FFF4D4]",
  },
  {
    id: "emitra",
    title: "e-Mitra Operator",
    description: "Register, submit and track subsidy applications for citizens.",
    icon: MapPin,

    loginHref: "/Elogin",
    signupHref: "/Esignup",

    cardTheme:
      "from-[#F9FAFF] to-[#EDF1FF] border-[#DCE3FF] shadow-blue-500/5 hover:shadow-blue-500/10",
    iconTheme: "bg-white text-[#525CEB]",

    loginTheme:
      "bg-[#525CEB] hover:bg-[#434BCC] shadow-blue-500/20",
    signupTheme:
      "border border-[#525CEB] text-[#525CEB] hover:bg-[#EEF1FF]",
  },
];

export default function Home() {
  return (
    // STRICT VIEWPORT LOCK: h-[100dvh] prevents scrolling entirely, overflow-hidden stops overflow
    <main className="relative   w-full flex flex-col font-sans overflow-hidden   text-slate-800 homebg backdrop-blur-md">



      {/* --- HEADER (Shrink-proof) --- */}
      <header className="relative z-10 w-full px-4 sm:px-8 lg:px-12 py-3 lg:py-4 flex flex-row items-center justify-between shrink-0  ">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10">
            <Sun className="w-6 h-6 sm:w-8 sm:h-8 text-[#F5A623] relative z-10" strokeWidth={2.5} />
            <div className="absolute inset-0 bg-yellow-200 blur-md opacity-50 rounded-full"></div>
          </div>
          <div>
            <h2 className="font-extrabold text-[#1E293B] text-[15px] sm:text-lg leading-none tracking-tight">
              Solar Subsidy
            </h2>
            <p className="text-[10px] sm:text-xs text-slate-600 font-bold tracking-wide mt-0.5">e-Mitra Portal</p>
          </div>
        </div>

      </header>

      {/* --- MAIN CONTENT (Highly Elastic & Centered) --- */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 w-full max-w-6xl mx-auto px-4 py-2 sm:py-4">

        {/* HERO TITLES */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8 shrink-0">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50/80 px-3 py-1 text-[10px] sm:text-xs font-bold text-orange-600 mb-2 sm:mb-4 border border-orange-100 shadow-sm">
            <Sun className="w-3 h-3 fill-orange-500 text-orange-500" />
            Empowering Rajasthan with Solar Energy
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-[#1A233A] tracking-tight leading-[1.1] mb-2 lg:mb-3">
            Solar Subsidy <br className="hidden sm:block" />
            <span className="text-[#F5A623]"> e-Mitra Portal</span>
          </h1>

          <p className="text-[11px] sm:text-[13px] lg:text-[15px] text-slate-500 font-medium tracking-wide max-w-md mx-auto leading-snug">

            Clean Energy | Sustainable Future | Empowering Citizens
          </p>
        </div>

        {/* LOGIN CARDS (Dynamic Row/Col based on available space) */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full max-w-200 shrink min-h-0 overflow-hidden">
          {LOGIN_CARDS.map((card) => (
            <div
              key={card.id}
              className={`group relative bg-linear-to-b ${card.cardTheme} rounded p-4 sm:p-6 lg:p-8 flex-1 flex flex-row sm:flex-col items-center sm:items-center text-left sm:text-center`}
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 shrink-0 rounded-xl   bg-linear-to-br ${card.iconTheme} flex items-center justify-center sm:mb-4 lg:mb-5 shadow-sm border border-white/50 mr-4 sm:mr-0`}>
                <card.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" strokeWidth={2} />
              </div>

              <div className="flex-1 min-w-0 flex flex-col sm:items-center justify-center w-full">
                <h3 className="text-[15px] sm:text-lg lg:text-xl font-extrabold text-[#1E293B] mb-0.5 sm:mb-2 truncate w-full text-left sm:text-center">
                  {card.title}
                </h3>
                <p className="text-[#64748B] text-[11px] sm:text-[13px] lg:text-[14px] leading-tight sm:mb-5 lg:mb-6 sm:max-w-55 line-clamp-2 sm:line-clamp-none">
                  {card.description}
                </p>
                <div className="mt-3 sm:mt-auto w-full flex gap-2">
                  <Link
                    href={card.loginHref}
                    className={`flex-1 h-9 sm:h-10 lg:h-12 text-white font-bold text-[11px] sm:text-sm rounded-lg sm:rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-lg ${card.loginTheme}`}
                    
                  >
                    Login
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>

                  <Link
                    href={card.signupHref}
                    className={`flex-1 h-9 sm:h-10 lg:h-12 font-bold text-[11px] sm:text-sm rounded-lg sm:rounded-xl flex items-center justify-center transition-all ${card.signupTheme}`}
                    
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>


      </section>

      {/* --- FOOTER (Shrink-proof & Compact) --- */}
      <footer className="relative z-10 w-full bg-[#0F172A] text-slate-300 py-2 sm:py-3 px-4 sm:px-8 lg:px-12 mt-auto shrink-0">
        <div className=" mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 text-[9px] sm:text-[11px] lg:text-[12px]">



          <div className="text-center flex flex-col items-center">
            <p className="mb-0.5 sm:mb-1 font-medium">Solar Subsidy e-Mitra Portal.</p>
            <div className="flex items-center justify-center gap-2 sm:gap-3 text-slate-400">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
              <span className="opacity-30">|</span>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
              <span className="opacity-30">|</span>
              <a href="#" className="hover:text-white transition-colors duration-200">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}