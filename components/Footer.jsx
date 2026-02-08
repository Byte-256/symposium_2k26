
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Bus, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">DV</span>
              </div>
              <div>
                <p className="text-white font-semibold text-lg">Data Vaganza</p>
                <p className="text-cyan-400 text-xs tracking-widest">2K26</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              An inter-college symposium celebrating innovation in Data Science and Computer Science.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Events', 'Sponsors', 'About'].map((page) => (
                <li key={page}>
                  <Link
                    href={page}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    {page}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <Link href={"https://maps.app.goo.gl/PKpf2RYMkqYfF6tEA"}>The American College, Satellite Campus, Chatrapatti, Madurai</Link>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail size={18} className="text-cyan-400 flex-shrink-0" />
                <span>databrigade@americancollege.edu.in</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone size={18} className="text-cyan-400 flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* Bus Timing */}
          <div>
            <h4 className="text-white font-semibold mb-6">Transportation</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Bus size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300">Main Campus → Satellite Campus</p>
                  <p className="text-cyan-400 font-medium">8:30 AM</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Bus size={18} className="text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300">Satellite Campus → Main Campus</p>
                  <p className="text-purple-400 font-medium">3:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Clock size={18} className="text-cyan-400 flex-shrink-0" />
                <span className="text-xs">For registered students only</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-6">Follow Us</h4>
            <div className="flex gap-3">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 Data Brigade Association. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm">
              The American College, Satellite Campus - Chatrapatti
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}