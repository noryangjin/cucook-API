import Post from '../shemas/post';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import Comment from '../shemas/comment';

const {
  Types: { ObjectId },
} = mongoose;

export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.json(403, '로그인 필요');
  }
};

export const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    return res.json(403, '로그인한 상태입니다.');
  }
};

export const compareUser = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req.session.passport;
  try {
    const postUser = await Post.findById(id);
    if (postUser['writer'].toString() === user) {
      return next();
    } else {
      return res.json(401, '포스트 유저 정보와 로그인 유저 정보가 다릅니다.');
    }
  } catch (e) {
    return next(e);
  }
};

export const compareUserComment = async (req, res, next) => {
  const {
    params: { id },
    session: {
      passport: { user },
    },
  } = req;
  try {
    const commentUser = await Comment.findById(id);
    if (commentUser['commentWriter']['_id'].toString() === user) {
      return next();
    } else {
      return res.json(401, '댓글 유저 정보와 로그인 유저 정보가 다릅니다.');
    }
  } catch (e) {
    return next(e);
  }
};

export const checkObjectId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.sendStatus(400);
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.sendStatus(404);
    }
    return next();
  } catch (e) {
    return next(e);
  }
};

export const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
