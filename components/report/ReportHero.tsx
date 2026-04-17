'use client'

import { motion } from 'motion/react'
import type { StyleLog } from '@/types'
import { Sparkles, Activity } from 'lucide-react'

const SEASON_CONFIG = {
  spring_warm: { label: 'Spring Warm', emoji: '🌸', gradient: 'bg-[#FED7AA]', textColor: 'text-orange-900', accent: '#FB923C' },
  summer_cool: { label: 'Summer Cool', emoji: '🧊', gradient: 'bg-[#DBEAFE]', textColor: 'text-blue-900', accent: '#60A5FA' },
  autumn_warm: { label: 'Autumn Warm', emoji: '🍂', gradient: 'bg-[#FEF3C7]', textColor: 'text-amber-900', accent: '#F59E0B' },
  winter_cool: { label: 'Winter Cool', emoji: '❄️', gradient: 'bg-[#F1F5F9]', textColor: 'text-slate-900', accent: '#1E293B' },
}

export default function ReportHero({ log }: { log: StyleLog }) {
  const season = SEASON_CONFIG[log.color_season] || SEASON_CONFIG.winter_cool

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-apple-lg luxury-glass p-10 border-white/40 shadow-luxury-lg`}
    >
      {/* Visual Accent */}
      <div className={`absolute top-0 right-0 w-64 h-64 ${season.gradient} opacity-20 blur-[100px] rounded-full -mr-20 -mt-20`} />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 border border-white/60 w-fit">
            <Sparkles size={12} className="text-vibe-primary" />
            <span className="text-[10px] font-bold text-vibe-primary uppercase tracking-widest">Master Signature Analysis</span>
          </div>
          
          <div>
            <h2 className="heading-serif text-5xl text-vibe-charcoal font-medium leading-tight">
              {season.label} <br />
              <span className="italic opacity-30">Aesthetic</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-vibe-slate/30 uppercase tracking-widest mb-1 ml-1">Precision ITA°</span>
                <div className="luxury-glass px-4 py-2 rounded-apple-md border-white/80 font-mono text-vibe-charcoal font-bold">
                  {log.ita_value}
                </div>
             </div>
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-vibe-slate/30 uppercase tracking-widest mb-1 ml-1">Confidence</span>
                <div className="luxury-glass px-4 py-2 rounded-apple-md border-white/80 font-mono text-vibe-charcoal font-bold">
                  {log.confidence_score}%
                </div>
             </div>
          </div>
        </div>

        {/* Skin Tone Essence */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 rounded-full border-8 border-white shadow-luxury overflow-hidden"
              style={{ backgroundColor: log.skin_tone_hex }}
            >
               <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/5 to-transparent" />
            </motion.div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-vibe-silver/20 text-vibe-charcoal">
               <Activity size={18} />
            </div>
          </div>
          <span className="text-[10px] font-bold text-vibe-slate/40 uppercase tracking-[0.3em]">Pure Spectrum</span>
        </div>
      </div>

      {/* Narrative Banner */}
      <div className="mt-12 p-6 rounded-apple-md bg-vibe-charcoal text-white/90 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-vibe-primary/20 to-transparent pointer-events-none" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-10 h-10 luxury-glass rounded-apple-sm flex items-center justify-center border-white/5">
            <span className="text-xl">{season.emoji}</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Editorial Mood</p>
            <p className="text-sm font-medium leading-relaxed italic">
              Today&apos;s essence resonates with the {season.label} mood, reflecting a refined and luminous presence.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
