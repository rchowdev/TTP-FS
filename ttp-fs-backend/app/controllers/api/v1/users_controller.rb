class Api::V1::UsersController < ApplicationController
  def create
    #code
    @user = User.create(user_params)
    if @user.valid?
      render json: { user: UserSerializer.new(@user) }, status: :created
    else
      render json: { error: 'Failed to create user' }, status: :not_acceptable
    end
  end

  private
  def user_params
    #code
    params.require(:user).permit(:first_name, :last_name, :email, :password)
  end
end