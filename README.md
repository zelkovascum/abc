# SNS型マッチングアプリ Photudio
URL: https://inzs46.com

## 目次

| 番号 | 項目 |
|:-:|:--|
| 1 | [概要](https://github.com/zelkovascum/Photudio#%E6%A6%82%E8%A6%81) |
| 2 | [使用イメージ](https://github.com/zelkovascum/Photudio#%E4%BD%BF%E7%94%A8%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8) |
| 3 | [使用方法](https://github.com/zelkovascum/Photudio#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95) |
| 4 | [インフラ構成図](https://github.com/zelkovascum/Photudio#%E3%82%A4%E3%83%B3%E3%83%95%E3%83%A9%E6%A7%8B%E6%88%90%E5%9B%B3) |
| 5 | [使用技術概略・詳細](https://github.com/zelkovascum/Photudio#%E4%BD%BF%E7%94%A8%E6%8A%80%E8%A1%93%E6%A6%82%E7%95%A5)　|
| 6 | [機能一覧](https://github.com/zelkovascum/Photudio#%E6%A9%9F%E8%83%BD%E4%B8%80%E8%A6%A7)　|

## 概要
SNS風のマッチングアプリです。

### 制作背景


### 目的


## 使用イメージ

<https://user-images.githubusercontent.com/94943154/173129112-65caea77-02c8-4e69-894b-00aaed2eab0c.mov>

<https://user-images.githubusercontent.com/94943154/173129863-e08308a2-9b6c-446f-b949-dd9208167ecb.mov>

## 使用方法

### ログイン
<img width="1077" alt="スクリーンショット 2022-06-10 23 06 57" src="https://user-images.githubusercontent.com/94943154/173105516-41856744-3c52-41bd-a946-341371f4fb21.png">

### ホーム画面
<img width="1065" alt="スクリーンショット 2022-06-11 1 11 20" src="https://user-images.githubusercontent.com/94943154/173109113-cc9d55cb-fc20-447a-bf2f-7b112b32541f.png">

### 投稿一覧
<img width="1195" alt="スクリーンショット 2022-06-11 1 01 13" src="https://user-images.githubusercontent.com/94943154/173107287-b5241a46-504b-4fde-b667-fdc464a67811.png">

### 投稿一覧（マップ）
<img width="1282" alt="スクリーンショット 2022-06-11 0 57 02" src="https://user-images.githubusercontent.com/94943154/173130191-3d05341c-0c0d-42e6-8cc0-ac20d13403f6.png">

### 投稿詳細
<img width="1020" alt="スクリーンショット 2022-06-11 2 34 17" src="https://user-images.githubusercontent.com/94943154/173121029-cb567800-d626-40ed-be86-477e7c69c8cb.png">

### 新規投稿
<img width="1192" alt="スクリーンショット 2022-06-11 2 03 05" src="https://user-images.githubusercontent.com/94943154/173116714-af620d2a-ff4f-4aeb-a12c-6c9648130364.png">

### リアクション一覧
<img width="1203" alt="スクリーンショット 2022-06-11 2 39 07" src="https://user-images.githubusercontent.com/94943154/173121681-cc436fee-7dfa-43eb-8c31-d54b4ac0abc7.png">

### チャット
<img width="1424" alt="スクリーンショット 2022-06-11 2 13 37" src="https://user-images.githubusercontent.com/94943154/173118651-d1d70b09-9681-4c1b-bb98-f449a5052004.png">

# インフラ構成図
![インフラ drawio](https://user-images.githubusercontent.com/94943154/171155430-fb99e0a2-94d7-4be4-85c7-f949747f0733.png)

# 使用技術概略
- **Back End:** Ruby on Rails ( APIモード / Puma ), Nginx
- **Front End:** React ( TypeScript )
- **Infra:** Docker / Docker-Compose, AWS ( ECS Fargate / ECR / ALB / RDS / S3 / CloudFront / Route53 ), CircleCI
- **Third Party API:** Google Maps Platform(Maps JavaScript API / Geocoding API/Places API)

# 使用技術詳細
## Back End
- ``Ruby 3.1.2``
- ``Ruby on Rails　6.1.5``
- ``Nginx``
### 主要gem
- ``devise / devise_token_auth`` : トークン認証
- ``carrierwave / aws-fog`` : AWSへのファイルアップロード
- ``rspec`` : テストフレームワーク
- ``rubocop`` : Lintツール

## Front End
- ``React 17.0.2``
- ``TypeScript``
- ``creat-react-app``
### 主要パッケージ
- ``MUI V5`` : UIコンポーネントライブラリ
- ``React Router V6`` : UIとURLを同期
- ``Axios``: PromiseベースのHTTPクライアント
- ``React Google Maps Api`` : GoogleマップAPIのバインディング
- ``react-geocode`` : 地理的情報を緯度・経度の地理座標値に変換
### Google Maps Platform
- ``Maps JavaScript API`` / ``Geocoding API`` / ``Places API`` : Googleマップの使用

## Infra
### ``Docker / Docker Compose``
開発環境をコンテナ化（Rails,Nginx,MySQL,React）

### ``AWS``
- ``ECS Fargate``: Rails&Nginxのコンテナを実行
- ``ECR``: Rails&Nginxのコンテナイメージを保存
- ``ALB``: コンテナの負荷分散
- ``RDS``: DBエンジンはMySQLを使用
- ``S3``: Reactのホスティング、画像の保存
- ``CloudFront``: .html、.css、.js、イメージファイル等の配信
- ``Route53``: 独自ドメインでのアクセス

### ``CircleCI``
CI/CDパイプライン構築  
ビルド、テスト、デプロイを全自動化
- テスト・Lint
  - rspec
  - rubocop
- デプロイ（フロント）
  - Reactのビルド
  - S3へビルドしたファイルをアップロード
- デプロイ（バック）
  - ECRへイメージプッシュ（Rails,Nginx）
  - ECSのサービスアップデート

# 機能一覧
- アカウント作成、ログイン、ログアウト機能
- ゲストログイン機能
- プロフィール編集機能
  - プロフィール画像登録
  - 現在地登録
  - 外部リンク登録
- 投稿作成機能
- 投稿削除機能
- 投稿並べ替え機能（設定日時順、距離が近い順）
- 投稿絞り込み機能（日時）
- マップ機能
  - 投稿の位置情報を元にマップにマーカー表示
  - 表示するマーカー絞り込み（日時）
- チャット機能
  - メッセージ送信
  - 画像送信
  - 画像保存
- リアクション機能
  - リアクションの通知
- ローディング画面（スケルトンスクリーン）
- レスポンシブ対応

##### [↑トップへ](https://github.com/zelkovascum/Photudio#sns%E5%9E%8B%E3%83%9E%E3%83%83%E3%83%81%E3%83%B3%E3%82%B0%E3%82%A2%E3%83%97%E3%83%AA-photudio)
