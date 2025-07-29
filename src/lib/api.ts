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