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
