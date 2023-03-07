import { StatusCodes } from 'http-status-codes';
import argon2 from 'argon2';

import BadRequest from '../errors/bad-request.js';

import User from '../models/User.js';
import hashingConfig from '../config/hashingConfig.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw BadRequest('You cannot leave empty fields.');
  }

  // const hashedPassword = await argon2.hash(password);

  const user = { name, email, password };

  const response = await User.create(user);

  res.status(StatusCodes.CREATED).json(response);
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

  res.send(user);
};
