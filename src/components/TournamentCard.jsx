import { deadlineStatus, formatDate, typeBadgeStyle } from '../utils'

const PHASE_ORDER = ['R128', 'R64', 'R32', 'R16', 'Quartas', 'Semi', 'Final', 'Consolação']

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

export default function TournamentCard({ torneio, status }) {
  const badge = typeBadgeStyle(torneio.tipo)
  const activePrazos = PHASE_ORDER.filter(p => torneio.prazos[p] !== undefined && torneio.prazos[p] !== null)

  const startDate = new Date(torneio.dataInicio + 'T12:00:00')
  const endDate = torneio.dataFinal && !torneio.dataFinal.includes('ser')
    ? new Date(torneio.dataFinal + 'T12:00:00')
    : null

  const formattedPeriod = endDate
    ? `${startDate.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }).replace('.', '')} — ${endDate.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }).replace('.', '')}`
    : `A partir de ${startDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`

  return (
    <div className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${status === 'encerrado' ? 'opacity-60' : ''}`}>
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-base leading-tight">{torneio.torneio}</h3>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${badge.bg} ${badge.text}`}>
            {torneio.tipo}
          </span>
        </div>
        <p className="text-xs text-gray-400 capitalize">{formattedPeriod}</p>
      </div>

      {activePrazos.length > 0 && (
        <div className="px-4 pb-4 flex flex-col gap-1.5">
          <div className="grid grid-cols-2 gap-1.5">
            {activePrazos.filter(p => p !== 'Consolação').map(fase => {
              const val = torneio.prazos[fase]
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
          {torneio.prazos['Consolação'] !== undefined && torneio.prazos['Consolação'] !== null && (
            (() => {
              const val = torneio.prazos['Consolação']
              const st = deadlineStatus(val)
              const isText = typeof val === 'string' && val.includes('dias')
              return (
                <div className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border text-xs ${statusStyles[st]}`}>
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDot[st]}`} />
                    Consolação
                  </span>
                  <span className={`text-[11px] ${isText ? 'italic' : 'tabular-nums'}`}>
                    {isText ? val : formatDate(val)}
                  </span>
                </div>
              )
            })()
          )}
        </div>
      )}

      {activePrazos.length === 0 && (
        <div className="px-4 pb-4">
          <p className="text-xs text-gray-400 italic">Prazos a definir</p>
        </div>
      )}
    </div>
  )
}
