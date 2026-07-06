import type { FormEvent } from 'react'
import {
  contactMethods,
  leadStatuses,
  leadTypes,
  priorities,
  type LeadFormValues,
} from '../types'

type LeadFormProps = {
  values: LeadFormValues
  editing: boolean
  onChange: (values: LeadFormValues) => void
  onSubmit: () => void
  onCancel: () => void
}

export function LeadForm({
  values,
  editing,
  onChange,
  onSubmit,
  onCancel,
}: LeadFormProps) {
  const updateField = <Key extends keyof LeadFormValues>(
    key: Key,
    value: LeadFormValues[Key],
  ) => {
    onChange({ ...values, [key]: value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Lead Form</p>
          <h2>{editing ? '営業先を編集' : '営業先を登録'}</h2>
        </div>
        {editing && (
          <button className="button button-secondary" type="button" onClick={onCancel}>
            編集をやめる
          </button>
        )}
      </div>

      <label>
        <span>営業先名</span>
        <input
          required
          value={values.name}
          onChange={(event) => updateField('name', event.target.value)}
          placeholder="例: 株式会社サンプル"
        />
      </label>

      <div className="form-grid">
        <label>
          <span>種別</span>
          <select
            value={values.type}
            onChange={(event) =>
              updateField('type', event.target.value as LeadFormValues['type'])
            }
          >
            {leadTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>連絡方法</span>
          <select
            value={values.contactMethod}
            onChange={(event) =>
              updateField(
                'contactMethod',
                event.target.value as LeadFormValues['contactMethod'],
              )
            }
          >
            {contactMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>ステータス</span>
          <select
            value={values.status}
            onChange={(event) =>
              updateField('status', event.target.value as LeadFormValues['status'])
            }
          >
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
            value={values.priority}
            onChange={(event) =>
              updateField('priority', event.target.value as LeadFormValues['priority'])
            }
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        <span>URL</span>
        <input
          required
          type="url"
          value={values.url}
          onChange={(event) => updateField('url', event.target.value)}
          placeholder="https://example.com"
        />
      </label>

      <label>
        <span>メモ</span>
        <textarea
          value={values.memo}
          onChange={(event) => updateField('memo', event.target.value)}
          placeholder="提案内容、次回アクション、相手の特徴など"
          rows={5}
        />
      </label>

      <button className="button button-primary" type="submit">
        {editing ? '変更を保存' : '登録する'}
      </button>
    </form>
  )
}
