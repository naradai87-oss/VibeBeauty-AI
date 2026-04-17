import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import ReportClient from './ReportClient'

export default async function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()

  const { data: log, error } = await supabase
    .from('style_logs')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !log) notFound()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: inventory } = await supabase
    .from('inventory')
    .select('*, product:products(*)')
    .eq('user_id', user?.id ?? '')

  // 실제 서비스에서는 log.vibe_type, color_season 기반 상품 쿼리
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .contains('vibe_type', [log.vibe_type])
    .limit(3)

  return (
    <ReportClient
      log={log}
      inventory={inventory ?? []}
      products={products ?? []}
    />
  )
}
