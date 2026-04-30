import { useState } from 'react'
import TournamentCard from './TournamentCard'
import { classifyTournament } from '../utils'
import { useFavorites } from '../hooks/useFavorites'

const TYPE_ORDER = ['TC 250', 'TC 500', 'TC 1000', 'Grand Slam', 'Finals']

const STATUS_LABELS = {
  futuro: 'Futuros',
  encerrado: 'Encerrados',
}

export default function TournamentsSection({ torneios }) {
  const [statusFilter, setStatusFilter] = useState('andamento')
  const [tipoFilter, setTipoFilter] = useState('todos')
  const [favorites, toggleFavorite, isFavorite] = useFavorites('tc_torneios')

  const validTorneios = torneios.filter(t => classifyTournament(t) !== null)

  // When "meus" is active, show all favorited tournaments across all statuses
  const isMeusActive = tipoFilter === 'meus'

  const byStatus = validTorneios.filter(t => classifyTournament(t) === statusFilter)

  const availableTypes = TYPE_ORDER.filter(tipo =>
    byStatus.some(t => t.tipo === tipo)
  )

  const baseList = isMeusActive
    ? validTorneios.filter(t => isFavorite(t.torneio))
    : tipoFilter === 'todos'
      ? byStatus
      : byStatus.filter(t => t.tipo === tipoFilter)

  const grouped = baseList.reduce((acc, t) => {
    if (!acc[t.mes]) acc[t.mes] = []
    acc[t.mes].push(t)
    return acc
  }, {})

  const months = Object.keys(grouped)

  const handleStatusChange = (status) => {
    setStatusFilter(status)
    setTipoFilter('todos')
  }

  const handleTipoChange = (tipo) => {
    setTipoFilter(tipo)
  }

  const meusCount = validTorneios.filter(t => isFavorite(t.torneio)).length

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 w-full">

      {/* Back link when viewing non-default status */}
      {statusFilter !== 'andamento' && !isMeusActive && (
        <button
          onClick={() => handleStatusChange('andamento')}
          className="flex items-center gap-1.5 text-sm text-tc-orange font-medium mb-4 hover:opacity-75 transition-opacity"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Em andamento
        </button>
      )}

      {/* Filter chips */}
      <div className="flex gap-1.5 mb-6 flex-wrap">
        {/* Meus torneios chip — always visible */}
        <button
          onClick={() => handleTipoChange('meus')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border flex items-center gap-1.5 ${
            isMeusActive
              ? 'bg-tc-orange text-white border-tc-orange'
              : 'bg-white text-gray-500 border-gray-200 hover:border-tc-orange hover:text-tc-orange'
          }`}
        >
          Meus torneios
          {meusCount > 0 && (
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              isMeusActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {meusCount}
            </span>
          )}
        </button>

        {/* Todos — always visible so user can exit "Meus torneios" */}
        <button
          onClick={() => handleTipoChange('todos')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            !isMeusActive && tipoFilter === 'todos'
              ? 'bg-gray-800 text-white border-gray-800'
              : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
          }`}
        >
          Todos
        </button>

        {/* Type chips — always visible when multiple types exist */}
        {availableTypes.length > 1 && availableTypes.map(tipo => (
          <button
            key={tipo}
            onClick={() => handleTipoChange(tipo)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              !isMeusActive && tipoFilter === tipo
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
            }`}
          >
            {tipo}
          </button>
        ))}
      </div>

      {/* Tournament list */}
      {months.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🎾</div>
          <p className="font-medium">
            {isMeusActive ? 'Nenhum torneio marcado ainda' : 'Nenhum torneio encontrado'}
          </p>
          <p className="text-sm mt-1">
            {isMeusActive ? 'Clique em "Todos" e marque os torneios que está jogando' : 'Tente outro filtro'}
          </p>
        </div>
      )}

      {months.map(mes => (
        <div key={mes} className="mb-8">
          <h2 className="text-sm font-bold text-tc-orange uppercase tracking-widest mb-3">{mes}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {grouped[mes].map((t, i) => (
              <TournamentCard
                key={i}
                torneio={t}
                status={classifyTournament(t)}
                isFavorite={isFavorite(t.torneio)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Other tournaments footer — hidden when viewing "Meus torneios" */}
      {statusFilter === 'andamento' && !isMeusActive && (
        <div className="mt-2 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 mb-3">Acessar outros torneios</p>
          <div className="flex gap-2">
            {['futuro', 'encerrado'].map(status => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 bg-white text-gray-600 hover:border-tc-orange hover:text-tc-orange transition-all"
              >
                {STATUS_LABELS[status]}
                <span className="ml-1.5 text-xs bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">
                  {validTorneios.filter(t => classifyTournament(t) === status).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
