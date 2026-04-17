'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Home, BookOpen, ShoppingBag, User } from 'lucide-react'
import { motion } from 'motion/react'

const NAV_ITEMS = [
  { icon: Home, label: '홈', path: '/dashboard' },
  { icon: BookOpen, label: '스타일 로그', path: '/style-log' },
  { icon: ShoppingBag, label: '스토어', path: '/shop' },
  { icon: User, label: '마이페이지', path: '/mypage' },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  // (main) 레이아웃은 미들웨어에 의해 보호되므로 세션 체크를 단순화합니다.
  // 불필요한 null 반환은 레이아웃 시프트를 유발할 수 있습니다.

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg z-[100] px-6 pb-8">
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
                  className={`relative z-10 transition-colors duration-400 ${isActive ? 'text-vibe-primary' : 'text-vibe-slate/30'
                    }`}
                />
                <span className={`relative z-10 text-[9px] font-bold uppercase tracking-widest transition-colors duration-400 ${isActive ? 'text-vibe-primary' : 'text-vibe-slate/30'
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
