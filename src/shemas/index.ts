import { timeStamp } from 'console';
import mongoose from 'mongoose';
require('dotenv').config();

export default function () {
  const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }

    mongoose
      .connect(process.env.MONGO_URI, {
        dbName: 'cucook',
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then(() => console.log('몽고디비 연결 성공'))
      .catch((e) => console.error('에러 발생', e));
  };

  connect();

  mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 재시도');
    connect();
  });
}
