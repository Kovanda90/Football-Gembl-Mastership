import { createClient } from '@supabase/supabase-js'

// Supabase konfigurace - zatím prázdné, budeme doplňovat
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

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