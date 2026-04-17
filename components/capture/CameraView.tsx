'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { motion } from 'motion/react'
import { Camera, RotateCcw } from 'lucide-react'

interface CameraViewProps {
  onCapture: (file: File, url: string) => void
  vibeColor: string
}

export default function CameraView({ onCapture, vibeColor }: CameraViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [ready, setReady] = useState(false)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')

  const startCamera = useCallback(async () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setReady(true)
      }
    } catch (err) {
      console.error('카메라 접근 실패:', err)
    }
  }, [facingMode])

  useEffect(() => {
    startCamera()
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()) }
  }, [startCamera])

  function handleCapture() {
    if (!videoRef.current || !canvasRef.current) return
    const canvas = canvasRef.current
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight
    const ctx = canvas.getContext('2d')!
    // 전면 카메라 미러 플립
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }
    ctx.drawImage(videoRef.current, 0, 0)
    canvas.toBlob(blob => {
      if (!blob) return
      const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' })
      const url = URL.createObjectURL(blob)
      onCapture(file, url)
    }, 'image/jpeg', 0.92)
  }

  return (
    <div className="relative w-full aspect-[3/4] bg-black rounded-3xl overflow-hidden">
      {/* 비디오 피드 */}
      <video
        ref={videoRef}
        playsInline
        muted
        className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* 얼굴+어깨 가이드 오버레이 */}
      {ready && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 133" preserveAspectRatio="none">
          {/* 반투명 마스크 */}
          <defs>
            <mask id="guide-mask">
              <rect width="100" height="133" fill="white" />
              <ellipse cx="50" cy="38" rx="22" ry="28" fill="black" />
              <path d="M18 90 Q50 68 82 90 L82 133 L18 133 Z" fill="black" />
            </mask>
          </defs>
          <rect width="100" height="133" fill="rgba(0,0,0,0.45)" mask="url(#guide-mask)" />

          {/* 가이드 테두리 */}
          <motion.ellipse
            cx="50" cy="38" rx="22" ry="28"
            fill="none" stroke={vibeColor} strokeWidth="0.8" strokeDasharray="3 2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M18 90 Q50 68 82 90"
            fill="none" stroke={vibeColor} strokeWidth="0.8" strokeDasharray="3 2"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </svg>
      )}

      {/* 스캔 라인 */}
      {ready && (
        <motion.div
          className="absolute left-0 right-0 h-0.5 opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${vibeColor}, transparent)` }}
          animate={{ top: ['15%', '85%', '15%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* 카메라 전환 버튼 */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setFacingMode(f => f === 'user' ? 'environment' : 'user')}
        className="absolute top-4 right-4 w-10 h-10 glass-dark rounded-full flex items-center justify-center"
      >
        <RotateCcw size={18} className="text-white" />
      </motion.button>

      {/* 셔터 버튼 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleCapture}
          disabled={!ready}
          className="w-18 h-18 rounded-full border-4 border-white flex items-center justify-center disabled:opacity-50"
          style={{ width: 72, height: 72 }}
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: `linear-gradient(135deg, ${vibeColor}, ${vibeColor}99)` }}>
            <Camera size={26} className="text-white" />
          </div>
        </motion.button>
      </div>
    </div>
  )
}
