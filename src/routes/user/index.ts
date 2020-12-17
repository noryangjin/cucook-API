import express from 'express';
import * as userCtrl from './user.ctrl';

const user = express.Router();

user.post('/register', userCtrl.register);

export default user;
