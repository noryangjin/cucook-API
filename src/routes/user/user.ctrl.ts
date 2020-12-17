import User from '../../shemas/user';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';

export const register = async (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const { username, password } = req.body;

  try {
    const exUser = await User.findOne({ username });
    if (exUser) {
      res.status(409).json('계정 중복');
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
