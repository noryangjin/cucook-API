import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
});

export default mongoose.model('User', UserSchema);
