class TransactionsSerializer < ActiveModel::Serializer
  attributes :transaction_type, :stock_symbol, :quantity, :price
end
