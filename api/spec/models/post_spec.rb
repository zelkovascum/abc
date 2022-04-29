require 'rails_helper'

RSpec.describe Post, type: :model do
  describe "validation" do
    let(:post){build(:post)}
    it "" do
      expect(post).to be_valid
    end
    it "" do
      post.lat=nil
      expect(post).not_to be_valid
    end
    it "" do
      post.place=nil
      expect(post).not_to be_valid
    end
    it "" do
      post.date_time=nil
      expect(post).not_to be_valid
    end
    it "" do
      post.content=nil
      expect(post).not_to be_valid
    end
    it "" do
      post.content="a"*31
      expect(post).not_to be_valid
    end
  end
end
