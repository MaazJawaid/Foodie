import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  terms: {
    type: Boolean,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

export default User;
