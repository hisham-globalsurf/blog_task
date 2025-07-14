const errorHandler = (err, req, res, next) => {
  console.log(err);
  
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Server Error' });
};

export default errorHandler;