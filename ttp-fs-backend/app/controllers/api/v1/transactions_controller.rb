class Api::V1::TransactionsController < ApplicationController
  def index
    render json: @current_user.transactions, each_serializer: TransactionsSerializer, root: false
  end
end
