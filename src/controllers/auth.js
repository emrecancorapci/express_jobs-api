import { StatusCodes } from 'http-status-codes';
import BadRequest from '../errors/bad-request.js';

import User from '../models/User.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw BadRequest('You cannot leave empty fields.');
  }

  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json(user);
};

export const login = async (req, res) => {
  res.send('login user');
};
