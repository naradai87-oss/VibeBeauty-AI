'use client'

import { motion } from 'motion/react'

interface Props {
  diamonds: number
  bonus: number
  price: number
  highlight?: boolean
  onBuy: () => void
}

export default function DiamondPackCard({ diamonds, bonus, price, highlight, onBuy }: Props) {
  return (
    <motion.div whileTap={{ scale: 0.97 }}
      className={`relative rounded-3xl p-5 border-2 transition-all ${
        highlight
          ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 shadow-glow-purple'
          : 'border-gray-100 bg-white shadow-apple'
      }`}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold">
          🔥 인기
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center ${
          highlight ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gray-100'
        }`}>
          <span className="text-2xl">💎</span>
          {bonus > 0 && (
            <span className={`text-xs font-bold ${highlight ? 'text-white' : 'text-green-600'}`}>
              +{bonus}
            </span>
          )}
        </div>

        <div className="flex-1">
          <p className="font-black text-gray-800 text-lg">{diamonds}개</p>
          {bonus > 0 && (
            <p className="text-green-500 text-sm font-medium">보너스 +{bonus}개 포함</p>
          )}
        </div>

        <motion.button whileTap={{ scale: 0.95 }} onClick={onBuy}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm ${
            highlight
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-glow-purple'
              : 'bg-gray-100 text-gray-800'
          }`}>
          {price.toLocaleString('ko-KR')}원
        </motion.button>
      </div>
    </motion.div>
  )
}
