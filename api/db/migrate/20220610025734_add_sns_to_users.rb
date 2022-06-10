class AddSnsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :sns, :string
  end
end
