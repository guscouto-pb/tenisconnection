export function classifyTournament(torneio) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(torneio.dataInicio)
  const end = new Date(torneio.dataFinal)
  if (end < today) return 'encerrado'
  if (start > today) return 'futuro'
  return 'andamento'
}

export function deadlineStatus(dateStr) {
  if (!dateStr || typeof dateStr === 'string' && dateStr.includes('dias')) return 'info'
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(dateStr)
  if (isNaN(d)) return 'info'
  const diff = Math.ceil((d - today) / (1000 * 60 * 60 * 24))
  if (diff < 0) return 'past'
  if (diff <= 7) return 'urgent'
  if (diff <= 14) return 'soon'
  return 'ok'
}

export function formatDate(dateStr) {
  if (!dateStr) return ''
  if (typeof dateStr === 'string' && dateStr.includes('dias')) return dateStr
  const d = new Date(dateStr + 'T12:00:00')
  if (isNaN(d)) return dateStr
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
}

export function typeBadgeStyle(tipo) {
  const map = {
    'Grand Slam': { bg: 'bg-purple-600', text: 'text-white' },
    'TC 1000': { bg: 'bg-tc-orange', text: 'text-white' },
    'TC 500': { bg: 'bg-amber-500', text: 'text-white' },
    'TC 250': { bg: 'bg-yellow-400', text: 'text-gray-900' },
    'Finals': { bg: 'bg-slate-700', text: 'text-white' },
  }
  return map[tipo] || { bg: 'bg-gray-400', text: 'text-white' }
}

export function buildWhatsAppUrl(telefone) {
  const digits = telefone.replace(/\D/g, '')
  const num = digits.startsWith('55') ? digits : `55${digits}`
  return `https://wa.me/${num}`
}

export function courtTypeLabel(rapidaAberta, rapidaCoberta, saibrotAberta, saibroCoberta) {
  const parts = []
  if (rapidaAberta > 0) parts.push(`${rapidaAberta} rápida aberta`)
  if (rapidaCoberta > 0) parts.push(`${rapidaCoberta} rápida coberta`)
  if (saibrotAberta > 0) parts.push(`${saibrotAberta} saibro aberta`)
  if (saibroCoberta > 0) parts.push(`${saibroCoberta} saibro coberta`)
  return parts
}
