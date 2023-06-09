exports.errorResponse = (res, data) => {
  let resObj = {
    message: data.message,
    status: data.status,
  };
  res.status(data.status).send(resObj);
};

exports.successResponse = (res, data, message, status) => {
  let resObj = {
    data,
    message,
    status,
  };
  res.status(status).json(resObj);
};
