'use strict';

module.exports =  function(err, req, res) {
  // catch unhandeErrors
  req.unhandledError = err;

  let error = err.error || err;
  let status = err.status || 500;

  res.status(status).json({
    response: error
  });

};
