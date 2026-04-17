export type VibeType = 'mz_ghibli' | 'business' | 'trendy'

export type ColorSeason = 'spring_warm' | 'summer_cool' | 'autumn_warm' | 'winter_cool'

export type BodyShape = 'hourglass' | 'rectangle' | 'pear' | 'apple' | 'inverted_triangle'

export interface Profile {
  id: string
  email: string
  nickname: string
  avatar_url?: string
  diamond_balance: number
  referral_code: string
  referred_by?: string
  is_subscribed: boolean
  subscription_expires_at?: string
  created_at: string
}

export interface StyleLog {
  id: string
  user_id: string
  vibe_type: VibeType
  before_image_url: string
  after_image_url?: string
  color_season: ColorSeason
  ita_value: number
  body_shape: BodyShape
  skin_tone_hex: string
  best_colors: string[]
  avoid_colors: string[]
  style_suggestions: string[]
  confidence_score: number
  created_at: string
}

export interface Product {
  id: string
  name: string
  brand: string
  price: number
  image_url: string
  coupang_url: string
  category: string
  vibe_type: VibeType[]
  color_season: ColorSeason[]
}

export interface InventoryItem {
  id: string
  user_id: string
  product_id: string
  is_purchased: boolean
  purchased_at?: string
  product?: Product
}

export interface DiamondLog {
  id: string
  user_id: string
  event_type: 'analysis' | 'referral' | 'purchase' | 'reward' | 'subscription'
  amount: number
  balance_after: number
  description: string
  created_at: string
}

export interface ReferralRank {
  level: number
  name: string
  minInvites: number
  maxInvites: number
  reward: number
  color: string
  emoji: string
}
