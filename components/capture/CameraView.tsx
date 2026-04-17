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
    
    // --- AR 가이드 그리기 (캔버스에 직접 렌더링) ---
    const scaleX = canvas.width / 100
    const scaleY = canvas.height / 133
    
    ctx.strokeStyle = vibeColor
    ctx.lineWidth = 2 * (canvas.width / 400) // 캔버스 크기에 비례하는 두께
    ctx.setLineDash([5, 5])
    
    // 1) 얼굴 타원 (Ellipse)
    ctx.beginPath()
    ctx.ellipse(
      50 * scaleX, 
      38 * scaleY, 
      22 * scaleX, 
      28 * scaleY, 
      0, 0, Math.PI * 2
    )
    ctx.stroke()
    
    // 2) 수직 중앙선 (Center Line)
    ctx.setLineDash([2, 4])
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    ctx.beginPath()
    ctx.moveTo(50 * scaleX, 0)
    ctx.lineTo(50 * scaleX, 133 * scaleY)
    ctx.stroke()
    
    // 3) 어깨 라인 (Quadratic Curve)
    ctx.strokeStyle = vibeColor
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(18 * scaleX, 90 * scaleY)
    ctx.quadraticCurveTo(50 * scaleX, 68 * scaleY, 82 * scaleX, 90 * scaleY)
    ctx.stroke()
    // --- AR 가이드 종료 ---

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

      {/* 얼굴+어깨 가이드 오버레이 (미러 모드 대응) */}
      {ready && (
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 100 133" 
          preserveAspectRatio="none"
          style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
        >
          {/* 반투명 마스크 */}
          <defs>
            <mask id="guide-mask">
              <rect width="100" height="133" fill="white" />
              <ellipse cx="50" cy="38" rx="22" ry="28" fill="black" />
              <path d="M18 90 Q50 68 82 90 L82 133 L18 133 Z" fill="black" />
            </mask>
          </defs>
          <rect width="100" height="133" fill="rgba(0,0,0,0.55)" mask="url(#guide-mask)" />

          {/* 수직 중앙 정렬선 (추가 가이드) */}
          <line x1="50" y1="0" x2="50" y2="133" stroke="white" strokeWidth="0.1" strokeDasharray="1 2" opacity="0.3" />

          {/* 가이드 테두리 */}
          <motion.ellipse
            cx="50" cy="38" rx="22" ry="28"
            fill="none" stroke={vibeColor} strokeWidth="1" strokeDasharray="3 2"
            animate={{ opacity: [0.6, 1, 0.6], strokeWidth: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M18 90 Q50 68 82 90"
            fill="none" stroke={vibeColor} strokeWidth="1" strokeDasharray="3 2"
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
