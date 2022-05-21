class Post < ApplicationRecord
  belongs_to :user

  validates :lat, :lng, :place, :date_time, :content, presence: true
  validates :content, length: { maximum: 100 }
end
