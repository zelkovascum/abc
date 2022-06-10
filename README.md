# SNS型マッチングアプリ Photudio
URL: https://inzs46.com
### 概要
SNS風のマッチングアプリです。

### 制作背景


### 目的


## 使用イメージ
### ログイン
<img width="1077" alt="スクリーンショット 2022-06-10 23 06 57" src="https://user-images.githubusercontent.com/94943154/173105516-41856744-3c52-41bd-a946-341371f4fb21.png">

### ホーム画面
<img width="1065" alt="スクリーンショット 2022-06-11 1 11 20" src="https://user-images.githubusercontent.com/94943154/173109113-cc9d55cb-fc20-447a-bf2f-7b112b32541f.png">

### 投稿一覧
<img width="1195" alt="スクリーンショット 2022-06-11 1 01 13" src="https://user-images.githubusercontent.com/94943154/173107287-b5241a46-504b-4fde-b667-fdc464a67811.png">

### 投稿一覧（マップ）
現在地付近のマップを表示  
投稿がマップ上に表示されており、クリックすると詳細へ


### 新規投稿
<img width="1192" alt="スクリーンショット 2022-06-11 2 03 05" src="https://user-images.githubusercontent.com/94943154/173116714-af620d2a-ff4f-4aeb-a12c-6c9648130364.png">

### チャット
<img width="1424" alt="スクリーンショット 2022-06-11 2 13 37" src="https://user-images.githubusercontent.com/94943154/173118651-d1d70b09-9681-4c1b-bb98-f449a5052004.png">




<!-- ![top]() -->

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
