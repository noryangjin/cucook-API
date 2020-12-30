import express from 'express';
import * as middleware from '../middleware';
import * as commentCtrl from './comment.ctrl';

const comment = express.Router();

comment.post(
  '/:id',
  middleware.checkObjectId,
  middleware.isLoggedIn,
  commentCtrl.writeComment
);

export default comment;
