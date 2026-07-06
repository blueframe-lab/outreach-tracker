import { leadStatuses, priorities, type Filters } from '../types'

type LeadFiltersProps = {
  filters: Filters
  resultCount: number
  totalCount: number
  onChange: (filters: Filters) => void
}

export function LeadFilters({
  filters,
  resultCount,
  totalCount,
  onChange,
}: LeadFiltersProps) {
  return (
    <section className="filters" aria-label="営業先の検索と絞り込み">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Search</p>
          <h2>一覧</h2>
        </div>
        <p className="result-count">
          {resultCount} / {totalCount} 件
        </p>
      </div>

      <div className="filter-grid">
        <label>
          <span>キーワード検索</span>
          <input
            value={filters.keyword}
            onChange={(event) =>
              onChange({ ...filters, keyword: event.target.value })
            }
            placeholder="名前、URL、メモで検索"
          />
        </label>

        <label>
          <span>ステータス</span>
          <select
            value={filters.status}
            onChange={(event) =>
              onChange({
                ...filters,
                status: event.target.value as Filters['status'],
              })
            }
          >
            <option value="すべて">すべて</option>
            {leadStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>優先度</span>
          <select
            value={filters.priority}
            onChange={(event) =>
              onChange({
                ...filters,
                priority: event.target.value as Filters['priority'],
              })
            }
          >
            <option value="すべて">すべて</option>
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}
