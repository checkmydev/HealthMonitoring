export function ExportButton({ entries }) {
  const exportCSV = () => {
    const headers = ['Date','Heure','Sommeil (h)','Qualité sommeil','Fatigue','Stress','Humeur','Activité (min)','Alcool (verres)','Notes']
    const rows = entries.map((e) => {
      const d = new Date(e.date)
      return [
        d.toLocaleDateString('fr-FR'),
        d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        e.sleepDuration,
        e.sleepQuality,
        e.fatigue,
        e.stress,
        e.mood,
        e.activity,
        e.alcohol ?? 0,
        `"${(e.notes ?? '').replace(/"/g, '""')}"`,
      ].join(',')
    })
    const csv = [headers.join(','), ...rows].join('\n')
    download(csv, 'bien-etre.csv', 'text/csv')
  }

  const exportJSON = () => {
    const json = JSON.stringify(entries, null, 2)
    download(json, 'bien-etre.json', 'application/json')
  }

  const download = (content, filename, type) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  if (entries.length === 0) return null

  return (
    <div className="flex gap-2">
      <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 text-sm font-semibold transition-colors" title="Exporter en CSV (Excel)">
        <span>↓</span> CSV
      </button>
      <button onClick={exportJSON} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-semibold transition-colors" title="Exporter en JSON">
        <span>↓</span> JSON
      </button>
    </div>
  )
}
