class AddBalanceToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :balance, :decimal, :precision => 10, :scale => 2, :default => 5000, :null => false
  end
end
