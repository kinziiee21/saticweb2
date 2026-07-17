"use client";

import React, { useState } from "react";
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
  Globe
} from "lucide-react";
import JoinModal from "@/components/JoinModal";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "Why is membership only ₹499?",
      a: "SATIC is a teacher-first organization. We believe that professional development should be accessible to every educator across India. By keeping our operational costs minimal and leveraging community-driven support, we can offer premium resources, expert workshops, and community access for less than ₹1.40 per day."
    },
    {
      q: "Who can join SATIC?",
      a: "SATIC is open to all school teachers, coordinators, educators, and school administrators in India. Whether you teach Primary, Middle, Secondary, or Higher Secondary classes across any board (CBSE, ICSE, State Boards, IB), you are welcome to join."
    },
    {
      q: "What do I get as a member?",
      a: "As a member, you get access to: 1) Daily Practice programs (like AI Teaching Practice), 2) Weekly Teachers' Talk live interactive sessions via Google Meet, 3) Our verified WhatsApp educator communities, 4) A growing library of classroom-tested templates, and 5) Verifiable professional development certificates."
    },
    {
      q: "How do I join?",
      a: "Joining is simple: Click any 'Join SATIC' button, fill out your profile details (personal & professional), review the membership plan, complete the secure online payment of ₹499, and you will immediately receive access to join the respective groups and channels."
    },
    {
      q: "Is there any monthly fee?",
      a: "No, there are no monthly fees or hidden charges. The ₹499 is a one-time annual membership fee that grants you unlimited access to all basic SATIC club programs and sessions for a full year."
    },
    {
      q: "Do I receive certificates?",
      a: "Yes. Educators who actively participate in our structured Daily Practice programs and attend the weekly live sessions will receive verifiable Professional Development certificates issued by SATIC."
    },
    {
      q: "Can I cancel membership?",
      a: "Yes, you can cancel your membership at any time. However, since the annual fee is extremely low (₹499/year), we do not offer partial refunds once the access token is generated and groups are joined."
    },
    {
      q: "How will I receive updates?",
      a: "All club communications, daily templates, meeting links, and announcements are shared directly inside our dedicated WhatsApp batches and community channels. You will get immediate joining links upon successful registration."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-primary/20">
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-[#F8F5EC]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:py-4 lg:px-8">
          <a href="#" className="flex items-center focus:outline-none" aria-label="SATIC Home">
            <Image 
              src="/satic-logo.png" 
              alt="SATIC Logo" 
              width={150} 
              height={45} 
              className="w-[120px] md:w-[150px] h-auto object-contain"
              style={{ height: "auto" }}
              priority
            />
          </a>

          {/* Navigation links */}
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#about" className="text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors focus:outline-none">About</a>
            <a href="#teachers-talk" className="text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors focus:outline-none">Teachers' Talk</a>
            <a href="#daily-practice" className="text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors focus:outline-none">Daily Practice</a>
            <a href="#faq" className="text-sm font-semibold text-brand-text hover:text-brand-primary transition-colors focus:outline-none">FAQ</a>
            
            {/* Join SATIC (Interactive checkout flow) */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-secondary px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-brand-primary transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            >
              Join SATIC Membership
            </button>

            {/* Join Teachers' Talk (direct WhatsApp link as seen on satic.in) */}
            <a 
              href="https://chat.whatsapp.com/CMDPnus3eWS7y2SiHb0dOr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-brand-secondary transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.928 9.928 0 004.93 1.302h.004c5.507 0 9.99-4.478 9.99-9.985a9.945 9.945 0 00-2.927-7.064A9.948 9.948 0 0012.012 2zm5.82 14.28c-.242.678-1.417 1.309-1.961 1.362-.489.049-.961.223-3.11-.62-2.753-1.079-4.506-3.841-4.643-4.02-.137-.18-1.109-1.472-1.109-2.81 0-1.337.705-1.99.957-2.253.253-.263.553-.329.737-.329s.369.004.53.012c.166.008.391-.062.612.47.227.546.78 1.902.848 2.04.068.136.113.294.022.475-.09.18-.135.293-.271.452-.136.16-.285.356-.407.478-.136.136-.279.284-.121.553.158.27.7 1.134 1.502 1.848.802.714 1.475.937 1.777 1.053.301.117.475.099.65-.099.177-.197.757-.88.96-1.18.204-.3.407-.25.684-.148.278.102 1.761.83 2.062.98.301.15.502.227.575.352.073.125.073.722-.169 1.4z"></path>
              </svg>
              Join Teachers' Talk
            </a>
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-brand-primary p-2 text-white hover:bg-brand-secondary focus:outline-none"
              aria-label="Join SATIC"
            >
              <Sparkles size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-8 pb-4 md:pt-12 md:pb-6 lg:pt-16 lg:pb-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* Left Column Content */}
            <div className="w-full lg:w-[46%] flex flex-col justify-center space-y-5">
              <span className="text-xs md:text-sm font-semibold tracking-widest text-brand-primary uppercase block">
                SATIC — THE TEACHERS' CLUB
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-secondary leading-[1.15] font-display">
                The Professional <br />Home for Teachers
              </h1>
              <p className="text-base md:text-lg text-brand-text/90 leading-relaxed font-body">
                A professional community where teachers learn, practice, connect and grow together.
              </p>
              
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-secondary hover:bg-brand-primary text-white font-bold py-3.5 px-7 shadow-lg shadow-brand-secondary/15 transition-premium text-sm cursor-pointer"
                >
                  <span>Join SATIC Today</span>
                  <ArrowRight size={16} />
                </button>
                
                <a 
                  href="https://chat.whatsapp.com/CMDPnus3eWS7y2SiHb0dOr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold py-3.5 px-7 shadow-lg shadow-emerald-500/10 transition-premium text-sm"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.928 9.928 0 004.93 1.302h.004c5.507 0 9.99-4.478 9.99-9.985a9.945 9.945 0 00-2.927-7.064A9.948 9.948 0 0012.012 2zm5.82 14.28c-.242.678-1.417 1.309-1.961 1.362-.489.049-.961.223-3.11-.62-2.753-1.079-4.506-3.841-4.643-4.02-.137-.18-1.109-1.472-1.109-2.81 0-1.337.705-1.99.957-2.253.253-.263.553-.329.737-.329s.369.004.53.012c.166.008.391-.062.612.47.227.546.78 1.902.848 2.04.068.136.113.294.022.475-.09.18-.135.293-.271.452-.136.16-.285.356-.407.478-.136.136-.279.284-.121.553.158.27.7 1.134 1.502 1.848.802.714 1.475.937 1.777 1.053.301.117.475.099.65-.099.177-.197.757-.88.96-1.18.204-.3.407-.25.684-.148.278.102 1.761.83 2.062.98.301.15.502.227.575.352.073.125.073.722-.169 1.4z"></path>
                  </svg>
                  <span>WhatsApp Community</span>
                </a>
              </div>
            </div>

            {/* Right Column Image */}
            <div className="w-full lg:w-[54%]">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-brand-border shadow-sm transition-all duration-300 hover:border-brand-primary/10">
                <Image 
                  src="/hero_teachers.png" 
                  alt="SATIC Teachers Collaborating" 
                  fill
                  className="object-cover object-center"
                  sizes="(max-w-1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 pt-4 pb-10 md:pt-6 md:pb-12 lg:pt-8 lg:pb-16 bg-[#faf9f6]/30">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
            
            {/* Left content block */}
            <div className="w-full lg:w-[60%] flex flex-col justify-center">
              <span className="text-xs md:text-sm font-semibold tracking-widest text-brand-primary uppercase block mb-3">
                ABOUT SATIC
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-secondary max-w-xl leading-tight mb-6 font-display">
                Every profession has a community. <br />Teachers deserve one too.
              </h2>
              
              <div className="space-y-5 font-body">
                <p className="text-lg font-semibold text-brand-secondary leading-relaxed">
                  Teachers shape classrooms, guide students and influence generations. Yet their own professional growth often happens alone.
                </p>
                <p className="text-base text-brand-text/90 leading-relaxed">
                  SATIC is building a professional home exclusively for teachers — a community where educators can step beyond their daily routine to learn, exchange ideas, build practical skills and grow alongside fellow teachers.
                </p>

                {/* Quote block */}
                <div className="bg-brand-primary/[0.04] border-l-4 border-brand-primary rounded-r-2xl p-5 shadow-xs relative overflow-hidden mt-6">
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-brand-accent"></span>
                  <p className="text-sm md:text-base font-semibold text-brand-secondary italic leading-relaxed">
                    &quot;Because when teachers keep growing, classrooms become stronger, students benefit, and education moves forward.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Right side stats cards */}
            <div className="w-full lg:w-[35%] flex flex-col sm:flex-row lg:flex-col gap-5 justify-center self-stretch">
              
              <div className="w-full rounded-2xl border border-brand-border border-t-4 border-t-brand-primary bg-white p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-brand-primary/10">
                <div className="w-14 h-14 rounded-xl bg-brand-primary/10 flex items-center justify-center relative mb-5 text-brand-primary">
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-accent"></span>
                  <Users className="h-8 w-8" />
                </div>
                <div>
                  <span className="text-3xl md:text-4xl font-black text-brand-primary block leading-none mb-1 font-display">1000+</span>
                  <span className="text-xs md:text-sm font-bold text-brand-text/75 font-body">Teachers</span>
                </div>
              </div>

              <div className="w-full rounded-2xl border border-brand-border border-t-4 border-t-brand-primary bg-white p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 hover:border-brand-primary/10">
                <div className="w-14 h-14 rounded-xl bg-brand-primary/10 flex items-center justify-center relative mb-5 text-brand-primary">
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-brand-accent"></span>
                  <School className="h-8 w-8" />
                </div>
                <div>
                  <span className="text-3xl md:text-4xl font-black text-brand-primary block leading-none mb-1 font-display">50+</span>
                  <span className="text-xs md:text-sm font-bold text-brand-text/75 font-body">Schools</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Teachers' Talk Section */}
      <section id="teachers-talk" className="px-4 py-10 md:py-12 lg:py-16 bg-white">
        <div className="mx-auto max-w-7xl bg-[#EDF2FC]/40 border border-brand-primary/10 rounded-3xl p-6 md:p-10 lg:p-12 shadow-sm">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 pb-8 border-b border-brand-border">
            {/* Left Content Column */}
            <div className="w-full lg:w-[53%] flex flex-col justify-center space-y-4">
              <span className="text-xs md:text-sm font-semibold tracking-widest text-brand-primary uppercase block">
                SATIC TEACHERS' TALK
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-secondary leading-tight font-display">
                Your weekly ritual to listen, learn and grow.
              </h2>
              <p className="text-sm md:text-base text-brand-secondary font-semibold leading-relaxed font-body">
                Meaningful weekly conversations focused on the real challenges, responsibilities and professional growth of teachers.
              </p>
              <p className="text-xs md:text-sm text-brand-text/80 leading-relaxed font-body">
                Join from wherever you are. Listen to experienced voices, discover new perspectives and take something meaningful back to your classroom.
              </p>
            </div>

            {/* Right Image Column */}
            <div className="w-full lg:w-[47%]">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-brand-border shadow-sm">
                <Image 
                  src="/teachers_talk.png" 
                  alt="Teacher listening in to an online Teachers' Talk session" 
                  fill
                  className="object-cover"
                  sizes="(max-w-1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>

          {/* Grid Cards (1-4) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { id: "01", title: "Classroom Challenges", desc: "Student discipline, classroom management, student engagement and everyday classroom situations." },
              { id: "02", title: "Parent Communication", desc: "Parent expectations, difficult conversations, feedback and building stronger teacher-parent relationships." },
              { id: "03", title: "Teacher Productivity", desc: "Time management, AI and digital tools, planning, organization and reducing repetitive work." },
              { id: "04", title: "Career Development", desc: "Professional skills, leadership, career opportunities and continuous growth." }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className="rounded-2xl border border-brand-border bg-white p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brand-primary/15 h-full shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-black text-brand-accent font-display">{card.id}</span>
                    <div className="rounded-xl bg-brand-bg p-2 text-brand-secondary">
                      {idx === 0 && <Award size={20} />}
                      {idx === 1 && <MessageSquare size={20} />}
                      {idx === 2 && <Clock size={20} />}
                      {idx === 3 && <BookOpen size={20} />}
                    </div>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-brand-secondary mb-2 font-display">{card.title}</h3>
                  <p className="text-xs md:text-sm text-brand-text/80 leading-relaxed font-body">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Scheduling & Button Action */}
          <div className="mt-10 border-t border-brand-border pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Scheduling block */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold tracking-widest text-brand-primary uppercase">NEXT TEACHERS' TALK</span>
                  <span className="bg-brand-primary/10 text-brand-primary px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-display">
                    WEEKLY SERIES
                  </span>
                </div>
                <span className="text-2xl md:text-3xl font-extrabold text-brand-secondary block font-display">
                  Saturday, 18 July 2026
                </span>
                
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-base font-semibold text-brand-text/90 font-body">4:30 PM</span>
                  <div className="h-4 w-px bg-brand-border hidden sm:block"></div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-bg px-3.5 py-1 text-xs font-semibold text-brand-primary font-body">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                    </span>
                    Online Session
                  </div>
                </div>
              </div>
              <p className="text-xs md:text-sm text-brand-text/70 leading-relaxed font-body">
                Join the Teachers' Talk WhatsApp community to receive the session joining link and updates about upcoming talks.
              </p>
            </div>

            {/* Right CTA Callout box */}
            <div className="lg:col-span-5 bg-brand-secondary rounded-2xl p-6 md:p-8 flex flex-col justify-center text-white shadow-sm space-y-4">
              <h3 className="text-lg font-bold font-display">Join Teachers' Talk on WhatsApp</h3>
              <p className="text-xs md:text-sm text-white/80 leading-relaxed font-body">
                Be part of our Teachers' Talk community for upcoming sessions, talk updates and important announcements.
              </p>
              
              <a 
                href="https://chat.whatsapp.com/CMDPnus3eWS7y2SiHb0dOr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#1ebd59] transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 w-full font-display"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.928 9.928 0 004.93 1.302h.004c5.507 0 9.99-4.478 9.99-9.985a9.945 9.945 0 00-2.927-7.064A9.948 9.948 0 0012.012 2zm5.82 14.28c-.242.678-1.417 1.309-1.961 1.362-.489.049-.961.223-3.11-.62-2.753-1.079-4.506-3.841-4.643-4.02-.137-.18-1.109-1.472-1.109-2.81 0-1.337.705-1.99.957-2.253.253-.263.553-.329.737-.329s.369.004.53.012c.166.008.391-.062.612.47.227.546.78 1.902.848 2.04.068.136.113.294.022.475-.09.18-.135.293-.271.452-.136.16-.285.356-.407.478-.136.136-.279.284-.121.553.158.27.7 1.134 1.502 1.848.802.714 1.475.937 1.777 1.053.301.117.475.099.65-.099.177-.197.757-.88.96-1.18.204-.3.407-.25.684-.148.278.102 1.761.83 2.062.98.301.15.502.227.575.352.073.125.073.722-.169 1.4z"></path>
                </svg>
                Join Now on WhatsApp
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Daily Practice Section */}
      <section id="daily-practice" className="px-4 py-8 md:py-12 bg-white">
        <div className="mx-auto max-w-7xl bg-[#EDF2FC]/20 border border-brand-border border-t-4 border-t-brand-primary rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Content */}
            <div className="w-full lg:w-[50%] space-y-3">
              <span className="text-xs md:text-sm font-semibold tracking-widest text-brand-primary uppercase block">
                DAILY PRACTICE
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-secondary font-display">
                Learn by Doing.
              </h2>
              <p className="text-sm md:text-base text-brand-text/90 leading-relaxed max-w-lg font-body">
                Structured practice programs designed to help teachers develop practical, relevant skills through consistent learning.
              </p>
            </div>

            {/* Right side focus/batch cards */}
            <div className="w-full lg:w-[45%] flex flex-col gap-4">
              
              <div className="rounded-xl border border-brand-border bg-white p-5 flex items-start gap-4 shadow-sm transition-all duration-300 hover:border-brand-primary/10">
                <div className="rounded-xl bg-brand-bg p-2.5 text-brand-primary shrink-0">
                  <BookOpen size={20} />
                </div>
                <div className="font-body">
                  <span className="text-[10px] font-extrabold tracking-wider text-brand-primary uppercase block mb-0.5">Current Focus</span>
                  <h4 className="text-lg font-bold text-brand-secondary font-display">AI Teaching Practice</h4>
                </div>
              </div>

              <div className="rounded-xl border border-brand-border bg-white p-5 flex items-start gap-4 shadow-sm transition-all duration-300 hover:border-brand-primary/10">
                <div className="rounded-xl bg-brand-bg p-2.5 text-brand-primary shrink-0">
                  <Clock size={20} />
                </div>
                <div className="font-body">
                  <span className="text-[10px] font-extrabold tracking-wider text-brand-primary uppercase block mb-0.5">NEXT BATCH</span>
                  <h4 className="text-lg font-bold text-brand-secondary font-display">
                    New batch starts on <span className="text-brand-primary font-extrabold">3 August 2026</span>
                  </h4>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Membership Early Access & Pricing Section (PRD and visual merge!) */}
      <section className="px-6 py-8 md:py-12 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-brand-secondary p-8 md:p-10 shadow-sm relative overflow-hidden text-white flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Visual background layers */}
            <div className="absolute -top-12 -left-12 h-32 w-32 rounded-full bg-brand-primary opacity-10"></div>
            <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-brand-accent opacity-10"></div>

            {/* Left Content Column */}
            <div className="relative z-10 max-w-xl text-left space-y-3">
              <span className="text-xs font-bold tracking-widest text-brand-accent uppercase block font-display">
                AVAILABLE NOW
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3 font-display">
                SATIC Membership
              </h2>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-light font-body">
                We are building the professional home for teachers. Get early access now, participate in active learning cohorts, and receive certified professional feedback.
              </p>
            </div>

            {/* Right Checkout Callout Widget */}
            <div className="relative z-10 bg-white text-brand-secondary p-6 rounded-2xl w-full lg:w-96 shadow-xl flex flex-col justify-between space-y-4">
              <div>
                <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full font-display">
                  ANNUAL PRE-RELEASE
                </span>
                <div className="flex items-baseline space-x-1.5 mt-3">
                  <span className="text-3xl font-black text-brand-secondary font-display">₹499</span>
                  <span className="text-brand-text/60 text-xs font-body">/ year</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold font-body block mt-0.5">Less than ₹1.40 per day</span>
              </div>

              <div className="border-t border-brand-border pt-4 space-y-2.5 text-xs font-body text-brand-text/90">
                <div className="flex items-center space-x-2">
                  <Check size={14} className="text-brand-primary shrink-0" />
                  <span>Interactive AI Teaching Practice Cohort</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check size={14} className="text-brand-primary shrink-0" />
                  <span>Weekly Google Meet Webinars</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check size={14} className="text-brand-primary shrink-0" />
                  <span>Verifiable Pedagogy Certificates</span>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-brand-primary hover:bg-brand-secondary text-white py-3 rounded-xl font-bold text-xs tracking-wider transition-premium cursor-pointer font-display shadow-md shadow-brand-primary/10"
              >
                Join SATIC Today
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section id="faq" className="py-20 md:py-28 bg-[#F8F5EC]/20 border-t border-brand-border">
        <div className="max-w-3xl mx-auto px-6">
          
          <div className="text-center mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary font-display">Support</span>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display text-brand-secondary">
              Frequently Asked Questions
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
                    className={`text-brand-text/60 shrink-0 transform transition-transform duration-300 ${
                      activeFaq === idx ? "rotate-180 text-brand-primary" : ""
                    }`} 
                  />
                </button>

                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    activeFaq === idx ? "max-h-[300px] border-t border-brand-border/40" : "max-h-0"
                  }`}
                >
                  <div className="p-5 text-xs md:text-sm text-brand-text/70 leading-relaxed font-body bg-[#faf9f6]/30">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-secondary text-[#FAF8F2] border-t border-brand-secondary px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 mb-10">
            
            {/* Logo block */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#F8F5EC] px-3.5 py-2 rounded-lg border border-brand-border inline-block shadow-sm">
                <Image 
                  src="/satic-logo.png" 
                  alt="SATIC Logo" 
                  width={200} 
                  height={60} 
                  className="w-[160px] md:w-[200px] h-auto object-contain"
                  style={{ height: "auto" }}
                />
              </div>
              <p className="text-xs md:text-sm text-white/70 max-w-sm leading-relaxed font-body">
                A premium, professional club for educators dedicated to practice, learning, and mutual connection.
              </p>
            </div>

            {/* Let's Connect links */}
            <div className="lg:col-span-3 space-y-3 font-body">
              <h3 className="text-sm font-bold text-brand-accent uppercase tracking-wider">
                Let's Connect
              </h3>
              <ul className="space-y-3 text-xs md:text-sm text-white/80">
                <li>
                  <a href="mailto:joinsatic@gmail.com" className="hover:text-white transition-colors block">
                    joinsatic@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/919409348046" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors block">
                    +91 9409348046
                  </a>
                </li>
              </ul>
            </div>

            {/* WhatsApp Updates Card */}
            <div className="lg:col-span-4 space-y-4 font-body">
              <h3 className="text-sm font-bold text-brand-accent uppercase tracking-wider">
                Follow Updates
              </h3>
              <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                Join our WhatsApp community for talks, practice sessions and important updates.
              </p>
              
              <a 
                href="https://chat.whatsapp.com/CMDPnus3eWS7y2SiHb0dOr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 rounded-full bg-brand-primary hover:bg-brand-primary/90 px-5 py-2.5 text-xs md:text-sm font-bold text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.928 9.928 0 004.93 1.302h.004c5.507 0 9.99-4.478 9.99-9.985a9.945 9.945 0 00-2.927-7.064A9.948 9.948 0 0012.012 2zm5.82 14.28c-.242.678-1.417 1.309-1.961 1.362-.489.049-.961.223-3.11-.62-2.753-1.079-4.506-3.841-4.643-4.02-.137-.18-1.109-1.472-1.109-2.81 0-1.337.705-1.99.957-2.253.253-.263.553-.329.737-.329s.369.004.53.012c.166.008.391-.062.612.47.227.546.78 1.902.848 2.04.068.136.113.294.022.475-.09.18-.135.293-.271.452-.136.16-.285.356-.407.478-.136.136-.279.284-.121.553.158.27.7 1.134 1.502 1.848.802.714 1.475.937 1.777 1.053.301.117.475.099.65-.099.177-.197.757-.88.96-1.18.204-.3.407-.25.684-.148.278.102 1.761.83 2.062.98.301.15.502.227.575.352.073.125.073.722-.169 1.4z"></path>
                </svg>
                Join WhatsApp Community
              </a>
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

      {/* Registration & Simulated Razorpay Payment Modal */}
      <JoinModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
