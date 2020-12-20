require('dotenv').config();
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';
import connect from './shemas/index';
import apiRouter from './routes/index';
import passport from 'passport';
import passportConfig from './passport/index';
import cors from 'cors';

const app: express.Application = express();
class middleWare {
  private initMiddleWare(session_option) {
    passportConfig();
    connect();
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(session(session_option));
    app.use(passport.initialize());
    app.use(passport.session());
  }

  constructor(session_option: object) {
    this.initMiddleWare(session_option);
  }
}
class router {
  private initRouters(_req, _res) {
    app.use('/api', apiRouter);
  }

  constructor(req: any, res: any) {
    this.initRouters(req, res);
  }
}

const session_option: object = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};

new middleWare(session_option);
new router(express.request, express.response);

app.use((_, __, next) => {
  next(new Error('없는 경로입니다.'));
});

app.use((err, res) => {
  res.json(err);
});

export default app;
