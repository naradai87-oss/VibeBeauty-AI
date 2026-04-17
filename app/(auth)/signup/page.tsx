'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import { Diamond, Check, ArrowLeft, Mail, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({ email: '', password: '', nickname: '', referralCode: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function handleChange(key: string, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          nickname: form.nickname,
          referred_by: form.referralCode || null,
        },
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setDone(true)
    }
    setLoading(false)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-vibe-cream flex flex-col items-center justify-center p-6 selection:bg-vibe-primary selection:text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-24 h-24 luxury-glass rounded-full flex items-center justify-center mx-auto mb-8 shadow-luxury">
            <Mail className="w-10 h-10 text-vibe-primary" />
          </div>
          <h2 className="heading-serif text-4xl text-vibe-charcoal font-medium mb-6">인증 메일이 발송되었습니다</h2>
          <div className="luxury-glass p-8 rounded-apple-lg border-vibe-silver/10 space-y-4 mb-8">
            <p className="text-vibe-slate/60 text-sm leading-relaxed">
              입력하신 <span className="text-vibe-primary font-bold">{form.email}</span> 주소로 <br />
              인증 메일을 발송했습니다.
            </p>
            <div className="h-px bg-vibe-silver/20 w-12 mx-auto" />
            <p className="text-vibe-slate/30 text-xs italic">
              인증 링크를 클릭하신 후 아래 버튼을 통해 <br />
              로그인해 주세요.
            </p>
          </div>
          <button onClick={() => router.push('/login')}
            className="btn-premium w-full py-5 text-sm uppercase tracking-[0.2em] font-black">
            로그인하러 가기
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-vibe-cream flex flex-col items-center justify-center p-6 selection:bg-vibe-primary selection:text-white">
      {/* Back Button */}
      <Link href="/" className="absolute top-12 left-8 flex items-center gap-2 text-vibe-slate/40 hover:text-vibe-primary transition-colors text-xs font-bold uppercase tracking-widest">
        <ArrowLeft size={16} /> 환영합니다
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
            <Sparkles className="w-10 h-10 text-vibe-primary" />
          </motion.div>
          <h1 className="heading-serif text-4xl text-vibe-charcoal font-medium mb-3">아틀리에(Atelier - 작업실) 가입하기</h1>
          <p className="text-vibe-slate/40 text-sm font-light tracking-wide">당신을 더 빛나게 할 여정을 시작하세요</p>
        </div>

        {/* Signup Form */}
        <div className="luxury-glass p-10 rounded-apple-lg border-vibe-silver/10 space-y-8">
          <form onSubmit={handleSignup} className="space-y-6">
            {[
              { key: 'nickname', label: '사용할 닉네임', placeholder: '닉네임을 입력하세요', type: 'text' },
              { key: 'email', label: '이메일 주소', placeholder: 'style@vibe.ai', type: 'email' },
              { key: 'password', label: '보안 비밀번호', placeholder: '8자 이상', type: 'password' },
              { key: 'referralCode', label: '초대 코드 (선택 사항)', placeholder: 'VIBE-XXXX', type: 'text' },
            ].map(field => (
              <div key={field.key} className="space-y-2">
                <label className="text-[10px] font-bold text-vibe-slate/40 uppercase tracking-widest ml-1">{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => handleChange(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.key !== 'referralCode'}
                  className="w-full px-5 py-4 rounded-apple-md bg-white/50 border border-vibe-silver/20 text-vibe-charcoal placeholder-vibe-slate/20 focus:outline-none focus:ring-2 focus:ring-vibe-primary/20 focus:border-vibe-primary/50 transition-all text-sm font-medium"
                />
              </div>
            ))}

            {error && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-red-500 text-xs font-bold text-center bg-red-50/50 py-3 rounded-apple-md border border-red-100 italic">
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-premium w-full py-5 text-sm uppercase tracking-[0.2em] font-black disabled:opacity-40"
            >
              {loading ? '처리 중...' : '계정 생성하기'}
            </button>
          </form>

          <div className="text-center pt-4 border-t border-vibe-silver/10">
            <p className="text-vibe-slate/40 text-xs font-medium tracking-wide">
              이미 계정이 있으신가요? {' '}
              <Link href="/login" className="text-vibe-primary font-bold hover:underline decoration-2 underline-offset-4">
                로그인
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
