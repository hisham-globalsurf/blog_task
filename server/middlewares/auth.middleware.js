import jwt from 'jsonwebtoken';
import CustomError from '../utils/customError.js';

export const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new CustomError('Not authorized', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new CustomError('Invalid token', 401));
  }
};
