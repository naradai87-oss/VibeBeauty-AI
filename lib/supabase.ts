import { createBrowserClient } from '@supabase/ssr'

// ─── 브라우저용 클라이언트 ───
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// 싱글톤 (클라이언트 컴포넌트에서 직접 import 가능)
export const supabase = createClient()
