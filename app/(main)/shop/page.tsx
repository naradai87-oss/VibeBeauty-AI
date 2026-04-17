'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { createClient } from '@/lib/supabase'
import DiamondPackCard from '@/components/shop/DiamondPackCard'
import VibePassCard from '@/components/shop/VibePassCard'
import DiamondRainEffect from '@/components/growth/DiamondRainEffect'
import type { Profile } from '@/types'

const DIAMOND_PACKS = [
  { diamonds: 10, bonus: 0, price: 1200 },
  { diamonds: 50, bonus: 10, price: 5500, highlight: true },
  { diamonds: 100, bonus: 30, price: 9900 },
]

export default function ShopPage() {
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [raining, setRaining] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
    }
    fetchProfile()
  }, [supabase])

  function handleBuyDiamonds(diamonds: number, price: number) {
    // 실제 결제 연동 시 PG사 SDK 호출
    console.log(`구매: 💎${diamonds}개 / ${price}원`)
    // 결제 완료 후 다이아 충전 & 파티클 효과
    setRaining(true)
    setTimeout(() => setRaining(false), 4000)
  }

  function handleSubscribe(plan: 'monthly' | 'yearly') {
    console.log(`구독: ${plan}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DiamondRainEffect active={raining} />

      {/* 헤더 */}
      <div className="bg-white px-6 pt-14 pb-4 border-b border-gray-50">
        <h1 className="text-2xl font-bold text-gray-900">스토어</h1>
        <p className="text-gray-400 text-sm mt-1">다이아 충전 & 구독</p>
      </div>

      {/* 내 다이아 */}
      <div className="px-6 py-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-5 flex items-center gap-4 shadow-glow-purple">
          <motion.span animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }} className="text-4xl">💎</motion.span>
          <div>
            <p className="text-purple-200 text-sm">보유 다이아</p>
            <p className="text-white font-black text-3xl">{profile?.diamond_balance ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="px-6 flex flex-col gap-6 pb-10">
        {/* Vibe Pass */}
        <VibePassCard
          monthly={4900}
          yearly={39900}
          isSubscribed={profile?.is_subscribed ?? false}
          onSubscribe={handleSubscribe}
        />

        {/* 다이아 팩 */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4">💎 다이아 팩</h3>
          <div className="flex flex-col gap-3">
            {DIAMOND_PACKS.map(pack => (
              <DiamondPackCard
                key={pack.diamonds}
                {...pack}
                onBuy={() => handleBuyDiamonds(pack.diamonds, pack.price)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
