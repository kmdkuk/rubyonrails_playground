class UsersController < ApplicationController
  skip_before_action :authenticate_user, only: :create
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    FirebaseIdToken::Certificates.request
    raise ArgumentError, 'BadRequest Parameter' if payload.blank?

    @user = User.find_or_initialize_by(uid: payload['sub'])
    @user.update(user_params)
    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  def current
    @user = current_user
    render json: @user
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:uid, :user_id, :display_name, :profile)
    end

    def token_from_request_headers
      request.headers['Authorization']&.split&.last
    end

    def token
      params[:token] || token_from_request_headers
    end

    def payload
      @payload ||= FirebaseIdToken::Signature.verify token
    end
end
