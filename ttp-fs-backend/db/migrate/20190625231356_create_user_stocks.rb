class CreateUserStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :user_stocks do |t|
      t.integer :user_id
      t.integer :stock_id
      t.integer :quantity

      t.timestamps
    end
  end
end
