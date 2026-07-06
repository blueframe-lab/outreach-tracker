import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { emptyLeadForm, sampleLeads } from './data'
import { LeadFilters } from './components/LeadFilters'
import { LeadForm } from './components/LeadForm'
import { LeadList } from './components/LeadList'
import type { Filters, Lead, LeadFormValues } from './types'

const STORAGE_KEY = 'outreach-tracker-leads'

const createLead = (values: LeadFormValues): Lead => ({
  ...values,
  id: crypto.randomUUID(),
  createdAt: new Date().toISOString(),
})

const loadLeads = (): Lead[] => {
  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    return sampleLeads
  }

  try {
    const parsed = JSON.parse(stored) as Lead[]
    return Array.isArray(parsed) ? parsed : sampleLeads
  } catch {
    return sampleLeads
  }
}

function App() {
  const [leads, setLeads] = useState<Lead[]>(loadLeads)
  const [formValues, setFormValues] = useState<LeadFormValues>(emptyLeadForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    status: 'すべて',
    priority: 'すべて',
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
  }, [leads])

  const filteredLeads = useMemo(() => {
    const keyword = filters.keyword.trim().toLowerCase()

    return leads.filter((lead) => {
      const matchesKeyword =
        keyword.length === 0 ||
        [lead.name, lead.type, lead.url, lead.contactMethod, lead.memo]
          .join(' ')
          .toLowerCase()
          .includes(keyword)
      const matchesStatus =
        filters.status === 'すべて' || lead.status === filters.status
      const matchesPriority =
        filters.priority === 'すべて' || lead.priority === filters.priority

      return matchesKeyword && matchesStatus && matchesPriority
    })
  }, [filters, leads])

  const resetForm = () => {
    setFormValues(emptyLeadForm)
    setEditingId(null)
  }

  const handleSubmit = () => {
    if (editingId) {
      setLeads((currentLeads) =>
        currentLeads.map((lead) =>
          lead.id === editingId ? { ...lead, ...formValues } : lead,
        ),
      )
    } else {
      setLeads((currentLeads) => [createLead(formValues), ...currentLeads])
    }

    resetForm()
  }

  const handleEdit = (lead: Lead) => {
    setEditingId(lead.id)
    setFormValues({
      name: lead.name,
      type: lead.type,
      url: lead.url,
      contactMethod: lead.contactMethod,
      status: lead.status,
      priority: lead.priority,
      memo: lead.memo,
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = (id: string) => {
    const target = leads.find((lead) => lead.id === id)

    if (!target || !confirm(`${target.name} を削除しますか？`)) {
      return
    }

    setLeads((currentLeads) => currentLeads.filter((lead) => lead.id !== id))

    if (editingId === id) {
      resetForm()
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Outreach Tracker</p>
          <h1>営業候補を整理して、次の連絡を見失わない。</h1>
        </div>
        <div className="summary">
          <span>{leads.length}</span>
          <small>登録件数</small>
        </div>
      </header>

      <div className="workspace">
        <LeadForm
          values={formValues}
          editing={editingId !== null}
          onChange={setFormValues}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />

        <div className="list-panel">
          <LeadFilters
            filters={filters}
            resultCount={filteredLeads.length}
            totalCount={leads.length}
            onChange={setFilters}
          />
          <LeadList leads={filteredLeads} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
    </main>
  )
}

export default App
