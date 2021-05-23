class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :uid, null: false
      t.string :user_id, null:false 
      t.string :display_name, null: false
      t.text :bio

      t.timestamps
    end
    add_index :users, :user_id, unique: true
  end
end
