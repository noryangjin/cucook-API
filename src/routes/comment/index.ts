import express from 'express';
import * as middleware from '../middleware';
import * as commentCtrl from './comment.ctrl';

const comment = express.Router();

comment.get('/:id', middleware.checkObjectId, commentCtrl.readComment);
comment.post(
  '/:id',
  middleware.checkObjectId,
  middleware.isLoggedIn,
  commentCtrl.writeComment
);
comment.delete(
  '/:id',
  middleware.isLoggedIn,
  middleware.compareUserComment,
  commentCtrl.deleteComment
);

export default comment;
