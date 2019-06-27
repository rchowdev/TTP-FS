class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :user_id
      t.integer :stock_id
      t.string :type
      t.string :stock_symbol
      t.integer :quantity
      t.decimal :price, :precision => 10, :scale => 2, :null => false

      t.timestamps
    end
  end
end
