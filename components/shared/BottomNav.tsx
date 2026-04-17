'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Home, BookOpen, ShoppingBag, User } from 'lucide-react'
import { motion } from 'motion/react'
import { createClient } from '@/lib/supabase'

const NAV_ITEMS = [
  { icon: Home,       label: '홈',       path: '/dashboard' },
  { icon: BookOpen,   label: '스타일 로그', path: '/style-log' },
  { icon: ShoppingBag,label: '스토어',    path: '/shop' },
  { icon: User,       label: '마이페이지', path: '/mypage' },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  // 인증 로딩 중이거나 세션이 없으면 메뉴를 렌더링하지 않음 (플리커링 방지)
  if (loading || !session) return null

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-6 pb-8">
      <div className="luxury-glass rounded-apple-xl shadow-luxury-lg border-white/60 px-4 py-4">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/')
            const Icon = item.icon

            return (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="relative flex flex-col items-center gap-1 px-4 py-1"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-vibe-primary/10 rounded-apple-md"
                    transition={{ type: 'spring', stiffness: 300, damping: 35 }}
                  />
                )}
                <Icon
                  size={20}
                  className={`relative z-10 transition-colors duration-400 ${
                    isActive ? 'text-vibe-primary' : 'text-vibe-slate/30'
                  }`}
                />
                <span className={`relative z-10 text-[9px] font-bold uppercase tracking-widest transition-colors duration-400 ${
                  isActive ? 'text-vibe-primary' : 'text-vibe-slate/30'
                }`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
