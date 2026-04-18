import type { Metadata } from 'next'
import { Manrope, Noto_Serif } from 'next/font/google'
import AmbientBackground from '@/components/shared/AmbientBackground'
import './globals.css'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${manrope.variable} ${notoSerif.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans text-vibe-navy selection:bg-vibe-gold/20">
        <AmbientBackground />
        
        <main>
          {children}
        </main>

        {/* --- GLOBAL HEADER (Stitch Theme) --- */}
        <header className="fixed top-0 left-0 right-0 z-[9999] px-8 py-6 flex items-center justify-between bg-vibe-cream/80 backdrop-blur-xl border-b border-vibe-navy/5 shadow-sm">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 luxury-glass rounded-apple-md flex items-center justify-center transition-transform group-hover:scale-110">
                <Sparkles size={16} className="text-vibe-gold" />
              </div>
              <span className="heading-serif italic text-xl text-vibe-navy tracking-tight">VibeBeauty</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="/login" prefetch={false} className="text-[10px] font-black text-vibe-navy/40 hover:text-vibe-navy uppercase tracking-[0.3em] transition-colors italic">
              Access
            </Link>
            <Link href="/signup" prefetch={false}>
              <button className="px-6 py-3 bg-vibe-navy text-white rounded-apple-md text-[10px] font-black uppercase tracking-[0.3em] hover:bg-vibe-charcoal transition-all shadow-luxury">
                L'Atelier
              </button>
            </Link>
          </div>
        </header>
      </body>
    </html>
  )
}
