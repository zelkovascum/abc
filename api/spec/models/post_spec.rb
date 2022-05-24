require 'rails_helper'

RSpec.describe Post, type: :model do
  describe 'validates' do
    let(:post) { build(:post) }
    it 'post is valid' do
      expect(post).to be_valid
    end

    it 'Invalid when lat is nil' do
      post.lat = nil
      expect(post).not_to be_valid
    end

    it 'Invalid when lng is nil' do
      post.lng = nil
      expect(post).not_to be_valid
    end

    it 'Invalid when place is nil' do
      post.place = nil
      expect(post).not_to be_valid
    end

    it 'Invalid when date_time is nil' do
      post.date_time = nil
      expect(post).not_to be_valid
    end

    it 'Invalid when content is nil' do
      post.content = nil
      expect(post).not_to be_valid
    end

    it 'Invalid when content is 31 characters or more' do
      post.content = 'a' * 101
      expect(post).not_to be_valid
    end
  end

  # describe 'type' do
  #   let(:post) { build(:post) }
  #   it 'lat type' do
  #     type = post.lat.class
  #     expect(type).to eq BigDecimal
  #   end

  #   it 'lng type' do
  #     type = post.lng.class
  #     expect(type).to eq BigDecimal
  #   end

  #   it 'place type' do
  #     type = post.place.class
  #     expect(type).to eq String
  #   end

  #   it 'date_time type' do
  #     type = post.date_time.class
  #     expect(type).to eq ActiveSupport::TimeWithZone
  #   end

  #   it 'content type' do
  #     type = post.content.class
  #     expect(type).to eq String
  #   end
  # end
end
