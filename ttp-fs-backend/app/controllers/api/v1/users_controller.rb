class Api::V1::UsersController < ApplicationController
  skip_before_action :authorized, only: %[create]

  def create
    @user = User.create(user_params)
    if @user.valid?
      session[:user_id] = @user.id
      render json: { user: UserSerializer.new(@user) }, status: :created
    else
      render json: { error: 'Failed to create user' }, status: :not_acceptable
    end
  end

  #Find or create record for stock
  #Find or create record in join table for user_stock
  #Update quantity of user_stock, user balance
  #Return JSON with user's stock info, balance
  def buy_stock
    @stock = Stock.find_or_create_by(symbol: buy_stock_params[:symbol])
    @user_stock = UserStock.find_or_create_by(user_id: @current_user.id, stock_id: @stock.id)
    new_quantity = buy_stock_params[:quantity] + @user_stock.quantity
    @user_stock.update(quantity: new_quantity)
    @current_user.update(balance: buy_stock_params[:balance])

    render json: { symbol: @stock.symbol, quantity: @user_stock.quantity, user: UserSerializer.new(@current_user) }, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end

  def buy_stock_params
    params.require(:orderData).permit(:balance, :symbol, :quantity)
  end
end
