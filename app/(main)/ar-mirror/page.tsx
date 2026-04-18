'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight, ChevronLeft, Check, Info, Mic, Sparkles as SparklesIcon } from 'lucide-react'
import ARGuideOverlay from '@/components/ar/ARGuideOverlay'
import BeautyConcierge from '@/components/ar/BeautyConcierge'

const TUTORIAL_STEPS = [
  {
    id: 1,
    product: 'Signature Velvet Tint',
    instruction: 'Apply to the center of your lips',
    area: 'lips',
    tip: 'Blend outwards for a natural gradient look.',
    guideColor: '#EC4899',
    emoji: '💋',
    brand: 'HERA'
  },
  {
    id: 2,
    product: 'Luminous Glow Cushion',
    instruction: 'Gently pat on the T-zone',
    area: 'face',
    tip: 'Less is more for that inner-glow finish.',
    guideColor: '#F59E0B',
    emoji: '✨',
    brand: 'DIOR'
  },
  {
    id: 3,
    product: 'Ultra-Fine Eyeliner',
    instruction: 'Draw a thin wing outwards',
    area: 'eyes',
    tip: 'Keep your wrist stable for a sharp line.',
    guideColor: '#7C3AED',
    emoji: '👁️',
    brand: 'CHANEL'
  },
]

const TRYON_ITEMS = [
  { id: 'glasses', label: 'Classic Frame', icon: '👓' },
  { id: 'earrings', label: 'Gold Hoops', icon: '💍' },
  { id: 'hat', label: 'Beret', icon: '👒' },
]

const AI_FEEDBACK = [
  '잘하고 있어요! 💪',
  '완벽해요! ✨',
  '너무 예뻐요! 🌸',
  '바이브 느껴지는데요? 💜',
  '프로 메이크업 아티스트 같아요! 👑',
]

export default function ARMirrorPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [stepIdx, setStepIdx] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [completed, setCompleted] = useState<number[]>([])
  const [activeTryOn, setActiveTryOn] = useState<string | null>(null)
  const [conciergeMsg, setConciergeMsg] = useState('Welcome to your Atelier session.')
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [isTrackingLost, setIsTrackingLost] = useState(false)
  const [isLowLight, setIsLowLight] = useState(false)

  // Simulate environmental issues
  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.95) setIsTrackingLost(true)
      else setIsTrackingLost(false)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const step = TUTORIAL_STEPS[stepIdx]

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 720 }, height: { ideal: 960 } },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
    } catch (err) {
      console.error('카메라 접근 실패:', err)
    }
  }, [])

  useEffect(() => {
    startCamera()
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()) }
  }, [startCamera])

  function showAiFeedback() {
    const msg = AI_FEEDBACK[Math.floor(Math.random() * AI_FEEDBACK.length)]
    setFeedback(msg)
    setShowFeedback(true)
    setTimeout(() => setShowFeedback(false), 2500)
  }

  function handleNext() {
    setCompleted(prev => [...prev, step.id])
    showAiFeedback()
    setTimeout(() => {
      if (stepIdx < TUTORIAL_STEPS.length - 1) {
        setStepIdx(i => i + 1)
      }
    }, 1200)
  }

  function handlePrev() {
    if (stepIdx > 0) setStepIdx(i => i - 1)
  }

  const allDone = completed.length === TUTORIAL_STEPS.length

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between px-6 pt-14 pb-4">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => router.back()}
          className="w-10 h-10 luxury-glass-dark rounded-full flex items-center justify-center border-white/10"
        >
          <ArrowLeft size={20} className="text-white" />
        </motion.button>
        <div className="text-center">
          <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-0.5">Atelier AR</p>
          <h1 className="heading-serif text-white font-medium">Virtual Mirror</h1>
        </div>
        <div className="text-white/50 text-[10px] font-black tracking-widest">{stepIdx + 1}/{TUTORIAL_STEPS.length}</div>
      </div>

      {/* 카메라 뷰 */}
      <div className="relative flex-1 mx-6 rounded-3xl overflow-hidden bg-gray-900">
        <video ref={videoRef} playsInline muted
          className="w-full h-full object-cover scale-x-[-1]" />

        <BeautyConcierge message={conciergeMsg} isVisible={true} />

          guideColor={step.guideColor} 
          activeTryOn={activeTryOn} 
        />

        {/* Environmental Warnings */}
        <AnimatePresence>
          {isTrackingLost && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-vibe-charcoal/40 backdrop-blur-md flex items-center justify-center p-12 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full luxury-glass border-white/20 flex items-center justify-center mx-auto">
                  <Info className="text-white animate-pulse" />
                </div>
                <h3 className="heading-serif text-white text-xl">Adjust Your Position</h3>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Tracking Lost • Please face the camera</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Privacy Badge */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1 rounded-full luxury-glass-dark border-white/5 opacity-40">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
           <span className="text-[8px] font-black text-white uppercase tracking-widest">Secured • Local Processing</span>
        </div>

        {/* AI 피드백 토스트 & Voice Status */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 luxury-glass-dark px-6 py-3 rounded-2xl border-white/10">
              <p className="text-white font-bold text-sm text-center">{feedback}</p>
            </motion.div>
          )}
          {isVoiceActive && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
              <div className="flex gap-1 items-center h-8">
                {[1,2,3,4,5].map(i => (
                  <motion.div key={i} 
                    animate={{ height: [10, 24, 10] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 bg-vibe-primary rounded-full" />
                ))}
              </div>
              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">Listening...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 완료 배지 */}
        {allDone && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={48} className="text-white" />
              </div>
              <h2 className="text-white text-2xl font-bold">튜토리얼 완료!</h2>
              <p className="text-white/70 mt-2">오늘도 아름다운 하루 되세요 🌸</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* 하단 튜토리얼 카드 & Try-on Selector */}
      <div className="px-6 py-4 space-y-4">
        {/* Try-on Selector */}
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsVoiceActive(!isVoiceActive)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isVoiceActive ? 'bg-vibe-primary shadow-luxury' : 'luxury-glass-dark border-white/10'}`}
          >
            <Mic size={18} className="text-white" />
          </motion.button>
          <div className="w-px h-6 bg-white/10 mx-1" />
          {TRYON_ITEMS.map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTryOn(activeTryOn === item.id ? null : item.id)}
              className={`flex-shrink-0 px-4 py-3 rounded-2xl luxury-glass-dark border border-white/10 flex items-center gap-2 transition-all ${activeTryOn === item.id ? 'bg-white/20 border-white/40 shadow-luxury' : ''}`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">{item.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={stepIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="luxury-glass-dark rounded-[32px] p-6 border border-white/10 shadow-luxury-2xl">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner"
                style={{ backgroundColor: `${step.guideColor}20` }}>
                {step.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                   <span className="text-[8px] font-black text-vibe-gold uppercase tracking-[0.2em]">{step.brand}</span>
                   <div className="w-1 h-1 rounded-full bg-white/20" />
                   <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">{step.product}</p>
                </div>
                <p className="text-white font-medium text-lg heading-serif">{step.instruction}</p>
                <p className="text-white/30 text-[10px] mt-2 font-medium italic">"{step.tip}"</p>
              </div>
            </div>

            {/* 스텝 인디케이터 */}
            <div className="flex gap-1.5 mt-6 justify-center">
              {TUTORIAL_STEPS.map((s, i) => (
                <div key={s.id} className={`rounded-full transition-all duration-500 ${
                  completed.includes(s.id) ? 'bg-vibe-primary' :
                  i === stepIdx ? 'w-8 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/20'
                } h-1.5`} />
              ))}
            </div>

            {/* 네비게이션 */}
            <div className="flex gap-4 mt-6">
              <motion.button whileTap={{ scale: 0.95 }} onClick={handlePrev}
                disabled={stepIdx === 0}
                className="flex-1 py-5 luxury-glass-dark rounded-apple-md flex items-center justify-center gap-2 disabled:opacity-30 border-white/5">
                <ChevronLeft size={16} className="text-white" />
                <span className="text-white text-[10px] font-black uppercase tracking-widest">Prev</span>
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleNext}
                disabled={allDone}
                className="flex-[2] py-5 rounded-apple-md font-black text-[10px] uppercase tracking-[0.2em] text-white shadow-luxury relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-vibe-primary to-[#7C3AED] transition-transform duration-500 group-hover:scale-105" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Complete Step <ChevronRight size={16} />
                </span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
