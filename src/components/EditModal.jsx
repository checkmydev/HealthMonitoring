import { useState } from 'react'
import { ScaleInput } from './ScaleInput'

const toDateInput = (iso) => new Date(iso).toISOString().split('T')[0]
const today = () => new Date().toISOString().split('T')[0]

export function EditModal({ entry, onSave, onClose }) {
  const [form, setForm] = useState({
    date: toDateInput(entry.date),
    sleepDuration: entry.sleepDuration,
    sleepQuality: entry.sleepQuality,
    fatigue: entry.fatigue,
    stress: entry.stress,
    mood: entry.mood,
    activity: entry.activity,
    alcohol: entry.alcohol ?? 0,
    notes: entry.notes ?? '',
  })

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'range' || type === 'number' ? Number(value) : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dateISO = form.date ? new Date(form.date + 'T12:00:00').toISOString() : entry.date
    onSave({ ...form, date: dateISO })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm px-0 sm:px-4">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Modifier l'entrée</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none p-1">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-6">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              max={today()}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* Sommeil */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Sommeil</legend>
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Durée du sommeil</span>
                <span className="font-bold">{form.sleepDuration}h</span>
              </label>
              <input type="range" name="sleepDuration" min={0} max={12} step={0.5} value={form.sleepDuration} onChange={handleChange} className="w-full cursor-pointer" />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>0h</span><span>12h</span></div>
            </div>
            <ScaleInput label="Qualité du sommeil" name="sleepQuality" value={form.sleepQuality} onChange={handleChange} colorFn={(pct) => pct >= 66 ? 'bg-green-500' : pct >= 33 ? 'bg-yellow-400' : 'bg-red-500'} />
          </fieldset>

          {/* Fatigue */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wide text-amber-600">Fatigue</legend>
            <ScaleInput label="Niveau de fatigue" name="fatigue" value={form.fatigue} onChange={handleChange} />
          </fieldset>

          {/* Mental */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wide text-rose-600">Mental</legend>
            <ScaleInput label="Niveau de stress" name="stress" value={form.stress} onChange={handleChange} />
            <ScaleInput label="Humeur" name="mood" value={form.mood} onChange={handleChange} colorFn={(pct) => pct >= 66 ? 'bg-green-500' : pct >= 33 ? 'bg-yellow-400' : 'bg-red-500'} />
          </fieldset>

          {/* Activité */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wide text-teal-600">Activité physique</legend>
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Durée d'activité</span>
                <span className="font-bold">{form.activity} min</span>
              </label>
              <input type="range" name="activity" min={0} max={180} step={5} value={form.activity} onChange={handleChange} className="w-full cursor-pointer" />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>0 min</span><span>180 min</span></div>
            </div>
          </fieldset>

          {/* Alcool */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold uppercase tracking-wide text-orange-500">Alcool</legend>
            <div>
              <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                <span>Nombre de verres</span>
                <span className="font-bold">
                  {form.alcohol === 0 ? '0 (aucun)' : `${form.alcohol} verre${form.alcohol > 1 ? 's' : ''}`}
                </span>
              </label>
              <input type="range" name="alcohol" min={0} max={10} step={1} value={form.alcohol} onChange={handleChange} className="w-full cursor-pointer" />
              <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>0</span><span>10+</span></div>
            </div>
          </fieldset>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Comment vous sentiez-vous ?" className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none" />
          </div>

          <div className="flex gap-3 pb-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors">
              Annuler
            </button>
            <button type="submit" className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
