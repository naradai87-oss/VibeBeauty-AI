'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { Copy, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import InviteDashboard from '@/components/growth/InviteDashboard'
import DiamondRainEffect from '@/components/growth/DiamondRainEffect'
import type { Profile, DiamondLog } from '@/types'

export default function GrowthPage() {
  const supabase = createClient()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [logs, setLogs] = useState<DiamondLog[]>([])
  const [copied, setCopied] = useState(false)
  const [raining, setRaining] = useState(false)
  const [pendingDiamonds, setPendingDiamonds] = useState(0)

  const fetchData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const [{ data: prof }, { data: dLogs }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('diamond_logs').select('*').eq('user_id', user.id)
        .order('created_at', { ascending: false }).limit(10),
    ])

    setProfile(prof)
    setLogs(dLogs ?? [])
    setPendingDiamonds(
      (dLogs ?? []).filter((l: DiamondLog) => l.event_type === 'referral').reduce((sum: number, l: DiamondLog) => sum + l.amount, 0)
    )
  }, [supabase])

  useEffect(() => { fetchData() }, [fetchData])

  async function handleClaim() {
    if (!profile) return
    setRaining(true)
    await supabase.rpc('grant_diamonds', {
      p_user_id: profile.id,
      p_amount: pendingDiamonds,
      p_description: '초대 보상 수령',
    })
    setPendingDiamonds(0)
    await fetchData()
    setTimeout(() => setRaining(false), 4000)
  }

  function handleCopy() {
    if (!profile?.referral_code) return
    navigator.clipboard.writeText(`https://vibebeauty.ai/signup?ref=${profile.referral_code}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const inviteCount = (profile as Profile & { invite_count?: number })?.invite_count ?? 0

  return (
    <div className="min-h-screen bg-gray-50">
      <DiamondRainEffect active={raining} />

      {/* 헤더 */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-500 px-6 pt-14 pb-8">
        <h1 className="text-2xl font-bold text-white">친구 초대</h1>
        <p className="text-white/70 text-sm mt-1">초대할수록 다이아가 쌓여요 💎</p>
      </div>

      <div className="px-6 -mt-4 flex flex-col gap-4 pb-10">
        {/* 초대 코드 카드 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-apple border border-gray-50">
          <p className="text-sm text-gray-500 mb-2">내 초대 코드</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 py-3 px-4 bg-purple-50 rounded-2xl">
              <p className="text-purple-700 font-black text-xl tracking-widest text-center">
                {profile?.referral_code ?? 'VIBE-????'}
              </p>
            </div>
            <motion.button whileTap={{ scale: 0.9 }} onClick={handleCopy}
              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-glow-purple">
              {copied
                ? <Check size={20} className="text-white" />
                : <Copy size={20} className="text-white" />
              }
            </motion.button>
          </div>
          {copied && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center text-purple-500 text-sm mt-2 font-medium">
              링크가 복사됐어요! 💜
            </motion.p>
          )}
        </motion.div>

        {/* 초대 대시보드 */}
        <InviteDashboard
          inviteCount={inviteCount}
          pendingDiamonds={pendingDiamonds}
          onClaim={handleClaim}
        />

        {/* 다이아 히스토리 */}
        {logs.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-apple border border-gray-50">
            <h3 className="font-bold text-gray-800 mb-4">💎 다이아 내역</h3>
            <div className="flex flex-col gap-3">
              {logs.map(log => (
                <div key={log.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    log.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {log.amount > 0 ? '➕' : '➖'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 font-medium">{log.description}</p>
                    <p className="text-xs text-gray-400">{new Date(log.created_at).toLocaleDateString('ko-KR')}</p>
                  </div>
                  <span className={`font-bold ${log.amount > 0 ? 'text-green-600' : 'text-red-400'}`}>
                    {log.amount > 0 ? '+' : ''}{log.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
