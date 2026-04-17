'use client'

import { motion } from 'motion/react'
import type { StyleLog } from '@/types'
import { Ruler, Sparkles, Wand2 } from 'lucide-react'

const SHAPE_INFO = {
  hourglass: { label: 'Hourglass', emoji: '⌛', desc: 'Symmetrical balance with a defined waistline.' },
  rectangle: { label: 'Rectangle', emoji: '▬', desc: 'Balanced silhouette with subtle curves.' },
  pear: { label: 'Pear', emoji: '🍐', desc: 'Refined lower volume. Accentuate the upper frame for elegance.' },
  apple: { label: 'Apple', emoji: '🍎', desc: 'Prominent upper presence. V-lines create a streamlined look.' },
  inverted_triangle: { label: 'Triangle', emoji: '🔺', desc: 'Strong shoulder line. Add volume below for harmony.' },
}

export default function BodyAnalysisCard({ log }: { log: StyleLog }) {
  const info = SHAPE_INFO[log.body_shape as keyof typeof SHAPE_INFO] || SHAPE_INFO.rectangle

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.2 }}
      className="luxury-glass rounded-apple-lg p-8 border-vibe-silver/10 space-y-8"
    >
      <div className="flex items-center justify-between">
        <h3 className="heading-serif text-lg text-vibe-charcoal font-medium flex items-center gap-2">
          <Ruler size={18} className="text-vibe-primary" />
          Silhouette Profile
        </h3>
        <span className="text-[10px] font-bold text-vibe-slate/30 uppercase tracking-widest">Structural ID</span>
      </div>

      <div className="flex items-center gap-6 p-6 luxury-glass-dark rounded-apple-md border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-[40px] rounded-full -mr-10 -mt-10" />
        <span className="text-5xl filter drop-shadow-lg scale-110 group-hover:scale-125 transition-transform duration-700">{info.emoji}</span>
        <div>
          <p className="heading-serif text-white text-xl font-medium tracking-wide">{info.label}</p>
          <p className="text-white/40 text-[11px] leading-relaxed mt-1 font-light tracking-wide">{info.desc}</p>
        </div>
      </div>

      {/* Style Suggestions */}
      <div className="space-y-4">
        <div className="flex items-center gap-1.5 ml-1">
          <Wand2 size={12} className="text-vibe-primary opacity-40" />
          <p className="text-[10px] font-bold text-vibe-charcoal uppercase tracking-widest">Curated Tips</p>
        </div>
        <div className="flex flex-col gap-3">
          {log.style_suggestions.map((tip, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-4 p-4 luxury-glass border-white/40 rounded-apple-sm group hover:border-vibe-primary/20 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-vibe-charcoal text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm group-hover:bg-vibe-primary transition-colors">
                {i + 1}
              </div>
              <p className="text-vibe-charcoal/70 text-xs leading-relaxed font-light tracking-wide italic">
                {tip}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
