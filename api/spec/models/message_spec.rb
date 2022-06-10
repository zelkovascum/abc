require 'rails_helper'

RSpec.describe Message, type: :model do
  describe 'validates' do
    let(:message) { build(:message) }

    it 'message is valid' do
      expect(message).to be_valid
    end

    # it 'Invalid when content is nil' do
    #   message.content = nil
    #   expect(message).not_to be_valid
    # end
  end
end
