import { useState } from 'react'
import { deadlineStatus, formatDate, typeBadgeStyle } from '../utils'

const PHASE_ORDER = ['R128', 'R64', 'R32', 'R16', 'Quartas', 'Semi', 'Final']

const statusStyles = {
  urgent: 'bg-red-100 text-red-700 border-red-200 font-semibold',
  soon: 'bg-amber-50 text-amber-700 border-amber-200 font-medium',
  ok: 'bg-green-50 text-green-700 border-green-200',
  past: 'bg-gray-50 text-gray-400 border-gray-100',
  info: 'bg-blue-50 text-blue-600 border-blue-100',
}

const statusDot = {
  urgent: 'bg-red-500',
  soon: 'bg-amber-400',
  ok: 'bg-green-500',
  past: 'bg-gray-300',
  info: 'bg-blue-400',
}

function PhaseGrid({ prazos }) {
  const active = PHASE_ORDER.filter(p => prazos[p] != null)
  if (active.length === 0) {
    return <p className="text-xs text-gray-400 italic py-1">Prazos a definir</p>
  }
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {active.map(fase => {
        const val = prazos[fase]
        const st = deadlineStatus(val)
        return (
          <div
            key={fase}
            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs ${statusStyles[st]}`}
          >
            <span className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDot[st]}`} />
              {fase}
            </span>
            <span className="tabular-nums text-[11px]">{formatDate(val)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function TournamentCard({ torneio, status }) {
  const [activeTab, setActiveTab] = useState('principal')
  const badge = typeBadgeStyle(torneio.tipo)

  const hasConsol = torneio.prazosConsol && Object.values(torneio.prazosConsol).some(v => v != null)

  const startDate = new Date(torneio.dataInicio + 'T12:00:00')
  const endDate = torneio.dataFinal && !torneio.dataFinal.includes('ser')
    ? new Date(torneio.dataFinal + 'T12:00:00')
    : null

  const formattedPeriod = endDate
    ? `${startDate.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }).replace('.', '')} — ${endDate.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }).replace('.', '')}`
    : `A partir de ${startDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`

  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${status === 'encerrado' ? 'opacity-60' : ''}`}>
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-base leading-tight">{torneio.torneio}</h3>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${badge.bg} ${badge.text}`}>
            {torneio.tipo}
          </span>
        </div>
        <p className="text-xs text-gray-400 capitalize">{formattedPeriod}</p>
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

      {/* Content */}
      <div className="px-4 py-3">
        {activeTab === 'principal' && (
          <PhaseGrid prazos={torneio.prazos} />
        )}
        {activeTab === 'consolacao' && (
          hasConsol
            ? <PhaseGrid prazos={torneio.prazosConsol} />
            : <p className="text-xs text-gray-400 italic py-1">Sem chave de consolação</p>
        )}
      </div>
    </div>
  )
}
