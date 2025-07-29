'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const USERS = [
  { nickname: 'Rybča', password: 'rybca123' },
  { nickname: 'Kořda', password: 'korda123' },
  { nickname: 'Jozeve', password: 'jozeve123' },
  { nickname: 'Špinavovlas', password: 'spinavovlas123' },
  { nickname: 'Netáhlo', password: 'netahlo123' },
  { nickname: 'admin', password: 'admin123' }, // nový admin účet
]

export default function Home() {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const user = USERS.find(
      u => u.nickname.toLowerCase() === nickname.toLowerCase() && u.password === password
    )

    if (user) {
      // Pro jednoduchost použijeme localStorage, později přidáme Firebase Auth
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/dashboard')
    } else {
      setError('Nesprávná přezdívka nebo heslo!')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-auto flex flex-col justify-center items-center border-4 border-white">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">FGM</h1>
          <p className="text-xl text-gray-600 mb-4">Football Gembl Mastership</p>
          <p className="text-lg text-gray-500">Tipování české ligy pro partu</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 w-full flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            <label htmlFor="nickname" className="block text-lg font-bold text-gray-700 mb-2 text-center">
              Přezdívka
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-center placeholder:text-gray-400"
              placeholder="Zadej přezdívku"
              required
            />
          </div>

          <div className="w-full flex flex-col items-center">
            <label htmlFor="password" className="block text-lg font-bold text-gray-700 mb-2 text-center">
              Heslo
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-center placeholder:text-gray-400"
              placeholder="Zadej heslo"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-lg font-bold"
          >
            Přihlásit se
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Dostupné účty: Rybča, Kořda, Jozeve, Špinavovlas, Netáhlo
          </p>
        </div>
      </div>
    </div>
  )
} 