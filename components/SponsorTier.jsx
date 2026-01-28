import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function SponsorTier({ tier, index }) {
  const { name, price, color, benefits, featured } = tier;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative ${featured ? "lg:-mt-4 lg:mb-4" : ""}`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-linear-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-medium text-white">
          Most Popular
        </div>
      )}

      <div
        className={`h-full p-8 rounded-2xl border transition-all duration-300 ${
          featured
            ? "bg-gradient-to-b from-cyan-500/10 to-purple-500/10 border-cyan-500/30 shadow-xl shadow-cyan-500/10"
            : "bg-white/[0.02] border-white/10 hover:border-white/20"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${color}`}
          >
            {name}
          </div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold text-white">₹{price}</span>
          </div>
        </div>

        {/* Benefits */}
        <ul className="space-y-4 mb-8">
          {benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  featured ? "bg-cyan-500/20" : "bg-white/10"
                }`}
              >
                <Check
                  size={12}
                  className={featured ? "text-cyan-400" : "text-slate-400"}
                />
              </div>
              <span className="text-slate-300 text-sm">{benefit}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="mailto:sanjayavinash@outlook.com?subject=Sponsorship Inquiry - Data Vaganza 2K26"
          className={`block w-full py-3 rounded-xl text-center font-medium transition-all duration-300 ${
            featured
              ? "bg-linear-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg hover:shadow-cyan-500/25"
              : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
          }`}
        >
          Contact Us
        </a>
      </div>
    </motion.div>
  );
}
