import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  hashedPassword: String,
});

export default mongoose.model('User', userSchema);
