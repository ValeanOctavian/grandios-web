"use client";

import { motion } from "framer-motion";
import { translations } from "../../../lib/translations";
import type { Locale } from "../../../middleware";

interface AboutProps {
  lang: Locale;
  t: typeof translations.en;
}

// Inline SVG Icons
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MonitorSmartphoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 7.5H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6" />
    <path d="M5 18h5" />
    <rect x="14" y="3" width="8" height="18" rx="1" />
    <path d="M18 18v.01" />
    <path d="M14 7.5h8" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const BarChart3Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M7 16v-3" />
    <path d="M12 16v-7" />
    <path d="M17 16v-5" />
  </svg>
);

const MessageCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ClipboardListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4" />
    <path d="M12 16h4" />
    <path d="M8 11h.01" />
    <path d="M8 16h.01" />
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const RocketIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a6 6 0 0 1 6-6h3v3a6 6 0 0 1-6 6z" />
    <path d="M9 18l-3 3" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
    },
  },
};

export default function About({ lang, t }: AboutProps) {
  const about = t.about;
  const steps = about.howWeWork.steps;

  const stepIcons = [MessageCircleIcon, ClipboardListIcon, CodeIcon, RocketIcon];

  return (
    <section
      id="aboutUs"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #050B18 0%, #07111F 30%, #0B1F2A 60%, #07111F 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.08]"
          style={{
            background: "radial-gradient(circle, #2563EB 0%, transparent 70%)",
          }}
        />
        <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.06]"
          style={{
            background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] mb-6"
            style={{
              color: "#94A3B8",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            {about.badge}
          </motion.span>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            style={{ color: "#F8FAFC" }}
          >
            {about.title}
          </h2>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#94A3B8" }}
          >
            {about.subtitle}
          </p>
        </motion.div>

        {/* Cards Grid - 2x2 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 mb-16 sm:mb-20"
        >
          {/* Card 1: Who We Are */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 cursor-default hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "0 0 30px rgba(59,130,246,0.15), 0 0 60px rgba(124,58,237,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "none";
            }}
          >
            {/* Gradient border glow on hover */}
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.1))",
                margin: "-1px",
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                border: "1px solid rgba(59,130,246,0.3)",
              }}
            />

            <div className="relative z-10">
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))",
                  color: "#3B82F6",
                }}
              >
                <UsersIcon />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: "#F8FAFC" }}>
                {about.cards.whoWeAre.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: "#94A3B8" }}>
                {about.cards.whoWeAre.text}
              </p>
            </div>
          </motion.div>

          {/* Card 2: What We Offer */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 cursor-default hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "0 0 30px rgba(59,130,246,0.15), 0 0 60px rgba(124,58,237,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "none";
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.1))",
                margin: "-1px",
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                border: "1px solid rgba(59,130,246,0.3)",
              }}
            />
            <div className="relative z-10">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))",
                  color: "#3B82F6",
                }}
              >
                <MonitorSmartphoneIcon />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: "#F8FAFC" }}>
                {about.cards.whatWeOffer.title}
              </h3>
              <ul className="space-y-3">
                {about.cards.whatWeOffer.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base" style={{ color: "#94A3B8" }}>
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))",
                        color: "#3B82F6",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 3: Why Choose Us */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 cursor-default hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "0 0 30px rgba(59,130,246,0.15), 0 0 60px rgba(124,58,237,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "none";
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.1))",
                margin: "-1px",
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                border: "1px solid rgba(59,130,246,0.3)",
              }}
            />
            <div className="relative z-10">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))",
                  color: "#3B82F6",
                }}
              >
                <ShieldCheckIcon />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: "#F8FAFC" }}>
                {about.cards.whyChooseUs.title}
              </h3>
              <ul className="space-y-3">
                {about.cards.whyChooseUs.items.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-sm sm:text-base" style={{ color: "#94A3B8" }}>
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                      style={{
                        background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))",
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 4: aboutUs Behind the Company */}
          <motion.div
            variants={itemVariants}
            className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-500 cursor-default hover:-translate-y-1"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "0 0 30px rgba(59,130,246,0.15), 0 0 60px rgba(124,58,237,0.1)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "none";
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(124,58,237,0.1))",
                margin: "-1px",
              }}
            />
            <div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                border: "1px solid rgba(59,130,246,0.3)",
              }}
            />
            <div className="relative z-10">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))",
                  color: "#3B82F6",
                }}
              >
                <BarChart3Icon />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: "#F8FAFC" }}>
                {about.cards.aboutUs.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed mb-5" style={{ color: "#94A3B8" }}>
                {about.cards.aboutUs.text}
              </p>

              {/* Badge highlight */}
              <div
                className="inline-flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(124,58,237,0.12))",
                  border: "1px solid rgba(59,130,246,0.2)",
                }}
              >
                <span
                  className="text-2xl sm:text-3xl font-bold whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {about.cards.aboutUs.badge}
                </span>
                <span className="text-xs sm:text-sm leading-snug" style={{ color: "#94A3B8" }}>
                  {about.cards.aboutUs.badgeText}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* How We Work - Full width section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="relative p-8 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Subtle background glow */}
            <div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-[0.06] pointer-events-none"
              style={{
                background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-10 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#F8FAFC" }}>
                  {about.howWeWork.title}
                </h3>
                <p className="text-base sm:text-lg" style={{ color: "#94A3B8" }}>
                  {about.howWeWork.subtitle}
                </p>
              </div>

              {/* Steps - Horizontal on desktop, vertical on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {steps.map((step: { title: string; text: string }, i: number) => {
                  const StepIcon = stepIcons[i];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="relative text-center group"
                    >
                      {/* Step number */}
                      <div className="flex items-center justify-center mb-4">
                        <div
                          className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                          style={{
                            background: "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15))",
                            color: "#3B82F6",
                          }}
                        >
                          <StepIcon />
                          {/* Number badge */}
                          <span
                            className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                            style={{
                              background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                              color: "#FFFFFF",
                            }}
                          >
                            {i + 1}
                          </span>
                        </div>
                      </div>

                      {/* Connecting line (desktop) */}
                      {i < steps.length - 1 && (
                        <div
                          className="hidden lg:block absolute top-7 left-[60%] w-[calc(100%-3.5rem)] h-[1px]"
                          style={{
                            background: "linear-gradient(90deg, rgba(59,130,246,0.3), transparent)",
                          }}
                        />
                      )}

                      <h4 className="text-lg font-semibold mb-2" style={{ color: "#F8FAFC" }}>
                        {step.title}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
                        {step.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
