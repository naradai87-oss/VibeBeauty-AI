'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { Eye, EyeOff, Diamond, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      if (error.message.includes('Email not confirmed')) {
        setError('이메일 인증이 필요합니다. 메일함을 확인해주세요.')
      } else {
        setError('가입 정보가 올바르지 않습니다.')
      }
    } else {
      router.push('/dashboard')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-vibe-cream flex flex-col items-center justify-center p-6 selection:bg-vibe-primary selection:text-white">
      {/* Back Button */}
      <Link href="/" className="absolute top-12 left-8 flex items-center gap-2 text-vibe-slate/40 hover:text-vibe-primary transition-colors text-xs font-bold uppercase tracking-widest">
        <ArrowLeft size={16} /> 홈으로 돌아가기
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center justify-center w-20 h-20 luxury-glass rounded-apple-lg mb-6 shadow-luxury"
          >
            <Diamond className="w-10 h-10 text-vibe-primary" />
          </motion.div>
          <h1 className="heading-serif text-4xl text-vibe-charcoal font-medium mb-3">다시 오신 것을 환영합니다</h1>
          <p className="text-vibe-slate/40 text-sm font-light tracking-wide">로그인 정보를 입력하여 나만의 퍼스널 스타일리스트를 만나보세요</p>
        </div>

        {/* Login Form */}
        <div className="luxury-glass p-10 rounded-apple-lg border-vibe-silver/10 space-y-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-vibe-slate/40 uppercase tracking-widest ml-1">이메일 주소</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="style@vibe.ai"
                required
                className="w-full px-5 py-4 rounded-apple-md bg-white/50 border border-vibe-silver/20 text-vibe-charcoal placeholder-vibe-slate/20 focus:outline-none focus:ring-2 focus:ring-vibe-primary/20 focus:border-vibe-primary/50 transition-all text-sm font-medium"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold text-vibe-slate/40 uppercase tracking-widest">비밀번호</label>
                <button type="button" className="text-[10px] font-bold text-vibe-primary/60 hover:text-vibe-primary uppercase tracking-widest">비밀번호 찾기</button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-5 py-4 rounded-apple-md bg-white/50 border border-vibe-silver/20 text-vibe-charcoal placeholder-vibe-slate/20 focus:outline-none focus:ring-2 focus:ring-vibe-primary/20 focus:border-vibe-primary/50 transition-all text-sm font-medium pr-12"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-vibe-slate/30 hover:text-vibe-primary transition-colors">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-red-500 text-xs font-bold text-center bg-red-50/50 py-3 rounded-apple-md border border-red-100 uppercase tracking-tight">
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full py-5 text-sm uppercase tracking-[0.2em] font-black disabled:opacity-40"
            >
              {loading ? '인증 중...' : '로그인'}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-vibe-silver/10">
            <p className="text-vibe-slate/40 text-xs font-medium tracking-wide">
              아직 계정이 없으신가요? {' '}
              <Link href="/signup" className="text-vibe-primary font-bold hover:underline decoration-2 underline-offset-4">
                계정 생성하기
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-vibe-slate/20 text-[10px] uppercase font-bold tracking-[0.3em] mt-12">
          VibeBeauty • 럭셔리 퍼스널 스타일링
        </p>
      </motion.div>
    </div>
  )
}
