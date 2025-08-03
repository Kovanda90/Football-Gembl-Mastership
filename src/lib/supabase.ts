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
  console.log(`=== SAFE LOAD DATA: ${key} ===`)
  
  try {
    if (supabase) {
      console.log('Zkouším Supabase pro:', key)
      // Zkusíme Supabase
      const { data, error } = await supabase
        .from('app_data')
        .select('value')
        .eq('key', key)
        .single()
      
      console.log('Supabase response:', { data, error })
      
      if (!error && data) {
        console.log('Načteno ze Supabase:', key)
        return data.value
      } else {
        console.log('Supabase chyba nebo žádná data:', error)
      }
    } else {
      console.log('Supabase není dostupné')
    }
  } catch (error) {
    console.log('Supabase nedostupné, používáme localStorage:', error)
  }
  
  // Fallback na localStorage
  const localData = localStorageFallback.getItem(key)
  console.log('Fallback na localStorage:', key, localData ? 'EXISTUJE' : 'NEEXISTUJE')
  return localData
}

// Bezpečná funkce pro uložení dat (Supabase + fallback na localStorage)
export const safeSaveData = async (key: string, value: string) => {
  console.log(`=== SAFE SAVE DATA: ${key} ===`)
  console.log('Hodnota k uložení:', value)
  
  try {
    if (supabase) {
      console.log('Zkouším Supabase pro:', key)
      
      // Nejdříve zkontrolujeme, jestli záznam existuje
      const { data: existingData, error: selectError } = await supabase
        .from('app_data')
        .select('key')
        .eq('key', key)
        .single()
      
      console.log('Kontrola existujícího záznamu:', { existingData, selectError })
      
      let saveError = null
      
      if (existingData) {
        // Záznam existuje - použijeme UPDATE
        console.log('Záznam existuje, používám UPDATE')
        const { error: updateError } = await supabase
          .from('app_data')
          .update({ value, updated_at: new Date().toISOString() })
          .eq('key', key)
        
        saveError = updateError
        console.log('UPDATE výsledek:', { updateError })
      } else {
        // Záznam neexistuje - použijeme INSERT
        console.log('Záznam neexistuje, používám INSERT')
        const { error: insertError } = await supabase
          .from('app_data')
          .insert({ key, value, updated_at: new Date().toISOString() })
        
        saveError = insertError
        console.log('INSERT výsledek:', { insertError })
      }
      
      if (!saveError) {
        console.log('Data úspěšně uložena do Supabase')
        // Také uložíme do localStorage jako backup
        localStorageFallback.setItem(key, value)
        console.log('Data také uložena do localStorage jako backup')
        return
      } else {
        console.log('Chyba při ukládání do Supabase:', saveError)
      }
    } else {
      console.log('Supabase není dostupné')
    }
  } catch (error) {
    console.log('Supabase nedostupné, ukládáme do localStorage:', error)
  }
  
  // Fallback na localStorage
  localStorageFallback.setItem(key, value)
  console.log('Data uložena do localStorage:', key)
} 