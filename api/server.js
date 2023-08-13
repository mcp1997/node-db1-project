const express = require("express");
const accountsRouter = require('./accounts/accounts-router')

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter)

server.use('*', (req, res) => {
  res.status(404).json({
    message: 'The resource you are looking for does not exist'
  })
})

module.exports = server;
