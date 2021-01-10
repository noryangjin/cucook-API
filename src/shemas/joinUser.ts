import mongoose from 'mongoose';

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const joinUserSchema = new Schema({
  user: {
    type: ObjectId,
    ref: 'User',
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const JoinUser = mongoose.model('JoinUser', joinUserSchema);
export default JoinUser;
