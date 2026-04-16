export function StatCard({ label, value, unit = '', color = 'indigo', icon }) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-700',
    amber: 'bg-amber-50 text-amber-700',
    rose: 'bg-rose-50 text-rose-700',
    teal: 'bg-teal-50 text-teal-700',
    green: 'bg-green-50 text-green-700',
    purple: 'bg-purple-50 text-purple-700',
  }

  return (
    <div className={`rounded-2xl p-4 ${colors[color]} flex flex-col gap-1`}>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide opacity-70">
        {icon && <span>{icon}</span>}
        {label}
      </div>
      <div className="text-3xl font-bold">
        {value ?? '–'}
        {value != null && <span className="text-base font-medium ml-1 opacity-70">{unit}</span>}
      </div>
    </div>
  )
}
