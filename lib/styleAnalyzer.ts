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

// ─── 바디 타입별 스타일 추천 (Thinking Model Enhanced) ───
export const BODY_STYLE_TIPS: Record<BodyShape, string[]> = {
  hourglass: [
    '허리라인을 강조하는 랩 드레스나 하이웨이스트 팬츠로 균형 잡힌 곡선을 극대화하세요.',
    '타이트한 상의와 와이드 팬츠 조합으로 실루엣의 대비를 살리는 것을 추천합니다.',
    'V넥이나 스퀘어넥으로 목선을 시원하게 드러내면 더욱 세련된 인상을 줄 수 있습니다.'
  ],
  rectangle: [
    '어깨에 볼륨을 주는 퍼프 소매나 러플 블라우스로 상체에 부드러운 곡선을 더하세요.',
    '두꺼운 벨트를 활용해 인위적인 허리 라인을 만들어주는 것이 가장 효과적입니다.',
    'A라인 스커트나 페플럼 상의를 통해 하체에 볼륨감을 주어 X자 실루엣을 연출해보세요.'
  ],
  pear: [
    '밝은 컬러나 패턴이 있는 상의를 선택해 시선을 상체로 끌어올리는 것이 핵심입니다.',
    '하체는 어두운 톤의 일자 핏 슬랙스나 A라인 롱 스커트로 차분하게 정리하세요.',
    '어깨 패드가 있는 자켓이나 보트넥 상의로 어깨너비를 보완해주면 균형이 완벽해집니다.'
  ],
  apple: [
    '시선을 세로로 분산시키는 V넥이나 긴 네크리스를 적극 활용하세요.',
    '허리 라인이 가슴 바로 아래에서 시작되는 엠파이어 웨이스트 디자인이 체형 보완에 좋습니다.',
    '슬림한 다리 라인을 강조할 수 있는 짧은 스커트나 타이트한 팬츠를 매치해보세요.'
  ],
  inverted_triangle: [
    '화려한 패턴이나 볼륨감이 있는 스커트, 와이드 팬츠로 하체에 힘을 실어주세요.',
    '상체는 심플한 U넥이나 홀터넥을 선택해 시각적으로 어깨가 좁아 보이게 연출하세요.',
    '래글런 소매나 어두운 컬러의 상의가 체형 보완에 매우 효과적입니다.'
  ],
}

// ─── 퍼스널 컬러별 무드 인사이트 ───
export const STYLE_INSIGHTS: Record<ColorSeason, string> = {
  spring_warm: '봄의 생동감을 닮은 당신, 비타민 같은 상큼한 컬러가 얼굴의 혈색을 즉각적으로 살려줍니다.',
  summer_cool: '여름의 청량함과 우아함이 공존하는 타입입니다. 파스텔톤의 부드러운 컬러가 당신의 지적인 분위기를 극대화합니다.',
  autumn_warm: '가을의 깊이 있는 감성을 지니셨네요. 차분한 어스(Earth) 톤이 당신의 고급스럽고 포근한 이미지를 완성합니다.',
  winter_cool: '겨울의 차갑고 선명한 카리스마가 돋보입니다. 대비가 강한 블랙 & 화이트나 원색이 당신의 이목구비를 더욱 또렷하게 만듭니다.',
}

// ─── AI 분석 메인 함수 ───
export async function analyzeStyle(
  imageFile: File,
  vibeType: VibeType,
  userId: string
): Promise<StyleLog> {
  console.log('Starting style analysis for user:', userId, 'vibe:', vibeType)

  // 1) 이미지 Supabase Storage 업로드
  const fileName = `${userId}/${Date.now()}-before.jpg`
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('style-images')
    .upload(fileName, imageFile, { 
      contentType: 'image/jpeg', 
      upsert: true // 동일 파일명 충돌 방지 및 재시도 허용
    })

  if (uploadError) {
    console.error('Storage Upload Error:', uploadError)
    throw new Error(`이미지 업로드 실패: ${uploadError.message} (Bucket: style-images)`)
  }

  const { data: { publicUrl } } = supabase.storage
    .from('style-images')
    .getPublicUrl(uploadData.path)

  console.log('Image uploaded successfully:', publicUrl)

  // 2) Mock AI 분석 (Thinking Model Depth)
  const itaValue = Math.floor(Math.random() * 60) + 20  // 20~80
  const colorSeason = getColorSeason(itaValue)
  const bodyShapes: BodyShape[] = ['hourglass', 'rectangle', 'pear', 'apple', 'inverted_triangle']
  const bodyShape = bodyShapes[Math.floor(Math.random() * bodyShapes.length)]
  const palette = COLOR_PALETTES[colorSeason]
  const insight = STYLE_INSIGHTS[colorSeason]
  const confidence = Math.floor(Math.random() * 15) + 85  // 85~99

  // 3) style_logs 저장
  console.log('Inserting style log into database...')
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

  if (logError) {
    console.error('Database Insert Error:', logError)
    throw new Error(`분석 결과 저장 실패 (Style Log Missing): ${logError.message}`)
  }

  console.log('Style log created successfully:', logData.id)

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
