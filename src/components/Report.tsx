import type { ExperimentResult } from '../App'

interface Props {
  results: ExperimentResult[]
}

export default function Report({ results }: Props) {
  const hasResults = results.length > 0
  
  const avgSequential = hasResults 
    ? results.reduce((sum, r) => sum + r.sequentialTime, 0) / results.length 
    : 0
  const avgRandom = hasResults 
    ? results.reduce((sum, r) => sum + r.randomTime, 0) / results.length 
    : 0
  const avgRatio = hasResults 
    ? results.reduce((sum, r) => sum + r.ratio, 0) / results.length 
    : 0

  const copyReport = () => {
    const reportText = generateTextReport()
    navigator.clipboard.writeText(reportText)
    alert('Отчёт скопирован в буфер обмена!')
  }

  const generateTextReport = () => {
    return `
ЛАБОРАТОРНАЯ РАБОТА №3
Исследование работы кэш-памяти

═══════════════════════════════════════════════════════════════

1. ЦЕЛЬ РАБОТЫ
───────────────────────────────────────────────────────────────
Изучить влияние способа доступа к данным на производительность 
программы. Исследовать работу кэш-памяти процессора при 
последовательном и случайном доступе к элементам массива.

2. ОПИСАНИЕ АЛГОРИТМОВ
───────────────────────────────────────────────────────────────

Последовательный доступ:
  - Элементы массива обрабатываются по порядку (0, 1, 2, ...)
  - Эффективно использует кэш-память процессора
  - Использует принцип пространственной локальности

Случайный доступ:
  - Элементы обрабатываются в случайном порядке
  - Приводит к частым кэш-промахам (cache miss)
  - Каждое обращение может требовать загрузки из RAM

3. РЕЗУЛЬТАТЫ ИЗМЕРЕНИЙ
───────────────────────────────────────────────────────────────
${hasResults ? results.map((r, i) => 
  `Эксперимент ${i + 1}:
    Размер массива: ${r.arraySize.toLocaleString()} элементов
    Последовательный доступ: ${r.sequentialTime.toFixed(2)} мс
    Случайный доступ: ${r.randomTime.toFixed(2)} мс
    Соотношение: ${r.ratio.toFixed(2)}x`
).join('\n\n') : 'Эксперименты не проводились'}

4. СРАВНЕНИЕ МЕТОДОВ ДОСТУПА
───────────────────────────────────────────────────────────────
${hasResults ? `
Среднее время последовательного доступа: ${avgSequential.toFixed(2)} мс
Среднее время случайного доступа: ${avgRandom.toFixed(2)} мс
Среднее соотношение: ${avgRatio.toFixed(2)}x

Случайный доступ в среднем в ${avgRatio.toFixed(2)} раз медленнее 
последовательного доступа.
` : 'Данные отсутствуют'}

5. ВЫВОДЫ
───────────────────────────────────────────────────────────────
1. Последовательный доступ к элементам массива значительно 
   эффективнее случайного доступа.

2. Разница в производительности объясняется работой кэш-памяти:
   - При последовательном доступе данные загружаются в кэш 
     блоками (cache lines), и последующие обращения попадают 
     в кэш (cache hit)
   - При случайном доступе каждое обращение с высокой 
     вероятностью приводит к кэш-промаху (cache miss) и 
     требует обращения к более медленной RAM

3. Для оптимизации производительности программ следует:
   - Организовывать данные для последовательного доступа
   - Группировать связанные данные в памяти
   - Учитывать размер кэш-линии (обычно 64 байта)

4. Полученные результаты подтверждают важность учёта 
   архитектуры памяти при разработке высокопроизводительных 
   приложений.

═══════════════════════════════════════════════════════════════
`.trim()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Предпросмотр отчёта */}
      <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">📝</span>
            Отчёт по лабораторной работе
          </h2>
          <button
            onClick={copyReport}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition flex items-center gap-2"
          >
            📋 Копировать
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 text-gray-800 shadow-xl">
          {/* Заголовок */}
          <div className="text-center border-b-2 border-gray-200 pb-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ЛАБОРАТОРНАЯ РАБОТА №3
            </h1>
            <p className="text-xl text-gray-600">Исследование работы кэш-памяти</p>
          </div>

          {/* 1. Цель работы */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
              Цель работы
            </h2>
            <p className="text-gray-700 leading-relaxed pl-10">
              Изучить влияние способа доступа к данным на производительность программы. 
              Исследовать работу кэш-памяти процессора при последовательном и случайном 
              доступе к элементам массива.
            </p>
          </section>

          {/* 2. Описание алгоритмов */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
              Описание алгоритмов
            </h2>
            <div className="pl-10 space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r">
                <h3 className="font-semibold text-green-800 mb-2">Последовательный доступ</h3>
                <ul className="text-green-700 text-sm list-disc list-inside space-y-1">
                  <li>Элементы массива обрабатываются по порядку (0, 1, 2, ...)</li>
                  <li>Эффективно использует кэш-память процессора</li>
                  <li>Использует принцип пространственной локальности</li>
                </ul>
              </div>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                <h3 className="font-semibold text-red-800 mb-2">Случайный доступ</h3>
                <ul className="text-red-700 text-sm list-disc list-inside space-y-1">
                  <li>Элементы обрабатываются в случайном порядке</li>
                  <li>Приводит к частым кэш-промахам (cache miss)</li>
                  <li>Каждое обращение может требовать загрузки из RAM</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Результаты измерений */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
              Результаты измерений
            </h2>
            <div className="pl-10">
              {hasResults ? (
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2 text-left">#</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Размер</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Послед. (мс)</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Случайн. (мс)</th>
                      <th className="border border-gray-300 px-3 py-2 text-left">Соотн.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2">{i + 1}</td>
                        <td className="border border-gray-300 px-3 py-2">{r.arraySize.toLocaleString()}</td>
                        <td className="border border-gray-300 px-3 py-2 text-green-600">{r.sequentialTime.toFixed(2)}</td>
                        <td className="border border-gray-300 px-3 py-2 text-red-600">{r.randomTime.toFixed(2)}</td>
                        <td className="border border-gray-300 px-3 py-2 font-bold text-purple-600">{r.ratio.toFixed(2)}x</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 italic">
                  Эксперименты не проводились. Перейдите на вкладку "Эксперимент" для получения данных.
                </p>
              )}
            </div>
          </section>

          {/* 4. Сравнение методов */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">4</span>
              Сравнение методов доступа
            </h2>
            <div className="pl-10">
              {hasResults ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{avgSequential.toFixed(2)} мс</div>
                      <div className="text-sm text-gray-500">Ср. последовательный</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{avgRandom.toFixed(2)} мс</div>
                      <div className="text-sm text-gray-500">Ср. случайный</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{avgRatio.toFixed(2)}x</div>
                      <div className="text-sm text-gray-500">Ср. соотношение</div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700 text-center">
                    Случайный доступ в среднем в <strong>{avgRatio.toFixed(2)}</strong> раз 
                    медленнее последовательного доступа.
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 italic">Данные отсутствуют</p>
              )}
            </div>
          </section>

          {/* 5. Выводы */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">5</span>
              Выводы
            </h2>
            <div className="pl-10 space-y-3 text-gray-700">
              <p>
                <strong>1.</strong> Последовательный доступ к элементам массива значительно 
                эффективнее случайного доступа.
              </p>
              <p>
                <strong>2.</strong> Разница в производительности объясняется работой кэш-памяти:
                при последовательном доступе данные загружаются в кэш блоками (cache lines), 
                и последующие обращения попадают в кэш. При случайном доступе каждое обращение 
                с высокой вероятностью приводит к кэш-промаху.
              </p>
              <p>
                <strong>3.</strong> Для оптимизации производительности программ следует 
                организовывать данные для последовательного доступа и группировать связанные 
                данные в памяти.
              </p>
              <p>
                <strong>4.</strong> Полученные результаты подтверждают важность учёта 
                архитектуры памяти при разработке высокопроизводительных приложений.
              </p>
            </div>
          </section>
        </div>
      </section>

      {/* Подсказка */}
      <div className="text-center text-white/60 text-sm">
        💡 Нажмите "Копировать" чтобы скопировать отчёт в текстовом формате
      </div>
    </div>
  )
}
