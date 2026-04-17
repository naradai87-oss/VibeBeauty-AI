'use client'

import { motion } from 'motion/react'

const RANKS = [
  { name: '스타일 입문자', emoji: '🌱', min: 0, max: 2, reward: 15, color: '#10B981' },
  { name: '스타일리스트', emoji: '✂️', min: 3, max: 9, reward: 50, color: '#7C3AED' },
  { name: '패션 아이콘', emoji: '👑', min: 10, max: 29, reward: 200, color: '#F59E0B' },
  { name: '바이브 레전드', emoji: '🌟', min: 30, max: Infinity, reward: 500, color: '#EC4899' },
]

interface Props {
  inviteCount: number
  pendingDiamonds: number
  onClaim: () => void
}

export default function InviteDashboard({ inviteCount, pendingDiamonds, onClaim }: Props) {
  const currentRank = RANKS.findLast(r => inviteCount >= r.min) ?? RANKS[0]
  const nextRank = RANKS.find(r => r.min > inviteCount)
  const progress = nextRank
    ? ((inviteCount - currentRank.min) / (nextRank.min - currentRank.min)) * 100
    : 100

  return (
    <div className="bg-white rounded-3xl p-6 shadow-apple border border-gray-50">
      {/* 현재 등급 */}
      <div className="text-center mb-6">
        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl mb-2">{currentRank.emoji}</motion.div>
        <h3 className="text-xl font-black" style={{ color: currentRank.color }}>{currentRank.name}</h3>
        <p className="text-gray-400 text-sm">총 {inviteCount}명 초대 완료</p>
      </div>

      {/* 다음 등급 진행 바 */}
      {nextRank && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{currentRank.name}</span>
            <span>{nextRank.name} ({nextRank.min}명)</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${currentRank.color}, ${nextRank.color})` }}
            />
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">
            {nextRank.min - inviteCount}명만 더 초대하면 💎 {nextRank.reward}개!
          </p>
        </div>
      )}

      {/* 대기 보상 */}
      {pendingDiamonds > 0 && (
        <motion.button whileTap={{ scale: 0.97 }} onClick={onClaim}
          className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-2xl shadow-glow-gold flex items-center justify-center gap-2">
          <span className="text-xl">💎</span>
          {pendingDiamonds}개 보상 받기!
        </motion.button>
      )}

      {/* 전체 등급표 */}
      <div className="mt-5 flex flex-col gap-2">
        {RANKS.map(rank => (
          <div key={rank.name}
            className={`flex items-center gap-3 p-3 rounded-xl ${
              rank.name === currentRank.name ? 'bg-gray-50' : ''
            }`}>
            <span className="text-xl">{rank.emoji}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-700">{rank.name}</p>
              <p className="text-xs text-gray-400">{rank.min}{rank.max < Infinity ? `~${rank.max}` : '+'} 명</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold" style={{ color: rank.color }}>💎 {rank.reward}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
