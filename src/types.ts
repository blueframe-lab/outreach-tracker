export const leadTypes = [
  '企業',
  'YouTubeチャンネル',
  'Xアカウント',
  '店舗',
  '個人事業主',
  'その他',
] as const

export const contactMethods = [
  '問い合わせフォーム',
  'メール',
  'X DM',
  'Instagram DM',
  'その他',
] as const

export const leadStatuses = [
  '未送信',
  '送信済み',
  '要追撃',
  '返信あり',
  '商談化',
  'NG',
] as const

export const priorities = ['高', '中', '低'] as const

export type LeadType = (typeof leadTypes)[number]
export type ContactMethod = (typeof contactMethods)[number]
export type LeadStatus = (typeof leadStatuses)[number]
export type Priority = (typeof priorities)[number]

export type Lead = {
  id: string
  name: string
  type: LeadType
  url: string
  contactMethod: ContactMethod
  status: LeadStatus
  priority: Priority
  memo: string
  createdAt: string
}

export type LeadFormValues = Omit<Lead, 'id' | 'createdAt'>

export type Filters = {
  keyword: string
  status: LeadStatus | 'すべて'
  priority: Priority | 'すべて'
}
