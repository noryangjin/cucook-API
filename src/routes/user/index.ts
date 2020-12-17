import express from 'express';
import * as userCtrl from './user.ctrl';
import * as middleWare from '../middleware';

const user = express.Router();

user.post('/register', middleWare.isNotLoggedIn, userCtrl.register);
user.post('/login', middleWare.isNotLoggedIn, userCtrl.login);
user.get('/logout', middleWare.isLoggedIn, userCtrl.logout);

export default user;