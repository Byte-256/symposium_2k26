"use client"

import { motion } from 'framer-motion';
import { Handshake, Mail, Phone, ArrowRight, Building2, Users, Globe, Megaphone } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SponsorTier from '@/components/SponsorTier';

export default function Sponsors() {
  const tiers = [
    {
      name: 'Bronze',
      price: '10,000',
      color: 'bg-amber-600/20 text-amber-400',
      benefits: [
        'Logo on event banners',
        'Social media mentions',
        '2 Event passes',
        'Certificate of appreciation',
      ],
    },
    {
      name: 'Gold',
      price: '25,000',
      color: 'bg-yellow-500/20 text-yellow-400',
      featured: true,
      benefits: [
        'Everything in Bronze',
        'Logo on main stage backdrop',
        'Dedicated social media post',
        '5 Event passes with VIP seating',
        'Recruitment opportunity',
        'Company standee display',
      ],
    },
    {
      name: 'Silver',
      price: '15,000',
      color: 'bg-slate-400/20 text-slate-300',
      benefits: [
        'Everything in Bronze',
        'Logo on event t-shirts',
        'Standee at registration desk',
        '3 Event passes',
        'Website listing',
      ],
    },
  ];

  const whySponsors = [
    {
      icon: Users,
      title: 'Reach 500+ Students',
      desc: 'Connect with talented students from 20+ colleges across the region.',
    },
    {
      icon: Building2,
      title: 'Brand Visibility',
      desc: 'Your brand featured across all event materials, social media, and venue.',
    },
    {
      icon: Globe,
      title: 'Digital Presence',
      desc: 'Featured on our website and social media channels reaching thousands.',
    },
    {
      icon: Megaphone,
      title: 'Recruitment Access',
      desc: 'Direct access to skilled candidates for internships and job opportunities.',
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
              Become a 
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"> Sponsor</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Join us in nurturing the next generation of data scientists. Your support helps us create an unforgettable experience for students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Sponsor */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold text-center mb-12"
          >
            Why Sponsor Data Vaganza?
          </motion.h2>
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
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
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
            Choose a package that fits your goals. Custom packages available upon request.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier, index) => (
              <SponsorTier key={tier.name} tier={tier} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Current Sponsors Placeholder */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-center mb-8"
          >
            Our Sponsors
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-32 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
              >
                <span className="text-slate-500 text-xs">Sponsor {i}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-sm mt-8">
            Be the first to support Data Vaganza 2K26!
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-white/10 p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Interested in Sponsoring?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              We'd love to discuss how we can create a mutually beneficial partnership. Reach out to our sponsorship team today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="mailto:databrigade@americancollege.edu.in?subject=Sponsorship Inquiry - Data Vaganza 2K26"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all"
              >
                <Mail size={18} />
                Email Us
              </a>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:bg-white/10 transition-all"
              >
                <Phone size={18} />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}