'use client'

import { motion } from 'motion/react'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function LandingHero() {
  return (
    <div className="relative z-[50] max-w-4xl px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full luxury-glass border-vibe-silver/40 mb-10 shadow-luxury"
      >
        <Star className="w-3.5 h-3.5 text-vibe-gold fill-vibe-gold" />
        <span className="text-[10px] font-black tracking-[0.25em] text-vibe-charcoal uppercase">
          The Evolution of Personal Style
        </span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="heading-serif text-6xl md:text-9xl font-light text-vibe-charcoal leading-[1.1] mb-12 tracking-tighter"
      >
        당신만의 <br />
        <span className="italic gradient-text font-medium">분위기</span>를 찾으세요
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-lg md:text-xl text-vibe-slate/80 max-w-xl mx-auto leading-relaxed mb-16 font-medium"
      >
        데이터와 감각의 완벽한 조화. <br className="hidden md:block" />
        업계 최고 수준의 AI 스타일링 솔루션을 경험하세요.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex flex-col items-center gap-8"
      >
        <Link href="/signup" prefetch={false} className="w-full max-w-xs">
          <button className="btn-premium w-full group flex items-center justify-center gap-4 py-6 shadow-glow-primary">
            <span className="text-sm uppercase tracking-[0.3em] font-black">무료 분석 시작하기</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
      </motion.div>
    </div>
  )
}
