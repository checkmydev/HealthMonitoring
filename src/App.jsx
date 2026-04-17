import { useState } from 'react'
import { useWellnessData } from './hooks/useWellnessData'
import { EntryForm } from './components/EntryForm'
import { Dashboard } from './components/Dashboard'
import { History } from './components/History'

const TABS = [
  { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
  { id: 'entry', label: 'Nouvelle entrée', icon: '✏️' },
  { id: 'history', label: 'Historique', icon: '📋' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { entries, addEntry, deleteEntry, updateEntry, getChartData, getAverages } = useWellnessData()

  const handleSave = (data) => {
    addEntry(data)
    setActiveTab('dashboard')
  }

  const chartData = getChartData(14)
  const averages = getAverages()

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">Bien-être Monitor</h1>
              <p className="text-xs text-gray-400">
                {entries.length} entrée{entries.length !== 1 ? 's' : ''} enregistrée{entries.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('entry')}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors"
          >
            <span>+</span> Ajouter
          </button>
        </div>
      </header>

      {/* Tab nav */}
      <nav className="max-w-4xl mx-auto px-4 pt-4">
        <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            chartData={chartData}
            averages={averages}
            totalEntries={entries.length}
          />
        )}
        {activeTab === 'entry' && (
          <EntryForm onSave={handleSave} />
        )}
        {activeTab === 'history' && (
          <History entries={entries} onDelete={deleteEntry} onUpdate={updateEntry} />
        )}
      </main>
    </div>
  )
}
