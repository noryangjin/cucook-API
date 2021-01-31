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
import fs from 'fs';
import path from 'path';
import webSocket from './socket';
import helmet from 'helmet';

const app: express.Application = express();
const session_option: object = {
  resave: false,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};
const port: number = Number(process.env.PORT) || 4000;

fs.readdir('uploads', (error) => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

passportConfig();
connect();
app.use(helmet());
app.use(
  cors({
    origin: 'http://www.cucook.net:3000/',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use('/img', express.static(path.join(__dirname, '../uploads')));
app.use(
  express.json({
    limit: '50mb',
  })
);
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session(session_option));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

app.use((_, __, next) => {
  next(new Error('없는 경로입니다.'));
});

app.use((err, res) => {
  res.json(err);
});

const server = app.listen(port, () => {
  console.log(`${port}에 연결`);
});

webSocket(server, app);
