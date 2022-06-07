class AddImageToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :image, :string
  end
end
