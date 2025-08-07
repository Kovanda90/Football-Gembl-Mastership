import { NextResponse } from 'next/server'
import { calculatePoints } from '@/lib/points'

// Data z dashboardu
const USERS = [
  { nickname: 'Rybča', password: 'rybca123' },
  { nickname: 'Kořda', password: 'korda123' },
  { nickname: 'Jozeve', password: 'jozeve123' },
  { nickname: 'Špinavovlas', password: 'spinavovlas123' },
  { nickname: 'Netáhlo', password: 'netahlo123' },
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

// Data pro první kolo
const results1: Result[] = [
  { home: "1", away: "5", scorers: "Vydra, Vydra, Šulc" },
  { home: "1", away: "0", scorers: "Yusuf" },
  { home: "1", away: "3", scorers: "Pulkrab, Kanu, Nombil" },
  { home: "2", away: "0", scorers: "Sinhateh" },
  { home: "1", away: "1", scorers: "Kuchta" },
  { home: "0", away: "1", scorers: "Vašulín" },
  { home: "3", away: "3", scorers: "Pech, Macek, Krollis, Hlavatý, Mašel" },
  { home: "2", away: "2", scorers: "Sojka, Chorý, Zafeiris, Hodek" }
]

const allTips1: {[key: string]: Tip[]} = {
  "Rybča": [
    { home: "0", away: "3", scorer: "Šulc" },
    { home: "1", away: "1", scorer: "Drchal" },
    { home: "1", away: "0", scorer: "Kozák" },
    { home: "2", away: "1", scorer: "Gning" },
    { home: "1", away: "3", scorer: "Kuchta" },
    { home: "0", away: "2", scorer: "Janošek" },
    { home: "1", away: "2", scorer: "Krollis" },
    { home: "2", away: "0", scorer: "Chorý" }
  ],
  "Kořda": [
    { home: "0", away: "2", scorer: "Vydra" },
    { home: "1", away: "2", scorer: "Ewerton" },
    { home: "1", away: "0", scorer: "Kozák" },
    { home: "1", away: "1", scorer: "Milla" },
    { home: "1", away: "2", scorer: "Kuchta" },
    { home: "0", away: "1", scorer: "Vašulín" },
    { home: "1", away: "2", scorer: "Krollis" },
    { home: "2", away: "0", scorer: "Kušej" }
  ],
  "Jozeve": [
    { home: "0", away: "3", scorer: "Vydra" },
    { home: "1", away: "2", scorer: "Ewerton" },
    { home: "1", away: "0", scorer: "Krejčí" },
    { home: "3", away: "1", scorer: "Gning" },
    { home: "1", away: "2", scorer: "Kuchta" },
    { home: "1", away: "2", scorer: "Mikulenka" },
    { home: "1", away: "2", scorer: "Krollis" },
    { home: "3", away: "0", scorer: "Kušej" }
  ],
  "Špinavovlas": [
    { home: "0", away: "2", scorer: "Prince Adu" },
    { home: "0", away: "1", scorer: "Ewerton" },
    { home: "2", away: "0", scorer: "Pulkrab" },
    { home: "2", away: "1", scorer: "Gning" },
    { home: "1", away: "2", scorer: "Kuchta" },
    { home: "1", away: "1", scorer: "Janošek" },
    { home: "1", away: "1", scorer: "Vojta" },
    { home: "3", away: "0", scorer: "Chorý" }
  ],
  "Netáhlo": [
    { home: "0", away: "2", scorer: "Šulc" },
    { home: "1", away: "2", scorer: "Ewerton" },
    { home: "2", away: "1", scorer: "Kozák" },
    { home: "2", away: "0", scorer: "Vecheta" },
    { home: "1", away: "2", scorer: "Haraslín" },
    { home: "1", away: "2", scorer: "Janošek" },
    { home: "1", away: "2", scorer: "Hlavatý" },
    { home: "3", away: "0", scorer: "Kušej" }
  ]
}

// Data pro druhé kolo
const results2: Result[] = [
  { home: "0", away: "0", scorers: "nikdo" },
  { home: "1", away: "1", scorers: "Cupák" },
  { home: "1", away: "1", scorers: "Vydra, Tekijaški" },
  { home: "1", away: "2", scorers: "Gning, Vlkanova, Štorman" },
  { home: "0", away: "2", scorers: "Provod, Kušej" },
  { home: "2", away: "1", scorers: "Ghali, Patrák, Letenay" },
  { home: "1", away: "0", scorers: "Nedohráno" },
  { home: "3", away: "2", scorers: "Rrahmani, Pech, Vojta, Kuchta, Haraslín" }
]

const allTips2: {[key: string]: Tip[]} = {
  "Rybča": [
    { home: "2", away: "0", scorer: "Vašulín" },
    { home: "2", away: "1", scorer: "Nombil" },
    { home: "2", away: "1", scorer: "Vydra" },
    { home: "2", away: "1", scorer: "van Buren" },
    { home: "0", away: "2", scorer: "Chorý" },
    { home: "2", away: "0", scorer: "Krollis" },
    { home: "2", away: "0", scorer: "Šín" },
    { home: "2", away: "1", scorer: "Kuchta" }
  ],
  "Kořda": [
    { home: "1", away: "0", scorer: "Vašulín" },
    { home: "2", away: "1", scorer: "Kanu" },
    { home: "2", away: "1", scorer: "Vydra" },
    { home: "3", away: "1", scorer: "Vlkanova" },
    { home: "1", away: "3", scorer: "Chorý" },
    { home: "2", away: "0", scorer: "Krollis" },
    { home: "2", away: "0", scorer: "Šín" },
    { home: "3", away: "1", scorer: "Kuchta" }
  ],
  "Jozeve": [
    { home: "2", away: "1", scorer: "Vašulín" },
    { home: "1", away: "1", scorer: "Kanu" },
    { home: "2", away: "1", scorer: "Vydra" },
    { home: "2", away: "1", scorer: "Pilař" },
    { home: "0", away: "3", scorer: "Chorý" },
    { home: "3", away: "0", scorer: "Krollis" },
    { home: "2", away: "0", scorer: "Prekop" },
    { home: "2", away: "1", scorer: "Haraslín" }
  ],
  "Špinavovlas": [
    { home: "2", away: "0", scorer: "Vašulín" },
    { home: "1", away: "0", scorer: "Kanu" },
    { home: "2", away: "0", scorer: "Šulc" },
    { home: "2", away: "0", scorer: "van Buren" },
    { home: "0", away: "2", scorer: "Chorý" },
    { home: "2", away: "0", scorer: "Krollis" },
    { home: "2", away: "0", scorer: "Šín" },
    { home: "3", away: "1", scorer: "Kuchta" }
  ],
  "Netáhlo": [
    { home: "2", away: "0", scorer: "Vašulín" },
    { home: "1", away: "1", scorer: "Krmenčík" },
    { home: "2", away: "1", scorer: "Šulc" },
    { home: "2", away: "1", scorer: "van Buren" },
    { home: "1", away: "2", scorer: "Chorý" },
    { home: "2", away: "0", scorer: "Krollis" },
    { home: "2", away: "0", scorer: "Šín" },
    { home: "2", away: "1", scorer: "Kuchta" }
  ]
}

function calculateRoundPoints(allTips: any, results: any, roundNumber: number, userNickname: string) {
  let roundResultPoints = 0;
  let roundScorerPoints = 0;
  
  allTips[userNickname]?.forEach((tip: any, idx: number) => {
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
}

function calculateScorerBonus(allTips: any, results: any, roundNumber: number, userNickname: string) {
  // Spočítám body za střelce pro všechny hráče
  const scorerPointsByUser: { [nickname: string]: number } = {};
  
  USERS.filter(u => u.nickname !== ADMIN_NICK).forEach(user => {
    let roundScorerPoints = 0;
    allTips[user.nickname]?.forEach((tip: any, idx: number) => {
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
      roundScorerPoints += points.correctScorer + points.noScorer + points.bonusPoints;
    });
    
    scorerPointsByUser[user.nickname] = roundScorerPoints;
  });
  
  // Najdu vítěze ve střelcích
  const scorerPointsArray = Object.entries(scorerPointsByUser).map(([nickname, points]) => ({ nickname, points }));
  const maxScorerPoints = Math.max(...scorerPointsArray.map(p => p.points));
  const scorerWinners = scorerPointsArray.filter(p => p.points === maxScorerPoints && p.points > 0);
  
  // Pokud je aktuální hráč vítězem ve střelcích, vrátí 1 bonusový bod
  if (scorerWinners.some(w => w.nickname === userNickname)) {
    return 1;
  }
  
  return 0;
}

export async function GET() {
  try {
    const rounds = [
      { allTips: allTips1, results: results1, roundNumber: 1 },
      { allTips: allTips2, results: results2, roundNumber: 2 }
    ];
    
    const leaderboard = USERS.filter(u => u.nickname !== ADMIN_NICK).map(user => {
      let totalResultPoints = 0;
      let totalScorerPoints = 0;
      let totalBonusPoints = 0;
      
      rounds.forEach((round) => {
        const hasResults = round.results && round.results.length > 0 && 
          round.results.every((result: any) => 
            result && result.home !== '' && result.home !== null && result.home !== undefined &&
            result.away !== '' && result.away !== null && result.away !== undefined
          );
        
        if (hasResults) {
          const { roundResultPoints, roundScorerPoints } = calculateRoundPoints(round.allTips, round.results, round.roundNumber, user.nickname);
          const bonusPoints = calculateScorerBonus(round.allTips, round.results, round.roundNumber, user.nickname);
          
          totalResultPoints += roundResultPoints;
          totalScorerPoints += roundScorerPoints;
          totalBonusPoints += bonusPoints;
        }
      });
      
      return {
        nickname: user.nickname,
        resultPoints: totalResultPoints,
        scorerPoints: totalScorerPoints,
        bonusPoints: totalBonusPoints,
        totalPoints: totalResultPoints + totalScorerPoints + totalBonusPoints
      };
    });
    
    // Seřadíme podle celkových bodů
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
    
    return NextResponse.json({
      success: true,
      data: {
        leaderboard,
        rounds: rounds.map(round => ({
          roundNumber: round.roundNumber,
          hasResults: round.results && round.results.length > 0 && 
            round.results.every((result: any) => 
              result && result.home !== '' && result.home !== null && result.home !== undefined &&
              result.away !== '' && result.away !== null && result.away !== undefined
            )
        }))
      }
    });
  } catch (error) {
    console.error('Chyba při získávání bodování:', error);
    return NextResponse.json(
      { success: false, error: 'Chyba při získávání bodování' },
      { status: 500 }
    );
  }
} 