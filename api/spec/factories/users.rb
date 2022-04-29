FactoryBot.define do
  factory :user do
    sequence :email do |n|
      "person#{n}@example.com"
    end
    # email {"test@mail.com"}
    password {"password"}
  end
end
