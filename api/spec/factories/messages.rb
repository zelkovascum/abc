FactoryBot.define do
  factory :message do
    content { 'テストメッセージ' }
    room
    user
  end
end
