require('dotenv').config();
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import morgan from 'morgan';

const app: express.Application = express();

class middleWare {
  private initMiddleWare(session_option) {
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser(process.env.COOKIE_SECRET));
    app.use(session(session_option));
  }

  constructor(session_option: object) {
    this.initMiddleWare(session_option);
  }
}
class router {
  private initRouters(_req, _res) {
    app.get('/', (req, res) => {
      return res.send('aa');
    });
    app.use('/a', (req, res) => {
      return res.send('aaa');
    });
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

export default app;
