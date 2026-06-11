export default function Header() {
  return (
    <header className="py-8 text-center">
      <div className="inline-block mb-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
        <span className="text-5xl">🖥️</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
        Лабораторная работа №3
      </h1>
      <p className="text-xl text-purple-300">
        Исследование работы кэш-памяти
      </p>
      <p className="text-white/60 mt-2">
        Влияние способа доступа к данным на производительность программы
      </p>
    </header>
  )
}
