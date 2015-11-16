class ModifyRelationship < ActiveRecord::Migration
  def change
  	add_column :relationships, :accepted, :boolean
  	change_column :relationships, :accepted, :boolean, :default => false
  end
end
