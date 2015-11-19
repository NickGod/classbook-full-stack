class ReNameFields < ActiveRecord::Migration
  def change
  	add_column :discussions, :className, :string
  end
end
