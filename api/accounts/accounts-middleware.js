const Account = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  const { name, budget } = req.body
  if(name === undefined || budget === undefined) {
    res.status(400).json({
      message: "name and budget are required"
    })
  } else if(typeof name !== 'string') {
    res.status(400).json({
      message: 'name of account must be a string'
    })
  } else if(name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({
      message: "name of account must be between 3 and 100"
    })
  } else if(typeof budget !== 'number' || isNaN(budget)) {
    res.status(400).json({
      message: "budget of account must be a number"
    })
  } else if(budget < 0 || budget > 1000000) {
    res.status(400).json({
      message: "budget of account is too large or too small"
    })
  } else {
    req.body.name = name.trim()
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
  db('accounts').where({ name: req.body.name.trim() }).first()
    .then(existing => {
      if(existing) {
        res.status(400).json({
          message: "that name is taken"
        })
      } else {
        next()
      }
    })
    .catch(next)
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
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
