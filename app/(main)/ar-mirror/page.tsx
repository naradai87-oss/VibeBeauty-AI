'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ChevronRight, ChevronLeft, Check } from 'lucide-react'

const TUTORIAL_STEPS = [
  {
    id: 1,
    product: '배송받은 #00 틴트',
    instruction: '입술 중앙에 바르세요',
    area: 'lips',
    tip: '입술 중앙부터 바깥쪽으로 자연스럽게!',
    guideColor: '#EC4899',
    emoji: '💋',
  },
  {
    id: 2,
    product: '파우치 속 쿠션 파운데이션',
    instruction: 'T존부터 가볍게 두드려주세요',
    area: 'face',
    tip: '스펀지로 가볍게 두드리면 더 자연스러워요!',
    guideColor: '#F59E0B',
    emoji: '✨',
  },
  {
    id: 3,
    product: '아이라이너',
    instruction: '눈꼬리 방향으로 얇게 그려주세요',
    area: 'eyes',
    tip: '손목을 고정하고 눈을 살짝 내려뜨면 편해요!',
    guideColor: '#7C3AED',
    emoji: '👁️',
  },
  {
    id: 4,
    product: '하이라이터',
    instruction: '광대뼈 위와 코 끝에 살짝 터치',
    area: 'highlight',
    tip: '소량만 사용해야 자연스러운 빛이 나요!',
    guideColor: '#F5CBA7',
    emoji: '⭐',
  },
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
          className="w-10 h-10 glass-dark rounded-full flex items-center justify-center">
          <ArrowLeft size={20} className="text-white" />
        </motion.button>
        <h1 className="text-white font-bold">AR 메이크업 튜토리얼</h1>
        <div className="text-white/50 text-sm">{stepIdx + 1}/{TUTORIAL_STEPS.length}</div>
      </div>

      {/* 카메라 뷰 */}
      <div className="relative flex-1 mx-6 rounded-3xl overflow-hidden bg-gray-900">
        <video ref={videoRef} playsInline muted
          className="w-full h-full object-cover scale-x-[-1]" />

        {/* 가이드 오버레이 */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 133" preserveAspectRatio="none">
          {step.area === 'lips' && (
            <motion.ellipse cx="50" cy="95" rx="15" ry="6"
              fill="none" stroke={step.guideColor} strokeWidth="1.5" strokeDasharray="3 2"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
          )}
          {step.area === 'eyes' && (
            <>
              <motion.ellipse cx="36" cy="50" rx="10" ry="5"
                fill="none" stroke={step.guideColor} strokeWidth="1" strokeDasharray="3 2"
                animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <motion.ellipse cx="64" cy="50" rx="10" ry="5"
                fill="none" stroke={step.guideColor} strokeWidth="1" strokeDasharray="3 2"
                animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
            </>
          )}
          {step.area === 'face' && (
            <motion.ellipse cx="50" cy="65" rx="28" ry="38"
              fill={`${step.guideColor}15`} stroke={step.guideColor} strokeWidth="0.8" strokeDasharray="3 2"
              animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} />
          )}
        </svg>

        {/* AI 피드백 토스트 */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 glass-dark px-5 py-3 rounded-2xl">
              <p className="text-white font-bold text-center">{feedback}</p>
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

      {/* 하단 튜토리얼 카드 */}
      <div className="px-6 py-4">
        <AnimatePresence mode="wait">
          <motion.div key={stepIdx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-5 border border-white/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${step.guideColor}30` }}>
                {step.emoji}
              </div>
              <div className="flex-1">
                <p className="text-white/60 text-xs mb-1">{step.product}</p>
                <p className="text-white font-bold text-base">{step.instruction}</p>
                <p className="text-white/50 text-xs mt-1">{step.tip}</p>
              </div>
            </div>

            {/* 스텝 인디케이터 */}
            <div className="flex gap-1.5 mt-4 justify-center">
              {TUTORIAL_STEPS.map((s, i) => (
                <div key={s.id} className={`rounded-full transition-all duration-300 ${
                  completed.includes(s.id) ? 'bg-green-400' :
                  i === stepIdx ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/30'
                } h-2`} />
              ))}
            </div>

            {/* 네비게이션 */}
            <div className="flex gap-3 mt-4">
              <motion.button whileTap={{ scale: 0.95 }} onClick={handlePrev}
                disabled={stepIdx === 0}
                className="flex-1 py-3 glass-dark rounded-2xl flex items-center justify-center gap-2 disabled:opacity-30">
                <ChevronLeft size={18} className="text-white" />
                <span className="text-white text-sm">이전</span>
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={handleNext}
                disabled={allDone}
                className="flex-[2] py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
                style={{ background: `linear-gradient(135deg, ${step.guideColor}, #7C3AED)` }}>
                <span className="text-white text-sm">완료! 다음 단계</span>
                <ChevronRight size={18} className="text-white" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
