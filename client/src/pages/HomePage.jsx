"use client";

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, useInView } from "framer-motion";
import {
  FiCpu, FiZap, FiLayers, FiArrowRight, FiHash,
  FiEye, FiCode, FiTrendingUp,
  FiCheckCircle, FiStar, FiPlay,
  FiTerminal, FiAward, FiMessageSquare,
} from "react-icons/fi";

/* ─── Animation Variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

/* ─── Animated Counter ──────────────────────────────────── */
const AnimatedCounter = ({ target, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-bold text-4xl gradient-text">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

/* ─── Feature Card ─────────────────────────────────────── */
const FeatureCard = ({ icon: Icon, title, description, color = "emerald" }) => {
  const colorMap = {
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: "text-emerald-400", glow: "group-hover:shadow-emerald-500/20" },
    teal:    { bg: "bg-teal-500/10",    border: "border-teal-500/20",    icon: "text-teal-400",    glow: "group-hover:shadow-teal-500/20" },
    cyan:    { bg: "bg-cyan-500/10",    border: "border-cyan-500/20",    icon: "text-cyan-400",    glow: "group-hover:shadow-cyan-500/20" },
  };
  const c = colorMap[color];
  return (
    <motion.div
      className={`group glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${c.glow} cursor-default`}
      variants={fadeUp}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${color}-500 to-${color}-600 shadow-lg shadow-${color}-500/25 flex items-center justify-center text-white mb-5 relative z-10 mx-auto`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-2 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
  );
};

/* ─── Step Card ─────────────────────────────────────────── */
const StepCard = ({ number, icon: Icon, title, description }) => (
  <motion.div className="relative flex flex-col items-center text-center group" variants={fadeUp}>
    <div className="relative">
      <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-white/40 group-hover:shadow-lg group-hover:shadow-white/10">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold text-black shadow-lg shadow-white/40">
        {number}
      </div>
    </div>
    <h3 className="text-base font-semibold text-slate-100 mb-2">{title}</h3>
    <p className="text-sm text-slate-400 leading-relaxed max-w-[200px]">{description}</p>
  </motion.div>
);

/* ─── Topic Pill ─────────────────────────────────────────── */
const TopicPill = ({ topic }) => (
  <motion.div className="group w-full h-24 cursor-pointer" style={{ perspective: '1000px' }} variants={fadeUp}>
    <div
      className="relative w-full h-full transition-transform duration-700 ease-in-out"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'rotateY(180deg)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'rotateY(0deg)'}
    >
      <div className="absolute inset-0 glass-card rounded-xl flex flex-col items-center justify-center p-3 text-center" style={{ backfaceVisibility: 'hidden' }}>
        <FiHash className="w-4 h-4 text-slate-400 mb-1.5 opacity-60" />
        <h3 className="text-sm font-medium text-slate-200 leading-tight line-clamp-2">{topic}</h3>
      </div>
      <div className="absolute inset-0 rounded-xl bg-white/10 border border-white/20 flex flex-col items-center justify-center p-3 text-center shadow-lg"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
        <span className="text-xs font-semibold text-white mb-1">View Problems</span>
        <FiArrowRight className="w-5 h-5 text-white" />
      </div>
    </div>
  </motion.div>
);

/* ─── Testimonial Card ──────────────────────────────────── */
const TestimonialCard = ({ name, role, quote, initials, color }) => (
  <motion.div className="glass-card p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1" variants={fadeUp}>
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FiStar key={i} className="w-4 h-4 text-amber-400" style={{ fill: '#fbbf24' }} />
      ))}
    </div>
    <p className="text-sm text-slate-300 leading-relaxed italic">"{quote}"</p>
    <div className="flex items-center gap-3 mt-auto">
      <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-sm font-bold text-white flex-shrink-0`}>
        {initials}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-100">{name}</p>
        <p className="text-xs text-slate-500">{role}</p>
      </div>
    </div>
  </motion.div>
);

/* ─── Fan Hero Cards (BackDrop-style) ───────────────────── */
const FanHeroCards = () => {
  // Card layout config: [rotate, width, height, zIndex]
  // BackDrop-style tight fan — gentle rotations, overlapping cards, center tallest
  const cardLayout = [
    { rotate: -15, width: 200, height: 320, z: 2, x: -350 },  // far left
    { rotate: -5, width: 230, height: 370, z: 5, x: -200 },  // inner left
    { rotate: 0, width: 280, height: 420, z: 9, x: 0 },    // center (hero)
    { rotate: 5, width: 230, height: 370, z: 5, x: 200 },   // inner right
    { rotate: 15, width: 200, height: 320, z: 2, x: 350 },   // far right
  ];

  const cards = [
    {
      id: "topics",
      bg: "linear-gradient(150deg, #1e1b4b 0%, #0f172a 100%)",
      borderColor: "rgba(16,185,129,0.2)",
      content: (
        <div className="h-full flex flex-col p-4 gap-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <FiHash className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <span className="text-[10px] font-semibold text-slate-200 uppercase tracking-widest">Topics</span>
          </div>
          {["Arrays", "Trees", "Graphs", "DP"].map((t, i) => (
            <div key={t} className="flex items-center gap-2 px-2.5 py-2 rounded-lg border border-white/5 bg-white/[0.02]">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span className="text-xs font-medium text-slate-300">{t}</span>
              <span className="ml-auto text-[10px] text-slate-500 font-mono">{[42, 28, 35, 51][i]}</span>
            </div>
          ))}
          <div className="mt-auto text-center pt-1.5 border-t border-white/5">
            <span className="text-[10px] text-slate-500 font-medium">+ 8 more</span>
          </div>
        </div>
      ),
    },
    {
      id: "ai",
      bg: "linear-gradient(150deg, #2e1065 0%, #0f172a 100%)",
      borderColor: "rgba(5,150,105,0.3)",
      content: (
        <div className="h-full flex flex-col p-4 gap-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
              <FiMessageSquare className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] font-semibold text-white uppercase tracking-widest">AI Feedback</span>
          </div>
          <div className="flex flex-col gap-2.5 flex-1">
            <div className="px-3 py-2.5 rounded-2xl rounded-tl-sm text-xs text-slate-300 leading-relaxed border border-white/5 bg-white/[0.03]">
              How do I avoid O(n²) for Two Sum?
            </div>
            <div className="px-3 py-2.5 rounded-2xl rounded-tr-sm text-xs text-slate-100 leading-relaxed border border-white/20 bg-white/10 shadow-lg shadow-black/20">
              ✨ Use a hash map — look up <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded text-[10px]">target-num</code> in O(1).
            </div>
            <div className="flex items-center gap-2 mt-auto px-2.5 py-2 rounded-lg border border-white/10 bg-black/40">
              <span className="text-[10px] text-slate-500 flex-1">Ask AI anything...</span>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <FiArrowRight className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "code",
      bg: "linear-gradient(160deg, #0f172a 0%, #020617 100%)",
      borderColor: "rgba(34,211,238,0.4)",
      glow: true,
      content: (
        <div className="h-full flex flex-col relative z-20">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.02] flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span className="w-2 h-2 rounded-full bg-slate-600" />
            <span className="text-xs font-medium text-slate-400 ml-2">two_sum.py</span>
            <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 text-white bg-white/5 tracking-wide">EASY</span>
          </div>
          <div className="flex-1 p-4 font-mono text-xs leading-[1.7] overflow-hidden text-slate-300">
            <div><span className="text-slate-500"># O(n) Time Complexity</span></div>
            <div className="mt-1.5">
              <span className="text-white font-semibold">def </span>
              <span className="text-slate-200">two_sum</span>
              <span>(nums, target):</span>
            </div>
            <div className="ml-3"><span>lookup </span><span className="text-slate-500">= </span><span>{"{}"}</span></div>
            <div className="ml-3">
              <span className="text-white font-semibold">for </span>
              <span>i, num </span>
              <span className="text-white font-semibold">in </span>
              <span className="text-slate-200">enumerate</span>
              <span>(nums):</span>
            </div>
            <div className="ml-6"><span className="text-slate-500">comp </span><span>= target </span><span className="text-slate-500">- </span><span>num</span></div>
            <div className="ml-6">
              <span className="text-white font-semibold">if </span>
              <span>comp </span>
              <span className="text-white font-semibold">in </span>
              <span>lookup:</span>
            </div>
            <div className="ml-9">
              <span className="text-white font-semibold">return </span>
              <span>[lookup[comp], i]</span>
            </div>
            <div className="ml-6"><span>lookup[num] </span><span className="text-slate-500">= </span><span>i</span></div>
          </div>
          <div className="flex items-center justify-between px-4 py-2.5 flex-shrink-0 border-t border-white/10 bg-white/5">
            <span className="text-[11px] font-semibold text-white flex items-center gap-1.5"><FiCheckCircle className="w-3.5 h-3.5" /> Tests Passing</span>
            <span className="text-[10px] text-slate-400 font-mono">14ms</span>
          </div>
        </div>
      ),
    },
    {
      id: "stats",
      bg: "linear-gradient(150deg, #064e3b 0%, #0f172a 100%)",
      borderColor: "rgba(16,185,129,0.3)",
      content: (
        <div className="h-full flex flex-col p-4 gap-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
              <FiTrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[10px] font-semibold text-white uppercase tracking-widest">Progress</span>
          </div>
          {/* Mini bar chart */}
          <div className="flex items-end gap-1 h-16 px-1">
            {[40, 65, 45, 80, 60, 95, 75].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${h}%`, background: i === 5 ? '#ffffff' : 'rgba(255,255,255,0.2)', boxShadow: i === 5 ? '0 0 10px rgba(255,255,255,0.5)' : 'none' }} />
            ))}
          </div>
          <div className="flex justify-between text-[9px] font-medium text-slate-500 px-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(d => <span key={d}>{d}</span>)}
          </div>
          <div className="mt-auto grid grid-cols-2 gap-2">
            <div className="text-center px-2 py-1.5 rounded-lg border border-white/10 bg-white/[0.03]">
              <div className="text-lg font-bold text-white">47</div>
              <div className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">Solved</div>
            </div>
            <div className="text-center px-2 py-1.5 rounded-lg border border-white/10 bg-white/[0.03]">
              <div className="text-lg font-bold text-white">7</div>
              <div className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">Streak</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "award",
      bg: "linear-gradient(150deg, #4c1d95 0%, #0f172a 100%)",
      borderColor: "rgba(167,139,250,0.3)",
      content: (
        <div className="h-full flex flex-col p-4 gap-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <FiAward className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <span className="text-[10px] font-semibold text-slate-200 uppercase tracking-widest">Milestones</span>
          </div>
          {[
            { icon: FiCode, label: "First Solve", sub: "Completed", done: true },
            { icon: FiZap, label: "Speed Coder", sub: "Under 5 min", done: true },
            { icon: FiLayers, label: "DP Master", sub: "15/20 done", done: false },
            { icon: FiTrendingUp, label: "7-Day Streak", sub: "Keep going", done: true },
          ].map(({ icon: Icon, label, sub, done }) => (
            <div key={label} className="flex items-center gap-2 px-2.5 py-2 rounded-lg border" style={{ background: done ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.01)', borderColor: done ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)' }}>
              <Icon className={`w-3.5 h-3.5 ${done ? 'text-white' : 'text-slate-600'}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-[10px] font-semibold ${done ? 'text-white' : 'text-slate-500'}`}>{label}</p>
                <p className="text-[9px] font-medium text-slate-500">{sub}</p>
              </div>
              {done && <FiCheckCircle className="w-3 h-3 text-slate-400" />}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full flex items-end justify-center" style={{ height: '480px', perspective: '1200px' }}>
      {cards.map((card, i) => {
        const layout = cardLayout[i];
        return (
          <motion.div
            key={card.id}
            className="absolute rounded-[20px] overflow-hidden flex-shrink-0"
            style={{
              width: `${layout.width}px`,
              height: `${layout.height}px`,
              bottom: '0px',
              background: card.bg,
              border: `1px solid ${card.borderColor}`,
              transformOrigin: 'center bottom',
              // Removed transform from here, let Framer Motion handle it via x/y/rotate
              zIndex: layout.z,
              boxShadow: card.glow
                ? '0 0 60px rgba(255,255,255,0.15), 0 30px 80px rgba(0,0,0,0.8)'
                : '0 20px 60px rgba(0,0,0,0.7)',
            }}
            // Added x here
            initial={{ opacity: 0, y: 100, x: layout.x, rotate: layout.rotate }}
            animate={{ opacity: 1, y: 0, x: layout.x, rotate: layout.rotate }}
            transition={{
              duration: 0.9,
              delay: 0.2 + Math.abs(i - 2) * 0.1,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            whileHover={{
              y: -20,
              x: layout.x, // Keep the x position on hover so it doesn't snap to center
              zIndex: 20,
              scale: 1.04,
              boxShadow: card.glow
                ? '0 0 80px rgba(255,255,255,0.25), 0 40px 100px rgba(0,0,0,0.9)'
                : '0 30px 80px rgba(0,0,0,0.8)',
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          >
            {card.content}
          </motion.div>
        );
      })}

      {/* Reflection / floor glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-24 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)', filter: 'blur(25px)' }} />
    </div>
  );
};

/* ─── Main HomePage ──────────────────────────────────────── */
const HomePage = () => {
  const { user } = useAuth();

  const stats = [
    { value: 1500, suffix: "+", label: "Developers Practicing" },
    { value: 300, suffix: "+", label: "Curated Problems" },
    { value: 12, suffix: "", label: "Topic Areas" },
    { value: 98, suffix: "%", label: "Interview Success Rate" },
  ];

  const features = [
    { icon: FiLayers, title: "Curated Problem Set", color: "emerald", description: "Hundreds of problems spanning core data structures, algorithms, and common interview patterns — all handpicked by engineers." },
    { icon: FiCpu, title: "AI-Powered Hints", color: "teal", description: "Stuck? Our AI assistant analyzes your code and provides contextual hints, step-by-step without spoiling the answer." },
    { icon: FiEye, title: "Algorithm Visualizations", color: "cyan", description: "See algorithms come to life with interactive step-by-step visualizations. Understand deeply, not just memorize." },
    { icon: FiTrendingUp, title: "Progress Tracking", color: "emerald", description: "Track performance across topics, spot weak areas, and see your skills grow over time with detailed stats." },
  ];

  const steps = [
    { number: 1, icon: FiCode, title: "Pick a Problem", description: "Browse 300+ problems by difficulty, topic, or company tag" },
    { number: 2, icon: FiTerminal, title: "Write Your Solution", description: "Code in our full-featured browser IDE with live feedback" },
    { number: 3, icon: FiCheckCircle, title: "Get AI Feedback", description: "Instantly get hints, explanations, and optimization tips" },
  ];

  const topics = [
    "Arrays", "Hashing", "Two Pointers", "Sliding Window",
    "Linked Lists", "Trees", "Graphs", "Dynamic Programming",
  ];

  const testimonials = [
    {
      name: "Rahul Mehta", role: "SWE @ Google", initials: "RM",
      color: "bg-gradient-to-br from-emerald-500 to-teal-600",
      quote: "CodePulse's AI hints guide you without giving it all away. Landed my Google offer after 3 months of daily practice here.",
    },
    {
      name: "Aisha Johnson", role: "Backend Engineer @ Stripe", initials: "AJ",
      color: "bg-gradient-to-br from-cyan-500 to-emerald-500",
      quote: "The algorithm visualizations finally made dynamic programming click for me. No other platform explained it this well.",
    },
    {
      name: "Carlos Rivera", role: "CS Student, MIT", initials: "CR",
      color: "bg-gradient-to-br from-teal-600 to-emerald-500",
      quote: "I've tried LeetCode, HackerRank, and others — CodePulse's clean UI and AI assistant made practice feel less overwhelming.",
    },
  ];

  return (
    <div className="bg-[#050816] text-slate-200 min-h-screen overflow-hidden">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center mesh-bg" style={{ minHeight: '100vh' }}>

        {/* Ambient orbs */}
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full animate-float-1" style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)', top: '-15%', left: '-15%', opacity: 0.8 }} />
          <div className="absolute rounded-full animate-float-2" style={{ width: 550, height: 550, background: 'radial-gradient(circle, rgba(5,150,105,0.14) 0%, transparent 70%)', top: '20%', right: '-12%', opacity: 0.7 }} />
          <div className="absolute rounded-full animate-float-3" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)', bottom: '0%', left: '25%', opacity: 0.6 }} />
          {/* Grid overlay */}
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)', backgroundSize: '64px 64px', opacity: 1 }} />
        </div>

        {/* ── Hero text (centered, top) */}
        <motion.div
          className="w-full max-w-3xl mx-auto px-6 pt-16 pb-4 flex flex-col items-center text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex items-center gap-2 mb-5">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-dot-pulse" />
              <span className="text-xs font-medium text-emerald-300">Trusted by 1,500+ developers</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.06] tracking-tight mb-4"
            variants={fadeUp}
          >
            <span className="text-white">Master Algorithms,</span>
            <br />
            <span className="gradient-text">Ace Every Interview.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-base md:text-lg text-slate-400 mb-6 max-w-xl leading-relaxed"
            variants={fadeUp}
          >
            Sharpen your skills with curated problems,{" "}
            <span className="text-slate-200 font-medium">AI-powered hints</span>, and
            visual algorithm breakdowns. Land your dream tech role.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-5"
            variants={fadeUp}
          >
            <Link
              to="/problems"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:scale-[1.04]"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 24px rgba(16,185,129,0.4)' }}
            >
              Start Practicing Now <FiArrowRight className="w-4 h-4" />
            </Link>
            {!user && (
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-slate-300 transition-all duration-300 hover:scale-[1.04] hover:text-white"
                style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
              >
                Sign Up Free
              </Link>
            )}
          </motion.div>

          {/* Social proof row */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["RM", "AJ", "CR", "SK", "LT"].map((initials, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-[#050816] flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: `hsl(${240 + i * 30}, 75%, 52%)` }}>
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-xs text-slate-500">
              <span className="text-slate-300 font-medium">1,500+</span> developers already practicing
            </span>
          </motion.div>
        </motion.div>

        {/* ── Fan Cards */}
        <motion.div
          className="w-full max-w-5xl mx-auto px-4 mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <FanHeroCards />
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #050816 0%, transparent 100%)' }} />
      </section>

      {/* ── Stats Bar ─────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(13,17,23,0.6)' }}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <p className="text-xs text-slate-500 mt-1.5 font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section id="features-section" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <motion.div className="text-center mb-16" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            <motion.p variants={fadeUp} className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">Features</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="gradient-text">CodePulse?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-2xl mx-auto">
              Everything you need to prepare effectively and land your dream tech role.
            </motion.p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            {features.map((f) => <FeatureCard key={f.title} {...f} />)}
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6"><div className="divider-gradient" /></div>

      {/* ── How It Works ──────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <motion.div className="text-center mb-16" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            <motion.p variants={fadeUp} className="text-sm font-semibold text-teal-400 uppercase tracking-widest mb-3">How It Works</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your path to <span className="gradient-text">mastery</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-xl mx-auto">
              Three simple steps — go from unsure to unstoppable.
            </motion.p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px"
              style={{ background: 'linear-gradient(to right, rgba(16,185,129,0.4), rgba(5,150,105,0.2), rgba(16,185,129,0.4))' }} />
            {steps.map((step) => <StepCard key={step.number} {...step} />)}
          </motion.div>
          <motion.div className="text-center mt-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Link
              to="/problems"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:scale-[1.03] group"
              style={{ border: '1px solid rgba(16,185,129,0.3)' }}
            >
              <FiPlay className="w-4 h-4 text-emerald-400 group-hover:scale-125 transition-transform" />
              See It In Action
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Topics ────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#0a0f1e' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          <motion.div className="text-center mb-14" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            <motion.p variants={fadeUp} className="text-sm font-semibold text-cyan-400 uppercase tracking-widest mb-3">Topics</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
              Popular <span className="gradient-text">Topics</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400">Master these essential coding concepts.</motion.p>
          </motion.div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            {topics.map((topic) => (
              <Link key={topic} to={`/topics/${topic.toLowerCase().replace(/\s+/g, "-")}`} aria-label={`View ${topic} problems`}>
                <TopicPill topic={topic} />
              </Link>
            ))}
          </motion.div>
          <motion.div className="text-center mt-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Link
              to="/topics"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all duration-300 hover:scale-[1.04]"
              style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 24px rgba(16,185,129,0.35)' }}
            >
              Explore All Topics <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
          <motion.div className="text-center mb-14" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            <motion.p variants={fadeUp} className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-3">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-4">
              Developers who <span className="gradient-text">made it</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-400 max-w-xl mx-auto">
              Real stories from engineers who landed their dream roles with CodePulse.
            </motion.p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
            {testimonials.map((t) => <TestimonialCard key={t.name} {...t} />)}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.18) 0%, rgba(5,150,105,0.13) 50%, rgba(16,185,129,0.08) 100%)' }} />
        <div className="absolute inset-0 -z-10" style={{ borderTop: '1px solid rgba(16,185,129,0.1)', borderBottom: '1px solid rgba(16,185,129,0.1)' }} />
        <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full animate-float-1" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(16,185,129,0.6) 0%, transparent 70%)', top: '-20%', right: '-10%', opacity: 0.2 }} />
          <div className="absolute rounded-full animate-float-2" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(5,150,105,0.6) 0%, transparent 70%)', bottom: '-20%', left: '-5%', opacity: 0.15 }} />
        </div>
        <motion.div className="max-w-3xl mx-auto px-6 text-center" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>
          <motion.p variants={fadeUp} className="text-sm font-semibold text-emerald-300 uppercase tracking-widest mb-4">Ready to Level Up?</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
            Ready to Land Your <span className="gradient-text">Dream Role?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
            Join thousands of developers sharpening their skills daily and acing their technical interviews.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!user ? (
              <>
                <Link to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-300 hover:scale-[1.05]"
                  style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 8px 32px rgba(16,185,129,0.35)' }}
                >
                  Get Started Free <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/problems"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-slate-200 transition-all duration-300 hover:scale-[1.03]"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)' }}
                >
                  Browse Problems
                </Link>
              </>
            ) : (
              <Link to="/problems"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold text-white transition-all duration-300 hover:scale-[1.05]"
                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 8px 32px rgba(16,185,129,0.35)' }}
              >
                Continue Practicing <FiArrowRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default HomePage;
