'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { Diamond, Sparkles, Camera, ChevronRight, Zap, Star, ShieldCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import type { Profile } from '@/types'

const VIBE_CARDS = [
  {
    id: 'mz_ghibli',
    label: 'MZ 지브리',
    emoji: '🌿',
    desc: '청순 & 내추럴',
    gradient: 'from-[#E0F2F1] to-[#B2DFDB]',
    span: 'col-span-2 row-span-2'
  },
  {
    id: 'business',
    label: '비즈니스',
    emoji: '💼',
    desc: '샤프 & 시크',
    gradient: 'from-[#F1F5F9] to-[#E2E8F0]',
    span: 'col-span-1 row-span-1'
  },
  {
    id: 'trendy',
    label: '트렌디',
    emoji: '🔥',
    desc: '힙 & 볼드',
    gradient: 'from-[#FFF1F2] to-[#FFE4E6]',
    span: 'col-span-1 row-span-1'
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(data)
    }
    fetchProfile()
  }, [supabase])

  function handleVibeSelect(vibeId: string) {
    router.push(`/capture?vibe=${vibeId}`)
  }

  return (
    <div className="min-h-screen bg-vibe-cream pb-24">
      {/* --- TOP NAVIGATION / HEADER --- */}
      <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 z-20 bg-vibe-cream/80 backdrop-blur-md">
        <div>
          <p className="text-vibe-slate/40 text-[10px] font-bold tracking-widest uppercase mb-1">프리미엄 액세스</p>
          <h1 className="heading-serif text-3xl text-vibe-charcoal font-medium">
            벨벳(Velvet) {profile?.nickname?.split(' ')[0] ?? 'Queen'}
          </h1>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/shop')}
          className="luxury-glass px-4 py-2.5 rounded-apple-md flex items-center gap-2 border-vibe-silver/30 shadow-luxury"
        >
          <Diamond size={16} className="text-vibe-primary" />
          <span className="font-bold text-vibe-charcoal text-sm">
            {profile?.diamond_balance ?? 20}
          </span>
        </motion.button>
      </header>

      <main className="px-6 space-y-8 animate-fade-in-up">
        {/* --- HERO STATUS CARD --- */}
        <section>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="luxury-glass-dark p-8 rounded-apple-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-vibe-primary/20 blur-[60px] rounded-full group-hover:bg-vibe-primary/40 transition-colors" />
            
            <div className="relative z-10 flex flex-col items-start gap-4">
              <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter text-white/60 flex items-center gap-1.5 uppercase">
                <Sparkles size={10} className="text-vibe-gold" />
                스페셜 에디션 분석
              </span>
              <h2 className="heading-serif text-white text-3xl leading-snug">
                감추어진 <br />
                나만의 무드 찾기
              </h2>
              
              <motion.button
                whileHover={{ x: 5 }}
                onClick={() => router.push('/capture')}
                className="mt-4 flex items-center gap-2 text-vibe-accent font-bold text-sm tracking-wide"
              >
                분석 시작하기 <ChevronRight size={16} />
              </motion.button>
            </div>

            <div className="absolute bottom-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity">
              <Camera size={80} className="text-white" />
            </div>
          </motion.div>
        </section>

        {/* --- MOOD SELECTION (BENTO GRID) --- */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-vibe-charcoal font-bold text-lg tracking-tight">오늘의 무드 선택</h3>
            <span className="text-vibe-slate/30 text-xs font-medium">무드 새로고침</span>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[400px]">
            {VIBE_CARDS.map((card, i) => (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVibeSelect(card.id)}
                className={`relative overflow-hidden rounded-apple-lg p-6 flex flex-col justify-between text-left group transition-all duration-500 shadow-luxury hover:shadow-luxury-lg ${card.gradient} ${card.span}`}
              >
                {/* Subtle Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {card.emoji}
                  </span>
                  <div className="luxury-glass px-2.5 py-1 rounded-full text-[10px] font-bold text-vibe-slate/60 flex items-center gap-1">
                    <Diamond size={10} /> 5
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-vibe-charcoal/40 text-[10px] font-extrabold tracking-widest uppercase mb-0.5">{card.desc}</p>
                  <h4 className="text-vibe-charcoal font-bold text-xl tracking-tight">{card.label}</h4>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* --- CURATED TIPS --- */}
        <section>
          <div className="luxury-glass p-6 rounded-apple-lg border-vibe-gold/10 flex items-center gap-5 bg-gradient-to-r from-vibe-cream to-white">
            <div className="w-14 h-14 bg-vibe-gold/10 rounded-apple-md flex items-center justify-center">
              <Star className="text-vibe-gold" />
            </div>
            <div>
              <h5 className="text-vibe-charcoal font-bold text-sm mb-0.5 tracking-tight">전문가 스타일링 팁</h5>
              <p className="text-vibe-slate/50 text-[11px] leading-relaxed">
                어두운 배경보다 밝은 실내에서 촬영 시 <br />
                인공지능의 피부톤 분석 오차가 12% 감소합니다.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
