'use client'

import { motion } from 'motion/react'
import { ArrowRight, Star, Sparkles, ShieldCheck, Zap, Diamond } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-vibe-cream selection:bg-vibe-primary selection:text-white">
      {/* --- HEADER NAVIGATION --- */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-8 py-6 flex items-center justify-between backdrop-blur-sm bg-vibe-cream/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 luxury-glass rounded-apple-md flex items-center justify-center">
            <Sparkles size={16} className="text-vibe-primary" />
          </div>
          <span className="heading-serif italic text-lg text-vibe-charcoal tracking-wider">VibeBeauty</span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-xs font-bold text-vibe-slate/60 hover:text-vibe-primary uppercase tracking-widest transition-colors">
            로그인
          </Link>
          <Link href="/signup">
            <button className="px-5 py-2.5 bg-vibe-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-vibe-primary transition-all shadow-luxury">
              시작하기
            </button>
          </Link>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Image Background */}
        <div className="absolute inset-0 z-0 scale-105">
          <Image 
            src="/hero-beauty.png" 
            alt="Premium Beauty"
            fill
            className="object-cover opacity-90 brightness-[1.05]"
            priority
          />
          {/* Enhanced Overlays for Visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-vibe-cream/60 via-vibe-cream/20 to-vibe-cream z-[1]" />
          <div className="absolute inset-0 bg-white/10 z-[2] backdrop-blur-[1px]" />
        </div>

        {/* Hero Content Overlay - Increased Z-INDEX */}
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
            <Link href="/signup" className="w-full max-w-xs">
              <button className="btn-premium w-full group flex items-center justify-center gap-4 py-6 shadow-glow-primary">
                <span className="text-sm uppercase tracking-[0.3em] font-black">무료 분석 시작하기</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="px-6 py-32 max-w-6xl mx-auto relative z-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              icon: Sparkles,
              title: "AI 컬러 분석",
              desc: "ITA 지수 기반의 초정밀 피부톤 측정과 계절별 퍼스널 컬러 진단",
              bgColor: "bg-purple-50",
              iconColor: "text-purple-500",
              href: "/signup"
            },
            {
              icon: Zap,
              title: "바디 쉐이핑",
              desc: "전신 실루엣 분석을 통한 장점 극대화 코디네이션 제안",
              bgColor: "bg-amber-50",
              iconColor: "text-vibe-gold",
              href: "/signup"
            },
            {
              icon: ShieldCheck,
              title: "프리미엄 큐레이션",
              desc: "럭셔리 브랜드와 실시간 최저가 매칭 맞춤형 추천",
              bgColor: "bg-slate-50",
              iconColor: "text-vibe-slate",
              href: "/signup"
            }
          ].map((feature, i) => (
            <Link href={feature.href} key={i}>
              <motion.div
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                className="p-12 rounded-apple-xl border border-vibe-silver/30 bg-white shadow-luxury-lg flex flex-col items-center text-center space-y-8 h-full cursor-pointer"
              >
                <div className={`w-20 h-20 ${feature.bgColor} rounded-apple-lg flex items-center justify-center shadow-inner`}>
                  <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-vibe-charcoal tracking-tight">{feature.title}</h3>
                  <p className="text-vibe-slate/60 text-sm leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-24 border-t border-vibe-silver/20 text-center bg-white relative z-50">
        <div className="flex flex-col items-center space-y-10">
          <div className="flex items-center gap-3 opacity-40">
            <Sparkles className="w-6 h-6 text-vibe-primary" />
            <span className="heading-serif italic text-2xl text-vibe-charcoal tracking-widest uppercase">VibeBeauty AI</span>
          </div>
          
          <div className="flex gap-10 text-[10px] font-black text-vibe-slate/40 tracking-[0.2em] uppercase">
            <Link href="/terms" className="hover:text-vibe-primary transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-vibe-primary transition-colors">Privacy</Link>
            <Link href="/partners" className="hover:text-vibe-primary transition-colors">Partners</Link>
          </div>
          
          <p className="text-[10px] text-vibe-slate/30 tracking-[0.3em] font-medium">
            © 2024 VIBEBEAUTY AI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}
