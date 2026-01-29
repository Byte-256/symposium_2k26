"use client";

import { motion } from "framer-motion";
import {
  Award,
  GraduationCap,
  MapPin,
  Users,
  Target,
  Heart,
  Sparkles,
  ArrowRight,
  Mail,
  Instagram,
  Linkedin,
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function About() {
  const teamMembers = [
    {
      name: "Faculty Coordinator",
      role: "Department of Data Science",
      placeholder: true,
    },
    { name: "President", role: "Data Brigade Association", placeholder: true },
    {
      name: "Vice President",
      role: "Data Brigade Association",
      placeholder: true,
    },
    { name: "Secretary", role: "Data Brigade Association", placeholder: true },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
              <Sparkles size={16} />
              Know More About Us
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              About
              <span className="bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Data Vaganza
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* College Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* College Logo Placeholder */}
              <div className="w-32 h-32 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-8">
                {/* <span className="text-sm text-slate-400 text-center px-2">College Logo<br/>128x128</span> */}
                <Image
                  src={"/amc.jpg"}
                  width={100}
                  height={100}
                  className="rounded-lg"
                  alt="American college Logo"
                />
              </div>

              <h2 className="text-3xl font-bold mb-2">THE AMERICAN COLLEGE</h2>
              <p className="text-cyan-400 font-semibold text-lg mb-4">
                SATELLITE CAMPUS - CHATRAPATTI
              </p>

              <div className="space-y-2 mb-6 text-slate-400 text-sm">
                <p>An Autonomous Institution Affiliated to</p>
                <p className="text-white font-medium">
                  Madurai Kamaraj University
                </p>
                <p>Re-Accredited 3rd Cycle by NAAC</p>
              </div>

              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                <Award className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="text-white font-bold text-lg">
                    Grade &quot;A+&quot;
                  </p>
                  <p className="text-slate-400 text-sm">
                    CGPA: 3.47 on a 4 Point Scale
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Eco-Friendly Campus
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Located via Natham, close to the Village of Chatrapatti,
                      our campus boasts a highly eco-friendly environment with
                      vast rich ecosystem.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/2 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Advanced Infrastructure
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      The college provides advanced infrastructure of Labs
                      exclusively for Science-related courses and studies with
                      prominent internet facilities.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Excellence & Growth
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      With rapid developments and improvements, the campus
                      provides every available opportunity and service to
                      students, thriving for excellence.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data Brigade Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 p-8 sm:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {/* Brigade Logo Placeholder */}
                  <div className="w-32 h-32 rounded-2xl bg-linear-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/40 flex items-center justify-center mb-8">
                    <span className="text-sm text-cyan-400 text-center px-2">
                      Brigade Logo
                      <br />
                      128x128
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    Data Brigade
                    <span className="bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {" "}
                      Association
                    </span>
                  </h2>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    Data Brigade Association is the official student association
                    of the Department of Data Science at The American College,
                    Satellite Campus. We are a community of passionate data
                    enthusiasts dedicated to fostering innovation, learning, and
                    collaboration in the field of Data Science.
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    Our mission is to bridge the gap between academic knowledge
                    and industry practices through workshops, hackathons, guest
                    lectures, and events like Data Vaganza - our flagship
                    inter-college symposium.
                  </p>
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Users, value: "100+", label: "Active Members" },
                  { icon: Award, value: "10+", label: "Events Per Year" },
                  {
                    icon: GraduationCap,
                    value: "5+",
                    label: "Workshops Conducted",
                  },
                  { icon: Heart, value: "1000+", label: "Students Impacted" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 rounded-xl bg-white/5 border border-white/10"
                  >
                    <stat.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-slate-400 text-xs">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              The brilliant minds behind Data Vaganza 2K26
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4">
                  <Users className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-white font-semibold">{member.name}</h3>
                <p className="text-slate-400 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-slate-400 mb-8">
              Have questions? We&apos;d love to hear from you!
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <a
                href="mailto:databrigade@americancollege.edu.in"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all"
              >
                <Mail size={18} className="text-cyan-400" />
                23dsc201@americancollege.edu.in
              </a>
            </div>

            <div className="flex justify-center gap-4">
              {[Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-12 h-12 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="https://forms.gle/m1GdyZuahE68sDzu9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-linear-to-r from-cyan-500 to-purple-500 rounded-full text-white text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Register for Data Vaganza 2K26
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
