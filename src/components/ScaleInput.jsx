export function ScaleInput({ label, name, value, onChange, min = 1, max = 10, colorFn }) {
  const pct = ((value - min) / (max - min)) * 100

  const defaultColor = () => {
    if (pct <= 33) return 'bg-green-500'
    if (pct <= 66) return 'bg-yellow-400'
    return 'bg-red-500'
  }

  const color = colorFn ? colorFn(pct) : defaultColor()

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-bold text-gray-900 w-6 text-right">{value}</span>
      </div>
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
        style={{ accentColor: 'var(--accent)' }}
      />
      <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}
