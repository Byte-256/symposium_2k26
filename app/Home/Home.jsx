"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  Code2,
  Brain,
  Trophy,
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountdownTimer from "@/components/CountdownTimer";
import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: Code2,
      title: "Technical Events",
      desc: "Debugging, Paper Presentation, Connection",
    },
    {
      icon: Brain,
      title: "Non-Technical",
      desc: "Treasure Hunt, Photography, Dance & Mime",
    },
    {
      icon: Users,
      title: "Team Building",
      desc: "2-5 Members per team",
    },
    {
      icon: Trophy,
      title: "Recognition",
      desc: "Trophies & Certificates",
    },
  ];

  const stats = [
    { value: "30+", label: "Colleges Invited" },
    { value: "5+", label: "Events Running" },
    { value: "100+", label: "Expected Participants" },
    { value: "1", label: "Overall Winner" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-center gap-6 mb-8"
            >
              {/* College Logo Placeholder */}
              <div className="w-16 h-16 p-0 sm:w-20 sm:h-20 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                {/* <span className="text-xs text-slate-400 text-center px-1">College Logo</span> */}
                <Image
                  src="/amc.jpg"
                  alt="College Logo"
                  width={64}
                  height={64}
                  className="object-contain rounded-xl"
                />
              </div>
              <div className="w-px h-12 bg-white/20" />
              {/* Brigade Logo Placeholder */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Image
                  src="/brigade.png"
                  alt="Brigade Association Logo"
                  width={64}
                  height={64}
                  className="object-contain rounded-xl"
                />
                {/* <span className="text-xs text-cyan-400 text-center px-1">
                  Brigade Logo
                </span>*/}
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm">
                <Sparkles size={16} />
                Inter-College Data Science Symposium
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            >
              <span className="bg-linear-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                DATA
              </span>
              <br />
              <span className="bg-linear-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                VAGANZA
              </span>
              <span className="text-cyan-400"> 2K26</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8"
            >
              Department of Data Science (UG) -{" "}
              <span className="text-cyan-400 font-medium">
                Data Brigade Association
              </span>
              <br />
              The American College, Satellite Campus - Chatrapatti
            </motion.p>

            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mb-12 text-sm"
            >
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar size={18} className="text-cyan-400" />
                <span>February 13, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin size={18} className="text-purple-400" />
                <span>Satellite Campus</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                {/* <Users size={18} className="text-cyan-400" />*/}
                {/* <span>Open for All Colleges</span>*/}
              </div>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-12"
            >
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                  Registration Closes
                </span>
              </div>
              <CountdownTimer targetDate="2026-02-09T20:00:00" />
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <a
                href="https://forms.gle/m1GdyZuahE68sDzu9"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-linear-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Register Now
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </a>
              <Link
                href={"events"}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300"
              >
                Explore Events
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What Awaits You
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Dive into a world of data science excellence with hands-on
              workshops, thrilling competitions, and networking opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-white/2 border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* College Info Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 p-8 sm:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 mb-6">
                  <MapPin size={16} className="text-cyan-400" />
                  Hosted at
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  THE AMERICAN COLLEGE
                </h3>
                <p className="text-cyan-400 font-medium mb-2">
                  SATELLITE CAMPUS - CHATRAPATTI
                </p>
                <p className="text-slate-400 text-sm mb-4">
                  An Autonomous Institution Affiliated to Madurai Kamaraj
                  University
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                  <span className="text-cyan-400 font-semibold">
                    NAAC &quot;A+&quot; Grade
                  </span>
                  <span className="text-slate-400">CGPA: 3.47/4</span>
                </div>
              </div>
              <div className="text-slate-400 text-sm leading-relaxed">
                <p className="mb-4">
                  The American College Satellite Campus is one of the sprouting
                  institutions for new courses and a highly eco-friendly
                  environment located via Natham, close to the Village of
                  Chatrapatti.
                </p>
                <p>
                  The college provides advanced infrastructure of Labs
                  exclusively for Science-related courses and studies. With
                  rapid developments and improvements over the environment and
                  student growth, the campus has proved to be socially aware and
                  provides every available opportunity to students.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Ready to Join the
              <span className="bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Data Revolution?
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
              Don&apos; miss this opportunity to learn, compete, and connect
              with fellow data enthusiasts from across the region.
            </p>
            <a
              href="https://forms.gle/m1GdyZuahE68sDzu9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 bg-linear-to-r from-cyan-500 to-purple-500 rounded-full text-white text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
            >
              Register Now
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
