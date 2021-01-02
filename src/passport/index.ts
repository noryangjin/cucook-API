import passport from 'passport';
import local from './localStrategy';
import User from '../shemas/user';

export default function () {
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.find({ where: { id } })
      .then((user) => done(null, user))
      .catch((e) => {
        return done(e);
      });
  });

  local();
}
