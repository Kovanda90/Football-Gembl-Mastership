import { safeLoadData, safeSaveData } from './supabase'

// API funkce pro načítání dat z oficiálních zdrojů
export interface Match {
  home: string;
  away: string;
  kickoff: string;
  homeScore?: number;
  awayScore?: number;
  status?: 'scheduled' | 'live' | 'finished';
}

export interface Round {
  round: number;
  matches: Match[];
}

// Funkce pro načítání dat z FAČR API (pokud je dostupné)
export async function fetchMatchesFromFACR(): Promise<Round[]> {
  try {
    // Zde by byla implementace pro načítání z FAČR API
    // Prozatím vracíme prázdné pole
    return [];
  } catch (error) {
    console.error('Chyba při načítání dat z FAČR:', error);
    return [];
  }
}

// Funkce pro načítání dat z livesport.cz
export async function fetchMatchesFromLivesport(): Promise<Round[]> {
  try {
    // Zde by byla implementace pro načítání z livesport.cz
    // Prozatím vracíme prázdné pole
    return [];
  } catch (error) {
    console.error('Chyba při načítání dat z Livesport:', error);
    return [];
  }
}

// Funkce pro validaci a aktualizaci dat
export function validateMatchData(matches: Match[]): boolean {
  const teams = [
    'FK Pardubice', 'FC Viktoria Plzeň', 'Bohemians Praha 1905', 'FC Baník Ostrava',
    'FK Teplice', 'FC Zlín', 'MFK Karviná', 'FK Dukla Praha', 'FK Jablonec',
    'AC Sparta Praha', '1.FC Slovácko', 'SK Sigma Olomouc', 'FK Mladá Boleslav',
    'FC Slovan Liberec', 'SK Slavia Praha', 'FC Hradec Králové'
  ];

  return matches.every(match => 
    teams.includes(match.home) && teams.includes(match.away)
  );
} 

// Helper funkce pro načtení tipů
export const loadTips = async (user: string, round: number) => {
  try {
    // Zkusíme API
    const response = await fetch(`/api/tips?user=${user}&round=${round}`)
    if (response.ok) {
      const data = await response.json()
      if (data && data.length > 0) {
        return data
      }
    }
  } catch (error) {
    console.log('API nedostupné, používáme localStorage')
  }
  
  // Fallback na localStorage
  const key = `tips${round}_${user}`
  const data = await safeLoadData(key)
  return data ? JSON.parse(data) : []
}

// Helper funkce pro uložení tipů
export const saveTips = async (user: string, round: number, tips: any[]) => {
  try {
    // Zkusíme API
    const response = await fetch('/api/tips', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, round, tips })
    })
    if (response.ok) {
      return true
    }
  } catch (error) {
    console.log('API nedostupné, ukládáme do localStorage')
  }
  
  // Fallback na localStorage
  const key = `tips${round}_${user}`
  await safeSaveData(key, JSON.stringify(tips))
  return true
}

// Helper funkce pro načtení výsledků
export const loadResults = async (round: number) => {
  try {
    // Zkusíme API
    const response = await fetch(`/api/results?round=${round}`)
    if (response.ok) {
      const data = await response.json()
      if (data && data.length > 0) {
        return data
      }
    }
  } catch (error) {
    console.log('API nedostupné, používáme localStorage')
  }
  
  // Fallback na localStorage
  const key = `results${round}_2025_26`
  const data = await safeLoadData(key)
  return data ? JSON.parse(data) : []
}

// Helper funkce pro uložení výsledků
export const saveResults = async (round: number, results: any[]) => {
  try {
    // Zkusíme API
    const response = await fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ round, results })
    })
    if (response.ok) {
      return true
    }
  } catch (error) {
    console.log('API nedostupné, ukládáme do localStorage')
  }
  
  // Fallback na localStorage
  const key = `results${round}_2025_26`
  await safeSaveData(key, JSON.stringify(results))
  return true
}

// Helper funkce pro načtení všech tipů (pro admin)
export const loadAllTips = async (round: number) => {
  try {
    // Zkusíme API
    const response = await fetch(`/api/tips/all?round=${round}`)
    if (response.ok) {
      const data = await response.json()
      if (data && Object.keys(data).length > 0) {
        return data
      }
    }
  } catch (error) {
    console.log('API nedostupné, používáme localStorage')
  }
  
  // Fallback na localStorage
  const users = ['Rybča', 'Kořda', 'Jozeve', 'Špinavovlas', 'Netáhlo']
  const allTips: { [key: string]: any[] } = {}
  
  for (const user of users) {
    const key = `tips${round}_${user}`
    const data = await safeLoadData(key)
    if (data) {
      allTips[user] = JSON.parse(data)
    }
  }
  
  return allTips
} 