# SNS型マッチングアプリ Photudio
説明...

URL: https://inzs46.com

<!-- ![top]() -->

# インフラ構成図
![インフラ drawio](https://user-images.githubusercontent.com/94943154/170499706-8687e604-6131-4c97-a034-a3d2f475113e.png)

# 使用技術概略
- **Back End:** Ruby on Rails ( APIモード / Puma ), Nginx
- **Front End:** React ( TypeScript )
- **Infra:** Docker / Docker-Compose, AWS ( ECS Fargate / ECR / ALB / RDS / S3 / CloudFront / Route53 ), Circle CI
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
- アカウント作成、ログイン、ログアウト機能
- プロフィール画像登録機能
- 投稿作成機能
- 投稿削除機能
- 投稿並べ替え機能（設定日時順、距離が近い順）
- 投稿絞り込み機能（日時）
- マップ機能
  - 投稿の位置情報を元にマップにマーカー表示
  - 表示するマーカー絞り込み機能（日時）
- メッセージ機能
- リアクション機能
  - リアクションの通知機能
- ローディング画面（スケルトンスクリーン）
- レスポンシブ対応
