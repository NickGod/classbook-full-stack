class ChangeType < ActiveRecord::Migration
  def change
  	change_column :users, :year, :string
  end
end
