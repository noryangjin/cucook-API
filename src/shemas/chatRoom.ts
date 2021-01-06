import mongoose from 'mongoose';

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const chatRoomSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  max: {
    type: Number,
    required: true,
    default: 10,
    min: 2,
  },
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
export default ChatRoom;
