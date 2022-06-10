class Message < ApplicationRecord
  mount_uploader :image, ImageUploader

  belongs_to :user
  belongs_to :room

  # validates :content, presence: true
end
