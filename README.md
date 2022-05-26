# SNS型マッチングアプリ Photudio
説明...

URL: https://inzs46.com

<!-- ![top]() -->

## インフラ構成図
<!-- ![image]() -->

### 使用技術概略
- **Back End:** Ruby on Rails ( APIモード / Puma ), Nginx
- **Front End:** React ( TypeScript )
- **Infra:** Docker / Docker-Compose, AWS ( ECS Fargate / ECR / ALB / RDS / S3 / CloudFront / Route53 ), Circle CI
- **Third Party API:** Google Maps Platform(Maps JavaScript API / Geocoding API/Places API)

# 使用技術詳細
## Back End: Ruby on Rails, Nginx
### 主要gem
- ``devise / devise_token_auth`` : トークン認証
- ``carrierwave / aws-fog`` : AWSへのファイルアップロード
- ``rspec`` : テストフレームワーク
- ``rubocop`` : Lintツール

## Front End: React
- ``creat-react-app``
### 主要ライブラリ
- ``MUI V5`` : UIコンポーネントライブラリ
- ``React Router V6`` : UIとURLを同期
- ``Axios``: PromiseベースのHTTPクライアント
- ``React Google Maps Api`` : GoogleマップAPIのバインディング
- ``react-geocode`` : 地理的情報を緯度・経度の地理座標値に変換
### Google Maps Platform
- ``Maps JavaScript API`` / ``Geocoding API`` / ``Places API`` : Googleマップの使用

## Infra
### ``Docker / Docker-Compose``
開発環境をコンテナ化（Rails,Nginx,MySQL,React）

### ``AWS``
- ``ECS Fargate``: Rails&Nginxのコンテナを実行
- ``ECR``: Rails&Nginxのコンテナイメージを保存
- ``ALB``: コンテナの負荷分散
- ``RDS (MySQL)``: DBエンジンはMySQLを使用
- ``S3``: Reactのホスティング、画像の保存
- ``CloudFront``: .html、.css、.js、イメージファイル等の配信
- ``Route53``: 独自ドメインでのアクセス

### ``CircleCI``
CI/CDパイプライン構築
- rspec
- rubocop
- ECRへイメージプッシュ
- ECSのサービスアップデート

# 機能一覧
## ユーザー利用機能
- 機能
- 機能
  - 機能


## 非ユーザー利用機能
- 機能
- 機能
  - 機能
