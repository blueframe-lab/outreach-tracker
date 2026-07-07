import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { emptyLeadForm, sampleLeads } from './data'
import { LeadFilters } from './components/LeadFilters'
import { LeadForm } from './components/LeadForm'
import { LeadList } from './components/LeadList'
import type { Filters, Lead, LeadFormValues } from './types'

const STORAGE_KEY = 'outreach-tracker-leads'
const THEME_STORAGE_KEY = 'outreach-tracker-theme'

type ActiveView = 'leads' | 'trash'
type Theme = 'light' | 'dark'

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

const isDeletedLead = (lead: Lead) => Boolean(lead.deletedAt)

const loadTheme = (): Theme => {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
  return storedTheme === 'dark' ? 'dark' : 'light'
}

function App() {
  const [leads, setLeads] = useState<Lead[]>(loadLeads)
  const [formValues, setFormValues] = useState<LeadFormValues>(emptyLeadForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [activeView, setActiveView] = useState<ActiveView>('leads')
  const [theme, setTheme] = useState<Theme>(loadTheme)
  const [filters, setFilters] = useState<Filters>({
    keyword: '',
    status: 'すべて',
    priority: 'すべて',
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads))
  }, [leads])

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
    document.body.classList.toggle('theme-dark', theme === 'dark')
    document.body.classList.toggle('theme-light', theme === 'light')
  }, [theme])

  const activeLeads = useMemo(
    () => leads.filter((lead) => !isDeletedLead(lead)),
    [leads],
  )

  const deletedLeads = useMemo(
    () => leads.filter((lead) => isDeletedLead(lead)),
    [leads],
  )

  const filteredLeads = useMemo(() => {
    const keyword = filters.keyword.trim().toLowerCase()

    return activeLeads.filter((lead) => {
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
  }, [activeLeads, filters])

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
    setActiveView('leads')
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

    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead.id === id ? { ...lead, deletedAt: new Date().toISOString() } : lead,
      ),
    )

    if (editingId === id) {
      resetForm()
    }
  }

  const handleRestore = (id: string) => {
    setLeads((currentLeads) =>
      currentLeads.map((lead) => {
        if (lead.id !== id) {
          return lead
        }

        const { deletedAt: _deletedAt, ...restoredLead } = lead
        return restoredLead
      }),
    )
    setActiveView('leads')
  }

  const handlePermanentDelete = (id: string) => {
    const target = deletedLeads.find((lead) => lead.id === id)

    if (!target || !confirm(`${target.name} を完全に削除しますか？この操作は元に戻せません。`)) {
      return
    }

    setLeads((currentLeads) => currentLeads.filter((lead) => lead.id !== id))
  }

  const handleViewChange = (view: ActiveView) => {
    setActiveView(view)
  }

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <main className={`app-shell theme-${theme}`}>
      <header className="app-header">
        <div>
          <p className="eyebrow">Outreach Tracker</p>
          <h1>{activeView === 'leads' ? '営業先候補一覧' : '削除ボックス'}</h1>
        </div>
        <div className="header-actions">
          <button className="theme-toggle" type="button" onClick={toggleTheme}>
            {theme === 'light' ? 'ダークテーマ' : 'ライトテーマ'}
          </button>
          <div className="summary">
            <div>
              <span>{activeLeads.length}</span>
              <small>登録件数</small>
            </div>
            <div className="summary-muted">
              <span>{deletedLeads.length}</span>
              <small>削除済み</small>
            </div>
          </div>
        </div>
      </header>

      <nav className="view-tabs" aria-label="表示切り替え">
        <button
          className={`view-tab${activeView === 'leads' ? ' is-active' : ''}`}
          type="button"
          aria-current={activeView === 'leads' ? 'page' : undefined}
          onClick={() => handleViewChange('leads')}
        >
          営業先候補
          <span>{activeLeads.length}</span>
        </button>
        <button
          className={`view-tab${activeView === 'trash' ? ' is-active' : ''}`}
          type="button"
          aria-current={activeView === 'trash' ? 'page' : undefined}
          onClick={() => handleViewChange('trash')}
        >
          削除ボックス
          <span>{deletedLeads.length}</span>
        </button>
      </nav>

      {activeView === 'leads' ? (
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
              totalCount={activeLeads.length}
              onChange={setFilters}
            />
            <LeadList
              leads={filteredLeads}
              editingId={editingId}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      ) : (
        <section className="trash-view" aria-label="削除ボックス">
          <div className="trash-box-heading">
            <div>
              <p className="eyebrow">Trash Box</p>
              <h2>削除済み営業先</h2>
            </div>
            <p className="trash-count">{deletedLeads.length} 件</p>
          </div>

          {deletedLeads.length === 0 ? (
            <div className="trash-empty">削除済みの営業先はありません。</div>
          ) : (
            <LeadList
              leads={deletedLeads}
              variant="trash"
              onRestore={handleRestore}
              onPermanentDelete={handlePermanentDelete}
            />
          )}
        </section>
      )}
    </main>
  )
}

export default App
