"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Presentation,
  Puzzle,
  Trophy,
  Filter,
  ArrowRight,
  Camera,
  MapPin,
  Bug,
  Music,
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { useCountdownEnded } from "@/hooks/useCountdownEnded";

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("All");
    const countdownEnded = useCountdownEnded();
  const categories = ["All", "Technical", "Non-Technical"];

  const events = [
    {
      title: "Heuristic Hunt \n Treasure Hunt",
      description:
        "Find QR code clues across campus. All scanned clues must be screenshotted. Running/screaming not allowed. 2-minute penalty for violations.",
      icon: MapPin,
      duration: "2 Hours",
      teamSize: "2 Members",
      category: "Non-Technical",
      link: "/events/treasure-hunt",
    },
    {
      title: "Trace & Transform \n Debugging",
      description:
        "Test your debugging skills in Java & Python. 3 rounds of programming challenges.",
      icon: Bug,
      duration: "3 Rounds",
      teamSize: "2 Members",
      category: "Technical",
      link: "/events/debugging",
    },
    {
      title: "The Golden Ratio \n Photography",
      description:
        "Open theme mobile photography. Capture anything inside campus. Individual participation only. DSLR not allowed.",
      icon: Camera,
      duration: "Given Time",
      teamSize: "Individual",
      category: "Non-Technical",
      extraInfo:
        "Submit: Lot_Number.jpg to frameparungajii@gmail.com | Contact: 9994118682, 97871 92215",
      link: "",
    },
    {
      title: "The Neural Narrative \n Paper Presentation",
      description:
        "Individual or Team of 2. Only one paper per team. Presentation: 5-10 mins, 6-10 slides (PPT only). Themes: AI, Cloud Computing, IoT, Cybersecurity, Quantum Computing, Big Data Analytics.",
      icon: Presentation,
      duration: "5-10 Mins",
      teamSize: "1-2 Members",
      category: "Technical",
      link: "",
    },
    {
      title: "Vision Vault \n Connection",
      description:
        "Identify common technical connections between words. 3 rounds with preliminary round. Judges decision final.",
      icon: Puzzle,
      duration: "3 Rounds",
      teamSize: "2 Members",
      category: "Technical",
      link: "",
    },
    {
      title: "Fusion Fiesta \n As You Like It",
      description:
        "Dance and mime performance. Submit audio tracks in advance. 5-6 minutes max duration. Appropriate outfits required.",
      icon: Music,
      duration: "5-6 Minutes",
      teamSize: "Maximum 5 Members",
      category: "Non-Technical",
      link: "", 
    },
  ];

  const filteredEvents =
    activeCategory === "All"
      ? events
      : events.filter((e) => e.category === activeCategory);

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
              <Trophy size={16} />6 Exciting Events
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Events &
              <span className="bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {" "}
                Users, Competitions
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From intense coding battles to creative workshops, there&apos;s
              something for everyone. Showcase your skills and win exciting
              prizes!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="relative z-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white/5 border border-white/10">
              <Filter size={16} className="text-slate-400 ml-3" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-linear-to-r from-cyan-500 to-purple-500 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <EventCard key={event.title} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-linear-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
              General Rules
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Valid college ID is mandatory for all participants",
                "Registration must be completed before the event",
                "Decision of judges will be final and binding",
                "Participants must report 30 minutes before the event",
                "Plagiarism or malpractice leads to disqualification",
                "Certificate of participation for all registered participants",
              ].map((rule, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-cyan-400 text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm">{rule}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Compete?</h2>
          <p className="text-slate-400 mb-8">
            Register now and secure your spot in these exciting events!
          </p>
          <Link
            href={countdownEnded ? "/registration" : "https://forms.gle/m1GdyZuahE68sDzu9"}
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Register for Events
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
