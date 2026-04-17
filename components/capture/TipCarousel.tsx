'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const TIPS = [
  '자연광 아래서 촬영하면 더 정확해요 ☀️',
  '얼굴 전체가 화면에 들어오도록 맞춰주세요 🪞',
  '머리카락을 뒤로 넘기면 피부 분석이 더 잘 돼요 💁‍♀️',
  '정면을 바라봐주세요! 😊',
  '밝은 배경 앞에서 촬영하면 좋아요 ✨',
]

export default function TipCarousel() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % TIPS.length), 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="h-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-center text-white/80 text-sm px-4"
          >
            {TIPS[idx]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* 도트 인디케이터 */}
      <div className="flex gap-1.5">
        {TIPS.map((_, i) => (
          <div key={i}
            className={`rounded-full transition-all duration-300 ${
              i === idx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
