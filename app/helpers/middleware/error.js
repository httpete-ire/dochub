'use strict';

module.exports =  function(err, req, res, next) {

  // console.log(err);

  req.unhandledError = err;

  let error = err.error || err;
  let status = err.status || 500;

  return res.status(status).json({
    response: error
  });
};
