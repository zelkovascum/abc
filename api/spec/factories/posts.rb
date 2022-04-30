FactoryBot.define do
  factory :post do
    lat {35.6811836}
    lng {139.7741538}
    content {"テスト"}
    place {"日本、東京都中央区日本橋"}
    date_time {1.week.since}
    user
  end
end
