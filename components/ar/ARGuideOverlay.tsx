'use client'

import { memo } from 'react'
import { motion } from 'motion/react'

interface ARGuideOverlayProps {
  area: string
  guideColor: string
  activeTryOn: string | null
}

const ARGuideOverlay = memo(({ area, guideColor, activeTryOn }: ARGuideOverlayProps) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 133" preserveAspectRatio="none">
      {area === 'lips' && (
        <motion.path
          d="M35,95 Q50,88 65,95 Q50,102 35,95"
          fill="none" stroke={guideColor} strokeWidth="1" strokeDasharray="2 2"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.98, 1.02, 0.98] }} 
          transition={{ duration: 2, repeat: Infinity }} 
        />
      )}
      {area === 'eyes' && (
        <>
          <motion.path d="M25,50 Q36,42 47,50" fill="none" stroke={guideColor} strokeWidth="0.5" strokeDasharray="2 1"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.path d="M53,50 Q64,42 75,50" fill="none" stroke={guideColor} strokeWidth="0.5" strokeDasharray="2 1"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
        </>
      )}
      {area === 'face' && (
        <motion.path
          d="M20,40 Q50,20 80,40 Q85,80 50,115 Q15,80 20,40"
          fill={`${guideColor}08`} stroke={guideColor} strokeWidth="0.3" strokeDasharray="4 2"
          animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3, repeat: Infinity }} 
        />
      )}

      {/* Virtual Try-On Overlays */}
      {activeTryOn === 'glasses' && (
        <motion.g initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <rect x="25" y="45" width="20" height="12" rx="2" fill="none" stroke="white" strokeWidth="0.5" opacity="0.6" />
          <rect x="55" y="45" width="20" height="12" rx="2" fill="none" stroke="white" strokeWidth="0.5" opacity="0.6" />
          <line x1="45" y1="51" x2="55" y2="51" stroke="white" strokeWidth="0.5" opacity="0.6" />
        </motion.g>
      )}
      {activeTryOn === 'earrings' && (
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
           <circle cx="18" cy="75" r="3" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
           <circle cx="82" cy="75" r="3" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
        </motion.g>
      )}
    </svg>
  )
})

ARGuideOverlay.displayName = 'ARGuideOverlay'

export default ARGuideOverlay
