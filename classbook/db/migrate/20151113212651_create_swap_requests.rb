class CreateSwapRequests < ActiveRecord::Migration
  def change
    create_table :swap_requests do |t|
      t.integer :user_id    ,null: false
      t.integer :has_dis    ,null: false
      t.integer :want_dis   ,null: false
      t.integer :current_match_user_id
      t.string :black_list_user_id

      t.timestamps null: false
    end

    add_index :swap_requests, [:user_id, :has_dis, :want_dis], unique: true
  end
end
