'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation'
import { Camera, Download, Share2, Calendar, Sparkles } from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import type { StyleLog } from '@/types'

const SEASON_EMOJI: Record<string, string> = {
  spring_warm: '🌸', summer_cool: '🧊', autumn_warm: '🍂', winter_cool: '❄️',
}

export default function StyleLogPage() {
  const router = useRouter()
  const supabase = createClient()
  const [logs, setLogs] = useState<StyleLog[]>([])
  const [selected, setSelected] = useState<StyleLog | null>(null)
  const [loading, setLoading] = useState(true)
  const shareCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchLogs() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from('style_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        setLogs(data ?? [])
      } catch (err) {
        console.error('Failed to fetch logs:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchLogs()
  }, [supabase])

  async function handleDownload() {
    if (!shareCardRef.current) return
    try {
      const html2canvas = (await import('html2canvas')).default
      const canvas = await html2canvas(shareCardRef.current, { 
        scale: 3, 
        useCORS: true,
        backgroundColor: null
      })
      const link = document.createElement('a')
      link.download = `vibe-style-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('이미지 저장 실패:', err)
    }
  }

  return (
    <div className="min-h-screen bg-vibe-cream">
      {/* 헤더 */}
      <header className="px-6 pt-20 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full luxury-glass border-vibe-silver/30 mb-4"
        >
          <Calendar className="w-3 h-3 text-vibe-primary" />
          <span className="text-[9px] font-bold tracking-[0.2em] text-vibe-slate uppercase">Personal Chronicles</span>
        </motion.div>
        <h1 className="heading-serif text-4xl text-vibe-charcoal font-medium">스타일 로그</h1>
        <p className="text-vibe-slate/40 text-xs mt-2 font-medium tracking-wide">당신의 아름다움이 기록되는 순간들</p>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-2 border-vibe-primary/20 border-t-vibe-primary rounded-full animate-spin" />
        </div>
      ) : logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
          <div className="w-20 h-20 bg-vibe-silver/20 rounded-apple-md flex items-center justify-center mb-6">
            <Camera size={32} className="text-vibe-slate/20" />
          </div>
          <h3 className="text-vibe-charcoal font-bold text-xl mb-2">아직 스타일 로그가 없어요</h3>
          <p className="text-vibe-slate/40 text-sm mb-10 max-w-[200px] leading-relaxed">첫 번째 AI 분석을 통해 당신만의 시그니처 무드를 발견하세요.</p>
          <motion.button 
            whileTap={{ scale: 0.95 }} 
            onClick={() => router.push('/capture')}
            className="btn-premium flex items-center gap-3"
          >
            분석 시작하기
          </motion.button>
        </div>
      ) : (
        <div className="px-6 pb-20">
          {/* 로그 카드 목록 */}
          <div className="grid grid-cols-1 gap-6">
            {logs.map((log, i) => (
              <motion.div key={log.id}
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(log)}
                className="luxury-card p-0"
              >
                <div className="flex items-stretch h-36">
                  {/* 비포 이미지 */}
                  <div className="w-32 bg-vibe-silver/10 flex-shrink-0 relative">
                    {log.before_image_url ? (
                      <img src={log.before_image_url} alt="분석 사진"
                        className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera size={24} className="text-vibe-slate/10" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2 luxury-glass w-8 h-8 rounded-full flex items-center justify-center text-lg">
                      {SEASON_EMOJI[log.color_season] || '✨'}
                    </div>
                  </div>

                  {/* 정보 */}
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-vibe-charcoal text-lg capitalize tracking-tight mb-1">
                        {log.color_season.replace('_', ' ')}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] text-vibe-slate/40 font-bold uppercase tracking-widest">
                        <Calendar size={10} />
                        {formatDate(log.created_at)}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-1.5">
                        {log.best_colors?.slice(0, 4).map((c, j) => (
                          <div key={j} className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: c }} />
                        ))}
                        {log.best_colors && log.best_colors.length > 4 && (
                           <div className="w-6 h-6 rounded-full bg-vibe-silver/20 border-2 border-white flex items-center justify-center text-[8px] font-bold text-vibe-slate/40">
                             +{log.best_colors.length - 4}
                           </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className="text-vibe-primary font-black text-xl leading-none">{log.confidence_score}%</span>
                        <span className="text-[8px] font-bold text-vibe-slate/30 uppercase tracking-tighter">Confidence</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 비포/애프터 공유 시트 */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-vibe-charcoal/60 backdrop-blur-sm flex items-end justify-center px-4"
            onClick={e => { if (e.target === e.currentTarget) setSelected(null) }}>
            <motion.div 
              initial={{ y: '100%' }} 
              animate={{ y: 0 }} 
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg bg-vibe-cream rounded-t-[40px] p-8 pb-12 shadow-2xl"
            >
              <div className="w-12 h-1.5 bg-vibe-silver/30 rounded-full mx-auto mb-8" />
              <div className="text-center mb-8">
                <h3 className="heading-serif text-2xl text-vibe-charcoal font-medium">Atelier Archive</h3>
                <p className="text-vibe-slate/40 text-[10px] font-bold tracking-[0.3em] uppercase mt-1">Share Your Mood</p>
              </div>

              {/* 지브리 감성 공유 카드 (럭셔리 버전) */}
              <div ref={shareCardRef}
                className="rounded-[32px] overflow-hidden shadow-luxury-lg bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-px mb-8">
                <div className="rounded-[31px] overflow-hidden bg-vibe-cream">
                  {/* 헤더 */}
                  <div className="bg-vibe-charcoal px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="text-white/40 text-[8px] font-bold tracking-[0.3em] uppercase mb-0.5">Perspective</p>
                      <p className="text-white font-medium text-xs heading-serif tracking-wide">VibeBeauty AI</p>
                    </div>
                    <Sparkles className="w-4 h-4 text-vibe-gold opacity-50" />
                  </div>

                  {/* 이미지 */}
                  {selected.before_image_url && (
                    <div className="aspect-[4/3] relative">
                      <img src={selected.before_image_url} alt="스타일 사진"
                        className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-vibe-cream/40 to-transparent" />
                    </div>
                  )}

                  {/* 정보 */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <span className="text-4xl filter drop-shadow-md">{SEASON_EMOJI[selected.color_season]}</span>
                        <div>
                          <p className="text-[10px] font-bold text-vibe-slate/40 uppercase tracking-[0.2em] mb-0.5">Personal Season</p>
                          <p className="font-bold text-vibe-charcoal text-xl capitalize tracking-tight">
                            {selected.color_season.replace('_', ' ')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-vibe-primary uppercase tracking-[0.2em] mb-0.5">Confidence</p>
                        <p className="text-2xl font-black text-vibe-charcoal leading-none">{selected.confidence_score}%</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[9px] font-bold text-vibe-slate/30 uppercase tracking-[0.3em]">Signature Palette</p>
                      <div className="flex gap-3">
                        {selected.best_colors?.map((c, i) => (
                          <div key={i} className="w-10 h-10 rounded-2xl shadow-luxury border border-white"
                            style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-8 flex items-center justify-center gap-4 opacity-20">
                      <div className="h-px w-8 bg-vibe-slate" />
                      <p className="text-[8px] font-bold text-vibe-slate tracking-[0.5em] uppercase">Vibe Genisys</p>
                      <div className="h-px w-8 bg-vibe-slate" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.button whileTap={{ scale: 0.95 }} onClick={handleDownload}
                  className="btn-premium flex items-center justify-center gap-2 py-5 rounded-apple-md">
                  <Download size={18} />
                  Save Image
                </motion.button>
                <motion.button whileTap={{ scale: 0.95 }}
                  onClick={() => { navigator.share?.({ title: 'VibeBeauty AI 결과', text: '내 퍼스널 컬러 봐봐! 🌸', url: window.location.href }) }}
                  className="luxury-glass flex items-center justify-center gap-2 py-5 rounded-apple-md text-vibe-charcoal font-bold text-sm border-vibe-silver/30">
                  <Share2 size={18} />
                  Share
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
