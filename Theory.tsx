export default function Theory() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Цель работы */}
      <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          Цель работы
        </h2>
        <p className="text-white/80 leading-relaxed">
          Изучить влияние способа доступа к данным на производительность программы.
          Исследовать работу кэш-памяти процессора при последовательном и случайном 
          доступе к элементам массива.
        </p>
      </section>

      {/* Теоретические сведения */}
      <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">📖</span>
          Теоретические сведения
        </h2>
        
        <div className="space-y-4 text-white/80">
          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="font-semibold text-purple-300 mb-2">Что такое кэш-память?</h3>
            <p>
              Кэш-память — это сверхбыстрая память небольшого объёма, расположенная 
              между процессором и оперативной памятью. Она хранит копии часто 
              используемых данных для ускорения доступа к ним.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="font-semibold text-purple-300 mb-2">Иерархия памяти</h3>
            <div className="flex flex-col gap-2 mt-3">
              {[
                { name: 'Регистры CPU', speed: '~1 нс', size: '~1 КБ', color: 'bg-green-500' },
                { name: 'L1 кэш', speed: '~4 нс', size: '32-64 КБ', color: 'bg-green-400' },
                { name: 'L2 кэш', speed: '~10 нс', size: '256-512 КБ', color: 'bg-yellow-400' },
                { name: 'L3 кэш', speed: '~40 нс', size: '4-64 МБ', color: 'bg-orange-400' },
                { name: 'RAM', speed: '~100 нс', size: '8-64 ГБ', color: 'bg-red-400' },
              ].map((level, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                  <span className="w-32">{level.name}</span>
                  <span className="text-white/50 w-24">{level.speed}</span>
                  <span className="text-white/50">{level.size}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="font-semibold text-purple-300 mb-2">Принцип локальности</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Временна́я локальность:</strong> данные, использованные недавно, 
                вероятно будут использованы снова
              </li>
              <li>
                <strong>Пространственная локальность:</strong> данные, расположенные 
                рядом с текущими, вероятно будут использованы
              </li>
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h3 className="font-semibold text-purple-300 mb-2">Кэш-промахи (Cache Miss)</h3>
            <p>
              При случайном доступе к большому массиву данные часто отсутствуют в кэше,
              что приводит к кэш-промахам и замедлению работы программы в 10-100 раз!
            </p>
          </div>
        </div>
      </section>

      {/* Типы доступа */}
      <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">🔄</span>
          Типы доступа к памяти
        </h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
            <h3 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
              <span>➡️</span> Последовательный доступ
            </h3>
            <p className="text-white/70 text-sm mb-3">
              Элементы обрабатываются по порядку: 0, 1, 2, 3...
            </p>
            <div className="flex gap-1 flex-wrap">
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <div key={i} className="w-8 h-8 bg-green-500/30 rounded flex items-center justify-center text-xs">
                  {i}
                </div>
              ))}
            </div>
            <p className="text-green-400 mt-3 text-sm">✓ Эффективное использование кэша</p>
          </div>

          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4">
            <h3 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
              <span>🔀</span> Случайный доступ
            </h3>
            <p className="text-white/70 text-sm mb-3">
              Элементы обрабатываются в случайном порядке
            </p>
            <div className="flex gap-1 flex-wrap">
              {[5, 1, 7, 3, 0, 6, 2, 4].map((n, i) => (
                <div key={i} className="w-8 h-8 bg-red-500/30 rounded flex items-center justify-center text-xs">
                  {n}
                </div>
              ))}
            </div>
            <p className="text-red-400 mt-3 text-sm">✗ Частые кэш-промахи</p>
          </div>
        </div>
      </section>

      {/* Код примера */}
      <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <span className="text-3xl">💻</span>
          Пример кода (JavaScript)
        </h2>
        
        <pre className="bg-slate-900 rounded-xl p-4 overflow-x-auto text-sm">
          <code className="text-green-400">{`// Последовательный доступ
function sequentialAccess(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]; // Обращение по порядку
  }
  return sum;
}

// Случайный доступ
function randomAccess(arr, indices) {
  let sum = 0;
  for (let i = 0; i < indices.length; i++) {
    sum += arr[indices[i]]; // Обращение в случайном порядке
  }
  return sum;
}`}</code>
        </pre>
      </section>
    </div>
  )
}
