"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function Page() {
    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
            <AnimatedBackground />
            <Navbar />
            
            <main className="relative z-10 min-h-screen flex items-center justify-center pt-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                            <Heart size={16} />
                            Registration Closed
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                    >
                        <span className="bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent">
                            Thank You
                        </span>
                        <br />
                        <span className="text-cyan-400">For Your Interest!</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-300 text-lg sm:text-xl max-w-3xl mx-auto mb-6"
                    >
                        All participant slots have been filled for Data Vaganza 2k26.
                        We're thrilled by the overwhelming response from the data science community.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-slate-400 max-w-2xl mx-auto mb-8"
                    >
                        If you're interested in sponsoring our event and supporting the next generation of data scientists, 
                        please visit our sponsor page. Every contribution helps us create better experiences for everyone.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/sponsor"
                            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                            aria-label="Interested in sponsoring"
                        >
                            Interested in Sponsoring
                            <ArrowRight
                                size={18}
                                className="group-hover:translate-x-1 transition-transform"
                            />
                        </Link>
                        
                        <Link
                            href="/"
                            className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-white font-medium hover:bg-white/10 transition-all duration-300"
                        >
                            Back to Home
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-12"
                    >
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                            <span className="text-cyan-400 font-medium">
                                Follow us for updates on future events!
                            </span>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}