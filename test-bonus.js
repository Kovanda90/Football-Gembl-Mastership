// Test skript pro ověření bonusových bodů
const { calculatePoints } = require('./src/lib/points.ts');

// Data pro první kolo
const results1 = [
  { home: "1", away: "5", scorers: "Vydra, Vydra, Šulc" },
  { home: "1", away: "0", scorers: "Yusuf" },
  { home: "1", away: "3", scorers: "Pulkrab, Kanu, Nombil" },
  { home: "2", away: "0", scorers: "Sinhateh" },
  { home: "1", away: "1", scorers: "Kuchta" },
  { home: "0", away: "1", scorers: "Vašulín" },
  { home: "3", away: "3", scorers: "Pech, Macek, Krollis, Hlavatý, Mašel" },
  { home: "2", away: "2", scorers: "Sojka, Chorý, Zafeiris, Hodek" }
];

const allTips1 = {
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
};

function calculateRoundPoints(allTips, results, userNickname) {
  let roundResultPoints = 0;
  let roundScorerPoints = 0;
  
  allTips[userNickname]?.forEach((tip, idx) => {
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
    roundResultPoints += points.exactResult + points.correctWinnerAndDifference + points.correctWinner + points.correctDraw;
    roundScorerPoints += points.correctScorer + points.noScorer + points.bonusPoints;
  });
  
  return { roundResultPoints, roundScorerPoints };
}

function calculateScorerBonus(allTips, results, userNickname) {
  const scorerPointsByUser = {};
  
  const users = ["Rybča", "Kořda", "Jozeve", "Špinavovlas", "Netáhlo"];
  
  users.forEach(user => {
    let roundScorerPoints = 0;
    allTips[user]?.forEach((tip, idx) => {
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
    
    scorerPointsByUser[user] = roundScorerPoints;
  });
  
  const scorerPointsArray = Object.entries(scorerPointsByUser).map(([nickname, points]) => ({ nickname, points }));
  const maxScorerPoints = Math.max(...scorerPointsArray.map(p => p.points));
  const scorerWinners = scorerPointsArray.filter(p => p.points === maxScorerPoints && p.points > 0);
  
  if (scorerWinners.some(w => w.nickname === userNickname)) {
    return 1;
  }
  
  return 0;
}

// Test
console.log('=== TEST BONUSOVÝCH BODŮ ===');

const users = ["Rybča", "Kořda", "Jozeve", "Špinavovlas", "Netáhlo"];

users.forEach(user => {
  const { roundResultPoints, roundScorerPoints } = calculateRoundPoints(allTips1, results1, user);
  const bonusPoints = calculateScorerBonus(allTips1, results1, user);
  
  console.log(`${user}:`);
  console.log(`  Body za výsledek: ${roundResultPoints}`);
  console.log(`  Body za střelce: ${roundScorerPoints}`);
  console.log(`  Bonusové body: ${bonusPoints}`);
  console.log(`  Celkem: ${roundResultPoints + roundScorerPoints + bonusPoints}`);
  console.log('');
});

console.log('=== KONEC TESTU ==='); 