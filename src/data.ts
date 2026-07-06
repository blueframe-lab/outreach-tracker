import type { Lead, LeadFormValues } from './types'

export const emptyLeadForm: LeadFormValues = {
  name: '',
  type: '企業',
  url: '',
  contactMethod: '問い合わせフォーム',
  status: '未送信',
  priority: '中',
  memo: '',
}

export const sampleLeads: Lead[] = [
  {
    id: 'sample-1',
    name: 'Bright Coffee Roasters',
    type: '店舗',
    url: 'https://example.com/bright-coffee',
    contactMethod: '問い合わせフォーム',
    status: '未送信',
    priority: '高',
    memo: 'Instagramの投稿頻度が高い。店舗紹介動画の提案が合いそう。',
    createdAt: '2026-07-01T09:00:00.000Z',
  },
  {
    id: 'sample-2',
    name: 'Tech Review Lab',
    type: 'YouTubeチャンネル',
    url: 'https://youtube.com/@example-tech-review',
    contactMethod: 'メール',
    status: '送信済み',
    priority: '中',
    memo: '編集外注の募集歴あり。1週間後に追撃予定。',
    createdAt: '2026-07-02T09:00:00.000Z',
  },
  {
    id: 'sample-3',
    name: '佐藤デザイン事務所',
    type: '個人事業主',
    url: 'https://example.com/sato-design',
    contactMethod: 'X DM',
    status: '返信あり',
    priority: '高',
    memo: 'SNS運用とショート動画制作に関心あり。次回、実績資料を送る。',
    createdAt: '2026-07-03T09:00:00.000Z',
  },
]
