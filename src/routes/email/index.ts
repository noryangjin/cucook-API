import express from 'express';
import * as emailCtrl from './email.ctrl';

const email = express.Router();

email.post('/email', emailCtrl.sendEmail);

export default email;
