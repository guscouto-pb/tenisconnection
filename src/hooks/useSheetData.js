import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import { SHEET_URLS, USE_DEMO_DATA } from '../config'
import { DEMO_TORNEIOS, DEMO_QUADRAS } from '../demoData'

function parseDate(val) {
  if (!val || val === 'X' || val === 'x') return null
  if (typeof val === 'string' && val.includes('dias após')) return val
  const d = new Date(val)
  return isNaN(d) ? val : d.toISOString().split('T')[0]
}

function parseTorneios(rows) {
  const headers = rows[0]
  return rows.slice(1).filter(r => r[2]).map(r => {
    const get = (col) => r[headers.indexOf(col)] ?? ''
    return {
      mes: get('Mês'),
      tipo: get('Tipo'),
      torneio: get('Torneio'),
      dataInicio: parseDate(get('Data Início')),
      dataFinal: parseDate(get('Data Final')),
      prazos: {
        R128: parseDate(get('Prazo R128')),
        R64: parseDate(get('Prazo R64')),
        R32: parseDate(get('Prazo R32')),
        R16: parseDate(get('Prazo R16')),
        Quartas: parseDate(get('Prazo Quartas')),
        Semi: parseDate(get('Prazo Semi')),
        Final: parseDate(get('Prazo Final')),
        Consolação: parseDate(get('Prazo Consolação')),
      },
    }
  })
}

function parseQuadras(rows) {
  const headers = rows[0]
  return rows.slice(1).filter(r => r[0]).map(r => {
    const get = (col) => r[headers.indexOf(col)] ?? ''
    const tel = get('Telefone').replace(/\D/g, '')
    return {
      quadra: get('Quadra'),
      endereco: get('Endereço'),
      bairro: get('Bairro'),
      telefone: tel,
      valorDiurno: get('Valor Diurno'),
      valorNoturno: get('Valor Noturno'),
      rapidaAberta: parseInt(get('Rápida Aberta').replace(/\D/g, '')) || 0,
      rapidaCoberta: parseInt(get('Rápida Coberta').replace(/\D/g, '')) || 0,
      saibrotAberta: parseInt(get('Saibro Aberto').replace(/\D/g, '')) || 0,
      saibroCoberta: parseInt(get('Saibro Coberto').replace(/\D/g, '')) || 0,
      observacoes: get('Observações'),
      parceira: get('Parceira')?.toString().toLowerCase() === 'sim' || get('Parceira')?.toString().toLowerCase() === 'true',
    }
  })
}

async function fetchCSV(url) {
  const res = await fetch(url)
  const text = await res.text()
  const result = Papa.parse(text, { header: false, skipEmptyLines: true })
  return result.data
}

export function useSheetData() {
  const [torneios, setTorneios] = useState([])
  const [quadras, setQuadras] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDemo, setIsDemo] = useState(false)

  useEffect(() => {
    if (USE_DEMO_DATA) {
      setTorneios(DEMO_TORNEIOS)
      setQuadras(DEMO_QUADRAS)
      setIsDemo(true)
      setLoading(false)
      return
    }

    Promise.all([fetchCSV(SHEET_URLS.torneios), fetchCSV(SHEET_URLS.quadras)])
      .then(([tRows, qRows]) => {
        setTorneios(parseTorneios(tRows))
        setQuadras(parseQuadras(qRows))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setTorneios(DEMO_TORNEIOS)
        setQuadras(DEMO_QUADRAS)
        setIsDemo(true)
        setLoading(false)
      })
  }, [])

  return { torneios, quadras, loading, error, isDemo }
}
