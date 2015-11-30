class Rename < ActiveRecord::Migration
  def change
  	rename_column :users, :About, :about
  end
end
