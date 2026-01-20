"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, Database, Brain, Presentation, Gamepad2, Lightbulb, 
  Puzzle, PenTool, Mic, Trophy, Filter, ArrowRight
} from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard from '@/components/EventCard';

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technical', 'Non-Technical', 'Workshop'];

  const events = [
    {
      title: 'Code Sprint',
      description: 'A fast-paced coding competition where participants solve algorithmic challenges within a time limit. Test your problem-solving skills and coding speed.',
      icon: Code2,
      duration: '2 Hours',
      teamSize: 'Individual',
      prize: '₹5,000',
      category: 'Technical',
    },
    {
      title: 'Data Quest',
      description: 'Analyze real-world datasets and extract meaningful insights. Present your findings with compelling visualizations.',
      icon: Database,
      duration: '3 Hours',
      teamSize: '2-3 Members',
      prize: '₹7,000',
      category: 'Technical',
    },
    {
      title: 'ML Challenge',
      description: 'Build and train machine learning models to solve a given problem. Accuracy and approach will be evaluated.',
      icon: Brain,
      duration: '4 Hours',
      teamSize: '2-3 Members',
      prize: '₹8,000',
      category: 'Technical',
    },
    {
      title: 'Paper Presentation',
      description: 'Present your research papers on emerging technologies in Data Science, AI, or related fields.',
      icon: Presentation,
      duration: '10 Mins/Team',
      teamSize: '1-2 Members',
      prize: '₹4,000',
      category: 'Technical',
    },
    {
      title: 'Tech Quiz',
      description: 'Test your knowledge of programming, data science concepts, and current technology trends.',
      icon: Puzzle,
      duration: '1 Hour',
      teamSize: '2 Members',
      prize: '₹3,000',
      category: 'Technical',
    },
    {
      title: 'UI/UX Design',
      description: 'Design intuitive and visually appealing interfaces for given problem statements using any design tool.',
      icon: PenTool,
      duration: '3 Hours',
      teamSize: 'Individual',
      prize: '₹4,000',
      category: 'Technical',
    },
    {
      title: 'Tech Debate',
      description: 'Engage in thought-provoking debates on contemporary tech topics. Argue for or against trending technologies.',
      icon: Mic,
      duration: '45 Mins/Round',
      teamSize: '2 Members',
      prize: '₹3,500',
      category: 'Non-Technical',
    },
    {
      title: 'Gaming Arena',
      description: 'Compete in exciting esports tournaments. Multiple games with different formats and brackets.',
      icon: Gamepad2,
      duration: 'Full Day',
      teamSize: 'Varies',
      prize: '₹5,000',
      category: 'Non-Technical',
    },
    {
      title: 'Treasure Hunt',
      description: 'A fun-filled event combining puzzles, riddles, and campus exploration. Find clues and race to the finish!',
      icon: Lightbulb,
      duration: '2 Hours',
      teamSize: '3-4 Members',
      prize: '₹4,000',
      category: 'Non-Technical',
    },
    {
      title: 'Python Workshop',
      description: 'Hands-on workshop covering Python fundamentals and data analysis libraries like Pandas and NumPy.',
      icon: Code2,
      duration: '3 Hours',
      teamSize: 'Individual',
      prize: 'Certificate',
      category: 'Workshop',
    },
    {
      title: 'Power BI Masterclass',
      description: 'Learn to create stunning dashboards and reports with Microsoft Power BI from industry experts.',
      icon: Database,
      duration: '3 Hours',
      teamSize: 'Individual',
      prize: 'Certificate',
      category: 'Workshop',
    },
    {
      title: 'AI/ML Bootcamp',
      description: 'Dive into the world of Artificial Intelligence and Machine Learning with practical demonstrations.',
      icon: Brain,
      duration: '4 Hours',
      teamSize: 'Individual',
      prize: 'Certificate',
      category: 'Workshop',
    },
  ];

  const filteredEvents = activeCategory === 'All' 
    ? events 
    : events.filter(e => e.category === activeCategory);

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
              <Trophy size={16} />
              15+ Exciting Events
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              Events & 
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Competitions</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From intense coding battles to creative workshops, there's something for everyone. Showcase your skills and win exciting prizes!
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
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                      : 'text-slate-400 hover:text-white'
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
          <div className="rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">General Rules</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                'Valid college ID is mandatory for all participants',
                'Registration must be completed before the event',
                'Decision of judges will be final and binding',
                'Participants must report 30 minutes before the event',
                'Plagiarism or malpractice leads to disqualification',
                'Certificate of participation for all registered participants',
              ].map((rule, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-cyan-400 text-xs font-bold">{index + 1}</span>
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
          <p className="text-slate-400 mb-8">Register now and secure your spot in these exciting events!</p>
          <a
            href="https://forms.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Register for Events
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}