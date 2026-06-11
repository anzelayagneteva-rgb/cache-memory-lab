import { useState, useCallback } from 'react'
import Header from './components/Header'
import Theory from './components/Theory'
import Experiment from './components/Experiment'
import Results from './components/Results'
import Report from './components/Report'

export interface ExperimentResult {
  id: number
  arraySize: number
  sequentialTime: number
  randomTime: number
  ratio: number
  timestamp: Date
}

function App() {
  const [results, setResults] = useState<ExperimentResult[]>([])
  const [activeTab, setActiveTab] = useState<'theory' | 'experiment' | 'results' | 'report'>('theory')

  const addResult = useCallback((result: Omit<ExperimentResult, 'id' | 'timestamp'>) => {
    setResults(prev => [...prev, {
      ...result,
      id: Date.now(),
      timestamp: new Date()
    }])
  }, [])

  const clearResults = useCallback(() => {
    setResults([])
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'theory', label: '📚 Теория', icon: '📚' },
            { id: 'experiment', label: '🧪 Эксперимент', icon: '🧪' },
            { id: 'results', label: '📊 Результаты', icon: '📊' },
            { id: 'report', label: '📝 Отчёт', icon: '📝' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn">
          {activeTab === 'theory' && <Theory />}
          {activeTab === 'experiment' && <Experiment onResult={addResult} />}
          {activeTab === 'results' && <Results results={results} onClear={clearResults} />}
          {activeTab === 'report' && <Report results={results} />}
        </div>
      </main>

      <footer className="text-center py-6 text-white/50 text-sm">
        Лабораторная работа №3 | Исследование работы кэш-памяти
      </footer>
    </div>
  )
}

export default App
