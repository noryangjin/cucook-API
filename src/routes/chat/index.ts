import express from 'express';
import * as chatCtrl from './chat.ctrl';
import * as middleware from '../middleware';

const chat = express.Router();

chat.get('/', chatCtrl.readRoomList);
chat.post('/', middleware.isLoggedIn, chatCtrl.roomCreate);

export default chat;
