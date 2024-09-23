const express = require('express');
const routes = express.Router();
const myRouter = require('../controller/controller');

routes.get('/', myRouter.defaultCon);
routes.get('/signin',myRouter.signIn);
routes.get('/login',myRouter.loginPage);
routes.post('/signin',myRouter.userGetData);
routes.post('/login',myRouter.logInGetData)


module.exports = routes;