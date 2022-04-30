require 'rails_helper'

RSpec.describe Post, type: :model do
  describe "validates" do
    let(:post) { build(:post) }
    it "post is valid" do
      expect(post).to be_valid
    end
    it "Invalid when lat is nil" do
      post.lat=nil
      expect(post).not_to be_valid
    end
    it "Invalid when lng is nil" do
      post.lng=nil
      expect(post).not_to be_valid
    end
    it "Invalid when place is nil" do
      post.place=nil
      expect(post).not_to be_valid
    end
    it "Invalid when date_time is nil" do
      post.date_time=nil
      expect(post).not_to be_valid
    end
    it "Invalid when content is nil" do
      post.content=nil
      expect(post).not_to be_valid
    end
    it "Invalid when content is 31 characters or more" do
      post.content="a"*31
      expect(post).not_to be_valid
    end
  end
end
