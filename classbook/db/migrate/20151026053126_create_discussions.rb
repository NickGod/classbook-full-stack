class CreateDiscussions < ActiveRecord::Migration
  def change
    create_table :discussions do |t|
      t.integer :lectureId
      t.string :begTime
      t.string :endTime
      t.string :days
      t.string :location

      t.timestamps null: false
    end
  end
end
