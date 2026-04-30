import { useState } from 'react'
import { deadlineStatus, formatDate, typeBadgeStyle } from '../utils'

const PHASE_ORDER = ['R128', 'R64', 'R32', 'R16', 'Quartas', 'Semi', 'Final']

function PhaseBracket({ prazos }) {
  const active = PHASE_ORDER.filter(p => prazos[p] != null)
  if (active.length === 0) {
    return <p className="text-xs text-gray-400 italic py-1">Prazos a definir</p>
  }
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-0.5">
        <div className="w-4 flex-shrink-0" />
        <div className="flex-1 flex justify-between px-0.5">
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Rodada</span>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Jogar até</span>
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col">
        {active.map((fase, idx) => {
          const val = prazos[fase]
          const st = deadlineStatus(val)
          const isPast = st === 'past'
          const isLast = idx === active.length - 1
          const isFinal = fase === 'Final'

          return (
            <div key={fase} className="flex items-stretch gap-2">
              {/* Connector line + dot */}
              <div className="flex flex-col items-center w-4 flex-shrink-0">
                <div className={`w-px flex-1 ${idx === 0 ? 'bg-transparent' : 'bg-gray-200'}`} />
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isPast ? 'bg-gray-300' : 'bg-tc-orange'}`} />
                <div className={`w-px flex-1 ${isLast ? 'bg-transparent' : 'bg-gray-200'}`} />
              </div>

              {/* Content */}
              <div className={`flex items-center justify-between flex-1 py-1.5 ${!isLast ? 'border-b border-gray-50' : ''}`}>
                <span className={`text-xs ${isFinal ? 'font-bold' : 'font-medium'} ${isPast ? 'text-gray-400' : 'text-gray-800'}`}>
                  {fase}
                </span>
                <span className={`text-[11px] tabular-nums ${isPast ? 'text-gray-400' : 'text-gray-800 font-medium'}`}>
                  {formatDate(val)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function TournamentCard({ torneio, status, isFavorite, onToggleFavorite }) {
  const [activeTab, setActiveTab] = useState('principal')
  const badge = typeBadgeStyle(torneio.tipo)

  const hasConsol = torneio.prazosConsol && Object.values(torneio.prazosConsol).some(v => v != null)

  const startDate = new Date(torneio.dataInicio + 'T12:00:00')
  const endDate = torneio.dataFinal && !torneio.dataFinal.includes('ser')
    ? new Date(torneio.dataFinal + 'T12:00:00')
    : null

  const fmtMonth = (date) => {
    const s = date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }).replace('.', '')
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  const formattedPeriod = endDate
    ? `${fmtMonth(startDate)} — ${fmtMonth(endDate)}`
    : `A partir de ${startDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`

  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col ${status === 'encerrado' ? 'opacity-60' : ''}`}>
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-base leading-tight">{torneio.torneio}</h3>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${badge.bg} ${badge.text}`}>
            {torneio.tipo}
          </span>
        </div>
        <p className="text-xs text-gray-400">{formattedPeriod}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 mx-4">
        <button
          onClick={() => setActiveTab('principal')}
          className={`flex-1 py-2 text-sm font-semibold transition-colors rounded-t-md
            ${activeTab === 'principal'
              ? 'text-tc-orange border-b-2 border-tc-orange'
              : 'text-gray-400 hover:text-gray-600'}`}
        >
          Principal
        </button>
        <button
          onClick={() => setActiveTab('consolacao')}
          className={`flex-1 py-2 text-sm font-semibold transition-colors rounded-t-md
            ${activeTab === 'consolacao'
              ? 'text-tc-orange border-b-2 border-tc-orange'
              : 'text-gray-400 hover:text-gray-600'}`}
        >
          Consolação
        </button>
      </div>

      {/* Bracket content */}
      <div className="px-4 py-3 flex-1">
        {activeTab === 'principal' && (
          <PhaseBracket prazos={torneio.prazos} />
        )}
        {activeTab === 'consolacao' && (
          hasConsol
            ? <PhaseBracket prazos={torneio.prazosConsol} />
            : <p className="text-xs text-gray-400 italic py-1">Sem chave de consolação</p>
        )}
      </div>

      {/* Favorite button */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-50">
        <button
          onClick={() => onToggleFavorite(torneio.torneio)}
          className={`w-full py-2 text-xs font-semibold rounded-xl border transition-all ${
            isFavorite
              ? 'bg-tc-orange/10 text-tc-orange border-tc-orange/40'
              : 'bg-white text-gray-400 border-gray-200 hover:border-tc-orange hover:text-tc-orange'
          }`}
        >
          {isFavorite ? '✓ Estou jogando esse torneio' : '+ Estou jogando esse torneio'}
        </button>
      </div>
    </div>
  )
}
