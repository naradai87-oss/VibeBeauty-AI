'use client'

import { motion } from 'motion/react'
import type { Product, InventoryItem } from '@/types'
import { ExternalLink, CheckCircle } from 'lucide-react'

interface Props {
  products: Product[]
  inventory: InventoryItem[]
}

export default function ProductRecommendation({ products, inventory }: Props) {
  const ownedIds = new Set(inventory.filter(i => i.is_purchased).map(i => i.product_id))

  return (
    <div className="luxury-glass rounded-apple-lg p-8 border-vibe-silver/10">
      <div className="flex flex-col gap-6">
        {products.map((product, i) => {
          const owned = ownedIds.has(product.id)
          return (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 16 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group flex items-center gap-6 p-5 luxury-glass border-white/60 rounded-apple-md hover:border-vibe-primary/30 transition-all duration-500 shadow-luxury hover:shadow-luxury-lg cursor-pointer"
            >
              {/* Product Image */}
              <div className="w-20 h-20 rounded-apple-sm bg-vibe-cream overflow-hidden flex-shrink-0 border border-vibe-silver/10 group-hover:scale-105 transition-transform duration-500">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name}
                    className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-vibe-slate/10 italic text-[10px]">No image</div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-bold text-vibe-slate/30 uppercase tracking-[0.25em] mb-1 leading-none">{product.brand}</p>
                <h4 className="heading-serif text-vibe-charcoal text-lg font-medium truncate mb-1.5">{product.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-vibe-primary/40 animate-pulse" />
                  <p className="font-mono text-vibe-primary font-bold text-sm tracking-tight">
                    {product.price.toLocaleString('ko-KR')} KRW
                  </p>
                </div>
              </div>

              {/* Action Button */}
              {owned ? (
                <div className="flex flex-col items-center gap-1.5 opacity-40">
                  <CheckCircle size={20} className="text-vibe-primary" />
                  <span className="text-[8px] font-bold text-vibe-primary uppercase tracking-[0.2em]">Acquired</span>
                </div>
              ) : (
                <motion.a 
                  href={product.coupang_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 luxury-glass rounded-full flex items-center justify-center border-vibe-primary/20 text-vibe-primary hover:bg-vibe-primary hover:text-white transition-all shadow-sm"
                >
                  <ExternalLink size={18} />
                </motion.a>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
