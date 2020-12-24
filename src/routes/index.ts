import express from 'express';
import userRouter from './user/index';
import postRouter from './post/index';

const router = express.Router();

router.use('/user', userRouter);
router.use('/post', postRouter);

export default router;
