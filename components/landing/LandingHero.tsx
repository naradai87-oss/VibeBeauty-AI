import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function LandingHero() {
  return (
    <div className="relative z-[50] max-w-4xl px-6 text-center">
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full luxury-glass border-vibe-silver/40 mb-10 shadow-luxury"
      >
        <Star className="w-3.5 h-3.5 text-vibe-gold fill-vibe-gold" />
        <span className="text-[10px] font-black tracking-[0.25em] text-vibe-charcoal uppercase">
          The Evolution of Personal Style
        </span>
      </div>

      <h1 
        className="heading-serif text-6xl md:text-9xl font-light text-vibe-charcoal leading-[1.1] mb-12 tracking-tighter"
      >
        당신만의 <br />
        <span className="italic gradient-text font-medium">분위기</span>를 찾으세요
      </h1>

      <p
        className="text-lg md:text-xl text-vibe-slate/80 max-w-xl mx-auto leading-relaxed mb-16 font-medium"
      >
        데이터와 감각의 완벽한 조화. <br className="hidden md:block" />
        업계 최고 수준의 AI 스타일링 솔루션을 경험하세요.
      </p>

      <div className="flex flex-col items-center gap-8">
        <Link href="/signup" prefetch={false} className="w-full max-w-xs">
          <button className="btn-premium w-full group flex items-center justify-center gap-4 py-6 shadow-glow-primary">
            <span className="text-sm uppercase tracking-[0.3em] font-black">무료 분석 시작하기</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>
      </div>
    </div>
  )
}
