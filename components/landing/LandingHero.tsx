import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function LandingHero() {
  return (
    <div className="relative z-[50] max-w-4xl px-6 text-center">
      <div
        className="animate-fade-in-up inline-flex items-center gap-2 px-5 py-2 rounded-full luxury-glass border-vibe-gold/20 mb-10 shadow-luxury"
        style={{ animationDelay: '0.1s' }}
      >
        <Star className="w-3.5 h-3.5 text-vibe-gold fill-vibe-gold" />
        <span className="text-[10px] font-black tracking-[0.3em] text-vibe-navy uppercase">
          L'Atelier de Vibe
        </span>
      </div>

      <h1 
        className="animate-fade-in-up heading-serif text-7xl md:text-[10rem] font-light text-vibe-navy leading-[0.95] mb-12 tracking-tighter"
        style={{ animationDelay: '0.3s' }}
      >
        Your <span className="italic font-normal">Personal</span> <br />
        <span className="gradient-text font-medium italic">Vibe</span>
      </h1>

      <p
        className="animate-fade-in-up text-lg md:text-xl text-vibe-navy/60 max-w-xl mx-auto leading-relaxed mb-16 font-medium"
        style={{ animationDelay: '0.5s' }}
      >
        The perfect fusion of data and intuition. <br className="hidden md:block" />
        Experience the world's most sophisticated AI styling atelier.
      </p>

      <div 
        className="animate-fade-in-up flex flex-col items-center gap-8"
        style={{ animationDelay: '0.7s' }}
      >
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
