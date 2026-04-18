'use client'

import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { Diamond, Sparkles, Camera, ChevronRight, Star } from 'lucide-react'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Profile } from '@/types'

const VIBE_CARDS = [
  { 
    id: 'mz_ghibli', 
    title: 'MZ Ghibli', 
    desc: 'Soft, nostalgic, and artistically curated tones.', 
    color: 'bg-[#8B5CF6]', 
    emoji: '🌿' 
  },
  { 
    id: 'business', 
    title: 'The Executive', 
    desc: 'Sharp, authoritative, and perfectly structured.', 
    color: 'bg-[#001F3F]', 
    emoji: '💼' 
  },
  { 
    id: 'trendy', 
    title: 'Avant-Garde', 
    desc: 'Bold, expressive, and ahead of the curve.', 
    color: 'bg-[#F472B6]', 
    emoji: '🔥' 
  },
]

interface Props {
  profile: Profile | null
}

export default function DashboardClient({ profile }: Props) {
  const router = useRouter()

  const searchParams = useSearchParams()
  const isDemo = searchParams.get('demo') === 'true'

  useEffect(() => {
    if (isDemo) {
      console.log('🚀 Demo Mode Active: Navigating in 3 seconds...')
      const timer = setTimeout(() => {
        router.push('/capture?vibe=mz_ghibli')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isDemo, router])

  function handleVibeSelect(vibeId: string) {
    router.push(`/capture?vibe=${vibeId}`)
  }

  return (
    <div className="min-h-screen bg-vibe-cream pb-24">
      {/* --- TOP NAVIGATION / HEADER --- */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 z-20 bg-vibe-cream/80 backdrop-blur-md">
        <div>
          <p className="text-vibe-navy/40 text-[10px] font-black tracking-[0.3em] uppercase mb-1">Elite Member</p>
          <h1 className="heading-serif text-3xl text-vibe-navy">
            L'Atelier de <span className="italic font-normal">{profile?.nickname?.split(' ')[0] ?? 'Queen'}</span>
          </h1>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/shop')}
          className="luxury-glass px-5 py-2.5 rounded-full flex items-center gap-2.5 border-vibe-gold/20 shadow-luxury"
        >
          <Diamond size={14} className="text-vibe-gold fill-vibe-gold" />
          <span className="font-black text-vibe-navy text-xs tracking-widest">
            {profile?.diamond_balance ?? 0}
          </span>
        </motion.button>
      </header>

      <main className="px-6 space-y-12 animate-fade-in-up pb-12">
        {/* --- PREMIUM HERO BANNER --- */}
      <section className="relative h-[480px] rounded-[48px] overflow-hidden shadow-luxury-2xl group cursor-pointer"
          onClick={() => router.push('/capture')}>
          <img 
            src="/hero-kbeauty.png" 
            alt="Luxury Atelier"
            className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-vibe-navy/90 via-vibe-navy/30 to-transparent" />
          
          <div className="absolute inset-0 p-12 flex flex-col justify-end items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
              <Sparkles size={12} className="text-vibe-gold fill-vibe-gold" />
              <span className="text-[10px] font-black tracking-[0.4em] text-white uppercase">Vibe Genisys</span>
            </motion.div>
            
            <h2 className="heading-serif text-5xl md:text-7xl text-white mb-6 leading-[1.1]">
              Elevate Your <br />
              <span className="italic">Perspective</span>
            </h2>
            
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-5 bg-white text-vibe-navy rounded-apple-md font-black text-[10px] tracking-[0.3em] uppercase shadow-luxury"
              >
                Start Analysis
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => { e.stopPropagation(); router.push('/ar-mirror'); }}
                className="px-10 py-5 luxury-glass-dark text-white rounded-apple-md font-black text-[10px] tracking-[0.3em] uppercase border-white/10"
              >
                AR Mirror
              </motion.button>
            </div>
          </div>
        </section>

        {/* --- STYLE ATELIER SELECTOR --- */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="heading-serif text-3xl text-vibe-navy">Studio Selection</h3>
            <span className="text-vibe-navy/20 text-[10px] font-black uppercase tracking-[0.3em]">3 Active Vibes</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIBE_CARDS.map((card, i) => (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => handleVibeSelect(card.id)}
                className="group relative p-8 rounded-[40px] luxury-glass border-vibe-navy/5 hover:border-vibe-gold/40 text-left transition-all duration-500 bg-white/40 shadow-luxury"
              >
                <div className={`w-16 h-16 ${card.color} rounded-[24px] flex items-center justify-center text-3xl shadow-luxury group-hover:scale-110 transition-transform mb-8`}>
                  {card.emoji}
                </div>
                <div>
                  <h4 className="heading-serif text-2xl text-vibe-navy mb-2">{card.title}</h4>
                  <p className="text-vibe-navy/40 text-[12px] leading-relaxed italic">{card.desc}</p>
                </div>
                <div className="mt-8 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-vibe-navy/5 text-[10px] font-black text-vibe-navy/40 uppercase tracking-widest">
                     Premium
                   </div>
                   <ChevronRight size={20} className="text-vibe-navy/20 group-hover:text-vibe-gold transition-colors" />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* --- WEEKLY STYLE INSIGHT --- */}
        <section>
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="heading-serif text-3xl text-vibe-navy">Style Insight</h3>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-vibe-gold/10 border border-vibe-gold/20">
              <div className="w-1.5 h-1.5 rounded-full bg-vibe-gold animate-pulse" />
              <span className="text-vibe-gold text-[10px] font-black uppercase tracking-widest italic">Live Atelier</span>
            </div>
          </div>

          <div className="luxury-glass p-12 rounded-[56px] border-vibe-navy/5 shadow-luxury-lg bg-white/60">
            <div className="flex items-end justify-between h-56 gap-6 mb-12">
              {[
                { label: 'Mon', h: '40%', active: false },
                { label: 'Tue', h: '60%', active: false },
                { label: 'Wed', h: '85%', active: true },
                { label: 'Thu', h: '55%', active: false },
                { label: 'Fri', h: '95%', active: false },
                { label: 'Sat', h: '30%', active: false },
                { label: 'Sun', h: '45%', active: false },
              ].map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-6">
                  <div className="w-full relative group">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: day.h }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                      className={`w-full rounded-full transition-all duration-700 ${day.active ? 'bg-vibe-navy' : 'bg-vibe-navy/5 group-hover:bg-vibe-navy/20'}`}
                    />
                    {day.active && (
                      <div className="absolute -top-14 left-1/2 -translate-x-1/2 luxury-glass-dark px-4 py-2 rounded-full text-[10px] text-white font-black tracking-widest whitespace-nowrap shadow-luxury">
                        OPTIMAL
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-black text-vibe-navy/20 uppercase tracking-[0.2em]">{day.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-12 pt-10 border-t border-vibe-navy/5">
              <div className="flex-1">
                <p className="text-[10px] font-black text-vibe-navy/30 uppercase tracking-[0.4em] mb-3">Vibe Consistency</p>
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-light text-vibe-navy tracking-tighter">84.2%</span>
                  <div className="flex items-center gap-1 text-vibe-gold text-[11px] font-black italic">
                    <ChevronRight size={14} className="-rotate-90" /> +12.4%
                  </div>
                </div>
              </div>
              <div className="w-px h-16 bg-vibe-navy/5" />
              <div className="flex-1">
                <p className="text-[10px] font-black text-vibe-navy/30 uppercase tracking-[0.4em] mb-3">Seasonal Palette</p>
                <p className="heading-serif text-3xl text-vibe-navy tracking-tight italic">Summer Cool</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- ELITE PERSPECTIVE --- */}
        <section>
          <div className="luxury-glass p-10 rounded-[48px] border-vibe-gold/10 flex items-center gap-8 bg-gradient-to-br from-white to-vibe-cream/40 shadow-luxury">
            <div className="w-20 h-20 bg-vibe-gold/5 rounded-[24px] flex items-center justify-center shadow-inner border border-vibe-gold/10">
              <Star className="text-vibe-gold" size={32} />
            </div>
            <div className="flex-1">
              <h5 className="heading-serif text-2xl text-vibe-navy mb-2 italic">Elite Perspective</h5>
              <p className="text-vibe-navy/50 text-sm leading-relaxed font-medium">
                Analysis precision increases by <span className="text-vibe-gold font-black">12.4%</span> when 
                using natural daylight. Position yourself exactly <span className="underline decoration-vibe-gold/30 underline-offset-4">1 meter</span> from a north-facing window.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
