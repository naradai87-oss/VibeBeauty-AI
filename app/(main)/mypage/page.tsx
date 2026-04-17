'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { Diamond, ChevronRight, LogOut, Bell, Shield, HelpCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import type { Profile } from '@/types'

const MENU_ITEMS = [
  { icon: Bell, label: '알림 설정', desc: '푸시 알림 관리' },
  { icon: Shield, label: '개인정보 보호', desc: '데이터 및 프라이버시' },
  { icon: HelpCircle, label: '고객센터', desc: '문의 및 도움말' },
]

export default function MyPage() {
  const router = useRouter()
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
    }
    fetchProfile()
  }, [supabase])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 프로필 헤더 */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-500 px-6 pt-14 pb-10">
        <div className="flex items-center gap-4">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 rounded-3xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-4xl shadow-lg">
            🌸
          </motion.div>
          <div>
            <h2 className="text-white text-xl font-bold">{profile?.nickname ?? 'Vibe Queen'}</h2>
            <p className="text-purple-200 text-sm">{profile?.email ?? ''}</p>
            <div className="flex items-center gap-1 mt-1 bg-white/20 rounded-full px-3 py-1 w-fit">
              <Diamond size={14} className="text-white" />
              <span className="text-white text-sm font-bold">{profile?.diamond_balance ?? 0}</span>
            </div>
          </div>
        </div>

        {/* 구독 뱃지 */}
        {profile?.is_subscribed && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-white/20 rounded-2xl px-4 py-2.5 flex items-center gap-2">
            <span>👑</span>
            <span className="text-white font-semibold text-sm">Vibe Pass 구독 중</span>
          </motion.div>
        )}
      </div>

      <div className="px-6 -mt-4 flex flex-col gap-4 pb-10">
        {/* 메뉴 카드 */}
        <div className="bg-white rounded-3xl shadow-apple border border-gray-50 overflow-hidden">
          {MENU_ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.button key={item.label} whileTap={{ backgroundColor: '#F9FAFB' }}
                className={`w-full flex items-center gap-4 px-6 py-4 ${
                  i < MENU_ITEMS.length - 1 ? 'border-b border-gray-50' : ''
                }`}>
                <div className="w-10 h-10 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <Icon size={18} className="text-purple-500" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </motion.button>
            )
          })}
        </div>

        {/* 로그아웃 */}
        <motion.button whileTap={{ scale: 0.97 }} onClick={handleLogout}
          className="w-full py-4 bg-white rounded-3xl shadow-apple border border-gray-50 flex items-center justify-center gap-3 text-red-400 font-semibold">
          <LogOut size={20} />
          로그아웃
        </motion.button>

        <p className="text-center text-gray-300 text-xs">
          VibeBeauty AI v0.1.0 • Made with 💜
        </p>
      </div>
    </div>
  )
}
