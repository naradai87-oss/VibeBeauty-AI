'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { useRef } from 'react'
import { ArrowLeft, Share2, Diamond, Download } from 'lucide-react'
import ReportHero from '@/components/report/ReportHero'
import SkinToneCard from '@/components/report/SkinToneCard'
import BodyAnalysisCard from '@/components/report/BodyAnalysisCard'
import ProductRecommendation from '@/components/report/ProductRecommendation'
import type { StyleLog, InventoryItem, Product } from '@/types'

interface Props {
  log: StyleLog
  inventory: InventoryItem[]
  products: Product[]
}

export default function ReportClient({ log, inventory, products }: Props) {
  const router = useRouter()
  const reportRef = useRef<HTMLDivElement>(null)

  async function handleDownload() {
    if (!reportRef.current) return
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(reportRef.current, { 
        scale: 2, 
        useCORS: true,
        logging: false,
        windowWidth: 1200
      })
      const link = document.createElement('a')
      link.download = `vibe-report-${log.id.slice(0, 8)}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Report download failed:', err)
    }
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: 'VibeBeauty AI Report',
        text: `Check out my ${log.color_season} style analysis! ✨`,
        url: window.location.href
      }).catch(console.error)
    }
  }

  return (
    <div className="min-h-screen bg-vibe-cream selection:bg-vibe-primary selection:text-white pb-24">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 luxury-glass border-b border-vibe-silver/10 px-6 py-5 flex items-center justify-between">
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          onClick={() => router.back()}
          className="w-12 h-12 luxury-glass rounded-full flex items-center justify-center border-vibe-silver/20"
        >
          <ArrowLeft size={20} className="text-vibe-charcoal" />
        </motion.button>
        
        <div className="text-center">
          <p className="text-[10px] font-bold text-vibe-slate/30 uppercase tracking-[0.3em] mb-0.5">Atelier Report</p>
          <h1 className="heading-serif text-xl text-vibe-charcoal font-medium">Style Genesis</h1>
        </div>

        <div className="flex items-center gap-2">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleDownload}
            className="w-12 h-12 luxury-glass rounded-full flex items-center justify-center border-vibe-silver/20"
          >
            <Download size={18} className="text-vibe-charcoal/40" />
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="w-12 h-12 luxury-glass rounded-full flex items-center justify-center border-vibe-silver/20"
          >
            <Share2 size={18} className="text-vibe-charcoal/40" />
          </motion.button>
        </div>
      </header>

      <main ref={reportRef} className="px-6 py-8 flex flex-col gap-8 animate-fade-in-up bg-vibe-cream">
        {/* Main Sections */}
        <section className="space-y-4">
          <ReportHero log={log} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <SkinToneCard log={log} />
             <BodyAnalysisCard log={log} />
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="heading-serif text-2xl text-vibe-charcoal italic">Curated Selection</h3>
            <span className="text-[10px] font-bold text-vibe-primary uppercase tracking-widest">Exclusive Match</span>
          </div>
          <ProductRecommendation products={products} inventory={inventory} />
        </section>

        {/* Footer Action */}
        <footer className="pt-8 border-t border-vibe-silver/10">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/capture')}
            className="btn-premium w-full flex items-center justify-center gap-4 py-6"
          >
            <Diamond className="w-5 h-5 text-vibe-gold" />
            <span className="text-sm uppercase tracking-[0.2em] font-black">Re-Analyze Portrait</span>
          </motion.button>
          <p className="text-center text-[10px] text-vibe-slate/20 mt-8 tracking-widest uppercase">
            Designed for the Discerning individual
          </p>
        </footer>
      </main>
    </div>
  )
}
