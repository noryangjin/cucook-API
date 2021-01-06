import express from 'express';
import userRouter from './user/index';
import postRouter from './post/index';
import commentRouter from './comment/index';
import chatRouter from './chat/index';

const router = express.Router();

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/chatRoom', chatRouter);

export default router;
