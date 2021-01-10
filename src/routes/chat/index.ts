import express from 'express';
import * as chatCtrl from './chat.ctrl';
import * as middleware from '../middleware';

const chat = express.Router();

chat.get('/', chatCtrl.readRoomList);
chat.post('/', middleware.isLoggedIn, chatCtrl.roomCreate);
chat.post('/:roomId', middleware.isLoggedIn, chatCtrl.readRoom);
chat.get('/join/:roomId', middleware.isLoggedIn, chatCtrl.roomJoin);
chat.get('/out/:roomId', middleware.isLoggedIn, chatCtrl.leaveRoom);
chat.post('/chat/:roomId', middleware.isLoggedIn, chatCtrl.chating);

export default chat;
