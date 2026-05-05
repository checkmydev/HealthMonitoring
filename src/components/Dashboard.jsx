import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'
import { StatCard } from './StatCard'

const LINES = [
  { key: 'qualiteSommeil', name: 'Qualité sommeil', color: '#6366f1', yAxis: 'left' },
  { key: 'fatigue', name: 'Fatigue', color: '#f59e0b', yAxis: 'left' },
  { key: 'stress', name: 'Stress', color: '#f43f5e', yAxis: 'left' },
  { key: 'humeur', name: 'Humeur', color: '#10b981', yAxis: 'left' },
  { key: 'alcool', name: 'Alcool (verres)', color: '#f97316', yAxis: 'right' },
]

export function Dashboard({ chartData, averages, totalEntries }) {
  if (totalEntries === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center text-gray-400">
        <div className="text-5xl mb-4">🌱</div>
        <p className="font-medium">Aucune donnée pour l'instant.</p>
        <p className="text-sm mt-1">Commencez par ajouter votre première entrée !</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {averages && (
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            Moyennes ({Math.min(totalEntries, 7)} dernière{Math.min(totalEntries, 7) > 1 ? 's' : ''} entrée{Math.min(totalEntries, 7) > 1 ? 's' : ''})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <StatCard label="Sommeil" value={averages.sleepDuration} unit="h" color="indigo" icon="😴" />
            <StatCard label="Qualité sommeil" value={averages.sleepQuality} unit="/10" color="purple" icon="⭐" />
            <StatCard label="Fatigue" value={averages.fatigue} unit="/10" color="amber" icon="🔋" />
            <StatCard label="Stress" value={averages.stress} unit="/10" color="rose" icon="😤" />
            <StatCard label="Humeur" value={averages.mood} unit="/10" color="green" icon="😊" />
            <StatCard label="Activité" value={averages.activity} unit="min" color="teal" icon="🏃" />
            <StatCard label="Alcool" value={averages.alcohol} unit="verres" color="amber" icon="🍷" />
          </div>
        </div>
      )}

      {chartData.length >= 2 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-bold text-gray-800 mb-4">Évolution sur 14 jours (scores /10)</h2>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" domain={[0, 10]} tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 15]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}v`} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {LINES.map((l) => (
                <Line key={l.key} yAxisId={l.yAxis} type="monotone" dataKey={l.key} name={l.name} stroke={l.color} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {chartData.length >= 2 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-base font-bold text-gray-800 mb-4">Sommeil, Activité & Alcool</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="sommeil" name="Sommeil (h)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="activite" name="Activité (min)" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="alcool" name="Alcool (verres)" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {chartData.length === 1 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center text-gray-400">
          <p className="text-sm">Ajoutez au moins 2 entrées pour afficher les graphiques d'évolution.</p>
        </div>
      )}
    </div>
  )
}
