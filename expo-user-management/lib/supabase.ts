import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xbqftvmdnubynvtyiwbh.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhicWZ0dm1kbnVieW52dHlpd2JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2OTU2NzYsImV4cCI6MjA2NDI3MTY3Nn0.J--qrDzgr6PPWaiSjSss0L2gTnTUok7hT5Z8pCvu5fI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})