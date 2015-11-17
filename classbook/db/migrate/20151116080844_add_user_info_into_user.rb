class AddUserInfoIntoUser < ActiveRecord::Migration
  def change
  	add_column :users, :year, :integer
  	add_column :users, :major, :string
  	add_column :users, :sex, :string
  end
end
