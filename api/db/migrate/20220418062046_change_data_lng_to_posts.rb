class ChangeDataLngToPosts < ActiveRecord::Migration[6.1]
  def change
    change_column :posts, :lng, :decimal, precision: 10, scale: 7
  end
end
