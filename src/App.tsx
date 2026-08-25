import { useState } from 'react'

export default function App() {
  const [city, setCity] = useState('')

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-400">
          ⛅ Weather Web App
        </h1>
        <p className="text-slate-400 text-sm text-center mb-6">
          React + Vite + Tailwind CSS (Minimal Template)
        </p>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
          />
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg font-medium transition">
            Search
          </button>
        </div>
      </div>
    </div>
  )
}
