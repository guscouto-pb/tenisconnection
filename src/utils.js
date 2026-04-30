export function classifyTournament(torneio) {
  if (!torneio.dataInicio || !torneio.dataFinal) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(torneio.dataInicio)
  const end = new Date(torneio.dataFinal)
  if (isNaN(start) || isNaN(end)) return null
  if (today > end) return 'encerrado'
  if (today < start) return 'futuro'
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

export function buildMapsUrl(nome, endereco, bairro) {
  const query = encodeURIComponent(`${nome}, ${endereco}, ${bairro}, São Paulo, SP`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

export function courtTypeLabel(rapidaAberta, rapidaCoberta, saibrotAberta, saibroCoberta) {
  const parts = []
  if (rapidaAberta > 0)  parts.push({ count: rapidaAberta,  surface: 'rápida', covered: false })
  if (rapidaCoberta > 0) parts.push({ count: rapidaCoberta, surface: 'rápida', covered: true  })
  if (saibrotAberta > 0) parts.push({ count: saibrotAberta, surface: 'saibro', covered: false })
  if (saibroCoberta > 0) parts.push({ count: saibroCoberta, surface: 'saibro', covered: true  })
  return parts
}

export function hasCoveredCourt(quadra) {
  return (quadra.rapidaCoberta > 0) || (quadra.saibroCoberta > 0)
}

export function hasRapida(quadra) {
  return (quadra.rapidaAberta > 0) || (quadra.rapidaCoberta > 0)
}

export function hasSaibro(quadra) {
  return (quadra.saibrotAberta > 0) || (quadra.saibroCoberta > 0)
}
