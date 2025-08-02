'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  MATCHES_ROUND_1,
  MATCHES_ROUND_2,
  MATCHES_ROUND_3,
  MATCHES_ROUND_4,
  MATCHES_ROUND_5,
  MATCHES_ROUND_6,
  MATCHES_ROUND_7,
  MATCHES_ROUND_8,
  MATCHES_ROUND_9,
  MATCHES_ROUND_10,
  MATCHES_ROUND_11,
  MATCHES_ROUND_12,
  MATCHES_ROUND_13,
  MATCHES_ROUND_14,
  MATCHES_ROUND_15,
  MATCHES_ROUND_16,
  MATCHES_ROUND_17,
  MATCHES_ROUND_18,
  MATCHES_ROUND_19,
  MATCHES_ROUND_20,
  MATCHES_ROUND_21,
  MATCHES_ROUND_22,
  MATCHES_ROUND_23,
  MATCHES_ROUND_24,
  MATCHES_ROUND_25,
  MATCHES_ROUND_26,
  MATCHES_ROUND_27,
  MATCHES_ROUND_28,
  MATCHES_ROUND_29,
  MATCHES_ROUND_30,
} from '../../lib/matches-2025-26'
import { calculatePoints } from '@/lib/points'

// Automatický import dat z lokálního localStorage
const importLocalData = () => {
  // Vyčisti localStorage pro první a druhé kolo, aby se načetla nová data
  localStorage.removeItem('dataImported');
  localStorage.removeItem('tips1_Rybča');
  localStorage.removeItem('tips1_Kořda');
  localStorage.removeItem('tips1_Jozeve');
  localStorage.removeItem('tips1_Špinavovlas');
  localStorage.removeItem('tips1_Netáhlo');
  localStorage.removeItem('results1_2025_26');
  localStorage.removeItem('tips2_Rybča');
  localStorage.removeItem('tips2_Kořda');
  localStorage.removeItem('tips2_Jozeve');
  localStorage.removeItem('tips2_Špinavovlas');
  localStorage.removeItem('tips2_Netáhlo');
  
  // Kontrola, zda už byla data importována
  if (localStorage.getItem('dataImported')) {
    return;
  }

  try {
    // Data z lokálního localStorage (zde vlož svá data)
    const localData: Record<string, string> = {
      "tips1_Rybča": "[{\"home\":\"0\",\"away\":\"3\",\"scorer\":\"Šulc\"},{\"home\":\"1\",\"away\":\"1\",\"scorer\":\"Drchal\"},{\"home\":\"1\",\"away\":\"0\",\"scorer\":\"Kozák\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Gning\"},{\"home\":\"1\",\"away\":\"3\",\"scorer\":\"Kuchta\"},{\"home\":\"0\",\"away\":\"2\",\"scorer\":\"Janošek\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Krollis\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Chorý\"}]",
      "tips2_Rybča": "[{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Vašulín\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Nombil\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Vydra\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"van Buren\"},{\"home\":\"0\",\"away\":\"2\",\"scorer\":\"Chorý\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Krollis\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Šín\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Kuchta\"}]",
      "tips1_Kořda": "[{\"home\":\"0\",\"away\":\"2\",\"scorer\":\"Vydra\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Ewerton\"},{\"home\":\"1\",\"away\":\"0\",\"scorer\":\"Kozák\"},{\"home\":\"1\",\"away\":\"1\",\"scorer\":\"Milla\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Kuchta\"},{\"home\":\"0\",\"away\":\"1\",\"scorer\":\"Vašulín\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Krollis\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Kušej\"}]",
      "tips2_Kořda": "[{\"home\":\"1\",\"away\":\"0\",\"scorer\":\"Vašulín\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Kanu\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Vydra\"},{\"home\":\"3\",\"away\":\"1\",\"scorer\":\"Vlkanova\"},{\"home\":\"1\",\"away\":\"3\",\"scorer\":\"Chorý\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Krollis\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Šín\"},{\"home\":\"3\",\"away\":\"1\",\"scorer\":\"Kuchta\"}]",
      "tips1_Jozeve": "[{\"home\":\"0\",\"away\":\"3\",\"scorer\":\"Vydra\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Ewerton\"},{\"home\":\"1\",\"away\":\"0\",\"scorer\":\"Krejčí\"},{\"home\":\"3\",\"away\":\"1\",\"scorer\":\"Gning\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Kuchta\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Mikulenka\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Krollis\"},{\"home\":\"3\",\"away\":\"0\",\"scorer\":\"Kušej\"}]",
      "tips2_Jozeve": "[{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Vašulín\"},{\"home\":\"1\",\"away\":\"1\",\"scorer\":\"Kanu\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Vydra\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Pilař\"},{\"home\":\"0\",\"away\":\"3\",\"scorer\":\"Chorý\"},{\"home\":\"3\",\"away\":\"0\",\"scorer\":\"Krollis\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Prekop\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Haraslín\"}]",
      "tips1_Špinavovlas": "[{\"home\":\"0\",\"away\":\"2\",\"scorer\":\"Prince Adu\"},{\"home\":\"0\",\"away\":\"1\",\"scorer\":\"Ewerton\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Pulkrab\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Gning\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Kuchta\"},{\"home\":\"1\",\"away\":\"1\",\"scorer\":\"Janošek\"},{\"home\":\"1\",\"away\":\"1\",\"scorer\":\"Vojta\"},{\"home\":\"3\",\"away\":\"0\",\"scorer\":\"Chorý\"}]",
      "tips2_Špinavovlas": "[{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Vašulín\"},{\"home\":\"1\",\"away\":\"0\",\"scorer\":\"Kanu\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Šulc\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"van Buren\"},{\"home\":\"0\",\"away\":\"2\",\"scorer\":\"Chorý\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Krollis\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Šín\"},{\"home\":\"3\",\"away\":\"1\",\"scorer\":\"Kuchta\"}]",
      "tips1_Netáhlo": "[{\"home\":\"0\",\"away\":\"2\",\"scorer\":\"Šulc\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Ewerton\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Kozák\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Vecheta\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Haraslín\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Janošek\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Hlavatý\"},{\"home\":\"3\",\"away\":\"0\",\"scorer\":\"Kušej\"}]",
      "tips2_Netáhlo": "[{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Vašulín\"},{\"home\":\"1\",\"away\":\"1\",\"scorer\":\"Krmenčík\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Šulc\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"van Buren\"},{\"home\":\"1\",\"away\":\"2\",\"scorer\":\"Chorý\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Krollis\"},{\"home\":\"2\",\"away\":\"0\",\"scorer\":\"Šín\"},{\"home\":\"2\",\"away\":\"1\",\"scorer\":\"Kuchta\"}]",
      "results1_2025_26": "[{\"home\":\"1\",\"away\":\"5\",\"scorers\":\"Vydra, Vydra, Šulc\"},{\"home\":\"1\",\"away\":\"0\",\"scorers\":\"Yusuf\"},{\"home\":\"1\",\"away\":\"3\",\"scorers\":\"Pulkrab, Kanu, Nombil\"},{\"home\":\"2\",\"away\":\"0\",\"scorers\":\"Sinhateh\"},{\"home\":\"1\",\"away\":\"1\",\"scorers\":\"Kuchta\"},{\"home\":\"0\",\"away\":\"1\",\"scorers\":\"Vašulín\"},{\"home\":\"3\",\"away\":\"3\",\"scorers\":\"Pech, Macek, Krollis, Hlavatý, Mašel\"},{\"home\":\"2\",\"away\":\"2\",\"scorers\":\"Sojka, Chorý, Zafeiris, Hodek\"}]",
      "results2_2025_26": "[{\"home\":\"1\",\"away\":\"1\",\"scorers\":\"\"},{\"home\":\"2\",\"away\":\"0\",\"scorers\":\"Haaland, De Bruyne\"},{\"home\":\"0\",\"away\":\"0\",\"scorers\":\"\"},{\"home\":\"3\",\"away\":\"1\",\"scorers\":\"Kane, Son\"},{\"home\":\"1\",\"away\":\"2\",\"scorers\":\"Salah, Mane\"},{\"home\":\"2\",\"away\":\"2\",\"scorers\":\"Vardy, Barnes\"},{\"home\":\"0\",\"away\":\"1\",\"scorers\":\"Wilson\"},{\"home\":\"1\",\"away\":\"1\",\"scorers\":\"\"},{\"home\":\"2\",\"away\":\"0\",\"scorers\":\"Son, Kane\"},{\"home\":\"1\",\"away\":\"0\",\"scorers\":\"Aubameyang\"}]"
    };

    // Import všech dat
    Object.keys(localData).forEach(key => {
      localStorage.setItem(key, localData[key]);
    });

    // Označ, že data byla importována
    localStorage.setItem('dataImported', 'true');
    
    console.log('Data úspěšně naimportována z lokálního localStorage!');
  } catch (error) {
    console.error('Chyba při importu dat:', error);
  }
};

// Spusť import při načtení stránky
if (typeof window !== 'undefined') {
  importLocalData();
}

const USERS = [
  { nickname: 'Rybča', password: 'rybca123' },
  { nickname: 'Kořda', password: 'korda123' },
  { nickname: 'Jozeve', password: 'jozeve123' },
  { nickname: 'Špinavovlas', password: 'spinavovlas123' },
  { nickname: 'Netáhlo', password: 'netahlo123' },
  { nickname: 'admin', password: 'admin123' },
]

const ADMIN_NICK = 'admin'

interface Tip {
  home: string;
  away: string;
  scorer: string;
}

interface Result {
  home: string;
  away: string;
  scorers: string;
}

function getInitialTips(matches: any[]): Tip[] {
  return matches.map(() => ({ home: '', away: '', scorer: '' }))
}

function getInitialResults(matches: any[]): Result[] {
  return matches.map(() => ({ home: '', away: '', scorers: '' }))
}



export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [tips1, setTips1] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_1))
  const [tips2, setTips2] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_2))
  const [tips3, setTips3] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_3))
  const [tips4, setTips4] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_4))
  const [tips5, setTips5] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_5))
  const [tips6, setTips6] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_6))
  const [tips7, setTips7] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_7))
  const [tips8, setTips8] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_8))
  const [tips9, setTips9] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_9))
  const [tips10, setTips10] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_10))
  const [tips11, setTips11] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_11))
  const [tips12, setTips12] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_12))
  const [tips13, setTips13] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_13))
  const [tips14, setTips14] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_14))
  const [tips15, setTips15] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_15))
  const [tips16, setTips16] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_16))
  const [tips17, setTips17] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_17))
  const [tips18, setTips18] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_18))
  const [tips19, setTips19] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_19))
  const [tips20, setTips20] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_20))
  const [tips21, setTips21] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_21))
  const [tips22, setTips22] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_22))
  const [tips23, setTips23] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_23))
  const [tips24, setTips24] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_24))
  const [tips25, setTips25] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_25))
  const [tips26, setTips26] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_26))
  const [tips27, setTips27] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_27))
  const [tips28, setTips28] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_28))
  const [tips29, setTips29] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_29))
  const [tips30, setTips30] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_30))
  
  const [results1, setResults1] = useState<Result[]>([
    { home: "1", away: "5", scorers: "Vydra, Vydra, Šulc" },
    { home: "1", away: "0", scorers: "Yusuf" },
    { home: "1", away: "3", scorers: "Pulkrab, Kanu, Nombil" },
    { home: "2", away: "0", scorers: "Sinhateh" },
    { home: "1", away: "1", scorers: "Kuchta" },
    { home: "0", away: "1", scorers: "Vašulín" },
    { home: "3", away: "3", scorers: "Pech, Macek, Krollis, Hlavatý, Mašel" },
    { home: "2", away: "2", scorers: "Sojka, Chorý, Zafeiris, Hodek" }
  ])
  const [results2, setResults2] = useState<Result[]>(getInitialResults(MATCHES_ROUND_2))
  const [results3, setResults3] = useState<Result[]>(getInitialResults(MATCHES_ROUND_3))
  const [results4, setResults4] = useState<Result[]>(getInitialResults(MATCHES_ROUND_4))
  const [results5, setResults5] = useState<Result[]>(getInitialResults(MATCHES_ROUND_5))
  const [results6, setResults6] = useState<Result[]>(getInitialResults(MATCHES_ROUND_6))
  const [results7, setResults7] = useState<Result[]>(getInitialResults(MATCHES_ROUND_7))
  const [results8, setResults8] = useState<Result[]>(getInitialResults(MATCHES_ROUND_8))
  const [results9, setResults9] = useState<Result[]>(getInitialResults(MATCHES_ROUND_9))
  const [results10, setResults10] = useState<Result[]>(getInitialResults(MATCHES_ROUND_10))
  const [results11, setResults11] = useState<Result[]>(getInitialResults(MATCHES_ROUND_11))
  const [results12, setResults12] = useState<Result[]>(getInitialResults(MATCHES_ROUND_12))
  const [results13, setResults13] = useState<Result[]>(getInitialResults(MATCHES_ROUND_13))
  const [results14, setResults14] = useState<Result[]>(getInitialResults(MATCHES_ROUND_14))
  const [results15, setResults15] = useState<Result[]>(getInitialResults(MATCHES_ROUND_15))
  const [results16, setResults16] = useState<Result[]>(getInitialResults(MATCHES_ROUND_16))
  const [results17, setResults17] = useState<Result[]>(getInitialResults(MATCHES_ROUND_17))
  const [results18, setResults18] = useState<Result[]>(getInitialResults(MATCHES_ROUND_18))
  const [results19, setResults19] = useState<Result[]>(getInitialResults(MATCHES_ROUND_19))
  const [results20, setResults20] = useState<Result[]>(getInitialResults(MATCHES_ROUND_20))
  const [results21, setResults21] = useState<Result[]>(getInitialResults(MATCHES_ROUND_21))
  const [results22, setResults22] = useState<Result[]>(getInitialResults(MATCHES_ROUND_22))
  const [results23, setResults23] = useState<Result[]>(getInitialResults(MATCHES_ROUND_23))
  const [results24, setResults24] = useState<Result[]>(getInitialResults(MATCHES_ROUND_24))
  const [results25, setResults25] = useState<Result[]>(getInitialResults(MATCHES_ROUND_25))
  const [results26, setResults26] = useState<Result[]>(getInitialResults(MATCHES_ROUND_26))
  const [results27, setResults27] = useState<Result[]>(getInitialResults(MATCHES_ROUND_27))
  const [results28, setResults28] = useState<Result[]>(getInitialResults(MATCHES_ROUND_28))
  const [results29, setResults29] = useState<Result[]>(getInitialResults(MATCHES_ROUND_29))
  const [results30, setResults30] = useState<Result[]>(getInitialResults(MATCHES_ROUND_30))
  
  const [allTips1, setAllTips1] = useState<{[key: string]: Tip[]}>({})
  const [allTips2, setAllTips2] = useState<{[key: string]: Tip[]}>({})
  const [allTips3, setAllTips3] = useState<{[key: string]: Tip[]}>({})
  const [allTips4, setAllTips4] = useState<{[key: string]: Tip[]}>({})
  const [allTips5, setAllTips5] = useState<{[key: string]: Tip[]}>({})
  const [allTips6, setAllTips6] = useState<{[key: string]: Tip[]}>({})
  const [allTips7, setAllTips7] = useState<{[key: string]: Tip[]}>({})
  const [allTips8, setAllTips8] = useState<{[key: string]: Tip[]}>({})
  const [allTips9, setAllTips9] = useState<{[key: string]: Tip[]}>({})
  const [allTips10, setAllTips10] = useState<{[key: string]: Tip[]}>({})
  const [allTips11, setAllTips11] = useState<{[key: string]: Tip[]}>({})
  const [allTips12, setAllTips12] = useState<{[key: string]: Tip[]}>({})
  const [allTips13, setAllTips13] = useState<{[key: string]: Tip[]}>({})
  const [allTips14, setAllTips14] = useState<{[key: string]: Tip[]}>({})
  const [allTips15, setAllTips15] = useState<{[key: string]: Tip[]}>({})
  const [allTips16, setAllTips16] = useState<{[key: string]: Tip[]}>({})
  const [allTips17, setAllTips17] = useState<{[key: string]: Tip[]}>({})
  const [allTips18, setAllTips18] = useState<{[key: string]: Tip[]}>({})
  const [allTips19, setAllTips19] = useState<{[key: string]: Tip[]}>({})
  const [allTips20, setAllTips20] = useState<{[key: string]: Tip[]}>({})
  const [allTips21, setAllTips21] = useState<{[key: string]: Tip[]}>({})
  const [allTips22, setAllTips22] = useState<{[key: string]: Tip[]}>({})
  const [allTips23, setAllTips23] = useState<{[key: string]: Tip[]}>({})
  const [allTips24, setAllTips24] = useState<{[key: string]: Tip[]}>({})
  const [allTips25, setAllTips25] = useState<{[key: string]: Tip[]}>({})
  const [allTips26, setAllTips26] = useState<{[key: string]: Tip[]}>({})
  const [allTips27, setAllTips27] = useState<{[key: string]: Tip[]}>({})
  const [allTips28, setAllTips28] = useState<{[key: string]: Tip[]}>({})
  const [allTips29, setAllTips29] = useState<{[key: string]: Tip[]}>({})
  const [allTips30, setAllTips30] = useState<{[key: string]: Tip[]}>({})
  
  const router = useRouter()

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      router.push('/')
    }
  }, [router])

  // Načítání tipů všech hráčů pro admin
  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips1_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips1(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips2_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips2(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips3_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips3(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips4_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips4(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips5_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips5(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips6_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips6(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips7_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips7(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips8_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips8(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips9_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips9(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips10_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips10(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips11_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips11(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips12_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips12(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips13_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips13(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips14_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips14(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips15_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips15(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips16_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips16(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips17_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips17(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips18_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips18(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips19_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips19(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips20_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips20(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips21_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips21(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips22_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips22(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips23_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips23(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips24_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips24(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips25_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips25(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips26_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips26(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips27_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips27(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips28_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips28(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips29_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips29(tips)
      }
      loadAllTips()
    }
  }, [user])

  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const loadAllTips = () => {
        const tips: {[key: string]: Tip[]} = {}
        USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
          const saved = localStorage.getItem(`tips30_${u.nickname}`)
          if (saved) {
            tips[u.nickname] = JSON.parse(saved)
          }
        })
        setAllTips30(tips)
      }
      loadAllTips()
    }
  }, [user])

  // Načítání tipů pro hráče
  useEffect(() => {
    const savedTips1 = localStorage.getItem(`tips1_${user?.nickname}`)
    if (savedTips1) {
      setTips1(JSON.parse(savedTips1))
    }
  }, [user])

  useEffect(() => {
    const savedTips2 = localStorage.getItem(`tips2_${user?.nickname}`)
    if (savedTips2) {
      console.log(`Načítám tips2 pro ${user?.nickname}:`, savedTips2)
      setTips2(JSON.parse(savedTips2))
    } else {
      console.log(`Žádné tips2 pro ${user?.nickname} v localStorage`)
    }
  }, [user])

  useEffect(() => {
    const savedTips3 = localStorage.getItem(`tips3_${user?.nickname}`)
    if (savedTips3) {
      console.log(`Načítám tips3 pro ${user?.nickname}:`, savedTips3)
      setTips3(JSON.parse(savedTips3))
    } else {
      console.log(`Žádné tips3 pro ${user?.nickname} v localStorage`)
    }
  }, [user])

  useEffect(() => {
    const savedTips4 = localStorage.getItem(`tips4_${user?.nickname}`)
    if (savedTips4) {
      setTips4(JSON.parse(savedTips4))
    }
  }, [user])

  useEffect(() => {
    const savedTips5 = localStorage.getItem(`tips5_${user?.nickname}`)
    if (savedTips5) {
      setTips5(JSON.parse(savedTips5))
    }
  }, [user])

  useEffect(() => {
    const savedTips6 = localStorage.getItem(`tips6_${user?.nickname}`)
    if (savedTips6) {
      setTips6(JSON.parse(savedTips6))
    }
  }, [user])

  useEffect(() => {
    const savedTips7 = localStorage.getItem(`tips7_${user?.nickname}`)
    if (savedTips7) {
      setTips7(JSON.parse(savedTips7))
    }
  }, [user])

  useEffect(() => {
    const savedTips8 = localStorage.getItem(`tips8_${user?.nickname}`)
    if (savedTips8) {
      setTips8(JSON.parse(savedTips8))
    }
  }, [user])

  useEffect(() => {
    const savedTips9 = localStorage.getItem(`tips9_${user?.nickname}`)
    if (savedTips9) {
      setTips9(JSON.parse(savedTips9))
    }
  }, [user])

  useEffect(() => {
    const savedTips10 = localStorage.getItem(`tips10_${user?.nickname}`)
    if (savedTips10) {
      setTips10(JSON.parse(savedTips10))
    }
  }, [user])

  useEffect(() => {
    const savedTips11 = localStorage.getItem(`tips11_${user?.nickname}`)
    if (savedTips11) {
      setTips11(JSON.parse(savedTips11))
    }
  }, [user])

  useEffect(() => {
    const savedTips12 = localStorage.getItem(`tips12_${user?.nickname}`)
    if (savedTips12) {
      setTips12(JSON.parse(savedTips12))
    }
  }, [user])

  useEffect(() => {
    const savedTips13 = localStorage.getItem(`tips13_${user?.nickname}`)
    if (savedTips13) {
      setTips13(JSON.parse(savedTips13))
    }
  }, [user])

  useEffect(() => {
    const savedTips14 = localStorage.getItem(`tips14_${user?.nickname}`)
    if (savedTips14) {
      setTips14(JSON.parse(savedTips14))
    }
  }, [user])

  useEffect(() => {
    const savedTips15 = localStorage.getItem(`tips15_${user?.nickname}`)
    if (savedTips15) {
      setTips15(JSON.parse(savedTips15))
    }
  }, [user])

  useEffect(() => {
    const savedTips16 = localStorage.getItem(`tips16_${user?.nickname}`)
    if (savedTips16) {
      setTips16(JSON.parse(savedTips16))
    }
  }, [user])

  useEffect(() => {
    const savedTips17 = localStorage.getItem(`tips17_${user?.nickname}`)
    if (savedTips17) {
      setTips17(JSON.parse(savedTips17))
    }
  }, [user])

  useEffect(() => {
    const savedTips18 = localStorage.getItem(`tips18_${user?.nickname}`)
    if (savedTips18) {
      setTips18(JSON.parse(savedTips18))
    }
  }, [user])

  useEffect(() => {
    const savedTips19 = localStorage.getItem(`tips19_${user?.nickname}`)
    if (savedTips19) {
      setTips19(JSON.parse(savedTips19))
    }
  }, [user])

  useEffect(() => {
    const savedTips20 = localStorage.getItem(`tips20_${user?.nickname}`)
    if (savedTips20) {
      setTips20(JSON.parse(savedTips20))
    }
  }, [user])

  useEffect(() => {
    const savedTips21 = localStorage.getItem(`tips21_${user?.nickname}`)
    if (savedTips21) {
      setTips21(JSON.parse(savedTips21))
    }
  }, [user])

  useEffect(() => {
    const savedTips22 = localStorage.getItem(`tips22_${user?.nickname}`)
    if (savedTips22) {
      setTips22(JSON.parse(savedTips22))
    }
  }, [user])

  useEffect(() => {
    const savedTips23 = localStorage.getItem(`tips23_${user?.nickname}`)
    if (savedTips23) {
      setTips23(JSON.parse(savedTips23))
    }
  }, [user])

  useEffect(() => {
    const savedTips24 = localStorage.getItem(`tips24_${user?.nickname}`)
    if (savedTips24) {
      setTips24(JSON.parse(savedTips24))
    }
  }, [user])

  useEffect(() => {
    const savedTips25 = localStorage.getItem(`tips25_${user?.nickname}`)
    if (savedTips25) {
      setTips25(JSON.parse(savedTips25))
    }
  }, [user])

  useEffect(() => {
    const savedTips26 = localStorage.getItem(`tips26_${user?.nickname}`)
    if (savedTips26) {
      setTips26(JSON.parse(savedTips26))
    }
  }, [user])

  useEffect(() => {
    const savedTips27 = localStorage.getItem(`tips27_${user?.nickname}`)
    if (savedTips27) {
      setTips27(JSON.parse(savedTips27))
    }
  }, [user])

  useEffect(() => {
    const savedTips28 = localStorage.getItem(`tips28_${user?.nickname}`)
    if (savedTips28) {
      setTips28(JSON.parse(savedTips28))
    }
  }, [user])

  useEffect(() => {
    const savedTips29 = localStorage.getItem(`tips29_${user?.nickname}`)
    if (savedTips29) {
      setTips29(JSON.parse(savedTips29))
    }
  }, [user])

  useEffect(() => {
    const savedTips30 = localStorage.getItem(`tips30_${user?.nickname}`)
    if (savedTips30) {
      setTips30(JSON.parse(savedTips30))
    }
  }, [user])

  // Načítání výsledků pro admin
  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      const savedResults1 = localStorage.getItem('results1_2025_26')
      if (savedResults1) {
        setResults1(JSON.parse(savedResults1))
      } else {
        // Pokud nejsou uložené výsledky, použijeme výchozí hodnoty
        setResults1([
          { home: "1", away: "5", scorers: "Vydra, Spáčil, Šulc, Vydra, Durosinmi" },
          { home: "1", away: "0", scorers: "Yusuf" },
          { home: "1", away: "3", scorers: "Pulkrab, Cupák, Kanu, Nombil" },
          { home: "2", away: "0", scorers: "Singateh, Šigut" },
          { home: "1", away: "1", scorers: "Jawo, Kuchta" },
          { home: "0", away: "1", scorers: "Vašulín" },
          { home: "3", away: "3", scorers: "Pech, Krollis, Macek, Ševčík, Hlavatý, Mašek" },
          { home: "2", away: "2", scorers: "Sojka, Chorý, Zafeiris, Hodek" }
        ])
      }
      
      const savedResults2 = localStorage.getItem('results2_2025_26')
      if (savedResults2) {
        setResults2(JSON.parse(savedResults2))
      }
      
      const savedResults3 = localStorage.getItem('results3_2025_26')
      if (savedResults3) {
        setResults3(JSON.parse(savedResults3))
      }
      
      const savedResults4 = localStorage.getItem('results4_2025_26')
      if (savedResults4) {
        setResults4(JSON.parse(savedResults4))
      }
      
      const savedResults5 = localStorage.getItem('results5_2025_26')
      if (savedResults5) {
        setResults5(JSON.parse(savedResults5))
      }
      
      const savedResults6 = localStorage.getItem('results6_2025_26')
      if (savedResults6) {
        setResults6(JSON.parse(savedResults6))
      }
      
      const savedResults7 = localStorage.getItem('results7_2025_26')
      if (savedResults7) {
        setResults7(JSON.parse(savedResults7))
      }
      
      const savedResults8 = localStorage.getItem('results8_2025_26')
      if (savedResults8) {
        setResults8(JSON.parse(savedResults8))
      }
      
      const savedResults9 = localStorage.getItem('results9_2025_26')
      if (savedResults9) {
        setResults9(JSON.parse(savedResults9))
      }
      
      const savedResults10 = localStorage.getItem('results10_2025_26')
      if (savedResults10) {
        setResults10(JSON.parse(savedResults10))
      }
      
      const savedResults11 = localStorage.getItem('results11_2025_26')
      if (savedResults11) {
        setResults11(JSON.parse(savedResults11))
      }
      
      const savedResults12 = localStorage.getItem('results12_2025_26')
      if (savedResults12) {
        setResults12(JSON.parse(savedResults12))
      }
      
      const savedResults13 = localStorage.getItem('results13_2025_26')
      if (savedResults13) {
        setResults13(JSON.parse(savedResults13))
      }
      
      const savedResults14 = localStorage.getItem('results14_2025_26')
      if (savedResults14) {
        setResults14(JSON.parse(savedResults14))
      }
      
      const savedResults15 = localStorage.getItem('results15_2025_26')
      if (savedResults15) {
        setResults15(JSON.parse(savedResults15))
      }
      
      const savedResults16 = localStorage.getItem('results16_2025_26')
      if (savedResults16) {
        setResults16(JSON.parse(savedResults16))
      }
      
      const savedResults17 = localStorage.getItem('results17_2025_26')
      if (savedResults17) {
        setResults17(JSON.parse(savedResults17))
      }
      
      const savedResults18 = localStorage.getItem('results18_2025_26')
      if (savedResults18) {
        setResults18(JSON.parse(savedResults18))
      }
      
      const savedResults19 = localStorage.getItem('results19_2025_26')
      if (savedResults19) {
        setResults19(JSON.parse(savedResults19))
      }
      
      const savedResults20 = localStorage.getItem('results20_2025_26')
      if (savedResults20) {
        setResults20(JSON.parse(savedResults20))
      }
      
      const savedResults21 = localStorage.getItem('results21_2025_26')
      if (savedResults21) {
        setResults21(JSON.parse(savedResults21))
      }
      
      const savedResults22 = localStorage.getItem('results22_2025_26')
      if (savedResults22) {
        setResults22(JSON.parse(savedResults22))
      }
      
      const savedResults23 = localStorage.getItem('results23_2025_26')
      if (savedResults23) {
        setResults23(JSON.parse(savedResults23))
      }
      
      const savedResults24 = localStorage.getItem('results24_2025_26')
      if (savedResults24) {
        setResults24(JSON.parse(savedResults24))
      }
      
      const savedResults25 = localStorage.getItem('results25_2025_26')
      if (savedResults25) {
        setResults25(JSON.parse(savedResults25))
      }
      
      const savedResults26 = localStorage.getItem('results26_2025_26')
      if (savedResults26) {
        setResults26(JSON.parse(savedResults26))
      }
      
      const savedResults27 = localStorage.getItem('results27_2025_26')
      if (savedResults27) {
        setResults27(JSON.parse(savedResults27))
      }
      
      const savedResults28 = localStorage.getItem('results28_2025_26')
      if (savedResults28) {
        setResults28(JSON.parse(savedResults28))
      }
      
      const savedResults29 = localStorage.getItem('results29_2025_26')
      if (savedResults29) {
        setResults29(JSON.parse(savedResults29))
      }
      
      const savedResults30 = localStorage.getItem('results30_2025_26')
      if (savedResults30) {
        setResults30(JSON.parse(savedResults30))
      }
    }
  }, [user])

  // Ukládání tipů pro hráče
  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips1_${user.nickname}`, JSON.stringify(tips1))
    }
  }, [tips1, user])

  useEffect(() => {
    if (user) {
      console.log(`Ukládám tips2 pro ${user.nickname}:`, tips2)
      localStorage.setItem(`tips2_${user.nickname}`, JSON.stringify(tips2))
    }
  }, [tips2, user])

  useEffect(() => {
    if (user) {
      console.log(`Ukládám tips3 pro ${user.nickname}:`, tips3)
      localStorage.setItem(`tips3_${user.nickname}`, JSON.stringify(tips3))
    }
  }, [tips3, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips4_${user.nickname}`, JSON.stringify(tips4))
    }
  }, [tips4, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips5_${user.nickname}`, JSON.stringify(tips5))
    }
  }, [tips5, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips6_${user.nickname}`, JSON.stringify(tips6))
    }
  }, [tips6, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips7_${user.nickname}`, JSON.stringify(tips7))
    }
  }, [tips7, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips8_${user.nickname}`, JSON.stringify(tips8))
    }
  }, [tips8, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips9_${user.nickname}`, JSON.stringify(tips9))
    }
  }, [tips9, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips10_${user.nickname}`, JSON.stringify(tips10))
    }
  }, [tips10, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips11_${user.nickname}`, JSON.stringify(tips11))
    }
  }, [tips11, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips12_${user.nickname}`, JSON.stringify(tips12))
    }
  }, [tips12, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips13_${user.nickname}`, JSON.stringify(tips13))
    }
  }, [tips13, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips14_${user.nickname}`, JSON.stringify(tips14))
    }
  }, [tips14, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips15_${user.nickname}`, JSON.stringify(tips15))
    }
  }, [tips15, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips16_${user.nickname}`, JSON.stringify(tips16))
    }
  }, [tips16, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips17_${user.nickname}`, JSON.stringify(tips17))
    }
  }, [tips17, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips18_${user.nickname}`, JSON.stringify(tips18))
    }
  }, [tips18, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips19_${user.nickname}`, JSON.stringify(tips19))
    }
  }, [tips19, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips20_${user.nickname}`, JSON.stringify(tips20))
    }
  }, [tips20, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips21_${user.nickname}`, JSON.stringify(tips21))
    }
  }, [tips21, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips22_${user.nickname}`, JSON.stringify(tips22))
    }
  }, [tips22, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips23_${user.nickname}`, JSON.stringify(tips23))
    }
  }, [tips23, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips24_${user.nickname}`, JSON.stringify(tips24))
    }
  }, [tips24, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips25_${user.nickname}`, JSON.stringify(tips25))
    }
  }, [tips25, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips26_${user.nickname}`, JSON.stringify(tips26))
    }
  }, [tips26, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips27_${user.nickname}`, JSON.stringify(tips27))
    }
  }, [tips27, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips28_${user.nickname}`, JSON.stringify(tips28))
    }
  }, [tips28, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips29_${user.nickname}`, JSON.stringify(tips29))
    }
  }, [tips29, user])

  useEffect(() => {
    if (user) {
      localStorage.setItem(`tips30_${user.nickname}`, JSON.stringify(tips30))
    }
  }, [tips30, user])

  // Ukládání výsledků pro admin
  useEffect(() => {
    if (user?.nickname === ADMIN_NICK) {
      localStorage.setItem('results1_2025_26', JSON.stringify(results1))
      localStorage.setItem('results2_2025_26', JSON.stringify(results2))
      localStorage.setItem('results3_2025_26', JSON.stringify(results3))
      localStorage.setItem('results4_2025_26', JSON.stringify(results4))
      localStorage.setItem('results5_2025_26', JSON.stringify(results5))
      localStorage.setItem('results6_2025_26', JSON.stringify(results6))
      localStorage.setItem('results7_2025_26', JSON.stringify(results7))
      localStorage.setItem('results8_2025_26', JSON.stringify(results8))
      localStorage.setItem('results9_2025_26', JSON.stringify(results9))
      localStorage.setItem('results10_2025_26', JSON.stringify(results10))
      localStorage.setItem('results11_2025_26', JSON.stringify(results11))
      localStorage.setItem('results12_2025_26', JSON.stringify(results12))
      localStorage.setItem('results13_2025_26', JSON.stringify(results13))
      localStorage.setItem('results14_2025_26', JSON.stringify(results14))
      localStorage.setItem('results15_2025_26', JSON.stringify(results15))
      localStorage.setItem('results16_2025_26', JSON.stringify(results16))
      localStorage.setItem('results17_2025_26', JSON.stringify(results17))
      localStorage.setItem('results18_2025_26', JSON.stringify(results18))
      localStorage.setItem('results19_2025_26', JSON.stringify(results19))
      localStorage.setItem('results20_2025_26', JSON.stringify(results20))
      localStorage.setItem('results21_2025_26', JSON.stringify(results21))
      localStorage.setItem('results22_2025_26', JSON.stringify(results22))
      localStorage.setItem('results23_2025_26', JSON.stringify(results23))
      localStorage.setItem('results24_2025_26', JSON.stringify(results24))
      localStorage.setItem('results25_2025_26', JSON.stringify(results25))
      localStorage.setItem('results26_2025_26', JSON.stringify(results26))
      localStorage.setItem('results27_2025_26', JSON.stringify(results27))
      localStorage.setItem('results28_2025_26', JSON.stringify(results28))
      localStorage.setItem('results29_2025_26', JSON.stringify(results29))
      localStorage.setItem('results30_2025_26', JSON.stringify(results30))
    }
  }, [results1, results2, results3, results4, results5, results6, results7, results8, results9, results10, results11, results12, results13, results14, results15, results16, results17, results18, results19, results20, results21, results22, results23, results24, results25, results26, results27, results28, results29, results30, user])

  function handleLogout() {
    localStorage.removeItem('user')
    router.push('/')
  }



  if (!user) return <div className="min-h-screen flex items-center justify-center">Načítání...</div>

  // Hráčská větev
  if (user.nickname !== ADMIN_NICK) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center py-8 px-2">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-white text-blue-900 border border-blue-300 rounded px-4 py-2 shadow hover:bg-blue-50 transition"
        >
          Odhlásit
        </button>
        
        {/* 1. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">1. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 1. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_1.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips1[idx]?.home ?? '')}
                        onChange={e => setTips1(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips1[idx]?.away ?? '')}
                        onChange={e => setTips1(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips1[idx]?.scorer ?? '')}
                        onChange={e => setTips1(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">2. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 2. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_2.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips2[idx]?.home ?? '')}
                        onChange={e => setTips2(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips2[idx]?.away ?? '')}
                        onChange={e => setTips2(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips2[idx]?.scorer ?? '')}
                        onChange={e => setTips2(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">3. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 3. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_3.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips3[idx]?.home ?? '')}
                        onChange={e => setTips3(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips3[idx]?.away ?? '')}
                        onChange={e => setTips3(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips3[idx]?.scorer ?? '')}
                        onChange={e => setTips3(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">4. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 4. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_4.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips4[idx]?.home ?? '')}
                        onChange={e => setTips4(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips4[idx]?.away ?? '')}
                        onChange={e => setTips4(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips4[idx]?.scorer ?? '')}
                        onChange={e => setTips4(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">5. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 5. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_5.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips5[idx]?.home ?? '')}
                        onChange={e => setTips5(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips5[idx]?.away ?? '')}
                        onChange={e => setTips5(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips5[idx]?.scorer ?? '')}
                        onChange={e => setTips5(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">6. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 6. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_6.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips6[idx]?.home ?? '')}
                        onChange={e => setTips6(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips6[idx]?.away ?? '')}
                        onChange={e => setTips6(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips6[idx]?.scorer ?? '')}
                        onChange={e => setTips6(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 7. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">7. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 7. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_7.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips7[idx]?.home ?? '')}
                        onChange={e => setTips7(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips7[idx]?.away ?? '')}
                        onChange={e => setTips7(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips7[idx]?.scorer ?? '')}
                        onChange={e => setTips7(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 8. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">8. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 8. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_8.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips8[idx]?.home ?? '')}
                        onChange={e => setTips8(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips8[idx]?.away ?? '')}
                        onChange={e => setTips8(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips8[idx]?.scorer ?? '')}
                        onChange={e => setTips8(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 9. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">9. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 9. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_9.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips9[idx]?.home ?? '')}
                        onChange={e => setTips9(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips9[idx]?.away ?? '')}
                        onChange={e => setTips9(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips9[idx]?.scorer ?? '')}
                        onChange={e => setTips9(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 10. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">10. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 10. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_10.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips10[idx]?.home ?? '')}
                        onChange={e => setTips10(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips10[idx]?.away ?? '')}
                        onChange={e => setTips10(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips10[idx]?.scorer ?? '')}
                        onChange={e => setTips10(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 11. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">11. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 11. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_11.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips11[idx]?.home ?? '')}
                        onChange={e => setTips11(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips11[idx]?.away ?? '')}
                        onChange={e => setTips11(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips11[idx]?.scorer ?? '')}
                        onChange={e => setTips11(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 12. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">12. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 12. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_12.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips12[idx]?.home ?? '')}
                        onChange={e => setTips12(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips12[idx]?.away ?? '')}
                        onChange={e => setTips12(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips12[idx]?.scorer ?? '')}
                        onChange={e => setTips12(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 13. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">13. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 13. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_13.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips13[idx]?.home ?? '')}
                        onChange={e => setTips13(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips13[idx]?.away ?? '')}
                        onChange={e => setTips13(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips13[idx]?.scorer ?? '')}
                        onChange={e => setTips13(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 14. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">14. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 14. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_14.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips14[idx]?.home ?? '')}
                        onChange={e => setTips14(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips14[idx]?.away ?? '')}
                        onChange={e => setTips14(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips14[idx]?.scorer ?? '')}
                        onChange={e => setTips14(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 15. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">15. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 15. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_15.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips15[idx]?.home ?? '')}
                        onChange={e => setTips15(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips15[idx]?.away ?? '')}
                        onChange={e => setTips15(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips15[idx]?.scorer ?? '')}
                        onChange={e => setTips15(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 16. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">16. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 16. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_16.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips16[idx]?.home ?? '')}
                        onChange={e => setTips16(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips16[idx]?.away ?? '')}
                        onChange={e => setTips16(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips16[idx]?.scorer ?? '')}
                        onChange={e => setTips16(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 17. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">17. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 17. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_17.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips17[idx]?.home ?? '')}
                        onChange={e => setTips17(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips17[idx]?.away ?? '')}
                        onChange={e => setTips17(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips17[idx]?.scorer ?? '')}
                        onChange={e => setTips17(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 18. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">18. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 18. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_18.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips18[idx]?.home ?? '')}
                        onChange={e => setTips18(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips18[idx]?.away ?? '')}
                        onChange={e => setTips18(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips18[idx]?.scorer ?? '')}
                        onChange={e => setTips18(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 19. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">19. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 19. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_19.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips19[idx]?.home ?? '')}
                        onChange={e => setTips19(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips19[idx]?.away ?? '')}
                        onChange={e => setTips19(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips19[idx]?.scorer ?? '')}
                        onChange={e => setTips19(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 20. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">20. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 20. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_20.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips20[idx]?.home ?? '')}
                        onChange={e => setTips20(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips20[idx]?.away ?? '')}
                        onChange={e => setTips20(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips20[idx]?.scorer ?? '')}
                        onChange={e => setTips20(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 21. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">21. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 21. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_21.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips21[idx]?.home ?? '')}
                        onChange={e => setTips21(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips21[idx]?.away ?? '')}
                        onChange={e => setTips21(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips21[idx]?.scorer ?? '')}
                        onChange={e => setTips21(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 22. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">22. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 22. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_22.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips22[idx]?.home ?? '')}
                        onChange={e => setTips22(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips22[idx]?.away ?? '')}
                        onChange={e => setTips22(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips22[idx]?.scorer ?? '')}
                        onChange={e => setTips22(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 23. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">23. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 23. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_23.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips23[idx]?.home ?? '')}
                        onChange={e => setTips23(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips23[idx]?.away ?? '')}
                        onChange={e => setTips23(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips23[idx]?.scorer ?? '')}
                        onChange={e => setTips23(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 24. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">24. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 24. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_24.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips24[idx]?.home ?? '')}
                        onChange={e => setTips24(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips24[idx]?.away ?? '')}
                        onChange={e => setTips24(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips24[idx]?.scorer ?? '')}
                        onChange={e => setTips24(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 25. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">25. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 25. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_25.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips25[idx]?.home ?? '')}
                        onChange={e => setTips25(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips25[idx]?.away ?? '')}
                        onChange={e => setTips25(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips25[idx]?.scorer ?? '')}
                        onChange={e => setTips25(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 26. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">26. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 26. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_26.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips26[idx]?.home ?? '')}
                        onChange={e => setTips26(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips26[idx]?.away ?? '')}
                        onChange={e => setTips26(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips26[idx]?.scorer ?? '')}
                        onChange={e => setTips26(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 27. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">27. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 27. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_27.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips27[idx]?.home ?? '')}
                        onChange={e => setTips27(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips27[idx]?.away ?? '')}
                        onChange={e => setTips27(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips27[idx]?.scorer ?? '')}
                        onChange={e => setTips27(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 28. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">28. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 28. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_28.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips28[idx]?.home ?? '')}
                        onChange={e => setTips28(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips28[idx]?.away ?? '')}
                        onChange={e => setTips28(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips28[idx]?.scorer ?? '')}
                        onChange={e => setTips28(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 29. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">29. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 29. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_29.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips29[idx]?.home ?? '')}
                        onChange={e => setTips29(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips29[idx]?.away ?? '')}
                        onChange={e => setTips29(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips29[idx]?.scorer ?? '')}
                        onChange={e => setTips29(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 30. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">30. kolo</h1>
            <p className="text-gray-500">Všechny zápasy 30. kola. Tipuj výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  <th className="py-2 px-3 text-center">Datum a čas</th>
                  <th className="py-2 px-3 text-center">Tip (domácí:hosté)</th>
                  <th className="py-2 px-3 text-center">Střelec</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_30.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips30[idx]?.home ?? '')}
                        onChange={e => setTips30(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].home = e.target.value; 
                          return n; 
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input 
                        type="number" 
                        min="0" 
                        max="20" 
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" 
                        placeholder="0"
                        value={(tips30[idx]?.away ?? '')}
                        onChange={e => setTips30(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].away = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input 
                        type="text" 
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                        placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips30[idx]?.scorer ?? '')}
                        onChange={e => setTips30(t => { 
                          const n = [...t]; 
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' }; 
                          n[idx].scorer = e.target.value; 
                          return n; 
                        })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Admin větev
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center py-8 px-2">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-white text-blue-900 border border-blue-300 rounded px-4 py-2 shadow hover:bg-blue-50 transition"
      >
        Odhlásit
      </button>

      
      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-4xl mb-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Leaderboard</h1>
          <p className="text-gray-500">Celkové bodování a finance všech hráčů</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-3 text-center">Hráč</th>
                <th className="py-2 px-3 text-center">Body za výsledky</th>
                <th className="py-2 px-3 text-center">Body za střelce</th>
                <th className="py-2 px-3 text-center">Finance</th>
              </tr>
            </thead>
            <tbody>
              {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                // Počítání bodů za výsledky a střelce zvlášť za všechna kola 1-30
                let totalResultPoints = 0;
                let totalScorerPoints = 0;
                let totalFinance = 0;
                
                // Funkce pro výpočet bodů a financí za jedno kolo
                const calculateRoundPoints = (allTips: any, results: any, roundNumber: number) => {
                  let roundResultPoints = 0;
                  let roundScorerPoints = 0;
                  
                  allTips[u.nickname]?.forEach((tip: any, idx: number) => {
                    const res = results[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map((s: string) => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    roundResultPoints += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                    roundScorerPoints += points.correctScorer + points.noScorer + points.bonusPoints;
                  });
                  
                  return { roundResultPoints, roundScorerPoints };
                };
                
                // Funkce pro kontrolu, zda je kolo kompletně uzavřené (všechny výsledky a střelci vyplněni)
                const isRoundComplete = (results: any) => {
                  if (!results || results.length === 0) return false;
                  
                  return results.every((result: any) => {
                    // Kontrola, zda jsou vyplněny výsledky (home a away)
                    const hasResults = result && 
                      result.home !== '' && result.home !== null && result.home !== undefined &&
                      result.away !== '' && result.away !== null && result.away !== undefined;
                    
                    // Kontrola, zda jsou vyplněni střelci (scorers)
                    const hasScorers = result && 
                      result.scorers !== '' && result.scorers !== null && result.scorers !== undefined;
                    
                    return hasResults && hasScorers;
                  });
                };
                
                // Funkce pro výpočet financí za jedno kolo
                const calculateRoundFinance = (allTips: any, results: any) => {
                  let roundFinance = 0;
                  
                  // Finance za výsledky
                  const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                    let points = 0;
                    allTips[u.nickname]?.forEach((tip: any, idx: number) => {
                      const res = results[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map((s: string) => s.trim()).filter(Boolean);
                      const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                      points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                    });
                    return { nickname: u.nickname, points };
                  });
                  const maxResultPoints = Math.max(...allResultPoints.map(p => p.points));
                  const resultWinners = allResultPoints.filter(p => p.points === maxResultPoints && p.points > 0);
                  const resultFinance = resultWinners.some(w => w.nickname === user.nickname) ? (resultWinners.length > 0 ? (USERS.filter(u => u.nickname !== ADMIN_NICK).length - resultWinners.length) * 250 / resultWinners.length : 0) : -250;
                  roundFinance += resultFinance;
                  
                  // Finance za střelce - použijeme původní logiku
                  let sum = 0;
                  allTips[user.nickname]?.forEach((tip: any, idx: number) => {
                    const res = results[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map((s: string) => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.correctScorer + points.noScorer + points.bonusPoints;
                  });
                  
                  // Najít vítěze (nejvíce bodů)
                  const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                    let points = 0;
                    allTips[u.nickname]?.forEach((tip: any, idx: number) => {
                      const res = results[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map((s: string) => s.trim()).filter(Boolean);
                      const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                      points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                    });
                    return { nickname: u.nickname, points };
                  });
                  
                  const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                  const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                  const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                  
                  // Výpočet celkové částky od poražených
                  let totalPot = 0;
                  losers.forEach(loser => {
                    const payment = (maxPoints - loser.points) * 50;
                    totalPot += payment;
                  });
                  
                  const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                  
                  if (winners.some(w => w.nickname === user.nickname)) {
                    roundFinance += winAmount;
                  } else {
                    // Výpočet platby pro poraženého
                    const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                    roundFinance -= payment;
                  }
                  
                  return roundFinance;
                };
                
                // Počítání za všechna kola 1-30 (pouze uzavřená kola)
                const rounds = [
                  { allTips: allTips1, results: results1, roundNumber: 1 },
                  { allTips: allTips2, results: results2, roundNumber: 2 },
                  { allTips: allTips3, results: results3, roundNumber: 3 },
                  { allTips: allTips4, results: results4, roundNumber: 4 },
                  { allTips: allTips5, results: results5, roundNumber: 5 },
                  { allTips: allTips6, results: results6, roundNumber: 6 },
                  { allTips: allTips7, results: results7, roundNumber: 7 },
                  { allTips: allTips8, results: results8, roundNumber: 8 },
                  { allTips: allTips9, results: results9, roundNumber: 9 },
                  { allTips: allTips10, results: results10, roundNumber: 10 },
                  { allTips: allTips11, results: results11, roundNumber: 11 },
                  { allTips: allTips12, results: results12, roundNumber: 12 },
                  { allTips: allTips13, results: results13, roundNumber: 13 },
                  { allTips: allTips14, results: results14, roundNumber: 14 },
                  { allTips: allTips15, results: results15, roundNumber: 15 },
                  { allTips: allTips16, results: results16, roundNumber: 16 },
                  { allTips: allTips17, results: results17, roundNumber: 17 },
                  { allTips: allTips18, results: results18, roundNumber: 18 },
                  { allTips: allTips19, results: results19, roundNumber: 19 },
                  { allTips: allTips20, results: results20, roundNumber: 20 },
                  { allTips: allTips21, results: results21, roundNumber: 21 },
                  { allTips: allTips22, results: results22, roundNumber: 22 },
                  { allTips: allTips23, results: results23, roundNumber: 23 },
                  { allTips: allTips24, results: results24, roundNumber: 24 },
                  { allTips: allTips25, results: results25, roundNumber: 25 },
                  { allTips: allTips26, results: results26, roundNumber: 26 },
                  { allTips: allTips27, results: results27, roundNumber: 27 },
                  { allTips: allTips28, results: results28, roundNumber: 28 },
                  { allTips: allTips29, results: results29, roundNumber: 29 },
                  { allTips: allTips30, results: results30, roundNumber: 30 }
                ];
                
                rounds.forEach((round) => {
                  // Kontrola, zda je kolo kompletně uzavřené
                  if (isRoundComplete(round.results)) {
                    const { roundResultPoints, roundScorerPoints } = calculateRoundPoints(round.allTips, round.results, round.roundNumber);
                    totalResultPoints += roundResultPoints;
                    totalScorerPoints += roundScorerPoints;
                    totalFinance += calculateRoundFinance(round.allTips, round.results);
                  }
                });
                
                return (
                  <tr key={u.nickname} className={`border-b border-blue-200 ${(totalResultPoints + totalScorerPoints) > 0 ? 'bg-green-50' : 'bg-white'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{u.nickname}</td>
                    <td className="py-2 px-3 text-center font-bold text-blue-900">{totalResultPoints}</td>
                    <td className="py-2 px-3 text-center font-bold text-blue-900">{totalScorerPoints}</td>
                    <td className={`py-2 px-3 text-center font-bold ${totalFinance > 0 ? 'text-green-700' : totalFinance < 0 ? 'text-red-700' : 'text-gray-700'}`}>
                      {totalFinance === 0 ? '0 Kč' : `${totalFinance > 0 ? '+' : ''}${totalFinance} Kč`}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin: Tipy všech hráčů na 1. kolo */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 1. kolo</h1>
          <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-3 text-center">Zápas</th>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                  <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                ))}
                <th className="py-2 px-3 text-center">Výsledek</th>
                <th className="py-2 px-3 text-center">Střelci</th>
              </tr>
            </thead>
            <tbody>
              {MATCHES_ROUND_1.map((match, idx) => (
                <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                  <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                  {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                    <td key={u.nickname} className="py-2 px-3 text-center">
                      {allTips1[u.nickname]?.[idx] && allTips1[u.nickname][idx].home !== '' && allTips1[u.nickname][idx].away !== '' ? (
                        <span>
                          {allTips1[u.nickname][idx].home}:{allTips1[u.nickname][idx].away}
                          {allTips1[u.nickname][idx].scorer ? ` – ${allTips1[u.nickname][idx].scorer}` : ''}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                  <td className="py-2 px-3 text-center">
                    <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                      value={results1[idx]?.home || ''}
                      onChange={e => setResults1(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                    />
                    <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                    <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                      value={results1[idx]?.away || ''}
                      onChange={e => setResults1(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (čárkou odděleno)"
                      value={results1[idx]?.scorers || ''}
                      onChange={e => setResults1(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 font-semibold">
                <td className="py-2 px-3 text-right">Body za výsledek</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  let sum = 0;
                  allTips1[u.nickname]?.forEach((tip, idx) => {
                    const res = results1[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                  });
                  return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                })}
                <td colSpan={2}></td>
              </tr>
              <tr className="bg-blue-50 font-semibold">
                <td className="py-2 px-3 text-right">Body za střelce</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  let sum = 0;
                  allTips1[u.nickname]?.forEach((tip, idx) => {
                    const res = results1[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.correctScorer + points.noScorer + points.bonusPoints;
                  });
                  return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                })}
                <td colSpan={2}></td>
              </tr>
              <tr className="bg-green-50 font-semibold">
                <td className="py-2 px-3 text-right">Finance za výsledky</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  let sum = 0;
                  allTips1[u.nickname]?.forEach((tip, idx) => {
                    const res = results1[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                  });
                  
                  // Najít vítěze (nejvíce bodů)
                  const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                    let points = 0;
                    allTips1[u.nickname]?.forEach((tip, idx) => {
                      const res = results1[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                      const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                      points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                    });
                    return { nickname: u.nickname, points };
                  });
                  
                  const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                  const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                  const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                  const totalPot = losers.length * 250;
                  const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                  
                  if (winners.some(w => w.nickname === u.nickname)) {
                    return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                  } else {
                    return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                  }
                })}
                <td colSpan={2}></td>
              </tr>
              <tr className="bg-green-50 font-semibold">
                <td className="py-2 px-3 text-right">Finance za střelce</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  let sum = 0;
                  allTips1[u.nickname]?.forEach((tip, idx) => {
                    const res = results1[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.correctScorer + points.noScorer + points.bonusPoints;
                  });
                  
                  // Najít vítěze (nejvíce bodů)
                  const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                    let points = 0;
                    allTips1[u.nickname]?.forEach((tip, idx) => {
                      const res = results1[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                      const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                      points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                    });
                    return { nickname: u.nickname, points };
                  });
                  
                  const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                  const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                  const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                  
                  // Výpočet celkové částky od poražených
                  let totalPot = 0;
                  losers.forEach(loser => {
                    const payment = (maxPoints - loser.points) * 50;
                    totalPot += payment;
                  });
                  
                  const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                  
                  if (winners.some(w => w.nickname === u.nickname)) {
                    return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                  } else {
                    // Výpočet platby pro poraženého
                    const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                    return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                  }
                })}
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>



      {/* Admin: Tipy všech hráčů na 2. kolo */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 2. kolo</h1>
          <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-3 text-center">Zápas</th>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                  <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                ))}
                <th className="py-2 px-3 text-center">Výsledek</th>
                <th className="py-2 px-3 text-center">Střelci</th>
              </tr>
            </thead>
            <tbody>
              {MATCHES_ROUND_2.map((match, idx) => (
                <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                  <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                  {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                    <td key={u.nickname} className="py-2 px-3 text-center">
                      {allTips2[u.nickname]?.[idx] && allTips2[u.nickname][idx].home !== '' && allTips2[u.nickname][idx].away !== '' ? (
                        <span>
                          {allTips2[u.nickname][idx].home}:{allTips2[u.nickname][idx].away}
                          {allTips2[u.nickname][idx].scorer ? ` – ${allTips2[u.nickname][idx].scorer}` : ''}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                  <td className="py-2 px-3 text-center">
                    <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                      value={(results2[idx]?.home ?? '')}
                      onChange={e => setResults2(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                    />
                    <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                    <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                      value={(results2[idx]?.away ?? '')}
                      onChange={e => setResults2(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                      value={(results2[idx]?.scorers ?? '')}
                      onChange={e => setResults2(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 font-semibold">
                <td className="py-2 px-3 text-right">Body za výsledek</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  let sum = 0;
                  allTips2[u.nickname]?.forEach((tip, idx) => {
                    const res = results2[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                  });
                  return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                })}
                <td colSpan={2}></td>
              </tr>
              <tr className="bg-blue-50 font-semibold">
                <td className="py-2 px-3 text-right">Body za střelce</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  let sum = 0;
                  allTips2[u.nickname]?.forEach((tip, idx) => {
                    const res = results2[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.correctScorer + points.noScorer + points.bonusPoints;
                  });
                  return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                })}
                <td colSpan={2}></td>
              </tr>
              <tr className="bg-green-50 font-semibold">
                <td className="py-2 px-3 text-right">Finance za výsledky</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  let sum = 0;
                  allTips2[u.nickname]?.forEach((tip, idx) => {
                    const res = results2[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                  });
                  
                  // Najít vítěze (nejvíce bodů)
                  const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                    let points = 0;
                    allTips2[u.nickname]?.forEach((tip, idx) => {
                      const res = results2[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                      const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                      points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                    });
                    return { nickname: u.nickname, points };
                  });
                  
                  const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                  const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                  const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                  const totalPot = losers.length * 250;
                  const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                  
                  if (winners.some(w => w.nickname === u.nickname)) {
                    return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                  } else {
                    return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                  }
                })}
                <td colSpan={2}></td>
              </tr>
              <tr className="bg-green-50 font-semibold">
                <td className="py-2 px-3 text-right">Finance za střelce</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  let sum = 0;
                  allTips2[u.nickname]?.forEach((tip, idx) => {
                    const res = results2[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.correctScorer + points.noScorer + points.bonusPoints;
                  });
                  
                  // Najít vítěze (nejvíce bodů)
                  const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                    let points = 0;
                    allTips2[u.nickname]?.forEach((tip, idx) => {
                      const res = results2[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                      const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                      points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                    });
                    return { nickname: u.nickname, points };
                  });
                  
                  const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                  const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                  const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                  
                  // Výpočet celkové částky od poražených
                  let totalPot = 0;
                  losers.forEach(loser => {
                    const payment = (maxPoints - loser.points) * 50;
                    totalPot += payment;
                  });
                  
                  const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                  
                  if (winners.some(w => w.nickname === u.nickname)) {
                    return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                  } else {
                    // Výpočet platby pro poraženého
                    const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                    return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                  }
                })}
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Admin: Tipy všech hráčů na 3. kolo */}
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 3. kolo</h1>
          <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-2 px-3 text-center">Zápas</th>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                  <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                ))}
                <th className="py-2 px-3 text-center">Výsledek</th>
                <th className="py-2 px-3 text-center">Střelci</th>
              </tr>
            </thead>
            <tbody>
              {MATCHES_ROUND_3.map((match, idx) => (
                <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                  <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                  {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                    <td key={u.nickname} className="py-2 px-3 text-center">
                      {allTips3[u.nickname]?.[idx] && allTips3[u.nickname][idx].home !== '' && allTips3[u.nickname][idx].away !== '' ? (
                        <span>
                          {allTips3[u.nickname][idx].home}:{allTips3[u.nickname][idx].away}
                          {allTips3[u.nickname][idx].scorer ? ` – ${allTips3[u.nickname][idx].scorer}` : ''}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                  <td className="py-2 px-3 text-center">
                    <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                      value={results3[idx]?.home || ''}
                      onChange={e => setResults3(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                    />
                    <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                    <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                      value={results3[idx]?.away || ''}
                      onChange={e => setResults3(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                      value={results3[idx]?.scorers || ''}
                      onChange={e => setResults3(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-blue-50 font-semibold">
                <td className="py-2 px-3 text-right">Body za výsledek</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  let sum = 0;
                  allTips3[u.nickname]?.forEach((tip, idx) => {
                    const res = results3[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                  });
                  return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                })}
                <td colSpan={2}></td>
              </tr>
              <tr className="bg-blue-50 font-semibold">
                <td className="py-2 px-3 text-right">Body za střelce</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  let sum = 0;
                  allTips3[u.nickname]?.forEach((tip, idx) => {
                    const res = results3[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.correctScorer + points.noScorer + points.bonusPoints;
                  });
                  return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                })}
                <td colSpan={2}></td>
              </tr>
              <tr className="bg-green-50 font-semibold">
                <td className="py-2 px-3 text-right">Finance za výsledky</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  // Najít vítěze (nejvíce bodů)
                  const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                    let points = 0;
                    allTips3[u.nickname]?.forEach((tip, idx) => {
                      const res = results3[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                      const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                      points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                    });
                    return { nickname: u.nickname, points };
                  });
                  const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                  const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                  const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                  const totalPot = losers.length * 250;
                  const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                  if (winners.some(w => w.nickname === u.nickname)) {
                    return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                  } else {
                    return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                  }
                })}
                <td colSpan={2}></td>
              </tr>
              <tr className="bg-green-50 font-semibold">
                <td className="py-2 px-3 text-right">Finance za střelce</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  let sum = 0;
                  allTips3[u.nickname]?.forEach((tip, idx) => {
                    const res = results3[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.correctScorer + points.noScorer + points.bonusPoints;
                  });
                  // Najít vítěze (nejvíce bodů)
                  const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                    let points = 0;
                    allTips3[u.nickname]?.forEach((tip, idx) => {
                      const res = results3[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                      const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                      points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                    });
                    return { nickname: u.nickname, points };
                  });
                  const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                  const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                  const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                  // Výpočet celkové částky od poražených
                  let totalPot = 0;
                  losers.forEach(loser => {
                    const payment = (maxPoints - loser.points) * 50;
                    totalPot += payment;
                  });
                  const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                  if (winners.some(w => w.nickname === u.nickname)) {
                    return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                  } else {
                    // Výpočet platby pro poraženého
                    const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                    return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                  }
                })}
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Admin: Tipy všech hráčů na 4. kolo */}
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 4. kolo</h1>
            <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-2 px-3 text-center">Zápas</th>
                  {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                    <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                  ))}
                  <th className="py-2 px-3 text-center">Výsledek</th>
                  <th className="py-2 px-3 text-center">Střelci</th>
                </tr>
              </thead>
              <tbody>
                {MATCHES_ROUND_4.map((match, idx) => (
                  <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                      <td key={u.nickname} className="py-2 px-3 text-center">
                        {allTips4[u.nickname]?.[idx] && allTips4[u.nickname][idx].home !== '' && allTips4[u.nickname][idx].away !== '' ? (
                          <span>
                            {allTips4[u.nickname][idx].home}:{allTips4[u.nickname][idx].away}
                            {allTips4[u.nickname][idx].scorer ? ` – ${allTips4[u.nickname][idx].scorer}` : ''}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                    <td className="py-2 px-3 text-center">
                      <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                        value={results4[idx]?.home || ''}
                        onChange={e => setResults4(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                        value={results4[idx]?.away || ''}
                        onChange={e => setResults4(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                        value={results4[idx]?.scorers || ''}
                        onChange={e => setResults4(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-blue-50 font-semibold">
                  <td className="py-2 px-3 text-right">Body za výsledek</td>
                  {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                    let sum = 0;
                    allTips4[u.nickname]?.forEach((tip, idx) => {
                      const res = results4[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                      const points = calculatePoints(parsedTip, parsedResult, scorers);
                      sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                    });
                    return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                  })}
                  <td colSpan={2}></td>
                </tr>
                <tr className="bg-blue-50 font-semibold">
                  <td className="py-2 px-3 text-right">Body za střelce</td>
                  {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                    let sum = 0;
                    allTips4[u.nickname]?.forEach((tip, idx) => {
                      const res = results4[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                      const points = calculatePoints(parsedTip, parsedResult, scorers);
                      sum += points.correctScorer + points.noScorer + points.bonusPoints;
                    });
                    return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                  })}
                  <td colSpan={2}></td>
                </tr>
                <tr className="bg-green-50 font-semibold">
                  <td className="py-2 px-3 text-right">Finance za výsledky</td>
                  {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                    // Najít vítěze (nejvíce bodů)
                    const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                      let points = 0;
                      allTips4[u.nickname]?.forEach((tip, idx) => {
                        const res = results4[idx];
                        if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                        const parsedTip = {
                          matchIndex: idx,
                          predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                          predictedScorer: tip.scorer || ''
                        };
                        const parsedResult = { home: Number(res.home), away: Number(res.away) };
                        const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                        const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                        points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                      });
                      return { nickname: u.nickname, points };
                    });
                    const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                    const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                    const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                    const totalPot = losers.length * 250;
                    const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                    if (winners.some(w => w.nickname === u.nickname)) {
                      return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                    } else {
                      return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                    }
                  })}
                  <td colSpan={2}></td>
                </tr>
                <tr className="bg-green-50 font-semibold">
                  <td className="py-2 px-3 text-right">Finance za střelce</td>
                  {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                    let sum = 0;
                    allTips4[u.nickname]?.forEach((tip, idx) => {
                      const res = results4[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                      const points = calculatePoints(parsedTip, parsedResult, scorers);
                      sum += points.correctScorer + points.noScorer + points.bonusPoints;
                    });
                    // Najít vítěze (nejvíce bodů)
                    const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                      let points = 0;
                      allTips4[u.nickname]?.forEach((tip, idx) => {
                        const res = results4[idx];
                        if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                        const parsedTip = {
                          matchIndex: idx,
                          predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                          predictedScorer: tip.scorer || ''
                        };
                        const parsedResult = { home: Number(res.home), away: Number(res.away) };
                        const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                        const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                        points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                      });
                      return { nickname: u.nickname, points };
                    });
                    const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                    const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                    const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                    // Výpočet celkové částky od poražených
                    let totalPot = 0;
                    losers.forEach(loser => {
                      const payment = (maxPoints - loser.points) * 50;
                      totalPot += payment;
                    });
                    const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                    if (winners.some(w => w.nickname === u.nickname)) {
                      return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                    } else {
                      // Výpočet platby pro poraženého
                      const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                      return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                    }
                  })}
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
                 </div>

         {/* Admin: Tipy všech hráčů na 5. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 5. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_5.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips5[u.nickname]?.[idx] && allTips5[u.nickname][idx].home !== '' && allTips5[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips5[u.nickname][idx].home}:{allTips5[u.nickname][idx].away}
                             {allTips5[u.nickname][idx].scorer ? ` – ${allTips5[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results5[idx]?.home || ''}
                         onChange={e => setResults5(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results5[idx]?.away || ''}
                         onChange={e => setResults5(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results5[idx]?.scorers || ''}
                         onChange={e => setResults5(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips5[u.nickname]?.forEach((tip, idx) => {
                       const res = results5[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips5[u.nickname]?.forEach((tip, idx) => {
                       const res = results5[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     // Najít vítěze (nejvíce bodů)
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips5[u.nickname]?.forEach((tip, idx) => {
                         const res = results5[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips5[u.nickname]?.forEach((tip, idx) => {
                       const res = results5[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     // Najít vítěze (nejvíce bodů)
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips5[u.nickname]?.forEach((tip, idx) => {
                         const res = results5[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     // Výpočet celkové částky od poražených
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       // Výpočet platby pro poraženého
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 6. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 6. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_6.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips6[u.nickname]?.[idx] && allTips6[u.nickname][idx].home !== '' && allTips6[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips6[u.nickname][idx].home}:{allTips6[u.nickname][idx].away}
                             {allTips6[u.nickname][idx].scorer ? ` – ${allTips6[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results6[idx]?.home || ''}
                         onChange={e => setResults6(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results6[idx]?.away || ''}
                         onChange={e => setResults6(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results6[idx]?.scorers || ''}
                         onChange={e => setResults6(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips6[u.nickname]?.forEach((tip, idx) => {
                       const res = results6[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips6[u.nickname]?.forEach((tip, idx) => {
                       const res = results6[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     // Najít vítěze (nejvíce bodů)
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips6[u.nickname]?.forEach((tip, idx) => {
                         const res = results6[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips6[u.nickname]?.forEach((tip, idx) => {
                       const res = results6[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     // Najít vítěze (nejvíce bodů)
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips6[u.nickname]?.forEach((tip, idx) => {
                         const res = results6[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     // Výpočet celkové částky od poražených
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       // Výpočet platby pro poraženého
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 7. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 7. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_7.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips7[u.nickname]?.[idx] && allTips7[u.nickname][idx].home !== '' && allTips7[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips7[u.nickname][idx].home}:{allTips7[u.nickname][idx].away}
                             {allTips7[u.nickname][idx].scorer ? ` – ${allTips7[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results7[idx]?.home || ''}
                         onChange={e => setResults7(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results7[idx]?.away || ''}
                         onChange={e => setResults7(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results7[idx]?.scorers || ''}
                         onChange={e => setResults7(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips7[u.nickname]?.forEach((tip, idx) => {
                       const res = results7[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips7[u.nickname]?.forEach((tip, idx) => {
                       const res = results7[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips7[u.nickname]?.forEach((tip, idx) => {
                         const res = results7[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips7[u.nickname]?.forEach((tip, idx) => {
                       const res = results7[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips7[u.nickname]?.forEach((tip, idx) => {
                         const res = results7[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 8. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 8. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_8.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips8[u.nickname]?.[idx] && allTips8[u.nickname][idx].home !== '' && allTips8[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips8[u.nickname][idx].home}:{allTips8[u.nickname][idx].away}
                             {allTips8[u.nickname][idx].scorer ? ` – ${allTips8[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results8[idx]?.home || ''}
                         onChange={e => setResults8(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results8[idx]?.away || ''}
                         onChange={e => setResults8(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results8[idx]?.scorers || ''}
                         onChange={e => setResults8(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips8[u.nickname]?.forEach((tip, idx) => {
                       const res = results8[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips8[u.nickname]?.forEach((tip, idx) => {
                       const res = results8[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips8[u.nickname]?.forEach((tip, idx) => {
                         const res = results8[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips8[u.nickname]?.forEach((tip, idx) => {
                       const res = results8[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips8[u.nickname]?.forEach((tip, idx) => {
                         const res = results8[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 9. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 9. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_9.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips9[u.nickname]?.[idx] && allTips9[u.nickname][idx].home !== '' && allTips9[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips9[u.nickname][idx].home}:{allTips9[u.nickname][idx].away}
                             {allTips9[u.nickname][idx].scorer ? ` – ${allTips9[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results9[idx]?.home || ''}
                         onChange={e => setResults9(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results9[idx]?.away || ''}
                         onChange={e => setResults9(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results9[idx]?.scorers || ''}
                         onChange={e => setResults9(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips9[u.nickname]?.forEach((tip, idx) => {
                       const res = results9[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips9[u.nickname]?.forEach((tip, idx) => {
                       const res = results9[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips9[u.nickname]?.forEach((tip, idx) => {
                         const res = results9[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips9[u.nickname]?.forEach((tip, idx) => {
                       const res = results9[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips9[u.nickname]?.forEach((tip, idx) => {
                         const res = results9[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 10. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 10. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_10.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips10[u.nickname]?.[idx] && allTips10[u.nickname][idx].home !== '' && allTips10[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips10[u.nickname][idx].home}:{allTips10[u.nickname][idx].away}
                             {allTips10[u.nickname][idx].scorer ? ` – ${allTips10[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results10[idx]?.home || ''}
                         onChange={e => setResults10(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results10[idx]?.away || ''}
                         onChange={e => setResults10(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results10[idx]?.scorers || ''}
                         onChange={e => setResults10(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips10[u.nickname]?.forEach((tip, idx) => {
                       const res = results10[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips10[u.nickname]?.forEach((tip, idx) => {
                       const res = results10[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips10[u.nickname]?.forEach((tip, idx) => {
                         const res = results10[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips10[u.nickname]?.forEach((tip, idx) => {
                       const res = results10[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips10[u.nickname]?.forEach((tip, idx) => {
                         const res = results10[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 11. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 11. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_11.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips11[u.nickname]?.[idx] && allTips11[u.nickname][idx].home !== '' && allTips11[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips11[u.nickname][idx].home}:{allTips11[u.nickname][idx].away}
                             {allTips11[u.nickname][idx].scorer ? ` – ${allTips11[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results11[idx]?.home || ''}
                         onChange={e => setResults11(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results11[idx]?.away || ''}
                         onChange={e => setResults11(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results11[idx]?.scorers || ''}
                         onChange={e => setResults11(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips11[u.nickname]?.forEach((tip, idx) => {
                       const res = results11[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips11[u.nickname]?.forEach((tip, idx) => {
                       const res = results11[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips11[u.nickname]?.forEach((tip, idx) => {
                         const res = results11[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips11[u.nickname]?.forEach((tip, idx) => {
                       const res = results11[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips11[u.nickname]?.forEach((tip, idx) => {
                         const res = results11[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 12. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 12. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_12.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips12[u.nickname]?.[idx] && allTips12[u.nickname][idx].home !== '' && allTips12[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips12[u.nickname][idx].home}:{allTips12[u.nickname][idx].away}
                             {allTips12[u.nickname][idx].scorer ? ` – ${allTips12[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results12[idx]?.home || ''}
                         onChange={e => setResults12(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results12[idx]?.away || ''}
                         onChange={e => setResults12(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results12[idx]?.scorers || ''}
                         onChange={e => setResults12(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips12[u.nickname]?.forEach((tip, idx) => {
                       const res = results12[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips12[u.nickname]?.forEach((tip, idx) => {
                       const res = results12[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips12[u.nickname]?.forEach((tip, idx) => {
                         const res = results12[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips12[u.nickname]?.forEach((tip, idx) => {
                       const res = results12[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips12[u.nickname]?.forEach((tip, idx) => {
                         const res = results12[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 13. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 13. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_13.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips13[u.nickname]?.[idx] && allTips13[u.nickname][idx].home !== '' && allTips13[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips13[u.nickname][idx].home}:{allTips13[u.nickname][idx].away}
                             {allTips13[u.nickname][idx].scorer ? ` – ${allTips13[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results13[idx]?.home || ''}
                         onChange={e => setResults13(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results13[idx]?.away || ''}
                         onChange={e => setResults13(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results13[idx]?.scorers || ''}
                         onChange={e => setResults13(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips13[u.nickname]?.forEach((tip, idx) => {
                       const res = results13[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips13[u.nickname]?.forEach((tip, idx) => {
                       const res = results13[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips13[u.nickname]?.forEach((tip, idx) => {
                         const res = results13[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips13[u.nickname]?.forEach((tip, idx) => {
                       const res = results13[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips13[u.nickname]?.forEach((tip, idx) => {
                         const res = results13[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 14. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 14. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_14.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips14[u.nickname]?.[idx] && allTips14[u.nickname][idx].home !== '' && allTips14[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips14[u.nickname][idx].home}:{allTips14[u.nickname][idx].away}
                             {allTips14[u.nickname][idx].scorer ? ` – ${allTips14[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results14[idx]?.home || ''}
                         onChange={e => setResults14(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results14[idx]?.away || ''}
                         onChange={e => setResults14(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results14[idx]?.scorers || ''}
                         onChange={e => setResults14(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips14[u.nickname]?.forEach((tip, idx) => {
                       const res = results14[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips14[u.nickname]?.forEach((tip, idx) => {
                       const res = results14[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips14[u.nickname]?.forEach((tip, idx) => {
                         const res = results14[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips14[u.nickname]?.forEach((tip, idx) => {
                       const res = results14[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips14[u.nickname]?.forEach((tip, idx) => {
                         const res = results14[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 15. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 15. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_15.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips15[u.nickname]?.[idx] && allTips15[u.nickname][idx].home !== '' && allTips15[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips15[u.nickname][idx].home}:{allTips15[u.nickname][idx].away}
                             {allTips15[u.nickname][idx].scorer ? ` – ${allTips15[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results15[idx]?.home || ''}
                         onChange={e => setResults15(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results15[idx]?.away || ''}
                         onChange={e => setResults15(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results15[idx]?.scorers || ''}
                         onChange={e => setResults15(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips15[u.nickname]?.forEach((tip, idx) => {
                       const res = results15[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips15[u.nickname]?.forEach((tip, idx) => {
                       const res = results15[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips15[u.nickname]?.forEach((tip, idx) => {
                         const res = results15[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips15[u.nickname]?.forEach((tip, idx) => {
                       const res = results15[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips15[u.nickname]?.forEach((tip, idx) => {
                         const res = results15[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 16. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 16. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_16.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips16[u.nickname]?.[idx] && allTips16[u.nickname][idx].home !== '' && allTips16[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips16[u.nickname][idx].home}:{allTips16[u.nickname][idx].away}
                             {allTips16[u.nickname][idx].scorer ? ` – ${allTips16[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results16[idx]?.home || ''}
                         onChange={e => setResults16(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results16[idx]?.away || ''}
                         onChange={e => setResults16(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results16[idx]?.scorers || ''}
                         onChange={e => setResults16(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips16[u.nickname]?.forEach((tip, idx) => {
                       const res = results16[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips16[u.nickname]?.forEach((tip, idx) => {
                       const res = results16[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips16[u.nickname]?.forEach((tip, idx) => {
                         const res = results16[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips16[u.nickname]?.forEach((tip, idx) => {
                       const res = results16[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips16[u.nickname]?.forEach((tip, idx) => {
                         const res = results16[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 17. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 17. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_17.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips17[u.nickname]?.[idx] && allTips17[u.nickname][idx].home !== '' && allTips17[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips17[u.nickname][idx].home}:{allTips17[u.nickname][idx].away}
                             {allTips17[u.nickname][idx].scorer ? ` – ${allTips17[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results17[idx]?.home || ''}
                         onChange={e => setResults17(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results17[idx]?.away || ''}
                         onChange={e => setResults17(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results17[idx]?.scorers || ''}
                         onChange={e => setResults17(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips17[u.nickname]?.forEach((tip, idx) => {
                       const res = results17[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips17[u.nickname]?.forEach((tip, idx) => {
                       const res = results17[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips17[u.nickname]?.forEach((tip, idx) => {
                         const res = results17[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips17[u.nickname]?.forEach((tip, idx) => {
                       const res = results17[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips17[u.nickname]?.forEach((tip, idx) => {
                         const res = results17[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 18. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 18. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_18.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips18[u.nickname]?.[idx] && allTips18[u.nickname][idx].home !== '' && allTips18[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips18[u.nickname][idx].home}:{allTips18[u.nickname][idx].away}
                             {allTips18[u.nickname][idx].scorer ? ` – ${allTips18[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results18[idx]?.home || ''}
                         onChange={e => setResults18(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results18[idx]?.away || ''}
                         onChange={e => setResults18(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results18[idx]?.scorers || ''}
                         onChange={e => setResults18(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips18[u.nickname]?.forEach((tip, idx) => {
                       const res = results18[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips18[u.nickname]?.forEach((tip, idx) => {
                       const res = results18[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips18[u.nickname]?.forEach((tip, idx) => {
                         const res = results18[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips18[u.nickname]?.forEach((tip, idx) => {
                       const res = results18[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips18[u.nickname]?.forEach((tip, idx) => {
                         const res = results18[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 19. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 19. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_19.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips19[u.nickname]?.[idx] && allTips19[u.nickname][idx].home !== '' && allTips19[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips19[u.nickname][idx].home}:{allTips19[u.nickname][idx].away}
                             {allTips19[u.nickname][idx].scorer ? ` – ${allTips19[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results19[idx]?.home || ''}
                         onChange={e => setResults19(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results19[idx]?.away || ''}
                         onChange={e => setResults19(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results19[idx]?.scorers || ''}
                         onChange={e => setResults19(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips19[u.nickname]?.forEach((tip, idx) => {
                       const res = results19[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips19[u.nickname]?.forEach((tip, idx) => {
                       const res = results19[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips19[u.nickname]?.forEach((tip, idx) => {
                         const res = results19[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips19[u.nickname]?.forEach((tip, idx) => {
                       const res = results19[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips19[u.nickname]?.forEach((tip, idx) => {
                         const res = results19[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 20. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 20. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_20.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips20[u.nickname]?.[idx] && allTips20[u.nickname][idx].home !== '' && allTips20[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips20[u.nickname][idx].home}:{allTips20[u.nickname][idx].away}
                             {allTips20[u.nickname][idx].scorer ? ` – ${allTips20[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results20[idx]?.home || ''}
                         onChange={e => setResults20(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results20[idx]?.away || ''}
                         onChange={e => setResults20(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results20[idx]?.scorers || ''}
                         onChange={e => setResults20(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips20[u.nickname]?.forEach((tip, idx) => {
                       const res = results20[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips20[u.nickname]?.forEach((tip, idx) => {
                       const res = results20[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips20[u.nickname]?.forEach((tip, idx) => {
                         const res = results20[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips20[u.nickname]?.forEach((tip, idx) => {
                       const res = results20[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips20[u.nickname]?.forEach((tip, idx) => {
                         const res = results20[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 21. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 21. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_21.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips21[u.nickname]?.[idx] && allTips21[u.nickname][idx].home !== '' && allTips21[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips21[u.nickname][idx].home}:{allTips21[u.nickname][idx].away}
                             {allTips21[u.nickname][idx].scorer ? ` – ${allTips21[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results21[idx]?.home || ''}
                         onChange={e => setResults21(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results21[idx]?.away || ''}
                         onChange={e => setResults21(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results21[idx]?.scorers || ''}
                         onChange={e => setResults21(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips21[u.nickname]?.forEach((tip, idx) => {
                       const res = results21[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips21[u.nickname]?.forEach((tip, idx) => {
                       const res = results21[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips21[u.nickname]?.forEach((tip, idx) => {
                         const res = results21[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips21[u.nickname]?.forEach((tip, idx) => {
                       const res = results21[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips21[u.nickname]?.forEach((tip, idx) => {
                         const res = results21[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 22. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 22. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_22.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips22[u.nickname]?.[idx] && allTips22[u.nickname][idx].home !== '' && allTips22[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips22[u.nickname][idx].home}:{allTips22[u.nickname][idx].away}
                             {allTips22[u.nickname][idx].scorer ? ` – ${allTips22[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results22[idx]?.home || ''}
                         onChange={e => setResults22(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results22[idx]?.away || ''}
                         onChange={e => setResults22(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results22[idx]?.scorers || ''}
                         onChange={e => setResults22(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips22[u.nickname]?.forEach((tip, idx) => {
                       const res = results22[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips22[u.nickname]?.forEach((tip, idx) => {
                       const res = results22[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips22[u.nickname]?.forEach((tip, idx) => {
                         const res = results22[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips22[u.nickname]?.forEach((tip, idx) => {
                       const res = results22[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips22[u.nickname]?.forEach((tip, idx) => {
                         const res = results22[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 23. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 23. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_23.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips23[u.nickname]?.[idx] && allTips23[u.nickname][idx].home !== '' && allTips23[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips23[u.nickname][idx].home}:{allTips23[u.nickname][idx].away}
                             {allTips23[u.nickname][idx].scorer ? ` – ${allTips23[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results23[idx]?.home || ''}
                         onChange={e => setResults23(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results23[idx]?.away || ''}
                         onChange={e => setResults23(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results23[idx]?.scorers || ''}
                         onChange={e => setResults23(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips23[u.nickname]?.forEach((tip, idx) => {
                       const res = results23[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips23[u.nickname]?.forEach((tip, idx) => {
                       const res = results23[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips23[u.nickname]?.forEach((tip, idx) => {
                         const res = results23[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips23[u.nickname]?.forEach((tip, idx) => {
                       const res = results23[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips23[u.nickname]?.forEach((tip, idx) => {
                         const res = results23[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 24. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 24. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_24.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips24[u.nickname]?.[idx] && allTips24[u.nickname][idx].home !== '' && allTips24[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips24[u.nickname][idx].home}:{allTips24[u.nickname][idx].away}
                             {allTips24[u.nickname][idx].scorer ? ` – ${allTips24[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results24[idx]?.home || ''}
                         onChange={e => setResults24(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results24[idx]?.away || ''}
                         onChange={e => setResults24(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results24[idx]?.scorers || ''}
                         onChange={e => setResults24(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips24[u.nickname]?.forEach((tip, idx) => {
                       const res = results24[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips24[u.nickname]?.forEach((tip, idx) => {
                       const res = results24[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips24[u.nickname]?.forEach((tip, idx) => {
                         const res = results24[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips24[u.nickname]?.forEach((tip, idx) => {
                       const res = results24[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips24[u.nickname]?.forEach((tip, idx) => {
                         const res = results24[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 25. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 25. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_25.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips25[u.nickname]?.[idx] && allTips25[u.nickname][idx].home !== '' && allTips25[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips25[u.nickname][idx].home}:{allTips25[u.nickname][idx].away}
                             {allTips25[u.nickname][idx].scorer ? ` – ${allTips25[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results25[idx]?.home || ''}
                         onChange={e => setResults25(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results25[idx]?.away || ''}
                         onChange={e => setResults25(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results25[idx]?.scorers || ''}
                         onChange={e => setResults25(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips25[u.nickname]?.forEach((tip, idx) => {
                       const res = results25[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips25[u.nickname]?.forEach((tip, idx) => {
                       const res = results25[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips25[u.nickname]?.forEach((tip, idx) => {
                         const res = results25[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips25[u.nickname]?.forEach((tip, idx) => {
                       const res = results25[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips25[u.nickname]?.forEach((tip, idx) => {
                         const res = results25[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 26. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 26. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_26.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips26[u.nickname]?.[idx] && allTips26[u.nickname][idx].home !== '' && allTips26[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips26[u.nickname][idx].home}:{allTips26[u.nickname][idx].away}
                             {allTips26[u.nickname][idx].scorer ? ` – ${allTips26[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results26[idx]?.home || ''}
                         onChange={e => setResults26(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results26[idx]?.away || ''}
                         onChange={e => setResults26(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results26[idx]?.scorers || ''}
                         onChange={e => setResults26(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips26[u.nickname]?.forEach((tip, idx) => {
                       const res = results26[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips26[u.nickname]?.forEach((tip, idx) => {
                       const res = results26[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips26[u.nickname]?.forEach((tip, idx) => {
                         const res = results26[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips26[u.nickname]?.forEach((tip, idx) => {
                       const res = results26[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips26[u.nickname]?.forEach((tip, idx) => {
                         const res = results26[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 27. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 27. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_27.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips27[u.nickname]?.[idx] && allTips27[u.nickname][idx].home !== '' && allTips27[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips27[u.nickname][idx].home}:{allTips27[u.nickname][idx].away}
                             {allTips27[u.nickname][idx].scorer ? ` – ${allTips27[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results27[idx]?.home || ''}
                         onChange={e => setResults27(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results27[idx]?.away || ''}
                         onChange={e => setResults27(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results27[idx]?.scorers || ''}
                         onChange={e => setResults27(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips27[u.nickname]?.forEach((tip, idx) => {
                       const res = results27[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips27[u.nickname]?.forEach((tip, idx) => {
                       const res = results27[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips27[u.nickname]?.forEach((tip, idx) => {
                         const res = results27[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips27[u.nickname]?.forEach((tip, idx) => {
                       const res = results27[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips27[u.nickname]?.forEach((tip, idx) => {
                         const res = results27[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 28. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 28. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_28.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips28[u.nickname]?.[idx] && allTips28[u.nickname][idx].home !== '' && allTips28[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips28[u.nickname][idx].home}:{allTips28[u.nickname][idx].away}
                             {allTips28[u.nickname][idx].scorer ? ` – ${allTips28[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results28[idx]?.home || ''}
                         onChange={e => setResults28(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results28[idx]?.away || ''}
                         onChange={e => setResults28(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results28[idx]?.scorers || ''}
                         onChange={e => setResults28(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips28[u.nickname]?.forEach((tip, idx) => {
                       const res = results28[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips28[u.nickname]?.forEach((tip, idx) => {
                       const res = results28[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips28[u.nickname]?.forEach((tip, idx) => {
                         const res = results28[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips28[u.nickname]?.forEach((tip, idx) => {
                       const res = results28[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips28[u.nickname]?.forEach((tip, idx) => {
                         const res = results28[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 29. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 29. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_29.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips29[u.nickname]?.[idx] && allTips29[u.nickname][idx].home !== '' && allTips29[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips29[u.nickname][idx].home}:{allTips29[u.nickname][idx].away}
                             {allTips29[u.nickname][idx].scorer ? ` – ${allTips29[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results29[idx]?.home || ''}
                         onChange={e => setResults29(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results29[idx]?.away || ''}
                         onChange={e => setResults29(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results29[idx]?.scorers || ''}
                         onChange={e => setResults29(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips29[u.nickname]?.forEach((tip, idx) => {
                       const res = results29[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips29[u.nickname]?.forEach((tip, idx) => {
                       const res = results29[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips29[u.nickname]?.forEach((tip, idx) => {
                         const res = results29[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips29[u.nickname]?.forEach((tip, idx) => {
                       const res = results29[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips29[u.nickname]?.forEach((tip, idx) => {
                         const res = results29[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>

         {/* Admin: Tipy všech hráčů na 30. kolo */}
         <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-6xl mb-8">
           <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin: Tipy všech hráčů na 30. kolo</h1>
             <p className="text-gray-500">Pod tipy můžeš zadat reálný výsledek a střelce.</p>
           </div>
           <div className="overflow-x-auto">
             <table className="min-w-full border rounded-lg overflow-hidden">
               <thead className="bg-blue-100">
                 <tr>
                   <th className="py-2 px-3 text-center">Zápas</th>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                     <th key={u.nickname} className="py-2 px-3 text-center">{u.nickname}</th>
                   ))}
                   <th className="py-2 px-3 text-center">Výsledek</th>
                   <th className="py-2 px-3 text-center">Střelci</th>
                 </tr>
               </thead>
               <tbody>
                 {MATCHES_ROUND_30.map((match, idx) => (
                   <tr key={match.home + match.away} className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}>
                     <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                     {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                       <td key={u.nickname} className="py-2 px-3 text-center">
                         {allTips30[u.nickname]?.[idx] && allTips30[u.nickname][idx].home !== '' && allTips30[u.nickname][idx].away !== '' ? (
                           <span>
                             {allTips30[u.nickname][idx].home}:{allTips30[u.nickname][idx].away}
                             {allTips30[u.nickname][idx].scorer ? ` – ${allTips30[u.nickname][idx].scorer}` : ''}
                           </span>
                         ) : (
                           <span className="text-gray-400">-</span>
                         )}
                       </td>
                     ))}
                     <td className="py-2 px-3 text-center">
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results30[idx]?.home || ''}
                         onChange={e => setResults30(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].home = e.target.value; return n; })}
                       />
                       <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                       <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                         value={results30[idx]?.away || ''}
                         onChange={e => setResults30(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].away = e.target.value; return n; })}
                       />
                     </td>
                     <td className="py-2 px-3 text-center">
                       <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (odděluj čárkou)"
                         value={results30[idx]?.scorers || ''}
                         onChange={e => setResults30(r => { const n = [...r]; if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' }; n[idx].scorers = e.target.value; return n; })}
                       />
                     </td>
                   </tr>
                 ))}
               </tbody>
               <tfoot>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za výsledek</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips30[u.nickname]?.forEach((tip, idx) => {
                       const res = results30[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-blue-50 font-semibold">
                   <td className="py-2 px-3 text-right">Body za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips30[u.nickname]?.forEach((tip, idx) => {
                       const res = results30[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za výsledky</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     const allResultPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips30[u.nickname]?.forEach((tip, idx) => {
                         const res = results30[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.exactResult + pointsCalc.correctWinnerAndDifference + pointsCalc.correctWinner + pointsCalc.correctDraw;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allResultPoints.map(p => p.points));
                     const winners = allResultPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allResultPoints.filter(p => p.points < maxPoints || p.points === 0);
                     const totalPot = losers.length * 250;
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-250 Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
                 <tr className="bg-green-50 font-semibold">
                   <td className="py-2 px-3 text-right">Finance za střelce</td>
                   {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                     let sum = 0;
                     allTips30[u.nickname]?.forEach((tip, idx) => {
                       const res = results30[idx];
                       if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                       const parsedTip = {
                         matchIndex: idx,
                         predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                         predictedScorer: tip.scorer || ''
                       };
                       const parsedResult = { home: Number(res.home), away: Number(res.away) };
                       const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                       const points = calculatePoints(parsedTip, parsedResult, scorers);
                       sum += points.correctScorer + points.noScorer + points.bonusPoints;
                     });
                     const allScorerPoints = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                       let points = 0;
                       allTips30[u.nickname]?.forEach((tip, idx) => {
                         const res = results30[idx];
                         if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                         const parsedTip = {
                           matchIndex: idx,
                           predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                           predictedScorer: tip.scorer || ''
                         };
                         const parsedResult = { home: Number(res.home), away: Number(res.away) };
                         const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                         const pointsCalc = calculatePoints(parsedTip, parsedResult, scorers);
                         points += pointsCalc.correctScorer + pointsCalc.noScorer + pointsCalc.bonusPoints;
                       });
                       return { nickname: u.nickname, points };
                     });
                     const maxPoints = Math.max(...allScorerPoints.map(p => p.points));
                     const winners = allScorerPoints.filter(p => p.points === maxPoints && p.points > 0);
                     const losers = allScorerPoints.filter(p => p.points < maxPoints || p.points === 0);
                     let totalPot = 0;
                     losers.forEach(loser => {
                       const payment = (maxPoints - loser.points) * 50;
                       totalPot += payment;
                     });
                     const winAmount = winners.length > 0 ? totalPot / winners.length : 0;
                     if (winners.some(w => w.nickname === u.nickname)) {
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-green-700">+{winAmount} Kč</td>;
                     } else {
                       const payment = maxPoints > 0 ? (maxPoints - sum) * 50 : 0;
                       return <td key={u.nickname} className="py-2 px-3 text-center font-bold text-red-700">-{payment} Kč</td>;
                     }
                   })}
                   <td colSpan={2}></td>
                 </tr>
               </tfoot>
             </table>
           </div>
         </div>
       </div>


     </div>
   )
 }