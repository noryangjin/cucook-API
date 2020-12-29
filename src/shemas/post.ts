import mongoose from 'mongoose';

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const PostSchema = new Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  titleImg: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  ingredients: [String],
  tags: [String],
  writer: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  views: {
    type: Number,
    default: 0,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
