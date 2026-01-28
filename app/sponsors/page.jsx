"use client";

import { motion } from "framer-motion";
import {
  Handshake,
  Mail,
  Phone,
  ArrowRight,
  Building2,
  Users,
  Globe,
  Megaphone,
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SponsorTier from "@/components/SponsorTier";

export default function Sponsors() {
  const tiers = [
    {
      name: "Bronze",
      price: "5,000",
      color: "bg-amber-600/20 text-amber-400",
      benefits: [
        "Promotional banner display",
        "Stall space for marketing",
      ],
    },
    {
      name: "Silver",
      price: "8,000",
      color: "bg-slate-400/20 text-slate-300",
      benefits: [
        "Promotional banner display",
        "Stall space for marketing",
        "Promotion in ID card",
        "Promotion on the welcome kit",
      ],
    },
    {
      name: "Gold",
      price: "10,000",
      color: "bg-yellow-500/20 text-yellow-400",
      featured: true,
      benefits: [
        "Promotional banner display",
        "Stall space for marketing",
        "Promotion in ID card",
        "Promotion on the welcome kit",
        "Promotional video",
      ],
    },
  ];

  const whySponsors = [
    {
      icon: Users,
      title: "Reach 500+ Students",
      desc: "Connect with talented students from 20+ colleges across the region.",
    },
    {
      icon: Building2,
      title: "Brand Visibility",
      desc: "Your brand featured across all event materials, social media, and venue.",
    },
    {
      icon: Globe,
      title: "Digital Presence",
      desc: "Featured on our website and social media channels reaching thousands.",
    },
    {
      icon: Megaphone,
      title: "Recruitment Access",
      desc: "Direct access to skilled candidates for internships and job opportunities.",
    },
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-6">
              <Handshake size={16} />
              Partner With Us
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Data Vaganza
              <span className="bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                2k26
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-6">
              Department of Data Science (UG) - Data Brigade Association
            </p>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              The American College, Satellite Campus, Chatrappatti, Madurai<br/>
              Re-Accredited 3rd Cycle by NAAC with Grade A+ (CGPA: 3.47/4.0)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Sponsor */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
              About The American College
            </h2>
            <p className="text-slate-400 text-center max-w-3xl mx-auto leading-relaxed">
              A rapidly growing institution offering new courses in a highly eco-friendly environment, 
              located on the Natham route near Chatrappatti village. The campus provides advanced 
              laboratory infrastructure exclusively for science-related courses, robust internet facilities, 
              and convenient transportation from Madurai and nearby cities.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whySponsors.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/10"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                  <item.icon className="w-7 h-7 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsor Tiers */}
      <section className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center mb-4"
          >
            Sponsorship Packages
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 text-center mb-12 max-w-xl mx-auto"
          >
            Choose a package that fits your goals. Custom packages available
            upon request.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier, index) => (
              <SponsorTier key={tier.name} tier={tier} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Organizing Committee */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center mb-12"
          >
            Organizing Committee
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Head of Department</h3>
              <p className="text-white font-medium">Dr. A. John Sanjeev Kumar</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Department Faculties</h3>
              <div className="space-y-2">
                <p className="text-white">Dr. D. Gandhimathi</p>
                <p className="text-white">Mrs. A. Punitha Rosline <span className="text-slate-400 text-sm">(Association President)</span></p>
                <p className="text-white">Mrs. B. Seema</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">Student In-Charges</h3>
              <div className="space-y-2">
                <p className="text-white">Mr. Viswanathan</p>
                <p className="text-white">Mr. Aaditya</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Contact for Sponsorship
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              For more information regarding sponsorship, get in touch with our team:
            </p>
            <div className="space-y-4 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-left">
                  <p className="text-white font-medium">Mr. Viswanathan</p>
                  <p className="text-cyan-400">73051 42839</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-left">
                  <p className="text-white font-medium">Mr. Aaditya</p>
                  <p className="text-cyan-400">97916 56788</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
