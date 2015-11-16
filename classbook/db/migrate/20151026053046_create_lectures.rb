class CreateLectures < ActiveRecord::Migration
  def change
    create_table :lectures do |t|
      t.string :name
      t.string :begTime
      t.string :endTime
      t.string :days
      t.string :location

      t.timestamps null: false
    end
  end
end
