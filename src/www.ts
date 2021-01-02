import app from './app';
require('dotenv').config();

const port: number = Number(process.env.PORT) || 4000;

const server = app.listen(port, () => {
  console.log(`${port}에 연결`);
});

export default server;
