import { Sparkles, ShieldCheck, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import LandingHero from '@/components/landing/LandingHero'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-vibe-cream selection:bg-vibe-primary selection:text-white pt-20">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Hero Image Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero-beauty.png" 
            alt="Premium Beauty"
            fill
            className="object-cover opacity-90 brightness-[1.05]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-vibe-cream/40 via-transparent to-vibe-cream z-[1]" />
          <div className="absolute inset-0 bg-white/5 z-[2]" />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 w-full flex justify-center">
          <LandingHero />
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="px-6 py-32 max-w-6xl mx-auto relative z-20">
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
            <Link href={feature.href} key={i} prefetch={false} className="group">
              <div className="p-12 rounded-apple-xl border border-vibe-silver/30 bg-white shadow-luxury-lg flex flex-col items-center text-center space-y-8 h-full cursor-pointer transition-all duration-300 hover:-translate-y-2">
                <div className={`w-20 h-20 ${feature.bgColor} rounded-apple-lg flex items-center justify-center shadow-inner`}>
                  <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-vibe-charcoal tracking-tight">{feature.title}</h3>
                  <p className="text-vibe-slate/60 text-sm leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-24 border-t border-vibe-silver/20 text-center bg-white relative z-20">
        <div className="flex flex-col items-center space-y-10">
          <div className="flex items-center gap-3 opacity-40">
            <Sparkles className="w-6 h-6 text-vibe-primary" />
            <span className="heading-serif italic text-2xl text-vibe-charcoal tracking-widest uppercase">VibeBeauty AI</span>
          </div>
          
          <div className="flex gap-10 text-[10px] font-black text-vibe-slate/40 tracking-[0.2em] uppercase">
            <Link href="/terms" prefetch={false} className="hover:text-vibe-primary transition-colors">Terms</Link>
            <Link href="/privacy" prefetch={false} className="hover:text-vibe-primary transition-colors">Privacy</Link>
            <Link href="/partners" prefetch={false} className="hover:text-vibe-primary transition-colors">Partners</Link>
          </div>
          
          <p className="text-[10px] text-vibe-slate/30 tracking-[0.3em] font-medium">
            © 2024 VIBEBEAUTY AI. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  )
}
