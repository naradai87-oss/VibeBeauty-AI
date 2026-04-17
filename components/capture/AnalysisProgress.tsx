'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const STEPS = [
  '얼굴 윤곽 감지 중...',
  '피부 톤 분석 중...',
  '퍼스널 컬러 매칭 중...',
  '체형 분석 중...',
  '스타일 추천 생성 중...',
  'AI 리포트 작성 중...',
  '지브리 화보 생성 중...',
  '최종 완성!',
]

export default function AnalysisProgress() {
  const [pct, setPct] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setPct(p => {
        const next = Math.min(p + Math.random() * 3, 100)
        setStepIdx(Math.min(Math.floor(next / 12.5), STEPS.length - 1))
        return next
      })
    }, 180)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      {/* 원형 프로그레스 */}
      <div className="relative w-40 h-40">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="68" fill="none" stroke="#f3e8ff" strokeWidth="10" />
          <motion.circle
            cx="80" cy="80" r="68" fill="none"
            stroke="url(#prog-grad)" strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 68}`}
            strokeDashoffset={2 * Math.PI * 68 * (1 - pct / 100)}
          />
          <defs>
            <linearGradient id="prog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold gradient-text">{Math.floor(pct)}</span>
          <span className="text-gray-400 text-sm">%</span>
        </div>

        {/* 회전 아이콘 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl"
        >
          ✨
        </motion.div>
      </div>

      {/* 현재 스텝 */}
      <motion.p
        key={stepIdx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-600 font-medium text-center"
      >
        {STEPS[stepIdx]}
      </motion.p>

      {/* 스텝 도트 바 */}
      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            animate={{ backgroundColor: i <= stepIdx ? '#7C3AED' : '#E5E7EB' }}
          />
        ))}
      </div>
    </div>
  )
}
