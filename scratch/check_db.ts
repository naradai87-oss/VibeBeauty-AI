import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkTables() {
  const tables = ['profiles', 'style_logs', 'products', 'inventory', 'diamonds_history']
  console.log('--- Checking Supabase Tables ---')
  for (const table of tables) {
    const { error } = await supabase.from(table).select('*').limit(1)
    if (error) {
      console.log(`❌ Table '${table}':`, error.message)
    } else {
      console.log(`✅ Table '${table}': OK`)
    }
  }
}

checkTables()
