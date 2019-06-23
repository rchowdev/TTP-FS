class Api::V1::SessionsController < ApplicationController
  skip_before_action :authorized, only: %[create]

  def create
    @user = User.find_by(email: user_login_params[:email])
    if @user && @user.authenticate(user_login_params[:password])
      session[:user_id] = @user.id
      render json: { user: UserSerializer.new(@user), logged_in: true }, status: :accepted
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy
    reset_session
    render json: { logged_in: false }, status: :accepted
  end

  private

  def user_login_params
    params.require(:user).permit(:email, :password)
  end
end
