'use client';

import { useState } from 'react';
import { Match } from '@/lib/api';

interface MatchEditorProps {
  round: number;
  matches: Match[];
  onSave: (matches: Match[]) => void;
}

export default function MatchEditor({ round, matches, onSave }: MatchEditorProps) {
  const [editedMatches, setEditedMatches] = useState<Match[]>(matches);

  const teams = [
    'FK Pardubice', 'FC Viktoria Plzeň', 'Bohemians Praha 1905', 'FC Baník Ostrava',
    'FK Teplice', 'FC Zlín', 'MFK Karviná', 'FK Dukla Praha', 'FK Jablonec',
    'AC Sparta Praha', '1.FC Slovácko', 'SK Sigma Olomouc', 'FK Mladá Boleslav',
    'FC Slovan Liberec', 'SK Slavia Praha', 'FC Hradec Králové'
  ];

  const updateMatch = (index: number, field: keyof Match, value: string | number) => {
    const updated = [...editedMatches];
    updated[index] = { ...updated[index], [field]: value };
    setEditedMatches(updated);
  };

  const handleSave = () => {
    onSave(editedMatches);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Editace {round}. kola</h3>
      
      <div className="space-y-4">
        {editedMatches.map((match, index) => (
          <div key={index} className="border p-4 rounded">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Domácí tým</label>
                <select
                  value={match.home}
                  onChange={(e) => updateMatch(index, 'home', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Hostující tým</label>
                <select
                  value={match.away}
                  onChange={(e) => updateMatch(index, 'away', e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Datum a čas</label>
                <input
                  type="datetime-local"
                  value={match.kickoff.slice(0, 16)}
                  onChange={(e) => updateMatch(index, 'kickoff', e.target.value + ':00')}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Uložit změny
        </button>
        <button
          onClick={() => setEditedMatches(matches)}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Zrušit změny
        </button>
      </div>
    </div>
  );
} 