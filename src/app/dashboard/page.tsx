'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MATCHES_ROUND_1 } from '../../lib/matches-2025-26'
import { calculatePoints } from '@/lib/points'

const USERS = [
  { nickname: 'Rybča', password: 'rybca123' },
  { nickname: 'Kořda', password: 'korda123' },
  { nickname: 'Jozeve', password: 'jozeve123' },
  { nickname: 'Špinavovlas', password: 'spinavovlas123' },
  { nickname: 'Netáhlo', password: 'netahlo123' },
  { nickname: 'admin', password: 'admin123' },
]

const ADMIN_NICK = 'admin'

// Přidám typy pro zápasy a tipy
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
  const [tips, setTips] = useState<Tip[]>(getInitialTips(MATCHES_ROUND_1))
  const [results, setResults] = useState<Result[]>(getInitialResults(MATCHES_ROUND_1))
  const [allTips, setAllTips] = useState<Record<string, Tip[]>>({})
  const router = useRouter()

  // Odhlášení
  function handleLogout() {
    localStorage.removeItem('user');
    router.push('/');
  }

  // Načtení uživatele a tipů
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      router.push('/')
      return
    }
    const parsedUser = JSON.parse(storedUser)
    setUser(parsedUser)
    // Načti tipy pro uživatele
    const tipsKey = `tips_${parsedUser.nickname}`
    const storedTips = localStorage.getItem(tipsKey)
    if (storedTips) {
      setTips(JSON.parse(storedTips))
    }
    // Načti výsledky (jen pro admina)
    if (parsedUser.nickname === ADMIN_NICK) {
      const storedResults = localStorage.getItem('results_2025_26')
      if (storedResults) {
        setResults(JSON.parse(storedResults))
      }
      // Načti tipy všech hráčů
      const tipsObj: Record<string, Tip[]> = {}
      USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(u => {
        const t = localStorage.getItem(`tips_${u.nickname}`)
        tipsObj[u.nickname] = t ? JSON.parse(t) : getInitialTips(MATCHES_ROUND_1)
      })
      setAllTips(tipsObj)
    }
  }, [router])

  // Ukládání tipů hráče
  useEffect(() => {
    if (user && user.nickname !== ADMIN_NICK) {
      localStorage.setItem(`tips_${user.nickname}` , JSON.stringify(tips))
    }
  }, [tips, user])

  // Ukládání výsledků admina
  useEffect(() => {
    if (user && user.nickname === ADMIN_NICK) {
      localStorage.setItem('results_2025_26', JSON.stringify(results))
    }
  }, [results, user])

  if (!user) return <div className="min-h-screen flex items-center justify-center">Načítání...</div>

  // Hráčský dashboard
  if (user.nickname !== ADMIN_NICK) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center py-8 px-2">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-white text-blue-900 border border-blue-300 rounded px-4 py-2 shadow hover:bg-blue-50 transition"
        >
          Odhlásit
        </button>
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Tipuj 1. kolo FORTUNA:LIGY</h1>
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
                {MATCHES_ROUND_1.map((match: { home: string; away: string; kickoff: string }, idx: number) => (
                  <tr
                    key={match.home + match.away}
                    className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}
                  >
                    <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                    <td className="py-2 px-3 text-gray-500">{new Date(match.kickoff).toLocaleString('cs-CZ')}</td>
                    <td className="py-2 px-3 text-center">
                      <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                        value={(tips[idx]?.home ?? '')}
                        onChange={e => setTips(t => {
                          const n = [...t];
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' };
                          n[idx].home = e.target.value;
                          return n;
                        })}
                      />
                      <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                      <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                        value={(tips[idx]?.away ?? '')}
                        onChange={e => setTips(t => {
                          const n = [...t];
                          if (!n[idx]) n[idx] = { home: '', away: '', scorer: '' };
                          n[idx].away = e.target.value;
                          return n;
                        })}
                      />
                    </td>
                    <td className="py-2 px-3 text-center">
                      <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelec (nebo prázdné pro 0:0)"
                        value={(tips[idx]?.scorer ?? '')}
                        onChange={e => setTips(t => {
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

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex flex-col items-center py-8 px-2">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-white text-blue-900 border border-blue-300 rounded px-4 py-2 shadow hover:bg-blue-50 transition"
      >
        Zpět / Odhlásit
      </button>
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-5xl">
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
              {MATCHES_ROUND_1.map((match: { home: string; away: string; kickoff: string }, idx: number) => (
                <tr
                  key={match.home + match.away}
                  className={`border-b border-blue-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}`}
                >
                  <td className="py-2 px-3 font-medium text-gray-900">{match.home} vs {match.away}</td>
                  {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => (
                    <td key={u.nickname} className="py-2 px-3 text-center">
                      {allTips[u.nickname]?.[idx] && allTips[u.nickname][idx].home !== '' && allTips[u.nickname][idx].away !== '' ? (
                        <span>
                          {allTips[u.nickname][idx].home}:{allTips[u.nickname][idx].away}
                          {allTips[u.nickname][idx].scorer ? ` – ${allTips[u.nickname][idx].scorer}` : ''}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  ))}
                  <td className="py-2 px-3 text-center">
                    <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                      value={(results[idx]?.home ?? '')}
                      onChange={e => setResults(r => {
                        const n = [...r];
                        if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' };
                        n[idx].home = e.target.value;
                        return n;
                      })}
                    />
                    <span className="text-xl font-bold text-gray-500 mx-1">:</span>
                    <input type="number" min="0" max="20" className="w-12 px-2 py-1 border border-gray-300 rounded text-center font-bold" placeholder="0"
                      value={(results[idx]?.away ?? '')}
                      onChange={e => setResults(r => {
                        const n = [...r];
                        if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' };
                        n[idx].away = e.target.value;
                        return n;
                      })}
                    />
                  </td>
                  <td className="py-2 px-3 text-center">
                    <input type="text" className="w-full px-2 py-1 border border-gray-300 rounded text-sm" placeholder="Střelci (čárkou odděleno)"
                      value={(results[idx]?.scorers ?? '')}
                      onChange={e => setResults(r => {
                        const n = [...r];
                        if (!n[idx]) n[idx] = { home: '', away: '', scorers: '' };
                        n[idx].scorers = e.target.value;
                        return n;
                      })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Nové řádky pro součty bodů */}
            <tfoot>
              <tr className="bg-blue-50 font-semibold">
                <td className="py-2 px-3 text-right">Body za výsledek</td>
                {(() => {
                  // Výpočet bonusových bodů za střelce
                  const playerNicks = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => u.nickname);
                  // 1. Spočítat body za střelce pro každého hráče
                  const scorersPerPlayer: Record<string, number> = {};
                  playerNicks.forEach(nick => {
                    let sum = 0;
                    allTips[nick]?.forEach((tip, idx) => {
                      const res = results[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                      const points = calculatePoints(parsedTip, parsedResult, scorers);
                      sum += points.correctScorer;
                    });
                    scorersPerPlayer[nick] = sum;
                  });
                  // 2. Najít nejvyšší počet trefených střelců
                  const maxScorers = Math.max(...Object.values(scorersPerPlayer));
                  // 3. Najít vítěze/vítěze (může být více při shodě)
                  const winners = playerNicks.filter(nick => scorersPerPlayer[nick] === maxScorers && maxScorers > 0);
                  // Výpočet bodů za výsledek + bonus
                  return playerNicks.map(nick => {
                    let sum = 0;
                    allTips[nick]?.forEach((tip, idx) => {
                      const res = results[idx];
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
                    // Přičti bonusový bod za vítězství ve střelcích
                    if (winners.includes(nick)) sum += 1;
                    return <td key={nick} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                  });
                })()}
                <td colSpan={2}></td>
              </tr>
              <tr className="bg-blue-50 font-semibold">
                <td className="py-2 px-3 text-right">Body za střelce</td>
                {USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => {
                  // Sečti body za střelce pro všechny zápasy
                  let sum = 0;
                  allTips[u.nickname]?.forEach((tip, idx) => {
                    const res = results[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    // Připrav data pro calculatePoints
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    // Body za střelce: correctScorer + noScorer + bonusPoints
                    sum += points.correctScorer + points.noScorer + points.bonusPoints;
                  });
                  return <td key={u.nickname} className="py-2 px-3 text-center text-blue-900">{sum}</td>;
                })}
                <td colSpan={2}></td>
              </tr>
              {/* Výpočet financí za výsledek */}
              {(() => {
                // 1. Spočítat body za výsledek pro každého hráče (včetně bonusu za střelce)
                const playerNicks = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => u.nickname);
                const pointsPerPlayer: Record<string, number> = {};
                // Výpočet bonusových bodů za střelce
                const scorersPerPlayer: Record<string, number> = {};
                playerNicks.forEach(nick => {
                  let sum = 0;
                  allTips[nick]?.forEach((tip, idx) => {
                    const res = results[idx];
                    if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                    const parsedTip = {
                      matchIndex: idx,
                      predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                      predictedScorer: tip.scorer || ''
                    };
                    const parsedResult = { home: Number(res.home), away: Number(res.away) };
                    const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                    const points = calculatePoints(parsedTip, parsedResult, scorers);
                    sum += points.correctScorer;
                  });
                  scorersPerPlayer[nick] = sum;
                });
                const maxScorers = Math.max(...Object.values(scorersPerPlayer));
                const winnersScorers = playerNicks.filter(nick => scorersPerPlayer[nick] === maxScorers && maxScorers > 0);
                playerNicks.forEach(nick => {
                  let sum = 0;
                  allTips[nick]?.forEach((tip, idx) => {
                    const res = results[idx];
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
                  // Přičti bonusový bod za vítězství ve střelcích
                  if (winnersScorers.includes(nick)) sum += 1;
                  pointsPerPlayer[nick] = sum;
                });
                // 2. Najít nejvyšší bodový zisk
                const maxPoints = Math.max(...Object.values(pointsPerPlayer));
                // 3. Najít vítěze/vítěze (může být více při shodě)
                const winners = playerNicks.filter(nick => pointsPerPlayer[nick] === maxPoints && maxPoints > 0);
                const losers = playerNicks.filter(nick => !winners.includes(nick));
                // 4. Výpočet financí
                const perLoser = 250;
                const nWinners = winners.length;
                const nLosers = losers.length;
                const finance: Record<string, number> = {};
                if (nWinners === 0) {
                  playerNicks.forEach(nick => { finance[nick] = 0; });
                } else {
                  // Každý poražený dává 250 Kč, vítězové si dělí celkovou částku
                  const total = nLosers * perLoser;
                  winners.forEach(nick => {
                    finance[nick] = nLosers === 0 ? 0 : +(total / nWinners).toFixed(2);
                  });
                  losers.forEach(nick => {
                    finance[nick] = -perLoser;
                  });
                }
                return (
                  <tr className="bg-blue-100 font-semibold">
                    <td className="py-2 px-3 text-right">Finance za výsledek</td>
                    {playerNicks.map(nick => (
                      <td key={nick} className={`py-2 px-3 text-center ${finance[nick] > 0 ? 'text-green-700' : finance[nick] < 0 ? 'text-red-700' : 'text-gray-700'}`}>{finance[nick] === 0 ? '0 Kč' : `${finance[nick] > 0 ? '+' : ''}${finance[nick]} Kč`}</td>
                    ))}
                    <td colSpan={2}></td>
                  </tr>
                );
              })()}
              <tr className="bg-blue-100 font-semibold">
                <td className="py-2 px-3 text-right">Finance za střelce</td>
                {(() => {
                  // 1. Spočítat body za střelce pro každého hráče
                  const playerNicks = USERS.filter(u => u.nickname !== ADMIN_NICK).map(u => u.nickname);
                  const scorersPerPlayer: Record<string, number> = {};
                  playerNicks.forEach(nick => {
                    let sum = 0;
                    allTips[nick]?.forEach((tip, idx) => {
                      const res = results[idx];
                      if (!tip || tip.home === '' || tip.away === '' || !res || res.home === '' || res.away === '') return;
                      const parsedTip = {
                        matchIndex: idx,
                        predictedResult: { home: Number(tip.home), away: Number(tip.away) },
                        predictedScorer: tip.scorer || ''
                      };
                      const parsedResult = { home: Number(res.home), away: Number(res.away) };
                      const scorers = (res.scorers || '').split(',').map(s => s.trim()).filter(Boolean);
                      const points = calculatePoints(parsedTip, parsedResult, scorers);
                      // Počet trefených střelců = correctScorer (1 za každého správného)
                      sum += points.correctScorer;
                    });
                    scorersPerPlayer[nick] = sum;
                  });
                  // 2. Najít nejvyšší počet trefených střelců
                  const maxScorers = Math.max(...Object.values(scorersPerPlayer));
                  // 3. Najít vítěze/vítěze (může být více při shodě)
                  const winners = playerNicks.filter(nick => scorersPerPlayer[nick] === maxScorers && maxScorers > 0);
                  const losers = playerNicks.filter(nick => scorersPerPlayer[nick] < maxScorers);
                  // 4. Výpočet financí
                  const perScorer = 50;
                  const nWinners = winners.length;
                  const finance: Record<string, number> = {};
                  let total = 0;
                  if (nWinners === 0) {
                    playerNicks.forEach(nick => { finance[nick] = 0; });
                  } else {
                    losers.forEach(nick => {
                      const diff = maxScorers - scorersPerPlayer[nick];
                      const loss = diff * perScorer;
                      finance[nick] = -loss;
                      total += loss;
                    });
                    winners.forEach(nick => {
                      finance[nick] = nWinners === 0 ? 0 : +(total / nWinners).toFixed(2);
                    });
                  }
                  return playerNicks.map(nick => (
                    <td key={nick} className={`py-2 px-3 text-center ${finance[nick] > 0 ? 'text-green-700' : finance[nick] < 0 ? 'text-red-700' : 'text-gray-700'}`}>{finance[nick] === 0 ? '0 Kč' : `${finance[nick] > 0 ? '+' : ''}${finance[nick]} Kč`}</td>
                  ));
                })()}
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
} 