import type { Lead } from '../types'
import { LeadCard } from './LeadCard'

type LeadListProps = {
  leads: Lead[]
  onEdit: (lead: Lead) => void
  onDelete: (id: string) => void
}

export function LeadList({ leads, onEdit, onDelete }: LeadListProps) {
  if (leads.length === 0) {
    return (
      <div className="empty-state">
        <h3>該当する営業先がありません</h3>
        <p>検索条件を変えるか、新しい営業先を登録してください。</p>
      </div>
    )
  }

  return (
    <div className="lead-list">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
