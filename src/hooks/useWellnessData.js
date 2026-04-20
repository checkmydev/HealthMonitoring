import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'wellness_entries'

export function useWellnessData() {
  const [entries, setEntries] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const addEntry = useCallback((entry) => {
    const dateISO = entry.date
      ? new Date(entry.date + 'T12:00:00').toISOString()
      : new Date().toISOString()
    const newEntry = {
      id: Date.now().toString(),
      date: dateISO,
      ...entry,
    }
    setEntries((prev) => [newEntry, ...prev].sort((a, b) => new Date(b.date) - new Date(a.date)))
    return newEntry
  }, [])

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const updateEntry = useCallback((id, data) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)))
  }, [])

  const getChartData = useCallback(
    (days = 14) => {
      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - days)

      return [...entries]
        .filter((e) => new Date(e.date) >= cutoff)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((e) => ({
          date: new Date(e.date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
          }),
          sommeil: e.sleepDuration,
          qualiteSommeil: e.sleepQuality,
          fatigue: e.fatigue,
          stress: e.stress,
          humeur: e.mood,
          energie: e.energy,
          activite: e.activity,
          alcool: e.alcohol ?? 0,
        }))
    },
    [entries]
  )

  const getAverages = useCallback(() => {
    if (entries.length === 0) return null
    const recent = entries.slice(0, 7)
    const avg = (key) =>
      Math.round((recent.reduce((s, e) => s + (e[key] ?? 0), 0) / recent.length) * 10) / 10

    return {
      sleepDuration: avg('sleepDuration'),
      sleepQuality: avg('sleepQuality'),
      fatigue: avg('fatigue'),
      stress: avg('stress'),
      mood: avg('mood'),
      activity: avg('activity'),
      alcohol: avg('alcohol'),
    }
  }, [entries])

  return { entries, addEntry, deleteEntry, updateEntry, getChartData, getAverages }
}
