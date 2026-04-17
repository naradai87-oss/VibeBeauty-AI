'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Sparkles, Diamond } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { analyzeStyle } from '@/lib/styleAnalyzer'
import CameraView from '@/components/capture/CameraView'
import TipCarousel from '@/components/capture/TipCarousel'
import AnalysisProgress from '@/components/capture/AnalysisProgress'
import type { VibeType } from '@/types'

const VIBE_CONFIG = {
  mz_ghibli: { color: '#8B5CF6', label: 'MZ 지브리', emoji: '🌿' },
  business: { color: '#1E293B', label: '비즈니스', emoji: '💼' },
  trendy: { color: '#F472B6', label: '트렌디', emoji: '🔥' },
}

function CaptureContent() {
  const router = useRouter()
  const params = useSearchParams()
  const vibeType = (params.get('vibe') ?? 'mz_ghibli') as VibeType
  const config = VIBE_CONFIG[vibeType] ?? VIBE_CONFIG.mz_ghibli

  const [phase, setPhase] = useState<'camera' | 'preview' | 'analyzing'>('camera')
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null)
  const [capturedFile, setCapturedFile] = useState<File | null>(null)
  const [error, setError] = useState('')

  function handleCapture(file: File, url: string) {
    setCapturedFile(file)
    setCapturedUrl(url)
    setPhase('preview')
  }

  async function handleAnalyze() {
    if (!capturedFile) return
    setPhase('analyzing')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    try {
      const result = await analyzeStyle(capturedFile, vibeType, user.id)
      router.push(`/report/${result.id}`)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '분석 중 기술적 결함이 발생했습니다.'
      setError(message)
      setPhase('preview')
    }
  }

  return (
    <div className="min-h-screen bg-vibe-charcoal flex flex-col font-sans">
      {/* Header */}
      <header className="flex items-center gap-5 px-6 pt-14 pb-6">
        <motion.button 
          whileTap={{ scale: 0.9 }} 
          onClick={() => router.back()}
          className="w-12 h-12 rounded-full luxury-glass-dark flex items-center justify-center border-white/10"
        >
          <ArrowLeft size={20} className="text-white" />
        </motion.button>
        <div>
          <h1 className="heading-serif text-white font-medium text-xl flex items-center gap-2">
            {config.emoji} {config.label} <span className="text-white/40 font-sans text-xs tracking-widest uppercase ml-1">Analysis Mode</span>
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Diamond size={10} className="text-vibe-primary" />
            <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">5 Diamonds Service</span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 flex flex-col gap-6">
        <AnimatePresence mode="wait">
          {phase === 'camera' && (
            <motion.div 
              key="camera" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col gap-6"
            >
              <div className="rounded-apple-lg overflow-hidden border border-white/10 shadow-luxury-lg">
                <CameraView onCapture={handleCapture} vibeColor={config.color} />
              </div>
              <TipCarousel />
            </motion.div>
          )}

          {phase === 'preview' && capturedUrl && (
            <motion.div 
              key="preview" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col gap-6"
            >
              <div className="relative rounded-apple-lg overflow-hidden aspect-[3/4] border border-white/20 shadow-luxury-lg">
                <img src={capturedUrl} alt="Captured Profile" className="w-full h-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-vibe-primary animate-pulse" />
                  <span className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase">Selection Ready</span>
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="text-red-400 text-[10px] font-bold text-center bg-red-900/20 border border-red-900/30 rounded-apple-md py-3 uppercase tracking-wider">
                  ⚠️ {error}
                </motion.div>
              )}

              <div className="flex gap-4">
                <motion.button whileTap={{ scale: 0.95 }}
                  onClick={() => setPhase('camera')}
                  className="flex-1 py-5 luxury-glass-dark rounded-apple-md text-white/60 text-xs font-bold uppercase tracking-widest border-white/5">
                  Retake
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }}
                  onClick={handleAnalyze}
                  className="flex-[2] py-5 bg-white text-vibe-charcoal rounded-apple-md text-xs font-bold uppercase tracking-[0.2em] shadow-luxury hover:bg-vibe-silver transition-colors"
                >
                  <span className="flex items-center justify-center gap-2">
                    Start Analysis <Sparkles size={14} className="text-vibe-primary" />
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {phase === 'analyzing' && (
            <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex-1 flex items-center justify-center">
              <AnalysisProgress />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-8 text-center text-white/10 text-[9px] font-bold tracking-[0.4em] uppercase">
        Digital Renaissance by VibeBeauty
      </footer>
    </div>
  )
}

export default function CapturePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-vibe-charcoal flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-vibe-primary/20 border-t-vibe-primary rounded-full animate-spin" />
      </div>
    }>
      <CaptureContent />
    </Suspense>
  )
}
