import { useState } from 'react'
import { ScaleInput } from './ScaleInput'

const DEFAULT = {
  sleepDuration: 7,
  sleepQuality: 5,
  fatigue: 5,
  stress: 5,
  mood: 5,
  energy: 5,
  activity: 30,
  notes: '',
}

export function EntryForm({ onSave }) {
  const [form, setForm] = useState(DEFAULT)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value, type } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'range' || type === 'number' ? Number(value) : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
    setForm(DEFAULT)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Nouvelle entrée</h2>

      {/* Sommeil */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Sommeil</legend>
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Durée du sommeil</span>
            <span className="font-bold text-gray-900">{form.sleepDuration}h</span>
          </label>
          <input
            type="range"
            name="sleepDuration"
            min={0}
            max={12}
            step={0.5}
            value={form.sleepDuration}
            onChange={handleChange}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>0h</span>
            <span>12h</span>
          </div>
        </div>
        <ScaleInput
          label="Qualité du sommeil"
          name="sleepQuality"
          value={form.sleepQuality}
          onChange={handleChange}
          colorFn={(pct) => (pct >= 66 ? 'bg-green-500' : pct >= 33 ? 'bg-yellow-400' : 'bg-red-500')}
        />
      </fieldset>

      {/* Énergie & Fatigue */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-amber-600">Énergie & Fatigue</legend>
        <ScaleInput label="Niveau de fatigue" name="fatigue" value={form.fatigue} onChange={handleChange} />
        <ScaleInput
          label="Niveau d'énergie"
          name="energy"
          value={form.energy}
          onChange={handleChange}
          colorFn={(pct) => (pct >= 66 ? 'bg-green-500' : pct >= 33 ? 'bg-yellow-400' : 'bg-red-500')}
        />
      </fieldset>

      {/* Mental */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-rose-600">Mental</legend>
        <ScaleInput label="Niveau de stress" name="stress" value={form.stress} onChange={handleChange} />
        <ScaleInput
          label="Humeur"
          name="mood"
          value={form.mood}
          onChange={handleChange}
          colorFn={(pct) => (pct >= 66 ? 'bg-green-500' : pct >= 33 ? 'bg-yellow-400' : 'bg-red-500')}
        />
      </fieldset>

      {/* Activité */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wide text-teal-600">Activité physique</legend>
        <div>
          <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>Durée d'activité</span>
            <span className="font-bold text-gray-900">{form.activity} min</span>
          </label>
          <input
            type="range"
            name="activity"
            min={0}
            max={180}
            step={5}
            value={form.activity}
            onChange={handleChange}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-0.5">
            <span>0 min</span>
            <span>180 min</span>
          </div>
        </div>
      </fieldset>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optionnel)</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Comment vous sentez-vous aujourd'hui ?"
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold transition-all text-sm"
      >
        {saved ? '✓ Entrée enregistrée !' : 'Enregistrer'}
      </button>
    </form>
  )
}
