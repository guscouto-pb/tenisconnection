// Substitua estas URLs pelas URLs da sua planilha Google Sheets publicada
// Instruções: veja o README.md para como publicar a planilha

export const SHEET_URLS = {
  // File > Share > Publish to web > select "TORNEIOS" tab > CSV format
  torneios: import.meta.env.VITE_SHEET_TORNEIOS || '',
  // File > Share > Publish to web > select "QUADRAS" tab > CSV format
  quadras: import.meta.env.VITE_SHEET_QUADRAS || '',
}

// Se as URLs não estiverem configuradas, usa dados de demonstração
export const USE_DEMO_DATA = !SHEET_URLS.torneios || !SHEET_URLS.quadras
