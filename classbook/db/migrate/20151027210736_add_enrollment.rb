class AddEnrollment < ActiveRecord::Migration
  def change
  	create_table :discussions_users, id:false do |t|
  		t.belongs_to :discussion, index:true
  		t.belongs_to :user, index:true
  	end
  end
end
