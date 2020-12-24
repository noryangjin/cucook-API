import Post from '../shemas/post';

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
      next();
    } else {
      return res.json(401, '포스트 유저 정보와 로그인 유저 정보가 다릅니다.');
    }
  } catch (e) {
    next(e);
  }
};
