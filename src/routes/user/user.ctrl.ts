import User from '../../shemas/user';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import passport from 'passport';

export const register = async (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.json(400, result.error);
    return;
  }

  const { username, password } = req.body;

  try {
    const exUser = await User.findOne({ username });
    if (exUser) {
      res.json(409, '계정 중복');
      return;
    } else {
      const hash = await bcrypt.hash(password, 12);
      const regi = new User({
        username,
        password: hash,
      });

      await regi.save();
      const data = regi.toJSON();
      delete data['password'];
      res.json(data);
    }
  } catch (e) {
    return next(e);
  }
};

export const login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      return next(authError);
    }

    if (!user) {
      return res.json(401, info.message);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }
      res.json('로그인 성공');
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.json('로그아웃 성공');
};
