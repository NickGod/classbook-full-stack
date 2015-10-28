class AddIndexToDiscussionsUsers < ActiveRecord::Migration
  def change
  	add_index :discussions_users, [:discussion_id, :user_id], :unique => true
  end
end
