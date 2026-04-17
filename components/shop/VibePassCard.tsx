'use client'

import { motion } from 'motion/react'
import { Check } from 'lucide-react'

const BENEFITS = [
  '무제한 AI 스타일 분석',
  '고화질 지브리 화보 저장',
  '광고 없는 클린 경험',
  '신규 무드 우선 체험권',
  '월 30개 다이아 자동 충전',
]

interface Props {
  monthly: number
  yearly: number
  isSubscribed: boolean
  onSubscribe: (plan: 'monthly' | 'yearly') => void
}

export default function VibePassCard({ monthly, yearly, isSubscribed, onSubscribe }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 rounded-3xl p-6 shadow-glow-purple">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-purple-200 text-sm">구독 플랜</p>
          <h3 className="text-white text-2xl font-black">Vibe Pass ✨</h3>
        </div>
        <div className="text-4xl">👑</div>
      </div>

      {/* 혜택 목록 */}
      <div className="bg-white/15 rounded-2xl p-4 mb-5">
        {BENEFITS.map(b => (
          <div key={b} className="flex items-center gap-3 py-1.5">
            <div className="w-5 h-5 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0">
              <Check size={12} className="text-white" />
            </div>
            <p className="text-white text-sm">{b}</p>
          </div>
        ))}
      </div>

      {isSubscribed ? (
        <div className="bg-white/20 rounded-2xl py-4 text-center">
          <p className="text-white font-bold">✅ 구독 중이에요!</p>
          <p className="text-white/70 text-sm mt-0.5">혜택을 마음껏 누리세요 💜</p>
        </div>
      ) : (
        <div className="flex gap-3">
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => onSubscribe('monthly')}
            className="flex-1 py-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 text-center">
            <p className="text-white font-bold">월간</p>
            <p className="text-white text-xl font-black">{monthly.toLocaleString('ko-KR')}원</p>
          </motion.button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => onSubscribe('yearly')}
            className="flex-[1.4] py-4 bg-white rounded-2xl text-center shadow-lg">
            <div className="text-xs text-purple-500 font-bold mb-0.5">2개월 무료 🎉</div>
            <p className="text-purple-700 font-bold">연간</p>
            <p className="text-purple-700 text-xl font-black">{yearly.toLocaleString('ko-KR')}원</p>
          </motion.button>
        </div>
      )}
    </motion.div>
  )
}
