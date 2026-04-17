import { supabase } from './supabase'
import type { VibeType, ColorSeason, BodyShape, StyleLog } from '@/types'

// ─── ITA° 기반 퍼스널 컬러 시즌 판별 ───
export function getColorSeason(itaValue: number): ColorSeason {
  if (itaValue >= 55) return 'spring_warm'
  if (itaValue >= 41) return 'summer_cool'
  if (itaValue >= 28) return 'autumn_warm'
  return 'winter_cool'
}

// ─── 컬러 시즌별 추천/기피 색상 ───
export const COLOR_PALETTES: Record<ColorSeason, { best: string[]; avoid: string[]; description: string }> = {
  spring_warm: {
    best: ['#FFB347', '#FF6B6B', '#98FB98', '#87CEEB', '#DDA0DD'],
    avoid: ['#4B0082', '#2F4F4F', '#800000', '#191970'],
    description: '따뜻하고 밝은 봄 컬러! 복숭아, 코랄, 연두가 잘 어울려요.',
  },
  summer_cool: {
    best: ['#B0C4DE', '#DDA0DD', '#F08080', '#98FB98', '#AFEEEE'],
    avoid: ['#FF8C00', '#8B4513', '#FFD700', '#FF6347'],
    description: '차갑고 부드러운 여름 컬러! 라벤더, 로즈핑크, 민트가 피부를 밝혀줘요.',
  },
  autumn_warm: {
    best: ['#D2691E', '#CD853F', '#8FBC8F', '#B8860B', '#A0522D'],
    avoid: ['#FF1493', '#00BFFF', '#7FFF00', '#FF69B4'],
    description: '깊고 따뜻한 가을 컬러! 테라코타, 올리브, 카멜이 최고예요.',
  },
  winter_cool: {
    best: ['#DC143C', '#4169E1', '#000000', '#FFFFFF', '#8B008B'],
    avoid: ['#F0E68C', '#DEB887', '#F4A460', '#D2B48C'],
    description: '선명하고 강렬한 겨울 컬러! 크림슨, 로열블루, 퓨어화이트가 딱이에요.',
  },
}

// ─── 바디 타입별 스타일 추천 ───
export const BODY_STYLE_TIPS: Record<BodyShape, string[]> = {
  hourglass: ['허리라인을 강조하는 랩 드레스', '핏앤플레어 스커트', '크롭탑 + 하이웨이스트 조합'],
  rectangle: ['볼륨을 살리는 러플 블라우스', '와이드 벨트로 허리 포인트', '레이어드 스타일링'],
  pear: ['상체를 강조하는 오프숄더', 'A라인 스커트 + 밝은 상의', '볼드 네크라인'],
  apple: ['V넥으로 시선 분산', '직선 실루엣 원피스', '모노톤 코디'],
  inverted_triangle: ['와이드 팬츠로 하체 볼륨업', '플리츠 스커트', '심플한 상의 + 화려한 하의'],
}

// ─── AI 분석 메인 함수 ───
export async function analyzeStyle(
  imageFile: File,
  vibeType: VibeType,
  userId: string
): Promise<StyleLog> {
  // 1) 이미지 Supabase Storage 업로드
  const fileName = `${userId}/${Date.now()}-before.jpg`
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('style-images')
    .upload(fileName, imageFile, { contentType: 'image/jpeg', upsert: false })

  if (uploadError) throw new Error(`이미지 업로드 실패: ${uploadError.message}`)

  const { data: { publicUrl } } = supabase.storage
    .from('style-images')
    .getPublicUrl(uploadData.path)

  // 2) Mock AI 분석 (실제 서비스에서는 Vision API 연동)
  const itaValue = Math.floor(Math.random() * 60) + 20  // 20~80
  const colorSeason = getColorSeason(itaValue)
  const bodyShapes: BodyShape[] = ['hourglass', 'rectangle', 'pear', 'apple', 'inverted_triangle']
  const bodyShape = bodyShapes[Math.floor(Math.random() * bodyShapes.length)]
  const palette = COLOR_PALETTES[colorSeason]
  const confidence = Math.floor(Math.random() * 15) + 85  // 85~99

  // 3) style_logs 저장
  const { data: logData, error: logError } = await supabase
    .from('style_logs')
    .insert({
      user_id: userId,
      vibe_type: vibeType,
      before_image_url: publicUrl,
      color_season: colorSeason,
      ita_value: itaValue,
      body_shape: bodyShape,
      skin_tone_hex: '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0'),
      best_colors: palette.best,
      avoid_colors: palette.avoid,
      style_suggestions: BODY_STYLE_TIPS[bodyShape],
      confidence_score: confidence,
    })
    .select()
    .single()

  if (logError) throw new Error(`분석 결과 저장 실패: ${logError.message}`)

  // 4) 다이아 차감 (-5)
  await supabase.rpc('decrement_diamonds', { p_user_id: userId, p_amount: 5 })

  return logData as StyleLog
}

// ─── 다이아 보상 지급 ───
export async function grantDiamonds(userId: string, amount: number, reason: string) {
  const { error } = await supabase.rpc('grant_diamonds', {
    p_user_id: userId,
    p_amount: amount,
    p_description: reason,
  })
  if (error) throw new Error(`다이아 지급 실패: ${error.message}`)
}
