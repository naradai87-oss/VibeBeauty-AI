'use client'

import { motion } from 'motion/react'
import { ArrowRight, Star, Sparkles, ShieldCheck, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-vibe-cream selection:bg-vibe-primary selection:text-white">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero Image Background */}
        <div className="absolute inset-0 z-0 scale-105 pointer-events-none">
          <Image 
            src="/hero-beauty.png" 
            alt="Premium Beauty"
            fill
            className="object-cover opacity-80 brightness-[1.02] transform motion-safe:animate-pulse-subtle"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-vibe-cream/40 via-transparent to-vibe-cream" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full luxury-glass border-vibe-silver/30 mb-8"
          >
            <Star className="w-3.5 h-3.5 text-vibe-gold fill-vibe-gold" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-vibe-slate uppercase">
              퍼스널 스타일의 진화 (나만의 스타일 변화)
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="heading-serif text-7xl md:text-9xl font-light text-vibe-charcoal leading-[1.05] mb-10 tracking-tight"
          >
            당신만의 <br />
            <span className="italic gradient-text font-medium">분위기</span>를 찾으세요
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-vibe-slate/70 max-w-xl mx-auto leading-relaxed mb-12 font-light"
          >
            당신만을 위해 설계된 업계 최고 수준의 <br className="hidden md:block" />
            AI 퍼스널 스타일링 솔루션을 경험하세요.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col items-center gap-6"
          >
            <Link href="/signup" className="w-full max-w-xs">
              <button className="btn-premium w-full group flex items-center justify-center gap-3">
                분석 시작하기
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            
            <Link href="/login" className="text-vibe-slate/40 hover:text-vibe-primary transition-colors text-sm font-medium tracking-wide">
              이미 회원이신가요? 로그인 →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="px-6 py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: "AI 컬러 분석",
              desc: "ITA 지수(피부 밝기 측정 지수) 기반의 초정밀 피부톤 측정과 계절별 퍼스널 컬러 고도화 진단",
              bgColor: "bg-purple-50",
              iconColor: "text-purple-500",
              href: "/signup"
            },
            {
              icon: Zap,
              title: "바디 쉐이핑",
              desc: "전신 실루엣(몸의 전체적인 윤곽) 분석을 통한 장점 극대화 코디네이션 및 스타일 제안",
              bgColor: "bg-amber-50",
              iconColor: "text-vibe-gold",
              href: "/signup"
            },
            {
              icon: ShieldCheck,
              title: "프리미엄 큐레이션",
              desc: "엄선된 럭셔리 브랜드와 쿠팡 파트너스(상품 추천 시스템) 연계 실시간 최저가 매칭(맞춤형 추천)",
              bgColor: "bg-slate-50",
              iconColor: "text-vibe-slate",
              href: "/signup"
            }
          ].map((feature, i) => (
            <Link href={feature.href} key={i}>
              <motion.div
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                className="p-10 rounded-apple-lg border border-vibe-silver/20 bg-white/50 luxury-glass flex flex-col items-center text-center space-y-6 h-full cursor-pointer"
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-apple-md flex items-center justify-center`}>
                  <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-vibe-charcoal">{feature.title}</h3>
                <p className="text-vibe-slate/60 text-sm leading-relaxed font-light">
                  {feature.desc}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-vibe-silver/20 text-center">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex items-center gap-3 opacity-30">
            <Sparkles className="w-5 h-5 text-vibe-primary" />
            <span className="heading-serif italic text-xl text-vibe-charcoal tracking-wide">VibeBeauty AI</span>
          </div>
          
          <div className="flex gap-8 text-xs font-medium text-vibe-slate/30 tracking-widest uppercase">
            <Link href="/terms" className="hover:text-vibe-primary transition-colors">이용약관</Link>
            <Link href="/privacy" className="hover:text-vibe-primary transition-colors">개인정보처리방침</Link>
            <Link href="/partners" className="hover:text-vibe-primary transition-colors">파트너사</Link>
          </div>
          
          <p className="text-[10px] text-vibe-slate/20 tracking-wider">
            © 2024 VibeBeauty AI. 당신만을 위한 프리미엄 스타일링 경험.
          </p>
        </div>
      </footer>
    </div>
  )
}
