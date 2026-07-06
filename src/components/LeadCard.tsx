import type { Lead } from '../types'

type LeadCardProps = {
  lead: Lead
  onEdit: (lead: Lead) => void
  onDelete: (id: string) => void
}

export function LeadCard({ lead, onEdit, onDelete }: LeadCardProps) {
  return (
    <article className="lead-card">
      <div className="card-top">
        <div>
          <p className="lead-type">{lead.type}</p>
          <h3>{lead.name}</h3>
        </div>
        <div className="badge-row">
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
        <button className="button button-secondary" type="button" onClick={() => onEdit(lead)}>
          編集
        </button>
        <button className="button button-danger" type="button" onClick={() => onDelete(lead.id)}>
          削除
        </button>
      </div>
    </article>
  )
}
