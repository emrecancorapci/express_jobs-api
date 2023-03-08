import Jwt from 'jsonwebtoken';

import UnauthenticatedError from '../errors/unauthenticated.js';

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new UnauthenticatedError('No token provided.');
  }
  const token = authorization.split(' ')[1];

  try {
    const { id, name } = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id, name };

    next();
  } catch (err) {
    throw new UnauthenticatedError('Not authorized. Token is invalid.');
  }
};
