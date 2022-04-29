class ChangeDataLatToPost < ActiveRecord::Migration[6.1]
  def change
    change_column :posts, :lat, :decimal, precision: 9, scale: 7
  end
end
