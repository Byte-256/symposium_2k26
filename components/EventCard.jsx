"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Users, Trophy, ChevronDown, ChevronUp } from "lucide-react";

export default function EventCard({ event, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    title,
    description,
    icon: Icon,
    duration,
    teamSize,
    prize,
    category,
    extraInfo,
  } = event;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-all duration-500 overflow-hidden">
        {/* Category tag */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            {category}
          </span>
        </div>

        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-cyan-400" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {description}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-cyan-400" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-purple-400" />
            <span>{teamSize}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy size={14} className="text-yellow-400" />
            <span>{prize}</span>
          </div>
        </div>

        {/* Extra Info Toggle */}
        {extraInfo && (
          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              {isExpanded ? (
                <>
                  <ChevronUp size={14} />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  Show Details
                </>
              )}
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
                    <p className="text-xs text-cyan-300 leading-relaxed">{extraInfo}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Hover gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </motion.div>
  );
}
