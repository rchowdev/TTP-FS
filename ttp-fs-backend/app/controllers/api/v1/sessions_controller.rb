class Api::V1::SessionsController < ApplicationController
  skip_before_action :authorized, only: [:create, :login_status]

  def create
    @user = User.find_by(email: user_login_params[:email])
    if @user && @user.authenticate(user_login_params[:password])
      session[:user_id] = @user.id
      render json: { user: UserSerializer.new(@user) }, status: :accepted
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def login_status
    if logged_in?
      render json: { user: UserSerializer.new(@current_user) }
    else
      render json: { error: "Not logged in" }
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
