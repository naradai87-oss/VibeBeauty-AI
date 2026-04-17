'use client'

import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { Diamond, Sparkles, Camera, ChevronRight, Star } from 'lucide-react'
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

interface Props {
  profile: Profile | null
}

export default function DashboardClient({ profile }: Props) {
  const router = useRouter()

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
            {profile?.diamond_balance ?? 0}
          </span>
        </motion.button>
      </header>

      <main className="px-6 space-y-12 animate-fade-in-up pb-12">
        {/* --- PREMIUM HERO BANNER --- */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-64 rounded-[32px] overflow-hidden shadow-luxury-lg group cursor-pointer"
            onClick={() => router.push('/capture')}
          >
            {/* Background Image (Generated Premium Asset) */}
            <div className="absolute inset-0">
              <img 
                src="/premium_beauty_dashboard_banner_1776444451087.png" 
                alt="Premium Aesthetic" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-vibe-charcoal/80 via-vibe-charcoal/40 to-transparent" />
            </div>

            <div className="relative z-10 h-full p-8 flex flex-col justify-center items-start space-y-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <Sparkles size={12} className="text-vibe-gold" />
                <span className="text-[9px] font-bold tracking-[0.2em] text-white uppercase">Elite AI Experience</span>
              </div>
              
              <div className="space-y-1">
                <h2 className="heading-serif text-white text-3xl leading-tight">
                  나만의 <span className="italic">시그니처</span> <br />
                  무드를 발견하세요
                </h2>
                <p className="text-white/60 text-[10px] font-medium tracking-wide">
                  AI 기반 초정밀 퍼스널 컬러 & 체형 분석 서비스
                </p>
              </div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-vibe-primary font-bold text-xs tracking-[0.2em] uppercase pt-2"
              >
                Analysis Start <ChevronRight size={14} />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* --- MOOD SELECTION (BENTO GRID) --- */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-vibe-charcoal font-bold text-lg tracking-tight">오늘의 무드 선택</h3>
            <span className="text-vibe-slate/30 text-xs font-medium">무드 새로고침</span>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[440px]">
            {VIBE_CARDS.map((card, i) => (
              <motion.button
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVibeSelect(card.id)}
                className={`relative overflow-hidden rounded-[24px] p-7 flex flex-col justify-between text-left group transition-all duration-500 shadow-luxury hover:shadow-luxury-lg ${card.gradient} ${card.span}`}
              >
                {/* 배경 이미지 (MZ 지브리 전용) */}
                {card.id === 'mz_ghibli' && (
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="/mz_ghibli_style_bg_1776444472020.png" 
                      alt="Ghibli Vibe" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>
                )}

                {/* Subtle Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className={`w-12 h-12 luxury-glass rounded-2xl flex items-center justify-center text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-500 ${card.id === 'mz_ghibli' ? 'bg-white/20 border-white/30' : ''}`}>
                    {card.emoji}
                  </div>
                  <div className={`luxury-glass px-3 py-1.5 rounded-full text-[9px] font-black flex items-center gap-1.5 ${card.id === 'mz_ghibli' ? 'bg-white/20 text-white border-white/30' : 'text-vibe-slate/60'}`}>
                    <Diamond size={10} className={card.id === 'mz_ghibli' ? 'text-vibe-gold' : 'text-vibe-primary'} /> 5
                  </div>
                </div>

                <div className="relative z-10">
                  <p className={`text-[9px] font-black tracking-[0.2em] uppercase mb-1 ${card.id === 'mz_ghibli' ? 'text-white/60' : 'text-vibe-charcoal/40'}`}>
                    {card.desc}
                  </p>
                  <h4 className={`font-bold text-2xl tracking-tight ${card.id === 'mz_ghibli' ? 'text-white' : 'text-vibe-charcoal'}`}>
                    {card.label}
                  </h4>
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
