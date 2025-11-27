import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const Landing = () => {
  return (
    <div className="bg-[#f1ffe4] min-h-screen font-sans">
      <Navbar />

      {/* HERO */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          {/* LEFT: same core hero, just aligned nicely */}
          <div className="flex-1 text-center lg:text-left">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-[#c9f7c5] bg-white/70 px-3 py-1 text-xs font-medium text-[#265016] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Built for people who take more cabs than walks 🫠
            </div>

            <h1 className="hero-heading mt-5 text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#173b0c]">
              Track your{" "}
              <span className="bg-gradient-to-r from-[#35a947] via-[#88d969] to-[#24b37a] bg-clip-text text-transparent">
                rides, impact,
              </span>{" "}
              and small wins.
            </h1>

            <p className="hero-sub mt-4 text-base md:text-lg text-[#2c5f1a] max-w-xl mx-auto lg:mx-0">
              Drivient turns every Uber, auto, and late-night drive into
              climate points you can actually see. Not “save the planet”
              propaganda — just honest numbers and chill nudges.
            </p>

            <div className="hero-cta mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="/register"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold shadow-md bg-[#2f7d32] text-white hover:bg-[#25652a] transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Start tracking in 30 seconds
              </a>

              
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 text-xs text-[#3a6b24] opacity-90">
              <div className="flex -space-x-2">
                <div className="h-7 w-7 rounded-full bg-[#c5ffb0] border border-white" />
                <div className="h-7 w-7 rounded-full bg-[#9df3c4] border border-white" />
                <div className="h-7 w-7 rounded-full bg-[#e3ffe2] border border-white" />
              </div>
              <p className="sm:ml-1">
                30+ trips logged by our test drivers in the last month 🚗
              </p>
            </div>
          </div>


          {/* RIGHT: global stats card (static data, feels live) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="flex-1 w-full"
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute -inset-3 bg-gradient-to-br from-[#b6f2c6]/60 via-[#d4f7ff]/70 to-[#ffe9c7]/70 rounded-3xl blur-xl opacity-80" />
              <div className="relative bg-white/80 backdrop-blur-md rounded-3xl border border-[#d8ffbe] shadow-[0_18px_40px_rgba(34,84,15,0.14)] p-6 sm:p-7">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5e7852]">
                      Today&apos;s snapshot
                    </p>
                    <h2 className="text-xl font-semibold text-[#0f3d18] mt-1">
                      Global carbon impact
                    </h2>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-[#f1ffe4] text-[#286109] font-medium">
                    Live-ish
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="rounded-2xl bg-[#f6ffef] border border-[#d8ffbe] px-3 py-3">
                    <p className="text-[11px] font-medium text-[#63825a] flex items-center gap-1">
                      🌍 Global CO₂ today
                    </p>
                    <p className="text-lg font-bold text-[#1b3f11] mt-1">
                      79Mt
                    </p>
                    <p className="text-[11px] text-[#7c9472] mt-0.5">
                      Approx. fossil fuel emissions
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f0fbff] border border-[#cbefff] px-3 py-3">
                    <p className="text-[11px] font-medium text-[#3b6b7d] flex items-center gap-1">
                      🚗 Transport share
                    </p>
                    <p className="text-lg font-bold text-[#134258] mt-1">
                      24%
                    </p>
                    <p className="text-[11px] text-[#567486] mt-0.5">
                      Rough share of global CO₂
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="rounded-2xl bg-[#fff7eb] border border-[#ffe2b8] px-3 py-3">
                    <p className="text-[11px] font-medium text-[#87501c]">
                      🔋 Renewable energy
                    </p>
                    <p className="text-lg font-bold text-[#6b3b10] mt-1">
                      31%
                    </p>
                    <p className="text-[11px] text-[#a37341] mt-0.5">
                      Share of global electricity
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f4f0ff] border border-[#ddd3ff] px-3 py-3">
                    <p className="text-[11px] font-medium text-[#4f3a8c]">
                      ⚡ EV adoption
                    </p>
                    <p className="text-lg font-bold text-[#362466] mt-1">
                      18%
                    </p>
                    <p className="text-[11px] text-[#73619f] mt-0.5">
                      Share of new car sales
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#f1ffe4] border border-dashed border-[#b6f2c6] px-3 py-3 flex items-start gap-2">
                  <span className="mt-0.5 text-lg">✨</span>
                  <p className="text-[12px] text-[#28521a] leading-relaxed">
                    Drivient doesn&apos;t just show numbers — it turns your
                    everyday trips into small climate wins you can track.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE-LIKE STRIP */}
      <section className="bg-[#e5fbf0] border-y border-[#c8f0d7] py-3">
        <div className="overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            }}
            className="flex gap-10 text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-[#2d5b22]"
          >
            <p className="whitespace-nowrap">
              Drive a little cleaner • Track your trips • Turn data into action
              • Compete with friends • Build habits that stick •
            </p>
            <p className="whitespace-nowrap">
              Drive a little cleaner • Track your trips • Turn data into action
              • Compete with friends • Build habits that stick •
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES (id=features) */}
      <section id="features" className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1d4b12] mb-3">
              A climate sidekick, not a boring dashboard
            </h2>
            <p className="text-sm md:text-base text-[#4c6a43] max-w-2xl mx-auto">
              Drivient turns your trips into simple, visual insights — something
              you actually want to open after a long day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "📊",
                title: "Track without overthinking",
                desc: "Log trips in seconds and let Drivient handle the math, conversions, and carbon estimates.",
              },
              {
                icon: "🧠",
                title: "Smart, human insights",
                desc: "No hardcore climate jargon — just friendly summaries like “your commute is your main emitter.”",
              },
              {
                icon: "🌱",
                title: "Encouraging, not shaming",
                desc: "Celebrate streaks, see gentle nudges, and get suggestions that fit real life, not perfection.",
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#f5fff4] border border-[#ddf4d7] rounded-3xl p-5 shadow-[0_12px_30px_rgba(21,66,26,0.06)]"
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-lg font-semibold text-[#234218] mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-[#587455] leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / ABOUT (id=about) */}
      <section
        id="about"
        className="py-18 px-6 bg-[#f1ffe4] border-t border-[#d6f2c7]"
      >
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#142f05] mb-4">
              It&apos;s like a fitness tracker, but for the planet.
            </h2>
            <p className="text-base md:text-lg text-[#1f3f0b] mb-4">
              Drivient helps you understand how your everyday trips add up —
              then quietly nudges you toward better choices without guilt.
            </p>
            <ul className="space-y-3 text-sm md:text-base text-[#314f20]">
              <li>• Log your drives, rides, or daily commute.</li>
              <li>• See emissions by purpose, time, and vehicle.</li>
              <li>• Get small suggestions for big long-term impact.</li>
            </ul>

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs md:text-sm">
              <div className="rounded-2xl bg-white/70 border border-[#d6f2c7] px-4 py-3">
                <p className="font-semibold text-[#1c3b0f]">5-min setup</p>
                <p className="text-[#517047] mt-1">
                  Start logging trips in less time than it takes to make chai.
                </p>
              </div>
              <div className="rounded-2xl bg-white/70 border border-[#d6f2c7] px-4 py-3">
                <p className="font-semibold text-[#1c3b0f]">
                  Built for real life
                </p>
                <p className="text-[#517047] mt-1">
                  No perfection. Just progress you can actually maintain.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Impact meter / playful visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl border border-[#d8ffbe] shadow-[0_16px_40px_rgba(16,68,25,0.12)] p-6"
          >
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#567b4f] mb-2">
              Impact preview
            </p>
            <h3 className="text-lg font-semibold text-[#183814] mb-4">
              How much could one month of mindful trips save?
            </h3>

            <div className="mb-4">
              <div className="flex justify-between text-[11px] text-[#5b7b54] mb-1">
                <span>Low effort</span>
                <span>High effort</span>
              </div>
              <div className="h-3 rounded-full bg-[#e3f6da] overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-[#7bd26d] via-[#5ac27e] to-[#3b9f84]" />
              </div>
            </div>

            <ul className="space-y-2 text-xs text-[#365132] mb-4">
              <li>• 2–3 days of carpooling per week 🚗🤝</li>
              <li>• One walkable / metro day instead of driving 🚶‍♂️</li>
              <li>• Slightly smarter route choices using insights</li>
            </ul>

            <div className="rounded-2xl bg-[#f6ffef] border border-dashed border-[#c3f0b3] px-4 py-3 text-[12px] text-[#204117]">
              Tiny switches in your weekly routine can shift your monthly
              emissions more than you think. Drivient just helps you see it.
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA + CONTACT (id=contact) */}
      <section
        id="contact"
        className="py-14 px-6 bg-white border-t border-[#e2f3da]"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-[#1a3c10] mb-3"
          >
            Ready to see your trips differently?
          </motion.h2>
          <p className="text-sm md:text-base text-[#4c6a43] mb-7 max-w-xl mx-auto">
            Drivient works best when you just start logging and let the patterns
            appear. No pressure, no perfect data — just honest tracking.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href="/register"
              className="bg-[#286109] text-white px-7 py-3 rounded-full text-sm font-semibold shadow-md hover:bg-[#214b0c] transition-all"
            >
              Create a free account
            </a>
            <a
              href="mailto:hello@drivient.app"
              className="px-7 py-3 rounded-full border border-[#286109]/60 text-[#285219] text-sm font-semibold bg-white hover:bg-[#f5fff4] transition-all"
            >
              Talk to us
            </a>
          </div>

          <p className="text-[11px] text-[#7a9270]">
            Built for people who care about the planet but also have a life. 🌍
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2a5214] text-white">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8 md:gap-0 justify-between items-start md:items-center">
          <div>
            <div className="text-xl font-extrabold mb-1">Drivient</div>
            <p className="text-xs text-[#e4ffe0] max-w-xs">
              A simple, friendly way to understand how your daily movement
              shapes your carbon footprint.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-2 text-xs">
            <div className="flex gap-4">
              <a
                href="#about"
                className="hover:text-[#c2ff94] transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="hover:text-[#c2ff94] transition-colors"
              >
                Contact
              </a>
              <button
                type="button"
                className="hover:text-[#c2ff94] transition-colors"
              >
                Privacy
              </button>
            </div>
            <p className="text-[11px] text-[#daf6d7] mt-1">
              © {new Date().getFullYear()} Drivient. Built with care (and a few
              too many tabs open).
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
