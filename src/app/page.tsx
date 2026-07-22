"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Check,
  Users,
  School,
  ArrowRight,
  BookOpen,
  MessageSquare,
  Award,
  Clock,
  Video,
  Sparkles,
  Phone,
  Mail,
  HelpCircle,
  Briefcase,
  Layers,
  ArrowDown,
  CheckCircle2,
  Calendar,
  GraduationCap
} from "lucide-react";
import JoinModal from "@/components/JoinModal";
import EnquiryModal from "@/components/EnquiryModal";

// Reusable count-up hook
function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    const timeout = setTimeout(() => requestAnimationFrame(tick), 500);
    return () => clearTimeout(timeout);
  }, [target, duration]);
  return count;
}

export default function HomePage() {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const teacherCount = useCountUp(1000);
  const schoolCount = useCountUp(50);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "What is SATIC?",
      a: "SATIC — The Teachers' Club is a professional community built around the continuous learning, practice and professional growth of teachers."
    },
    {
      q: "What is SATIC CPD?",
      a: "SATIC CPD is SATIC's continuous professional-development experience. It combines short 10-Minute Practice activities during the week, weekly SATIC Teachers' Talk sessions and focused professional Practice Batches."
    },
    {
      q: "Who can join SATIC?",
      a: "SATIC is designed primarily for school teachers who want to continue developing their professional skills and stay connected to ongoing professional learning."
    },
    {
      q: "How does the 10-Minute Practice work?",
      a: "Teachers receive a short professional practice activity designed to take approximately 10 minutes. They can complete it around their schedule, submit their work, receive reviews, earn Practice Points and track their progress."
    },
    {
      q: "Do I need to complete the practice at a fixed time?",
      a: "No. The 10-Minute Practice is designed to be flexible. Teachers can complete and submit activities according to the schedule and submission requirements of their Practice Batch."
    },
    {
      q: "What is SATIC Teachers' Talk?",
      a: "SATIC Teachers' Talk is the live learning component of SATIC CPD. These 30-minute sessions bring teachers together to explore relevant professional topics, learn from speakers and participate in professional discussions."
    },
    {
      q: "What topics does SATIC CPD cover?",
      a: "SATIC CPD is built around four main focus areas: Classroom Management, Parent Engagement, Teacher Productivity and Career Development. Specific Practice Batches and Teachers' Talk sessions explore topics within these areas."
    },
    {
      q: "Will I receive a certificate?",
      a: "Digital certificates may be awarded for successfully completing eligible Practice Batches according to their completion criteria."
    },
    {
      q: "How much does SATIC membership cost?",
      a: "Individual SATIC membership costs ₹899 per year, giving members access to the SATIC CPD experience and included membership benefits."
    },
    {
      q: "Can schools enrol multiple teachers?",
      a: "Yes. Schools and institutions interested in enrolling their teaching faculty can contact SATIC for information about special institutional membership options."
    },
    {
      q: "How can my school get started?",
      a: "Complete the institutional enquiry form or contact the SATIC team directly. Our team will connect with your school to explain the SATIC CPD experience and discuss the enrolment process."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-primary/20">

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-[#F8F5EC]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 md:py-4.5 lg:px-8">
          <a href="#" className="flex items-center focus:outline-none" aria-label="SATIC Home">
            <Image
              src="/satic-logo.png"
              alt="SATIC Logo"
              width={180}
              height={54}
              className="w-[130px] md:w-[175px] h-auto object-contain"
              style={{ height: "auto" }}
              priority
            />
          </a>

          {/* Navigation links */}
          <nav className="hidden items-center gap-7 md:flex">
            <a href="#benefits" className="text-xs font-bold uppercase tracking-wider text-brand-text/80 hover:text-brand-primary transition-colors focus:outline-none">Benefits</a>
            <a href="#cpd" className="text-xs font-bold uppercase tracking-wider text-brand-text/80 hover:text-brand-primary transition-colors focus:outline-none">SATIC CPD</a>
            <a href="#practice" className="text-xs font-bold uppercase tracking-wider text-brand-text/80 hover:text-brand-primary transition-colors focus:outline-none">10-Min Practice</a>
            <a href="#teachers-talk" className="text-xs font-bold uppercase tracking-wider text-brand-text/80 hover:text-brand-primary transition-colors focus:outline-none">Teachers' Talk</a>
            <a href="#focus-areas" className="text-xs font-bold uppercase tracking-wider text-brand-text/80 hover:text-brand-primary transition-colors focus:outline-none">Focus Areas</a>
            <a href="#pricing" className="text-xs font-bold uppercase tracking-wider text-brand-text/80 hover:text-brand-primary transition-colors focus:outline-none">Pricing</a>
            <a href="#schools" className="text-xs font-bold uppercase tracking-wider text-brand-text/80 hover:text-brand-primary transition-colors focus:outline-none">For Schools</a>

            {/* Join SATIC CTA */}
            <button
              onClick={() => setIsJoinOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-secondary px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-brand-primary transition-all cursor-pointer focus:outline-none"
            >
              Join SATIC
            </button>
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden space-x-2">
            <button
              type="button"
              onClick={() => setIsJoinOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-brand-primary p-2 text-white hover:bg-brand-secondary focus:outline-none"
              aria-label="Join SATIC"
            >
              <Sparkles size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-mesh relative px-6 pt-2 pb-10 md:pt-4 md:pb-16 lg:pt-6 lg:pb-20 overflow-hidden border-b border-brand-border">

        {/* Decorative floating orbs */}
        <div className="orb-float-slow pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="orb-float-medium pointer-events-none absolute top-1/2 -right-20 h-56 w-56 rounded-full bg-brand-accent/8 blur-3xl" />
        <div className="orb-float-slow pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-brand-secondary/5 blur-2xl" />

        {/* Subtle dot-grid overlay */}
        <div className="pointer-events-none absolute inset-0 editorial-grid opacity-40" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

            {/* ── Left Column ── */}
            <div className="w-full lg:w-[48%] flex flex-col justify-center space-y-5">

              {/* Headline */}
              <div className="fade-up-1 space-y-1">
                <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-extrabold tracking-tight text-brand-secondary leading-[1.1] font-display">
                  Grow as a Teacher{" "}
                  <span className="relative inline-block text-brand-primary">
                    Every Day.
                    <span className="hero-underline absolute inset-x-0 bottom-0 h-[3px] rounded-full" />
                  </span>
                </h1>
              </div>

              {/* Sub-copy */}
              <p className="fade-up-3 text-base md:text-lg text-brand-text/80 leading-relaxed font-body max-w-lg">
                SATIC — The Teachers' Club is a professional community where teachers continuously learn, practise, grow and get recognised.
              </p>

              {/* Stats Block */}
              <div className="fade-up-4 grid grid-cols-2 gap-12 py-5 border-y border-brand-border/60 max-w-sm">
                <div className="stat-pop">
                  <span className="text-4xl md:text-5xl font-black text-brand-primary block leading-none mb-1 font-display tabular-nums">
                    {teacherCount >= 1000 ? "1,000" : teacherCount.toLocaleString()}+
                  </span>
                  <span className="text-xs font-bold text-brand-text/55 uppercase tracking-widest font-body">Teachers</span>
                </div>
                <div className="stat-pop" style={{ animationDelay: "0.7s" }}>
                  <span className="text-4xl md:text-5xl font-black text-brand-primary block leading-none mb-1 font-display tabular-nums">
                    {schoolCount}+
                  </span>
                  <span className="text-xs font-bold text-brand-text/55 uppercase tracking-widest font-body">Schools</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="fade-up-5 pt-1 flex flex-col sm:flex-row gap-3 font-display">
                <button
                  onClick={() => setIsJoinOpen(true)}
                  className="btn-pulse inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 px-8 transition-premium text-sm cursor-pointer"
                >
                  <span>Join SATIC at just ₹899/year</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href="#cpd"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white/70 border border-brand-border hover:bg-white hover:border-brand-primary/30 text-brand-secondary font-bold py-4 px-8 transition-premium text-sm backdrop-blur-sm"
                >
                  <span>Explore SATIC CPD</span>
                  <ArrowDown size={16} className="animate-bounce" />
                </a>
              </div>
            </div>

            {/* ── Right Column — Image ── */}
            <div className="fade-in-right w-full lg:w-[52%]">
              <div className="relative">
                {/* Glow ring behind image */}
                <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-brand-primary/20 via-brand-accent/10 to-brand-secondary/20 blur-xl opacity-70" />

                {/* Image card */}
                <div className="relative aspect-[4/3] rounded-[1.75rem] overflow-hidden border-2 border-white shadow-2xl shadow-brand-primary/10">
                  <Image
                    src="/teachers-collaborating-indian.png"
                    alt="SATIC Professional Teachers Collaborating"
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    priority
                  />
                  {/* Dark gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-secondary/70 to-transparent" />

                  {/* Floating badge inside image */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg">
                    <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center shrink-0">
                      <Award size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-extrabold text-brand-secondary font-display uppercase tracking-wide leading-none">CPD Certified</p>
                      <p className="text-[10px] text-brand-text/60 font-body mt-0.5">Continuous Professional Development</p>
                    </div>
                  </div>
                </div>

                {/* Floating stat pill — top right */}
                <div className="absolute -top-4 -right-4 bg-brand-accent text-brand-secondary text-[11px] font-extrabold font-display px-4 py-2 rounded-full shadow-lg tracking-wide uppercase">
                  ₹899 / year
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MEMBERSHIP BENEFITS */}
      <section id="benefits" className="px-6 py-8 md:py-12 bg-white border-b border-brand-border">
        <div className="mx-auto max-w-7xl bg-brand-secondary text-white rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
          {/* Subtle background decorative shapes */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/5 pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/5 pointer-events-none"></div>

          <div className="max-w-3xl mb-10 space-y-2 relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display">
              TEACHERS BENEFIT
            </h2>
            <p className="text-base md:text-xl text-brand-accent font-semibold tracking-wide font-display">
              Elevate Your Teaching Practice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              { title: "10-Minute Practice", desc: "Short, practical professional-development activities throughout the week.", icon: Clock },
              { title: "SATIC Teachers' Talk", desc: "Weekly live professional-development sessions.", icon: Video },
              { title: "Practice & Feedback", desc: "Complete practices, submit your work and receive reviews.", icon: MessageSquare },
              { title: "Progress & Recognition", desc: "Track your Practice Points, progress and earn digital certificates for eligible completed Practice Batches.", icon: Award }
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/10 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white/15 h-full"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-white font-display">{benefit.title}</h3>
                    <p className="text-sm text-white/80 leading-relaxed font-body">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03 — SATIC CPD */}
      <section id="cpd" className="px-6 pt-2 pb-12 md:pt-4 md:pb-16 bg-white border-b border-brand-border">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

            {/* Left Column: Description & Tagline */}
            <div className="w-full lg:w-[42%] flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tight mb-2">
                  <span className="text-brand-primary">SΛTIC CPD</span>
                </h2>
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-secondary font-display leading-[1.2]">
                  Continuous Professional Development That Is Actually Continuous.
                </h3>
              </div>

              <div className="space-y-4 text-sm md:text-base text-brand-text/75 leading-relaxed font-body">
                <p>Professional development shouldn't be limited to a one-day workshop or an occasional training session.</p>
                <p>SATIC CPD is designed to keep teachers connected to professional learning through short, practical and consistent experiences that fit into their professional lives.</p>
              </div>

              <div className="border-t border-brand-border pt-4">
                <p className="text-sm font-bold text-brand-primary font-display uppercase tracking-wider">
                  We put the &quot;Continuing&quot; back into Continuing Professional Development.
                </p>
                <p className="text-xs text-brand-text/60 font-body mt-1">
                  Professional development that becomes part of a teacher's professional life.
                </p>
              </div>
            </div>

            {/* Right Column: Circular Learning Cycle */}
            <div className="w-full lg:w-[55%] flex flex-col items-center">

              {/* Desktop Circular Flow (Visible on Desktop) */}
              <div className="hidden lg:block relative w-[520px] h-[480px] shrink-0">
                {/* Connecting Curved Arrow SVGs */}
                <svg className="w-full h-full absolute inset-0 text-brand-primary/20 pointer-events-none" viewBox="0 0 520 480" fill="none">
                  {/* Arrow from Daily (Top) to Weekly (Bottom-Right) */}
                  <path d="M 330 90 Q 450 160 410 330" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#arrow)" />
                  {/* Arrow from Weekly (Bottom-Right) to Monthly (Bottom-Left) */}
                  <path d="M 340 405 Q 260 445 180 405" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#arrow)" />
                  {/* Arrow from Monthly (Bottom-Left) to Daily (Top) */}
                  <path d="M 110 330 Q 70 160 190 90" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" markerEnd="url(#arrow)" />

                  {/* Arrowhead marker definition */}
                  <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" />
                    </marker>
                  </defs>
                </svg>

                {/* Center Circle loop badge */}
                <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#FAF9F6] border-2 border-brand-primary/10 rounded-full flex flex-col justify-center items-center text-center shadow-lg p-4 z-20">
                  <div className="text-[11px] font-bold text-brand-secondary uppercase tracking-wide leading-relaxed">
                    Learn &rarr; Practise<br />
                    &rarr; Apply &rarr; Reflect<br />
                    &rarr; Grow &rarr; Repeat
                  </div>
                  <div className="text-[10px] font-black text-brand-primary mt-2.5 flex items-center justify-center gap-1 uppercase tracking-widest">
                    CONTINUE ↻
                  </div>
                </div>

                {/* DAILY Card (Top Center) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[240px] bg-white border border-brand-border/80 rounded-2xl p-4 shadow-sm text-center z-10 hover:shadow-md transition-premium">
                  <span className="inline-block text-[9px] font-extrabold text-brand-primary tracking-widest bg-brand-primary/10 px-2 py-0.5 rounded-full mb-2">DAILY</span>
                  <div className="mx-auto w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center mb-2 shadow-xs">
                    <Clock size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-brand-secondary font-display mb-1">10-Minute Practice</h4>
                  <p className="text-[11px] text-brand-text/75 leading-relaxed font-body">Short, practical activities.<br />Monday–Friday</p>
                </div>

                {/* WEEKLY Card (Bottom Right) */}
                <div className="absolute bottom-4 right-0 w-[230px] bg-white border border-brand-border/80 rounded-2xl p-4 shadow-sm text-center z-10 hover:shadow-md transition-premium">
                  <span className="inline-block text-[9px] font-extrabold text-brand-primary tracking-widest bg-brand-primary/10 px-2 py-0.5 rounded-full mb-2">WEEKLY</span>
                  <div className="mx-auto w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center mb-2 shadow-xs">
                    <Video size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-brand-secondary font-display mb-1">30-Minute Teachers' Talk</h4>
                  <p className="text-[11px] text-brand-text/75 leading-relaxed font-body">Live learning & discussions.<br />Every Saturday</p>
                </div>

                {/* MONTHLY Card (Bottom Left) */}
                <div className="absolute bottom-4 left-0 w-[230px] bg-white border border-brand-border/80 rounded-2xl p-4 shadow-sm text-center z-10 hover:shadow-md transition-premium">
                  <span className="inline-block text-[9px] font-extrabold text-brand-primary tracking-widest bg-brand-primary/10 px-2 py-0.5 rounded-full mb-2">MONTHLY</span>
                  <div className="mx-auto w-9 h-9 rounded-full bg-brand-primary text-white flex items-center justify-center mb-2 shadow-xs">
                    <GraduationCap size={16} />
                  </div>
                  <h4 className="text-sm font-bold text-brand-secondary font-display mb-1">Skill-Focused Practice</h4>
                  <p className="text-[11px] text-brand-text/75 leading-relaxed font-body">Focused skill batches.<br />Ongoing modules</p>
                </div>
              </div>

              {/* Mobile Learning Stack (Visible on Mobile) */}
              <div className="lg:hidden w-full space-y-6">
                <div className="bg-brand-bg/60 border border-brand-border/60 rounded-3xl p-6 text-center shadow-xs">
                  <h4 className="text-base font-bold text-brand-secondary uppercase tracking-wider mb-4 font-display">The Continuous Learning Cycle</h4>

                  <div className="flex flex-col items-center space-y-6">
                    {[
                      { time: "DAILY", title: "10-Minute Practice", desc: "Short, practical activities. Monday–Friday", icon: Clock },
                      { time: "WEEKLY", title: "30-Minute Teachers' Talk", desc: "Live learning, expert insights and professional discussion. Every Saturday", icon: Video },
                      { time: "MONTHLY", title: "Skill-Focused Practice", desc: "Focused skill batches. Ongoing modules", icon: GraduationCap }
                    ].map((step, i) => {
                      const Icon = step.icon;
                      return (
                        <div key={i} className="w-full flex flex-col items-center text-center space-y-2.5 bg-white p-5 rounded-2xl border border-brand-border shadow-xs relative">
                          <span className="text-[10px] font-bold text-brand-primary tracking-widest bg-brand-primary/10 px-2.5 py-0.5 rounded-full">{step.time}</span>
                          <div className="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md">
                            <Icon size={18} />
                          </div>
                          <h4 className="text-sm font-bold text-brand-secondary font-display">{step.title}</h4>
                          <p className="text-xs text-brand-text/75 leading-relaxed font-body font-medium">{step.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 inline-flex flex-col items-center justify-center gap-1 bg-[#FAF9F6] border border-brand-primary/10 px-6 py-4 rounded-2xl shadow-sm w-full">
                    <div className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider leading-relaxed">
                      Learn &rarr; Practise &rarr; Apply &rarr; Reflect &rarr; Grow &rarr; Repeat
                    </div>
                    <div className="text-[9px] font-extrabold text-brand-primary mt-1 flex items-center justify-center gap-1 uppercase tracking-widest">CONTINUE ↻</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 04 — 10-MINUTE PRACTICE */}
      <section id="practice" className="px-6 py-8 md:py-10 bg-brand-secondary text-white border-b border-brand-border relative overflow-hidden">
        {/* Subtle background decorative shapes */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/5 pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/5 pointer-events-none"></div>

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mb-10">

            {/* Left Column: Heading and 4 Steps */}
            <div className="w-full lg:w-[48%] space-y-8">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-display leading-[1.15]">
                <span className="text-brand-accent">10 Minutes.</span> One Practical Step Forward.
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { step: "01", title: "Receive", desc: "Get your practice activity." },
                  { step: "02", title: "Practise", desc: "Spend around 10 minutes completing it." },
                  { step: "03", title: "Submit", desc: "Submit your work and get mentor feedback." },
                  { step: "04", title: "Track", desc: "Earn Practice Points and track growth." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3.5 items-start p-4.5 bg-brand-bg text-brand-text border border-brand-border/60 rounded-2xl shadow-sm hover:scale-[1.02] transition-premium">
                    <span className="text-xl font-black text-brand-primary font-display leading-none mt-0.5">{item.step}</span>
                    <div className="font-body">
                      <h4 className="font-bold text-brand-secondary text-sm md:text-base font-display">{item.title}</h4>
                      <p className="text-xs md:text-sm text-brand-text/75 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Teacher Practicing Image */}
            <div className="w-full lg:w-[48%]">
              <div className="relative aspect-square sm:aspect-[4/3] rounded-[1.75rem] overflow-hidden border-2 border-white/10 shadow-2xl">
                <Image
                  src="/teacher-practicing.png"
                  alt="Indian teacher practicing CPD task on laptop and phone"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
            </div>

          </div>

          {/* What Can Teachers Practise Section */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-white font-display text-center mb-6">Monthly practice topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "AI Tools Practice", desc: "Use AI tools for lesson planning, content creation and everyday professional tasks.", icon: Sparkles },
                { title: "STEM Education Practice", desc: "Explore practical approaches to STEM and activity-based learning.", icon: BookOpen },
                { title: "Classroom Management Practice", desc: "Practise approaches to student engagement and everyday classroom situations.", icon: Award },
                { title: "Parent Communication Practice", desc: "Build confidence in clear and professional communication with parents.", icon: MessageSquare },
                { title: "Teacher Productivity Practice", desc: "Explore digital tools, time management and smarter professional workflows.", icon: Clock },
                { title: "Career Development Practice", desc: "Build professional skills and explore opportunities for continued growth.", icon: Briefcase }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-brand-bg border border-brand-border/60 rounded-xl p-5 md:p-6 shadow-sm flex gap-4 items-start hover:-translate-y-1 hover:shadow-md transition-premium text-brand-text">
                    <div className="rounded-lg bg-brand-primary/10 text-brand-primary p-2 shrink-0">
                      <Icon size={18} />
                    </div>
                    <div className="font-body">
                      <h4 className="font-bold text-brand-secondary text-sm md:text-base font-display">{item.title}</h4>
                      <p className="text-sm md:text-base text-brand-text/75 leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <h3 className="text-2xl font-bold text-white font-display text-center mb-6">What Teachers Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "The daily 10-minute activities are incredibly practical. I can complete them during my free period, and the feedback from mentors helps me refine my teaching methods immediately.", name: "Meera Sen", school: "Science Teacher, Ahmedabad" },
                { quote: "SATIC CPD has transformed how I plan my lessons. Learning to use AI tools step-by-step has saved me hours of administrative work every week.", name: "Rajesh Nair", school: "Math Teacher, Surat" },
                { quote: "It's the first professional development program that doesn't feel like a chore. The bite-sized daily practices fit perfectly into my busy schedule.", name: "Kavita Rao", school: "English Teacher, Rajkot" }
              ].map((t, i) => (
                <div key={i} className="bg-brand-bg border border-brand-border/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-premium text-brand-text">
                  <p className="text-sm md:text-base text-brand-text/80 leading-relaxed italic font-body mb-4">&quot;{t.quote}&quot;</p>
                  <div>
                    <h5 className="font-bold text-brand-secondary text-xs md:text-sm font-display">{t.name}</h5>
                    <span className="text-xs text-brand-text/50 block font-body">{t.school}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 05 — SATIC TEACHERS' TALK */}
      <section id="teachers-talk" className="bg-white border-b border-brand-border pt-12 md:pt-16">
        
        {/* Part A: Main Content & Topics (1 Viewport Screen on Desktop) */}
        <div className="px-6 lg:h-[80vh] lg:min-h-[580px] lg:max-h-[780px] flex items-center relative overflow-hidden">
          <div className="mx-auto max-w-7xl w-full flex flex-col justify-center py-4">
            
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 mb-8">

              {/* Left Column: Heading and Description */}
              <div className="w-full lg:w-[48%] space-y-6">
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight mb-2">
                    <span className="text-brand-primary">SΛTIC</span> <span className="text-brand-secondary font-semibold">Teachers' Talk</span>
                  </h2>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-secondary font-display leading-[1.2]">
                    Learn Together. Discuss What Matters.
                  </h3>
                </div>
                <p className="text-sm md:text-base lg:text-lg text-brand-text/80 leading-relaxed font-body">
                  SATIC Teachers' Talk is the live learning component of the SATIC CPD experience. Teachers come together with speakers, experts and fellow educators to explore practical ideas, discuss professional challenges and discover approaches relevant to their professional lives.
                </p>
              </div>

              {/* Right Column: Seminar Picture (Full Square View - Unclipped) */}
              <div className="w-full lg:w-[48%] flex justify-center">
                <div className="relative aspect-square w-full max-w-[340px] md:max-w-[380px] lg:max-w-[400px] rounded-[1.75rem] overflow-hidden border border-brand-border shadow-lg">
                  <Image
                    src="/teachers-talk-online.png"
                    alt="Indian teacher attending live online CPD Teachers' Talk seminar"
                    fill
                    className="object-cover object-center rounded-[1.75rem]"
                    sizes="(max-width: 1024px) 100vw, 48vw"
                  />
                </div>
              </div>

            </div>

            {/* Topics We Explore List Layout */}
            <div className="bg-[#FAF9F6]/40 border border-brand-border rounded-3xl p-5 md:p-6 shadow-xs">
              <h3 className="text-sm font-bold text-brand-secondary uppercase tracking-widest mb-4 font-display text-center">Your Teachers' Talk Topics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 max-w-5xl mx-auto">
                {[
                  "AI Tools Every Teacher Should Know",
                  "What Is STEM Education?",
                  "Modern Classroom Management",
                  "Communicating Effectively With Parents",
                  "Teacher Productivity & Digital Tools",
                  "Career Growth for Teachers"
                ].map((topic, i) => (
                  <div key={i} className="flex items-center gap-2.5 py-1.5 px-2.5 hover:bg-brand-bg/25 rounded-lg transition-premium">
                    <span className="text-xs md:text-sm font-bold text-brand-primary font-display">0{i+1}</span>
                    <span className="text-sm md:text-base font-semibold text-brand-secondary font-display leading-tight">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Part B: Testimonials (Visible on Scroll) */}
        <div className="px-6 pt-4 pb-12 md:pt-6 md:pb-16 bg-[#FAF9F6]/20 border-t border-brand-border/40">
          <div className="mx-auto max-w-7xl w-full">
            <h3 className="text-2xl md:text-3xl font-extrabold text-brand-secondary font-display text-center mb-8">What Teachers Say</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { quote: "Every Saturday session is a breath of fresh air. Discussing real classroom struggles with peer educators gives me practical solutions for Monday morning.", name: "Amit Sharma", detail: "Physics Teacher, Ahmedabad" },
                { quote: "The 30-minute format is perfect. It's concise, high-impact, and directly focuses on what actually works in Indian classrooms.", name: "Priya Deshmukh", detail: "Primary Teacher, Surat" },
                { quote: "Hearing different perspectives from teachers across India during the live talk has been immensely helpful for my classroom engagement.", name: "Ketan Mehta", detail: "Math Teacher, Rajkot" }
              ].map((t, i) => (
                <div key={i} className="bg-white border border-brand-border rounded-xl p-5 shadow-sm flex flex-col justify-between hover:shadow-md transition-premium">
                  <p className="text-xs md:text-sm text-brand-text/75 leading-relaxed italic font-body mb-3">&quot;{t.quote}&quot;</p>
                  <div>
                    <h5 className="font-bold text-brand-secondary text-sm font-display">{t.name}</h5>
                    <span className="text-[11px] text-brand-text/50 block font-body mt-0.5">{t.detail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 06 — SATIC CPD FOCUS AREAS */}
      <section id="focus-areas" className="px-6 py-16 md:py-24 bg-[#FAF9F6]/40 border-b border-brand-border">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display">SATIC CPD Focus Areas</span>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary/65 block font-display">OUR CPD FRAMEWORK</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-secondary font-display">
              Built Around a Teacher's Professional Life.
            </h2>
            <p className="text-lg md:text-xl text-brand-text/75 leading-relaxed font-body">
              SATIC CPD focuses on four areas that influence a teacher's effectiveness in the classroom, relationships within the school community, everyday productivity and long-term professional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              { id: "01", area: "Classroom Management", desc: "Building effective, engaging and positive learning environments.", bullets: ["Student Engagement", "Classroom Communication", "Teaching Practices", "Activity-Based Learning", "Assessment & Feedback", "Managing Classroom Challenges"] },
              { id: "02", area: "Parent Engagement", desc: "Building stronger and more professional relationships between teachers and parents.", bullets: ["Effective Parent Communication", "Parent-Teacher Meetings", "Communicating Student Progress", "Managing Expectations", "Difficult Conversations", "Building Parent Partnerships"] },
              { id: "03", area: "Teacher Productivity", desc: "Helping teachers use their time, tools and technology more effectively.", bullets: ["AI Tools for Teachers", "Digital Teaching Tools", "Lesson & Content Planning", "Time Management", "Smarter Professional Workflows", "Personal Organisation"] },
              { id: "04", area: "Career Development", desc: "Supporting teachers in their continued professional and career growth.", bullets: ["Professional Skills", "Communication Skills", "Leadership Development", "Continuous Learning", "Career Opportunities", "Building a Professional Profile"] }
            ].map((focus, i) => (
              <div key={i} className="bg-white border border-brand-border rounded-2xl p-6 md:p-8 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold tracking-widest text-brand-primary uppercase">Focus Area {focus.id}</span>
                    <span className="text-xl font-black text-brand-accent font-display">{focus.id}</span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-secondary font-display mb-2">{focus.area}</h3>
                  <p className="text-sm md:text-base text-brand-text/75 font-body leading-relaxed mb-6">{focus.desc}</p>

                  <div className="grid grid-cols-2 gap-3 border-t border-brand-border/60 pt-5 font-body text-sm text-brand-text/90 font-medium">
                    {focus.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle2 size={14} className="text-brand-primary shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm md:text-base text-brand-text/60 leading-relaxed text-center font-body italic max-w-xl mx-auto border-t border-brand-border/60 pt-6">
            10-Minute Practice and SATIC Teachers' Talk topics are developed across these four focus areas, creating a balanced approach to continuous professional development.
          </p>
        </div>
      </section>

      {/* 07 — MEMBERSHIP & PRICING */}
      <section id="pricing" className="px-6 py-16 md:py-24 bg-white border-b border-brand-border">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-16 text-center mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display">SATIC Membership</span>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary/65 block font-display">SATIC TEACHER MEMBERSHIP</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-secondary font-display">
              A Year of Continuous Professional Growth.
            </h2>
            <p className="text-lg md:text-xl text-brand-text/75 leading-relaxed font-body">
              Join SATIC — The Teachers' Club and get access to the complete SATIC CPD experience.
            </p>
          </div>

          {/* Centered Pricing Card */}
          <div className="max-w-md mx-auto bg-brand-secondary text-white border-transparent rounded-3xl p-8 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-brand-primary opacity-25"></div>

            <div className="text-center relative z-10">
              <span className="bg-white/10 text-brand-accent text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full font-display">
                ANNUAL INDIVIDUAL PLAN
              </span>
              <div className="flex items-baseline justify-center space-x-1.5 mt-5">
                <span className="text-5xl font-black text-white font-display">₹899</span>
                <span className="text-white/60 text-sm font-body">/ year</span>
              </div>
              <span className="text-[11px] text-brand-accent font-bold font-body block mt-2">That's less than ₹3 a day.</span>
              <span className="text-xs text-white/70 block font-body mt-0.5">A small daily investment in continuous professional growth.</span>
            </div>

            <div className="border-t border-white/10 pt-5 space-y-3.5 text-xs md:text-sm font-body text-white/90 relative z-10">
              {[
                "10-Minute Practice",
                "SATIC Teachers' Talk",
                "Monthly Skill-Focused Practice",
                "Practice Reviews",
                "Practice Points",
                "Progress Tracking",
                "Digital Certificates",
                "SATIC Teacher Community"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <Check size={16} className="text-brand-accent shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsJoinOpen(true)}
              className="w-full bg-white hover:bg-brand-primary hover:text-white text-brand-secondary py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-premium cursor-pointer font-display shadow-md relative z-10"
            >
              Join SATIC · ₹899/year →
            </button>

            <p className="text-[10px] text-white/50 text-center font-body leading-relaxed relative z-10">
              ₹899 is charged annually. &quot;Less than ₹3 a day&quot; illustrates the equivalent daily investment.
            </p>
          </div>
        </div>
      </section>

      {/* 08 — FOR SCHOOLS & INSTITUTIONS */}
      <section id="schools" className="px-6 py-16 md:py-24 bg-[#FAF9F6]/40 border-b border-brand-border">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display">For Schools & Institutions</span>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary/65 block font-display">FOR SCHOOLS & INSTITUTIONS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-brand-secondary font-display">
              Invest in Teachers Who Keep Growing.
            </h2>
            <p className="text-lg md:text-xl text-brand-text/75 leading-relaxed font-body">
              Give your teaching faculty access to a continuous professional-development experience designed around teachers' real working schedules.
            </p>
            <p className="text-sm md:text-base text-brand-text/70 leading-relaxed font-body">
              Through SATIC CPD, teachers stay connected to professional learning through 10-Minute Practice during the week, SATIC Teachers' Talk every Saturday and focused professional practice throughout the year.
            </p>
          </div>

          {/* What Your Teachers Get Grid */}
          <div className="mb-16">
            <h3 className="text-lg font-bold text-brand-secondary uppercase tracking-wider mb-8 font-display">What Your Teachers Get</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "10-Minute Practice", desc: "Short, practical professional-development activities from Monday to Friday." },
                { title: "Weekly Teachers' Talk", desc: "30-minute live professional-development sessions every Saturday." },
                { title: "Monthly Skill-Focused Practice", desc: "Focused Practice Batches around relevant professional skills." },
                { title: "Reviews & Practice Points", desc: "Feedback and Practice Points that encourage continued participation." },
                { title: "Progress Tracking", desc: "A structured record of each teacher's professional-development journey." },
                { title: "Digital Certificates", desc: "Recognition for successfully completing eligible Practice Batches." }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-brand-border rounded-xl p-5 md:p-6 shadow-xs flex flex-col justify-between">
                  <h4 className="font-bold text-brand-secondary text-sm md:text-base font-display mb-1">{item.title}</h4>
                  <p className="text-sm md:text-base text-brand-text/75 leading-relaxed font-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bring SATIC CPD CTA Box & Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Box Callout */}
            <div className="lg:col-span-7 bg-brand-secondary text-white rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-brand-primary opacity-25"></div>
              <div className="relative z-10 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-accent font-display">Bring SATIC CPD to Your Teaching Faculty</span>
                <p className="text-sm md:text-base text-white/80 leading-relaxed font-body">
                  SATIC offers special institutional membership options for schools enrolling their teaching faculty.
                </p>
                <p className="text-sm md:text-base text-white/70 leading-relaxed font-body">
                  Contact our team to understand institutional membership, enrolment and how SATIC CPD can be introduced to your teachers.
                </p>
              </div>

              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="relative z-10 w-full md:w-fit bg-brand-primary hover:bg-[#1a4fbd] text-white py-3 px-8 rounded-xl font-bold text-xs uppercase tracking-widest transition-premium mt-8 font-display shadow-md"
              >
                Enquire for Your School →
              </button>
            </div>

            {/* Contact Details box */}
            <div className="lg:col-span-5 bg-white border border-brand-border rounded-3xl p-6 md:p-8 flex flex-col justify-between items-center text-center shadow-xs">
              <div className="space-y-4 flex flex-col items-center w-full">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display block">Speak With SATIC</span>

                <div className="space-y-3 font-body text-sm md:text-base text-brand-text/80 flex flex-col items-center">
                  <div className="flex items-center space-x-2">
                    <Phone size={14} className="text-brand-primary shrink-0" />
                    <span>+91 94093 48046</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={14} className="text-brand-primary shrink-0" />
                    <span>joinsatic@gmail.com</span>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/919409348046?text=Hello%20SATIC%2C%20I%20want%20to%20enquire%20for%20our%20school."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest text-center transition-premium mt-6 block font-display"
              >
                WhatsApp SATIC
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 09 — FREQUENTLY ASKED QUESTIONS */}
      <section id="faq" className="py-20 md:py-28 bg-[#F8F5EC]/20 border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6">

          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display">Frequently Asked Questions</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-brand-secondary">
              Have Questions About SATIC?
            </h2>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm transition-premium"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                >
                  <span className="text-sm md:text-base font-bold text-brand-secondary group-hover:text-brand-primary transition-premium font-display">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-brand-text/60 shrink-0 transform transition-transform duration-300 ${activeFaq === idx ? "rotate-180 text-brand-primary" : ""
                      }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === idx ? "max-h-[300px] border-t border-brand-border/40" : "max-h-0"
                    }`}
                >
                  <div className="p-5 text-sm md:text-base text-brand-text/70 leading-relaxed font-body bg-[#faf9f6]/30">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-20 bg-brand-secondary text-white relative overflow-hidden text-center border-t border-brand-secondary">
        <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-brand-primary opacity-10"></div>
        <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-brand-accent opacity-10"></div>

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black font-display">A Professional Home for Every Teacher.</h2>

          <div className="text-base md:text-lg text-white/80 space-y-1 font-body">
            <p>For teachers who keep learning.</p>
            <p>For teachers who keep practising.</p>
            <p>For teachers who keep growing.</p>
            <p className="font-semibold text-brand-accent mt-2">And for schools that invest in them.</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 font-display text-xs md:text-sm uppercase tracking-wider font-bold">
            <button
              onClick={() => setIsJoinOpen(true)}
              className="bg-brand-primary hover:bg-white hover:text-brand-secondary text-white py-4 px-8 rounded-full shadow-lg transition-premium cursor-pointer"
            >
              Join SATIC · ₹899/year →
            </button>
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="bg-white/10 hover:bg-white hover:text-brand-secondary text-white border border-white/20 py-4 px-8 rounded-full transition-premium cursor-pointer"
            >
              Enquire for Your School →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-secondary text-[#FAF8F2] border-t border-white/10 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 mb-10">

            {/* Logo block */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#F8F5EC] px-3.5 py-2 rounded-lg border border-brand-border inline-block shadow-sm">
                <Image
                  src="/satic-logo.png"
                  alt="SATIC Logo"
                  width={180}
                  height={54}
                  className="w-[140px] md:w-[180px] h-auto object-contain"
                  style={{ height: "auto" }}
                />
              </div>
              <p className="text-sm md:text-base text-white/70 max-w-sm leading-relaxed font-body">
                SATIC — The Teachers' Club
                <br />
                A Professional Home for Every Teacher.
              </p>
              <div className="text-[10px] text-white/50 space-x-2 uppercase font-body font-bold">
                <a href="#benefits" className="hover:text-white">SATIC CPD</a>
                <span>·</span>
                <a href="#practice" className="hover:text-white">10-Minute Practice</a>
                <span>·</span>
                <a href="#teachers-talk" className="hover:text-white">Teachers' Talk</a>
                <span>·</span>
                <a href="#focus-areas" className="hover:text-white">Focus Areas</a>
                <span>·</span>
                <a href="#schools" className="hover:text-white">For Schools</a>
              </div>
            </div>

            {/* Let's Connect links */}
            <div className="lg:col-span-3 space-y-3 font-body">
              <h3 className="text-sm font-bold text-brand-accent uppercase tracking-wider">
                Let's Connect
              </h3>
              <ul className="space-y-3 text-sm md:text-base text-white/80">
                <li>
                  <a href="mailto:joinsatic@gmail.com" className="hover:text-white transition-colors block">
                    joinsatic@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/919409348046" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">
                    +91 94093 48046
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Block */}
            <div className="lg:col-span-4 space-y-4 font-body">
              <h3 className="text-sm font-bold text-brand-accent uppercase tracking-wider">
                Policies & Terms
              </h3>
              <div className="text-xs md:text-sm text-white/80 space-x-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <span>·</span>
                <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              </div>
            </div>

          </div>

          {/* Copyright line */}
          <div className="border-t border-white/10 pt-6 text-center md:text-left font-body">
            <p className="text-[10px] text-white/50">
              © {new Date().getFullYear()} SATIC – The Teachers' Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Join Modal Dialog */}
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />

      {/* School Enquiry Modal Dialog */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />

    </div>
  );
}
