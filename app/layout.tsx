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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans text-vibe-charcoal selection:bg-vibe-primary/20">
        <AmbientBackground />
        {children}
      </body>
    </html>
  )
}
