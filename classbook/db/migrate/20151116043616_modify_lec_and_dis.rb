class ModifyLecAndDis < ActiveRecord::Migration
  def change
  	  	add_column :lectures, :term, :string
  	  	add_column :lectures, :department, :string
  end
end
