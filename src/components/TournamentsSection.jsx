import { useState } from 'react'
import TournamentCard from './TournamentCard'
import { classifyTournament } from '../utils'

const FILTERS = [
  { key: 'andamento', label: 'Em andamento' },
  { key: 'futuro', label: 'Futuros' },
  { key: 'encerrado', label: 'Encerrados' },
]

export default function TournamentsSection({ torneios }) {
  const [filter, setFilter] = useState('andamento')

  const filtered = torneios.filter(t => classifyTournament(t) === filter)

  const grouped = filtered.reduce((acc, t) => {
    const key = t.mes
    if (!acc[key]) acc[key] = []
    acc[key].push(t)
    return acc
  }, {})

  const months = Object.keys(grouped)

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 w-full">
      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
              filter === f.key
                ? 'bg-tc-orange text-white border-tc-orange shadow-sm'
                : 'bg-white text-gray-600 border-gray-200 hover:border-tc-orange hover:text-tc-orange'
            }`}
          >
            {f.label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              filter === f.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {torneios.filter(t => classifyTournament(t) === f.key).length}
            </span>
          </button>
        ))}
      </div>

      {months.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🎾</div>
          <p className="font-medium">Nenhum torneio encontrado</p>
          <p className="text-sm mt-1">Tente outro filtro</p>
        </div>
      )}

      {months.map(mes => (
        <div key={mes} className="mb-8">
          <h2 className="text-sm font-bold text-tc-orange uppercase tracking-widest mb-3">{mes}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {grouped[mes].map((t, i) => (
              <TournamentCard key={i} torneio={t} status={classifyTournament(t)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
