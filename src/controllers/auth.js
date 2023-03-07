import { StatusCodes } from 'http-status-codes';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import BadRequest from '../errors/bad-request.js';
import User from '../models/User.js';
import hashingConfig from '../config/hashingConfig.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw BadRequest('You cannot leave empty fields.');
  }

  const user = await User.create({ name, email, password });

  if (!user) {
    throw BadRequest('Something went wrong.');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(StatusCodes.CREATED).json({ name: user.name, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw BadRequest('You cannot leave empty fields .');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw BadRequest('Invalid credentials.');
  }

  const isPasswordCorrect = await argon2.verify(
    user.password,
    password,
    hashingConfig
  );

  if (!isPasswordCorrect) {
    throw BadRequest('Invalid credentials.');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(StatusCodes.OK).json({ name: user.name, token });
};
