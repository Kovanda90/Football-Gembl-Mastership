import { supabase } from './supabase'

// Funkce pro migraci všech dat z localStorage do Supabase
export const migrateAllData = async () => {
  if (!supabase) {
    console.log('Supabase není nakonfigurované')
    return { success: false, message: 'Supabase není nakonfigurované' }
  }

  try {
    const dataToMigrate = [
      // Tipy pro 1. kolo
      { key: 'tips1_Rybča', value: localStorage.getItem('tips1_Rybča') },
      { key: 'tips1_Kořda', value: localStorage.getItem('tips1_Kořda') },
      { key: 'tips1_Jozeve', value: localStorage.getItem('tips1_Jozeve') },
      { key: 'tips1_Špinavovlas', value: localStorage.getItem('tips1_Špinavovlas') },
      { key: 'tips1_Netáhlo', value: localStorage.getItem('tips1_Netáhlo') },
      
      // Tipy pro 2. kolo
      { key: 'tips2_Rybča', value: localStorage.getItem('tips2_Rybča') },
      { key: 'tips2_Kořda', value: localStorage.getItem('tips2_Kořda') },
      { key: 'tips2_Jozeve', value: localStorage.getItem('tips2_Jozeve') },
      { key: 'tips2_Špinavovlas', value: localStorage.getItem('tips2_Špinavovlas') },
      { key: 'tips2_Netáhlo', value: localStorage.getItem('tips2_Netáhlo') },
      
      // Výsledky
      { key: 'results1_2025_26', value: localStorage.getItem('results1_2025_26') },
      { key: 'results2_2025_26', value: localStorage.getItem('results2_2025_26') }
    ]

    let migratedCount = 0
    let errors = []

    for (const item of dataToMigrate) {
      if (item.value) {
        try {
          const { error } = await supabase
            .from('app_data')
            .upsert({ 
              key: item.key, 
              value: item.value,
              updated_at: new Date().toISOString()
            })
          
          if (error) {
            errors.push(`${item.key}: ${error.message}`)
          } else {
            migratedCount++
            console.log(`Migrováno: ${item.key}`)
          }
        } catch (error) {
          errors.push(`${item.key}: ${error}`)
        }
      }
    }

    return {
      success: errors.length === 0,
      migratedCount,
      errors,
      message: `Migrováno ${migratedCount} položek${errors.length > 0 ? `, ${errors.length} chyb` : ''}`
    }
  } catch (error) {
    return {
      success: false,
      message: `Chyba při migraci: ${error}`,
      errors: [error.toString()]
    }
  }
}

// Funkce pro testování připojení k Supabase
export const testSupabaseConnection = async () => {
  if (!supabase) {
    return { success: false, message: 'Supabase není nakonfigurované' }
  }

  try {
    const { data, error } = await supabase
      .from('app_data')
      .select('count')
      .limit(1)
    
    if (error) {
      return { success: false, message: `Chyba připojení: ${error.message}` }
    }
    
    return { success: true, message: 'Připojení k Supabase úspěšné!' }
  } catch (error) {
    return { success: false, message: `Chyba připojení: ${error}` }
  }
} 