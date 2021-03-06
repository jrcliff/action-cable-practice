class MessagesController < ApplicationController
  before_action :set_message, only: %i[ show update destroy ]

  # GET /messages
  # GET /messages.json
  def index
    @messages = Message.all
    render json: @messages 
  end

  # GET /messages/1
  # GET /messages/1.json
  def show
    @message = Message.find(params[:id])
    render json: @message
  end

  # POST /messages
  # POST /messages.json
  def create
    message = Message.new(message_params)
    room = Room.find(message_params['room_id'])

    if message.save
      RoomsChannel.broadcast_to(room, {
        room: RoomSerializer.new(room),
        users: UserSerializer.new(room.users),
        messages: MessageSerializer.new(room.messages)
      })
      end
      render json: MessageSerializer.new(message)
  end

  # PATCH/PUT /messages/1
  # PATCH/PUT /messages/1.json
  def update
    if @message.update(message_params)
      render :show, status: :ok, location: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/1
  # DELETE /messages/1.json
  def destroy
    @message.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:content, :user_id, :room_id)
    end
end
