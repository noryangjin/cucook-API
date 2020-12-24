import express from 'express';
import * as postCtrl from './post.ctrl';
import * as middleWare from '../middleware';

const post = express.Router();

post.get('/', postCtrl.postList);
post.post('/', middleWare.isLoggedIn, postCtrl.writePost);
post.get('/:id', postCtrl.readPost);
post.delete(
  '/:id',
  middleWare.isLoggedIn,
  middleWare.compareUser,
  postCtrl.deletePost
);
post.patch(
  '/:id',
  middleWare.isLoggedIn,
  middleWare.compareUser,
  postCtrl.updatePost
);

export default post;
