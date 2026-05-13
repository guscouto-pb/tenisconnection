import { useState } from 'react'
import Header from './components/Header'
import TournamentsSection from './components/TournamentsSection'
import CourtsSection from './components/CourtsSection'
import { useSheetData } from './hooks/useSheetData'

function App() {
  const [activeTab, setActiveTab] = useState('torneios')
  const { torneios, quadras, loading, isDemo } = useSheetData()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      {isDemo && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-700 text-center text-xs py-2 px-4">
          ⚠️ Exibindo dados de demonstração — conecte a planilha Google Sheets para dados reais
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3 text-tc-orange">
            <svg className="animate-spin w-8 h-8" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <p className="text-sm font-medium">Carregando...</p>
          </div>
        </div>
      ) : (
        <>
          {activeTab === 'torneios' && <TournamentsSection torneios={torneios} />}
          {activeTab === 'quadras' && <CourtsSection quadras={quadras} />}
        </>
      )}

      <footer className="text-center py-6 text-xs text-gray-400">
        © {new Date().getFullYear()} Tênis Connection
      </footer>
    </div>
  )
}

export default App
