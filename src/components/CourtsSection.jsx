import { useState } from 'react'
import CourtCard from './CourtCard'

const FILTERS = [
  { key: 'todas', label: 'Todas' },
  { key: 'parceiras', label: 'Parceiras TC' },
  { key: 'outras', label: 'Outras opções' },
]

export default function CourtsSection({ quadras }) {
  const [filter, setFilter] = useState('todas')
  const [search, setSearch] = useState('')

  const filtered = quadras.filter(q => {
    if (filter === 'parceiras' && !q.parceira) return false
    if (filter === 'outras' && q.parceira) return false
    if (search) {
      const s = search.toLowerCase()
      return q.quadra.toLowerCase().includes(s) || q.bairro.toLowerCase().includes(s)
    }
    return true
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 w-full">
      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nome ou bairro..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-tc-orange bg-white"
        />
        <div className="flex gap-2">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border flex-1 sm:flex-none ${
                filter === f.key
                  ? 'bg-tc-orange text-white border-tc-orange shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-tc-orange hover:text-tc-orange'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🏟️</div>
          <p className="font-medium">Nenhuma quadra encontrada</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((q, i) => (
          <CourtCard key={i} quadra={q} />
        ))}
      </div>
    </div>
  )
}
