class AddMatchedToReactions < ActiveRecord::Migration[6.1]
  def change
    add_column :reactions, :matched, :boolean, default: false, null: false
  end
end
