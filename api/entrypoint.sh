#!/bin/bash
set -e

rm -f /myapp/tmp/pids/server.pid

# 本番 createとseedはfargateの初回のみ実行
# bundle exec rails db:create
bundle exec rails db:migrate
# bundle exec rails db:seed

exec "$@"
