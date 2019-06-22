class ApplicationController < ActionController::API
  before_action :authorized

  def encode_token(payload)
    # Put secret in .env file when deploying
    JWT.encode(payload, 'ttp-fs-S3cr3t')
  end

  def auth_header
    # { Authorization: 'Bearer <token>' }
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, 'ttp-fs-S3cr3t')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def current_user
    if decoded_token
      user_id = decoded_token[0]['user_id']
      @user = User.find_by(id: user_id)
    end
  end

  def logged_in?
    # Logged in if the user exists
    !!current_user
  end

  def authorized
    render json: { error: 'Please log in' }, status: :authorized unless logged_in?
  end
end
