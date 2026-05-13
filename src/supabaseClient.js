import { createClient } from '@supabase/supabase-js'

// In dono jagah par apni wahi keys dalein jo humne abhi Supabase se dhoondi thin
const supabaseUrl = 'https://jgpelzfbykejfsvrjwyr.supabase.co'
const supabaseAnonKey = 'sb_publishable_oEMAp1CwjiU6AMODFFNTMQ_2mj2wpb3'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)