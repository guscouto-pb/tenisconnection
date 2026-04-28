export default function Header({ activeTab, onTabChange }) {
  return (
    <header className="bg-tc-orange text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
        <img src="/logo.avif" alt="Tênis Connection" className="h-10 sm:h-12 flex-shrink-0" />

        <nav className="flex gap-1 ml-auto">
          <button
            onClick={() => onTabChange('torneios')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all ${
              activeTab === 'torneios'
                ? 'bg-white text-tc-orange shadow'
                : 'text-white/80 hover:text-white hover:bg-white/20'
            }`}
          >
            Torneios
          </button>
          <button
            onClick={() => onTabChange('quadras')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition-all ${
              activeTab === 'quadras'
                ? 'bg-white text-tc-orange shadow'
                : 'text-white/80 hover:text-white hover:bg-white/20'
            }`}
          >
            Quadras
          </button>
        </nav>
      </div>
    </header>
  )
}
