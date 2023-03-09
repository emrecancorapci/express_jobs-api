import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/custom-api.js';

export default (err, req, res, next) => {
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong. Please try again later.',
  };

  if (err instanceof CustomAPIError)
    return res.status(err.statusCode).json({ msg: err.message });

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(' ');
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.msg = `No item found with the id: ${err.value}`;
    customError.statusCode = 404;
  }

  if (err.code && err.code === 11000)
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field. Please choose an unique value.`;

  return res.status(customError.statusCode).json({ msg: customError.msg });
};
