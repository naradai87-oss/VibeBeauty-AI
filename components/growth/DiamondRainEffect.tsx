'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface Particle {
  id: number
  x: number
  delay: number
  size: number
  duration: number
}

export default function DiamondRainEffect({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (!active) { setParticles([]); return }

    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      size: Math.random() * 20 + 14,
      duration: Math.random() * 1.5 + 1.5,
    }))
    setParticles(newParticles)

    const cleanup = setTimeout(() => setParticles([]), 4000)
    return () => clearTimeout(cleanup)
  }, [active])

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ y: -80, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: '110vh', opacity: [1, 1, 0], rotate: 360 }}
              transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
              style={{ position: 'absolute', top: 0, fontSize: p.size }}
            >
              💎
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
