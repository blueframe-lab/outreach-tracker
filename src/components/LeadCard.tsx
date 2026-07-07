import type { Lead } from '../types'

type LeadCardProps = {
  lead: Lead
  isEditing?: boolean
  variant?: 'active' | 'trash'
  onEdit?: (lead: Lead) => void
  onDelete?: (id: string) => void
  onRestore?: (id: string) => void
  onPermanentDelete?: (id: string) => void
}

export function LeadCard({
  lead,
  isEditing = false,
  variant = 'active',
  onEdit,
  onDelete,
  onRestore,
  onPermanentDelete,
}: LeadCardProps) {
  const isTrash = variant === 'trash'

  return (
    <article
      className={`lead-card${isEditing ? ' is-editing' : ''}${isTrash ? ' is-trash' : ''}`}
    >
      <div className="card-top">
        <div>
          <p className="lead-type">{lead.type}</p>
          <div className="card-title-row">
            <h3>{lead.name}</h3>
            {isEditing && <span className="editing-label">編集中</span>}
          </div>
        </div>
        <div className="badge-row">
          {isTrash && <span className="badge badge-trash">削除済み</span>}
          <span className={`badge status-${lead.status}`}>{lead.status}</span>
          <span className={`badge priority-${lead.priority}`}>優先度 {lead.priority}</span>
        </div>
      </div>

      <dl className="lead-meta">
        <div>
          <dt>URL</dt>
          <dd>
            <a href={lead.url} target="_blank" rel="noreferrer">
              {lead.url}
            </a>
          </dd>
        </div>
        <div>
          <dt>連絡方法</dt>
          <dd>{lead.contactMethod}</dd>
        </div>
      </dl>

      {lead.memo && <p className="memo">{lead.memo}</p>}

      <div className="card-actions">
        {isTrash ? (
          <>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => onRestore?.(lead.id)}
            >
              復元
            </button>
            <button
              className="button button-permanent-danger"
              type="button"
              onClick={() => onPermanentDelete?.(lead.id)}
            >
              完全に削除
            </button>
          </>
        ) : (
          <>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => onEdit?.(lead)}
            >
              編集
            </button>
            <button
              className="button button-danger"
              type="button"
              onClick={() => onDelete?.(lead.id)}
            >
              削除
            </button>
          </>
        )}
      </div>
    </article>
  )
}
