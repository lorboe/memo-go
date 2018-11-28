const mongoose = require('mongoose')

// Example on how to use this middleware: isLoggedIn
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) next()
  else next({ status: 403, message: 'Unauthorized' })
}

// Example on how to use this middleware: checkId('countryId')
function checkId(idField) {
  return (req,res,next) => {
    let id = req.params[idField]
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // 400 = Bad Request
      next({ status: 400, message: 'Wrong id' })
    }
    else {
      next()
    }
  }
}

module.exports = {
  isLoggedIn,
  checkId
}
