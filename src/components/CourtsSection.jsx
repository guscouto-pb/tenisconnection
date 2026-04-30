import { useState } from 'react'
import CourtCard from './CourtCard'
import { useFavorites } from '../hooks/useFavorites'
import { hasCoveredCourt, hasRapida, hasSaibro } from '../utils'

const FILTERS = [
  { key: 'todas', label: 'Todas' },
  { key: 'favoritas', label: 'Favoritas' },
  { key: 'rapida', label: 'Rápida' },
  { key: 'saibro', label: 'Saibro' },
  { key: 'cobertas', label: 'Cobertas' },
  { key: 'parceiras', label: 'Parceiras TC' },
  { key: 'outras', label: 'Outras opções' },
]

export default function CourtsSection({ quadras }) {
  const [filter, setFilter] = useState('todas')
  const [search, setSearch] = useState('')
  const [favorites, toggleFavorite, isFavorite] = useFavorites('tc_quadras')

  const filtered = quadras.filter(q => {
    if (filter === 'favoritas' && !isFavorite(q.quadra)) return false
    if (filter === 'rapida' && !hasRapida(q)) return false
    if (filter === 'saibro' && !hasSaibro(q)) return false
    if (filter === 'cobertas' && !hasCoveredCourt(q)) return false
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
      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nome ou bairro..."
          className="w-full px-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-tc-orange bg-white"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-1.5 flex-wrap mb-6">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              filter === f.key
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🏟️</div>
          <p className="font-medium">
            {filter === 'favoritas' ? 'Nenhuma quadra favorita ainda' : 'Nenhuma quadra encontrada'}
          </p>
          {filter === 'favoritas' && (
            <p className="text-sm mt-1">Marque suas quadras preferidas nos cards abaixo</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((q, i) => (
          <CourtCard
            key={i}
            quadra={q}
            isFavorite={isFavorite(q.quadra)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  )
}
