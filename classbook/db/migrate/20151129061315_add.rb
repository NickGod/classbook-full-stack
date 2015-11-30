class Add < ActiveRecord::Migration
  def change
  	add_column :users, :About, :string
  end
end
