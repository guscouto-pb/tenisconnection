import { buildWhatsAppUrl, courtTypeLabel } from '../utils'

const surfaceIcons = {
  'rápida aberta': '☀️',
  'rápida coberta': '🏟️',
  'saibro aberta': '🌿',
  'saibro coberta': '🏠',
}

export default function CourtCard({ quadra }) {
  const types = courtTypeLabel(quadra.rapidaAberta, quadra.rapidaCoberta, quadra.saibrotAberta, quadra.saibroCoberta)
  const waUrl = buildWhatsAppUrl(quadra.telefone)
  const noturnoX = quadra.valorNoturno === 'X' || quadra.valorNoturno === 'x'

  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden flex flex-col">
      <div className="p-4 pb-3 flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-base leading-tight">{quadra.quadra}</h3>
          {quadra.parceira && (
            <span className="text-[10px] font-bold bg-tc-orange/10 text-tc-orange border border-tc-orange/20 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
              Parceira
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-3">
          {quadra.bairro} · {quadra.endereco}
        </p>

        {/* Prices */}
        <div className="flex gap-3 mb-3">
          <div className="flex-1 bg-amber-50 rounded-xl p-2 text-center">
            <p className="text-[10px] text-amber-600 font-medium uppercase tracking-wide mb-0.5">Diurno</p>
            <p className="text-sm font-bold text-amber-700">{quadra.valorDiurno || '—'}</p>
          </div>
          {!noturnoX && (
            <div className="flex-1 bg-indigo-50 rounded-xl p-2 text-center">
              <p className="text-[10px] text-indigo-600 font-medium uppercase tracking-wide mb-0.5">Noturno</p>
              <p className="text-sm font-bold text-indigo-700">{quadra.valorNoturno || '—'}</p>
            </div>
          )}
        </div>

        {/* Court types */}
        {types.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {types.map(t => (
              <span key={t} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>{surfaceIcons[t.replace(/^\d+ /, '')] || '🎾'}</span>
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Observations */}
        {quadra.observacoes && (
          <p className="text-[11px] text-gray-400 leading-relaxed italic">{quadra.observacoes}</p>
        )}
      </div>

      {/* WhatsApp button */}
      <div className="px-4 pb-4 pt-2">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-xl font-semibold text-sm transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Contato via WhatsApp
        </a>
      </div>
    </div>
  )
}
