import { createClient } from '@supabase/supabase-js'

// Supabase konfigurace - přímé nastavení
const supabaseUrl = 'https://itymhcieyeonpzfbqzth.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0eW1oY2lleWVvbnB6ZmJxenRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMDAzNDYsImV4cCI6MjA2OTc3NjM0Nn0.QcJ2XHSlksbpQSzEQB6g72xRXJsy1M8C94Cl4AzEoJs'

// Debug informace
console.log('=== SUPABASE DEBUG START ===')
console.log('supabaseUrl:', supabaseUrl)
console.log('supabaseAnonKey:', supabaseAnonKey ? 'EXISTUJE' : 'NEEXISTUJE')
console.log('Supabase URL: NASTAVENO')
console.log('Supabase Key: NASTAVENO')
console.log('=== SUPABASE DEBUG END ===')

// Vytvoření Supabase klienta (pokud jsou k dispozici credentials)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Fallback funkce pro localStorage
export const localStorageFallback = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key)
    }
    return null
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value)
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  }
}

// Bezpečná funkce pro načtení dat (Supabase + fallback na localStorage)
export const safeLoadData = async (key: string) => {
  try {
    if (supabase) {
      // Zkusíme Supabase
      const { data, error } = await supabase
        .from('app_data')
        .select('value')
        .eq('key', key)
        .single()
      
      if (!error && data) {
        return data.value
      }
    }
  } catch (error) {
    console.log('Supabase nedostupné, používáme localStorage')
  }
  
  // Fallback na localStorage
  return localStorageFallback.getItem(key)
}

// Bezpečná funkce pro uložení dat (Supabase + fallback na localStorage)
export const safeSaveData = async (key: string, value: string) => {
  try {
    if (supabase) {
      // Zkusíme Supabase
      const { error } = await supabase
        .from('app_data')
        .upsert({ key, value, updated_at: new Date().toISOString() })
      
      if (!error) {
        console.log('Data uložena do Supabase')
        return
      }
    }
  } catch (error) {
    console.log('Supabase nedostupné, ukládáme do localStorage')
  }
  
  // Fallback na localStorage
  localStorageFallback.setItem(key, value)
} 