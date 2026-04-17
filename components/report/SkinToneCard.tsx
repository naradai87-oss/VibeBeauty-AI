'use client'

import { motion } from 'motion/react'
import type { StyleLog } from '@/types'
import { Palette, XCircle, CheckCircle2 } from 'lucide-react'

export default function SkinToneCard({ log }: { log: StyleLog }) {
  // ITA° -30~90 범위 → 0~100% 위치 변환
  const pct = Math.min(100, Math.max(0, ((log.ita_value + 30) / 120) * 100))

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.1 }}
      className="luxury-glass rounded-apple-lg p-8 border-vibe-silver/10 space-y-8"
    >
      <div className="flex items-center justify-between">
        <h3 className="heading-serif text-lg text-vibe-charcoal font-medium flex items-center gap-2">
          <Palette size={18} className="text-vibe-primary" />
          Skin Spectrum Analysis
        </h3>
        <span className="text-[10px] font-bold text-vibe-slate/30 uppercase tracking-widest">Precision Metrics</span>
      </div>

      {/* ITA° Visualization */}
      <div className="space-y-4">
        <div className="flex justify-between items-end mb-1 px-1">
          <span className="text-[10px] font-bold text-vibe-slate/20 uppercase tracking-tighter">Deep</span>
          <span className="text-xs font-mono font-bold text-vibe-charcoal">ITA° {log.ita_value}</span>
          <span className="text-[10px] font-bold text-vibe-slate/20 uppercase tracking-tighter">Luminous</span>
        </div>
        <div className="relative h-2">
          <div className="absolute inset-0 h-full w-full rounded-full opacity-60"
            style={{ background: 'linear-gradient(90deg, #3D2B1F 0%, #8D5B39 25%, #C68E5E 50%, #E8BC91 75%, #FAD9C1 100%)' }} />
          <motion.div
            initial={{ left: '0%' }}
            animate={{ left: `${pct}%` }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 border-white shadow-luxury bg-vibe-charcoal"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 pt-4">
        {/* Recommended Colors */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 ml-1">
            <CheckCircle2 size={12} className="text-vibe-primary opacity-40" />
            <p className="text-[10px] font-bold text-vibe-charcoal uppercase tracking-widest">Signature</p>
          </div>
          <div className="flex gap-2.5 flex-wrap">
            {log.best_colors.map((color, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-8 h-8 rounded-apple-sm shadow-luxury border-2 border-white/80 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Avoid Colors */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 ml-1">
            <XCircle size={12} className="text-vibe-slate/20" />
            <p className="text-[10px] font-bold text-vibe-slate/40 uppercase tracking-widest">Minimal</p>
          </div>
          <div className="flex gap-2.5 flex-wrap opacity-60">
            {log.avoid_colors.map((color, i) => (
              <div key={i} className="relative w-8 h-8 rounded-apple-sm border-2 border-white shadow-sm overflow-hidden"
                style={{ backgroundColor: color }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-px bg-white/40 rotate-45" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
