import { useState, useCallback } from 'react'
import type { ExperimentResult } from '../App'

interface Props {
  onResult: (result: Omit<ExperimentResult, 'id' | 'timestamp'>) => void
}

export default function Experiment({ onResult }: Props) {
  const [arraySize, setArraySize] = useState(1000000)
  const [iterations, setIterations] = useState(5)
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentResult, setCurrentResult] = useState<{
    sequential: number
    random: number
    ratio: number
  } | null>(null)
  const [log, setLog] = useState<string[]>([])

  const addLog = useCallback((message: string) => {
    setLog(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`])
  }, [])

  const runExperiment = useCallback(async () => {
    setIsRunning(true)
    setProgress(0)
    setCurrentResult(null)
    setLog([])

    addLog(`Создание массива размером ${arraySize.toLocaleString()} элементов...`)
    
    // Создаём массив
    const arr = new Float64Array(arraySize)
    for (let i = 0; i < arraySize; i++) {
      arr[i] = Math.random()
    }

    // Создаём массив случайных индексов
    const randomIndices = new Uint32Array(arraySize)
    for (let i = 0; i < arraySize; i++) {
      randomIndices[i] = Math.floor(Math.random() * arraySize)
    }

    addLog('Массив создан. Начинаем измерения...')
    
    await new Promise(r => setTimeout(r, 100))

    let sequentialTotal = 0
    let randomTotal = 0

    for (let iter = 0; iter < iterations; iter++) {
      setProgress(((iter + 1) / iterations) * 100)
      addLog(`Итерация ${iter + 1}/${iterations}...`)

      // Последовательный доступ
      const seqStart = performance.now()
      let seqSum = 0
      for (let i = 0; i < arraySize; i++) {
        seqSum += arr[i]
      }
      const seqTime = performance.now() - seqStart
      sequentialTotal += seqTime

      // Небольшая пауза между тестами
      await new Promise(r => setTimeout(r, 50))

      // Случайный доступ
      const randStart = performance.now()
      let randSum = 0
      for (let i = 0; i < arraySize; i++) {
        randSum += arr[randomIndices[i]]
      }
      const randTime = performance.now() - randStart
      randomTotal += randTime

      addLog(`  Последовательный: ${seqTime.toFixed(2)} мс, Случайный: ${randTime.toFixed(2)} мс`)

      // Используем суммы чтобы избежать оптимизации
      if (seqSum === randSum && seqSum === 0) console.log('Unlikely')

      await new Promise(r => setTimeout(r, 50))
    }

    const avgSequential = sequentialTotal / iterations
    const avgRandom = randomTotal / iterations
    const ratio = avgRandom / avgSequential

    const result = {
      sequential: avgSequential,
      random: avgRandom,
      ratio: ratio
    }

    setCurrentResult(result)
    addLog(`\n=== РЕЗУЛЬТАТЫ ===`)
    addLog(`Среднее время (последовательный): ${avgSequential.toFixed(2)} мс`)
    addLog(`Среднее время (случайный): ${avgRandom.toFixed(2)} мс`)
    addLog(`Соотношение: случайный в ${ratio.toFixed(2)}x медленнее`)

    onResult({
      arraySize,
      sequentialTime: avgSequential,
      randomTime: avgRandom,
      ratio: ratio
    })

    setIsRunning(false)
  }, [arraySize, iterations, onResult, addLog])

  const arraySizeOptions = [
    { value: 100000, label: '100 тыс.' },
    { value: 500000, label: '500 тыс.' },
    { value: 1000000, label: '1 млн' },
    { value: 5000000, label: '5 млн' },
    { value: 10000000, label: '10 млн' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Настройки */}
      <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="text-3xl">⚙️</span>
          Настройки эксперимента
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/70 mb-2">Размер массива</label>
            <div className="flex flex-wrap gap-2">
              {arraySizeOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setArraySize(opt.value)}
                  disabled={isRunning}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    arraySize === opt.value
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  } disabled:opacity-50`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white/70 mb-2">Количество итераций</label>
            <div className="flex gap-2">
              {[3, 5, 10].map(n => (
                <button
                  key={n}
                  onClick={() => setIterations(n)}
                  disabled={isRunning}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    iterations === n
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  } disabled:opacity-50`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={runExperiment}
          disabled={isRunning}
          className="mt-6 w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg
                     hover:from-purple-500 hover:to-pink-500 transition-all disabled:opacity-50 
                     disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {isRunning ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Выполняется...
            </>
          ) : (
            <>
              <span>🚀</span>
              Запустить эксперимент
            </>
          )}
        </button>

        {isRunning && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-white/70 mb-1">
              <span>Прогресс</span>
              <span>{progress.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </section>

      {/* Результаты текущего эксперимента */}
      {currentResult && (
        <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            Результаты эксперимента
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 text-center">
              <div className="text-green-400 text-sm mb-1">Последовательный</div>
              <div className="text-3xl font-bold text-green-400">
                {currentResult.sequential.toFixed(2)}
              </div>
              <div className="text-white/50 text-sm">мс</div>
            </div>

            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-center">
              <div className="text-red-400 text-sm mb-1">Случайный</div>
              <div className="text-3xl font-bold text-red-400">
                {currentResult.random.toFixed(2)}
              </div>
              <div className="text-white/50 text-sm">мс</div>
            </div>

            <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
              <div className="text-purple-400 text-sm mb-1">Соотношение</div>
              <div className="text-3xl font-bold text-purple-400">
                {currentResult.ratio.toFixed(2)}x
              </div>
              <div className="text-white/50 text-sm">медленнее</div>
            </div>
          </div>

          {/* Визуализация */}
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-green-400">Последовательный доступ</span>
                <span className="text-white/50">{currentResult.sequential.toFixed(2)} мс</span>
              </div>
              <div className="h-8 bg-white/10 rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-lg transition-all"
                  style={{ width: `${Math.min(100, (currentResult.sequential / currentResult.random) * 100)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-red-400">Случайный доступ</span>
                <span className="text-white/50">{currentResult.random.toFixed(2)} мс</span>
              </div>
              <div className="h-8 bg-white/10 rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-lg"
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Лог */}
      {log.length > 0 && (
        <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
            <span className="text-2xl">📋</span>
            Журнал выполнения
          </h2>
          <div className="bg-slate-900 rounded-xl p-4 max-h-64 overflow-y-auto font-mono text-sm">
            {log.map((line, i) => (
              <div key={i} className="text-green-400/80">{line}</div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
