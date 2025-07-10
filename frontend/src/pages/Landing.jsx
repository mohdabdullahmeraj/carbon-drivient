import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'

const Landing = () => {
  return (
    <div className="bg-[#FFF5E4] min-h-screen font-sans">
      <Navbar />

      <section className="pt-32 pb-16 px-6 text-center mb-50">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-[#FF9494] mb-6 mt-24"
        >
          Welcome to Drivient
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-700 max-w-2xl mx-auto"
        >
          Track your impact, reduce your carbon footprint, and join the
          sustainable future.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10"
        >
          <a
            href="#features"
            className="bg-[#FF9494] text-white px-8 py-4 rounded-full text-lg font-semibold shadow hover:bg-[#FFD1D1] hover:text-[#FF9494] transition-all "
          >
            Explore Features
          </a>
        </motion.div>
      </section>

      <section id="features" className="py-16 px-6 bg-[#FFE3E1] mb-24">
        <div className="max-w-5xl mx-auto text-center mt-10 mb-20">
          <h2 className="text-3xl font-bold mb-8 text-[#FF9494]">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-bold text-lg mb-2">Track Your Footprint</h3>
              <p className="text-gray-600">
                Log activities and monitor your carbon impact easily.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-lg mb-2">Community Challenges</h3>
              <p className="text-gray-600">
                Join others in eco-friendly challenges and build habits.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-bold text-lg mb-2">Celebrate Progress</h3>
              <p className="text-gray-600">
                Earn badges and rewards as you reduce your footprint.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 px-4 bg-pastel-highlight mb-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 mb-8 md:mb-0 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
              alt="About Carbonic UI"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-pastel-accent">About Carbonic UI</h2>
            <p className="text-xl text-gray-700 mb-4">
              Carbonic UI is a pastel-themed, eco-inspired UI kit designed to help you build beautiful, modern websites
              with ease. Our components are crafted for simplicity, accessibility, and a delightful user experience.
            </p>
            <ul className="list-disc pl-5 text-lg text-gray-700 space-y-2">
              <li>Minimal, clean, and modern design</li>
              <li>Easy to customize and extend</li>
              <li>Perfect for eco, wellness, and lifestyle projects</li>
            </ul>
          </div>
        </div>
      </section>

      <footer id="contact" className="font-sans bg-gradient-to-tr from-[#FFE3E1] via-[#FFF5E4] to-[#FFD1D1] shadow-inner">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-start">
          <div className="flex-1 mb-8 md:mb-0">
            <div className="text-2xl font-extrabold text-[#FF9494] mb-2">Carbonic UI</div>
            <p className="text-gray-700 mb-4 max-w-xs">
              A modern, pastel-inspired UI kit for beautiful, eco-friendly web projects.
            </p>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-[#FF9494] bg-white rounded-full p-2 shadow hover:bg-[#FFD1D1] hover:text-[#1DA1F2] transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <title>Twitter</title>
                  <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.95 3.62-.72-.02-1.39-.22-1.98-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.12 2.91 3.99 2.94A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[#FF9494] bg-white rounded-full p-2 shadow hover:bg-[#FFD1D1] hover:text-black transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <title>GitHub</title>
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 7.07c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#FF9494] bg-white rounded-full p-2 shadow hover:bg-[#FFD1D1] hover:text-[#0A66C2] transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <title>LinkedIn</title>
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-start md:items-end">
            <nav aria-label="Footer links">
              <ul className="space-y-2 md:space-y-0 md:space-x-8 flex flex-col md:flex-row text-base font-medium text-gray-700">
                <li><a href="#about" className="hover:text-[#FF9494] transition">About</a></li>
                <li><a href="#contact" className="hover:text-[#FF9494] transition">Contact</a></li>
                <li><button type="button" className="hover:text-[#FF9494] transition bg-transparent border-none p-0 m-0 cursor-pointer">Privacy Policy</button></li>
                <li><button type="button" className="hover:text-[#FF9494] transition bg-transparent border-none p-0 m-0 cursor-pointer">Terms of Service</button></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 pb-6">
          © 2024 Carbonic UI. All rights reserved.
        </div>
      </footer>

    </div>
  )
}

export default Landing
