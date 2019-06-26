class Api::V1::StocksController < ApplicationController
  def index
    #Map each user_stock of current user to stock symbol and quantity owned
    @stocks = @current_user.user_stocks.map do |user_stock|
      {
        symbol: user_stock.stock.symbol,
        quantity: user_stock.quantity
      }
    end
    render json: @stocks
  end
end
