FactoryBot.define do
  factory :user do
    sequence :email do |n|
      "test#{n}@mail.com"
    end
    password {"password"}
  end
end
