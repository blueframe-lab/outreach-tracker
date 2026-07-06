# Outreach Tracker

動画制作・SNS運用代行の営業候補を管理するための小さなWebアプリです。営業先のURL、連絡方法、ステータス、優先度、メモを保存し、検索・絞り込み・編集・削除ができます。

## 公開URL

https://outreach-tracker.mademperor1108.workers.dev

## 概要

このアプリは TypeScript + React + Vite で作成しました。実装は Codex に依頼し、GitHub 上で feature ブランチを作成して開発しました。その後、Pull Request を作成して `main` ブランチへマージし、Cloudflare で公開しています。

## 機能

- 営業先の登録、編集、削除
- 営業先名、種別、URL、連絡方法、ステータス、優先度、メモの管理
- カード形式の一覧表示
- キーワード検索
- ステータスと優先度での絞り込み
- localStorageへの自動保存
- 初回表示用のサンプルデータ3件
- PC、スマホ両対応のレスポンシブUI

## 技術構成

- TypeScript
- React
- Vite
- localStorage
- Cloudflare

外部API、ログイン、データベースは使用していません。

## 開発・公開フロー

- Codex にアプリの実装を依頼
- GitHub で `feature/outreach-tracker-app` ブランチを作成
- Pull Request を作成して `main` ブランチへマージ
- Cloudflare で公開

## 起動方法

```bash
npm install
npm run dev
```

表示されたローカルURLをブラウザで開いて確認します。

## ビルド

```bash
npm run build
```

ビルド成果物は `dist` に出力されます。
