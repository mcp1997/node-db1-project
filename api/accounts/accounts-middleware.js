const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('checkAccountId middleware')
  Account.getById(req.params.id)
    .then(account => {
      if(!account) {
        res.status(404).json({
          message: "account not found"
        })
      } else {
        req.account = account
        next()
      }
    })
    .catch(next)
}
