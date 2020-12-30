import mongoose from 'mongoose';

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  commentWriter: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;
