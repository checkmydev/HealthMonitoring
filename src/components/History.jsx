import { useState } from 'react'
import { EditModal } from './EditModal'
import { ExportButton } from './ExportButton'

function Badge({ value, max = 10, invertColor = false }) {
  const pct = (value / max) * 100
  let color
  if (invertColor) {
    color = pct <= 33 ? 'bg-green-100 text-green-700' : pct <= 66 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
  } else {
    color = pct >= 66 ? 'bg-green-100 text-green-700' : pct >= 33 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
  }
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${color}`}>{value}</span>
}

export function History({ entries, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(null)

  if (entries.length === 0) return null

  const handleSave = (data) => {
    onUpdate(editing.id, data)
    setEditing(null)
  }

  return (
    <>
      {editing && (
        <EditModal
          entry={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Historique</h2>
          <ExportButton entries={entries} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-xs font-semibold uppercase text-gray-400 border-b border-gray-100">
                <th className="pb-2 pr-3">Date</th>
                <th className="pb-2 pr-3">Sommeil</th>
                <th className="pb-2 pr-3">Qual.</th>
                <th className="pb-2 pr-3">Fatigue</th>
                <th className="pb-2 pr-3">Stress</th>
                <th className="pb-2 pr-3">Humeur</th>
                <th className="pb-2 pr-3">Activité</th>
                <th className="pb-2 pr-3">Alcool</th>
                <th className="pb-2"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-2 pr-3 text-gray-600 whitespace-nowrap">
                    {new Date(e.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                    <span className="block text-xs text-gray-400">
                      {new Date(e.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                  <td className="py-2 pr-3 font-medium">{e.sleepDuration}h</td>
                  <td className="py-2 pr-3"><Badge value={e.sleepQuality} /></td>
                  <td className="py-2 pr-3"><Badge value={e.fatigue} invertColor /></td>
                  <td className="py-2 pr-3"><Badge value={e.stress} invertColor /></td>
                  <td className="py-2 pr-3"><Badge value={e.mood} /></td>
                  <td className="py-2 pr-3 text-gray-600">{e.activity} min</td>
                  <td className="py-2 pr-3 text-gray-600">{e.alcohol ?? 0}</td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditing(e)}
                        className="text-gray-300 hover:text-indigo-500 transition-colors text-base leading-none"
                        title="Modifier"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => onDelete(e.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors text-base leading-none"
                        title="Supprimer"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {entries.some((e) => e.notes) && (
          <div className="mt-4 space-y-2">
            <h3 className="text-xs font-semibold uppercase text-gray-400 tracking-wide">Notes récentes</h3>
            {entries
              .filter((e) => e.notes)
              .slice(0, 3)
              .map((e) => (
                <div key={e.id} className="bg-gray-50 rounded-xl px-3 py-2 text-sm text-gray-600">
                  <span className="text-xs text-gray-400 mr-2">
                    {new Date(e.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                  </span>
                  {e.notes}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  )
}
