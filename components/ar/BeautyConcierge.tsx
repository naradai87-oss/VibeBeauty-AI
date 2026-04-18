'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Sparkles } from 'lucide-react'

interface BeautyConciergeProps {
  message: string
  isVisible: boolean
}

export default function BeautyConcierge({ message, isVisible }: BeautyConciergeProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 10, scale: 0.95 }}
          className="absolute top-24 right-6 z-30 max-w-[200px]"
        >
          <div className="luxury-glass-dark p-4 rounded-apple-lg border-white/10 shadow-luxury-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded-full bg-vibe-primary flex items-center justify-center">
                <Sparkles size={10} className="text-white" />
              </div>
              <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">AI Concierge</span>
            </div>
            <p className="text-white text-[11px] leading-relaxed font-medium">
              {message}
            </p>
          </div>
          {/* Subtle tail */}
          <div className="absolute -bottom-1 right-6 w-3 h-3 luxury-glass-dark rotate-45 border-r border-b border-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
