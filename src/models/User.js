import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name cannot be empty.'],
    minlength: 3,
    maxlength: 64,
  },
  email: {
    type: String,
    required: [true, 'Email cannot be empty.'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email.',
    ],
  },
  password: {
    type: String,
    required: [true, 'Password cannot be empty.'],
    minlength: 6,
  },
});

export default mongoose.model('User', UserSchema);
