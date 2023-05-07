
const express = require('express')
//const { logger } = require('./actions/actions-middlware');
const actionsRouter = require('./actions/actions-router');
const projectRouter = require('./projects/projects-router');
const server = express()
server.use(express.json())
//server.use(logger)
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectRouter);

module.exports = server;