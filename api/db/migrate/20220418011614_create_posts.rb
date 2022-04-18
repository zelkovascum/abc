class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.references :user, null: false, foreign_key: true
      t.float :lat, null: false
      t.float :lng, null: false
      t.string :place, null: false
      t.datetime :date_time, null: false
      t.string :content, null: false

      t.timestamps
    end
  end
end
