"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCountdownEnded } from "@/hooks/useCountdownEnded";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const countdownEnded = useCountdownEnded();

  const navLinks = [
    { name: "Home", page: "/" },
    { name: "Events", page: "/events" },
    { name: "Sponsors", page: "/sponsors" },
    { name: "About", page: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="backdrop-blur-xl bg-slate-950/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={"Home"} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">DV</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-semibold tracking-tight">
                  Data Vaganza
                </p>
                <p className="text-cyan-400 text-xs tracking-widest">2K26</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  href={link.page}
                  className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href={"https://forms.gle/m1GdyZuahE68sDzu9"}
                className="ml-4 px-6 py-2.5 bg-linear-to-r from-cyan-500 to-purple-500 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                Register Now
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 backdrop-blur-xl bg-slate-950/95 border-b border-white/5"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  href={link.page}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/registration"
                className="block mt-4 px-6 py-3 bg-linear-to-r from-cyan-500 to-purple-500 text-white text-center font-medium rounded-full"
              >
                Register Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
