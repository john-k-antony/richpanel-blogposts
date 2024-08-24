const getResponseError = function (err, res) {
    return res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
      });    
  };
  
  const getNotFoundResponseError = function (err, res) {
    return getResponseError({
        status: 404,
        message: err.message,
        errors: err.errors
    }, res);
  };
  
  const getUnprossebleEntityResponseError = function (err, res) {
    return getResponseError({
        status: 422,
        message: err.message,
        errors: err.errors
    }, res);
  };
  
  const getBadRequestResponseError = function (errorCode, err, res) {
    return getResponseError({
        status: 400,
        message: err.message,
        errors: err.errors
    }, res);
  };

module.exports = {
    getResponseError,
    getNotFoundResponseError,
    getUnprossebleEntityResponseError,
    getBadRequestResponseError,
}  