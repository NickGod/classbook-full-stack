class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :user_id
      t.string :category
      t.string :context
      t.boolean :read	, default: false

      t.timestamps null: false
    end
  end
end
