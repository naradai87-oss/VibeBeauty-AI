import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import AmbientBackground from '@/components/shared/AmbientBackground'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'VibeBeauty AI | Premium Personal Stylist',
  description: 'AI-driven personal styling, color analysis, and curated fashion recommendations for the modern individual.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1E293B',
}

import { Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans text-vibe-charcoal selection:bg-vibe-primary/20">
        {/* --- GLOBAL HEADER --- */}
        <header className="fixed top-0 left-0 right-0 z-[999] px-8 py-6 flex items-center justify-between bg-vibe-cream/80 backdrop-blur-md border-b border-vibe-silver/10">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 luxury-glass rounded-apple-md flex items-center justify-center transition-transform group-hover:scale-110">
                <Sparkles size={16} className="text-vibe-primary" />
              </div>
              <span className="heading-serif italic text-lg text-vibe-charcoal tracking-wider">VibeBeauty</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/login" prefetch={false} className="text-xs font-bold text-vibe-slate/60 hover:text-vibe-primary uppercase tracking-widest transition-colors">
              로그인
            </Link>
            <Link href="/signup" prefetch={false}>
              <button className="px-5 py-2.5 bg-vibe-charcoal text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-vibe-primary transition-all shadow-luxury">
                시작하기
              </button>
            </Link>
          </div>
        </header>

        <AmbientBackground />
        {children}
      </body>
    </html>
  )
}
