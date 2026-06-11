import type { ExperimentResult } from '../App'

interface Props {
  results: ExperimentResult[]
  onClear: () => void
}

export default function Results({ results, onClear }: Props) {
  if (results.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center text-white">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold mb-2">Нет результатов</h2>
          <p className="text-white/60">
            Перейдите на вкладку "Эксперимент" и запустите измерения
          </p>
        </div>
      </div>
    )
  }

  const avgSequential = results.reduce((sum, r) => sum + r.sequentialTime, 0) / results.length
  const avgRandom = results.reduce((sum, r) => sum + r.randomTime, 0) / results.length
  const avgRatio = results.reduce((sum, r) => sum + r.ratio, 0) / results.length

  const maxRandom = Math.max(...results.map(r => r.randomTime))

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Сводка */}
      <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">📈</span>
            Сводная статистика
          </h2>
          <button
            onClick={onClear}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
          >
            🗑️ Очистить
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-xl p-4 text-center">
            <div className="text-white/60 text-sm mb-1">Всего экспериментов</div>
            <div className="text-3xl font-bold text-white">{results.length}</div>
          </div>
          <div className="bg-green-500/20 rounded-xl p-4 text-center">
            <div className="text-green-400 text-sm mb-1">Ср. последовательный</div>
            <div className="text-3xl font-bold text-green-400">{avgSequential.toFixed(2)}</div>
            <div className="text-white/50 text-sm">мс</div>
          </div>
          <div className="bg-red-500/20 rounded-xl p-4 text-center">
            <div className="text-red-400 text-sm mb-1">Ср. случайный</div>
            <div className="text-3xl font-bold text-red-400">{avgRandom.toFixed(2)}</div>
            <div className="text-white/50 text-sm">мс</div>
          </div>
          <div className="bg-purple-500/20 rounded-xl p-4 text-center">
            <div className="text-purple-400 text-sm mb-1">Ср. соотношение</div>
            <div className="text-3xl font-bold text-purple-400">{avgRatio.toFixed(2)}x</div>
          </div>
        </div>
      </section>

      {/* График */}
      <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="text-3xl">📊</span>
          График результатов
        </h2>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={result.id} className="bg-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-white/70">
                  #{index + 1} • Массив: {result.arraySize.toLocaleString()} элементов
                </span>
                <span className="text-purple-400 font-bold">
                  {result.ratio.toFixed(2)}x
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="w-32 text-sm text-green-400">Послед.</span>
                  <div className="flex-1 h-6 bg-white/10 rounded overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded transition-all"
                      style={{ width: `${(result.sequentialTime / maxRandom) * 100}%` }}
                    ></div>
                  </div>
                  <span className="w-20 text-right text-sm text-white/60">
                    {result.sequentialTime.toFixed(1)} мс
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-32 text-sm text-red-400">Случайн.</span>
                  <div className="flex-1 h-6 bg-white/10 rounded overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded transition-all"
                      style={{ width: `${(result.randomTime / maxRandom) * 100}%` }}
                    ></div>
                  </div>
                  <span className="w-20 text-right text-sm text-white/60">
                    {result.randomTime.toFixed(1)} мс
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Таблица */}
      <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="text-3xl">📋</span>
          Таблица результатов
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-3 px-4 text-white/60">#</th>
              <th className="py-3 px-4 text-white/60">Размер массива</th>
              <th className="py-3 px-4 text-white/60">Последов. (мс)</th>
              <th className="py-3 px-4 text-white/60">Случайн. (мс)</th>
              <th className="py-3 px-4 text-white/60">Соотношение</th>
              <th className="py-3 px-4 text-white/60">Время</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={result.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{result.arraySize.toLocaleString()}</td>
                <td className="py-3 px-4 text-green-400">{result.sequentialTime.toFixed(2)}</td>
                <td className="py-3 px-4 text-red-400">{result.randomTime.toFixed(2)}</td>
                <td className="py-3 px-4 text-purple-400 font-bold">{result.ratio.toFixed(2)}x</td>
                <td className="py-3 px-4 text-white/50 text-sm">
                  {result.timestamp.toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
