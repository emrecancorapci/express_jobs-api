import mongoose from 'mongoose';
import argon2 from 'argon2';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import hashingConfig from '../config/hashingConfig.js';

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

UserSchema.pre('save', async function () {
  const user = this;
  if (user.isModified('password')) {
    const salt = crypto.randomBytes(16);
    user.password = await argon2.hash(user.password, ...hashingConfig, salt);
    console.log(user.password);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  const user = this;
  return argon2.verify(user.password, password, hashingConfig);
};

UserSchema.methods.generateToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model('User', UserSchema);
