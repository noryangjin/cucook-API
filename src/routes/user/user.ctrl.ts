import User from '../../shemas/user';
import Post from '../../shemas/post';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import passport from 'passport';

export const register = async (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(3).max(12).required(),
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

export const check = async (req, res, next) => {
  try {
    if (!req.user || !req.session) {
      res.sendStatus(401);
      return;
    }
    const { user } = req.session.passport;
    const data = await User.findById(user);
    const result = data.toJSON();
    delete result['password'];
    res.json(result);
  } catch (e) {
    next(e);
  }
};

export const userInfo = async (req, res, next) => {
  try {
    const {
      params: { username },
    } = req;
    const user = await User.find({ username: username });
    if (user.length === 0) {
      return res.sendStatus(404);
    }
    const userPost = await Post.find({ writer: user[0]._id }).sort({
      publishedDate: -1,
    });
    const result = userPost.map((post) => {
      const data = post.toJSON();
      delete data['body'];
      delete data['comments'];
      delete data['ingredients'];
      delete data['tags'];
      return data;
    });
    res.json(result);
  } catch (e) {
    next(e);
  }
};
