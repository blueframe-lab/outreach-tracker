import type { Lead } from '../types'
import { LeadCard } from './LeadCard'

type LeadListProps = {
  leads: Lead[]
  editingId?: string | null
  variant?: 'active' | 'trash'
  onEdit?: (lead: Lead) => void
  onDelete?: (id: string) => void
  onRestore?: (id: string) => void
  onPermanentDelete?: (id: string) => void
}

export function LeadList({
  leads,
  editingId = null,
  variant = 'active',
  onEdit,
  onDelete,
  onRestore,
  onPermanentDelete,
}: LeadListProps) {
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
        <LeadCard
          key={lead.id}
          lead={lead}
          isEditing={lead.id === editingId}
          variant={variant}
          onEdit={onEdit}
          onDelete={onDelete}
          onRestore={onRestore}
          onPermanentDelete={onPermanentDelete}
        />
      ))}
    </div>
  )
}
