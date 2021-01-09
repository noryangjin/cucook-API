const socketIO = require('socket.io');
import axios from 'axios';

const webSocket = (server, app) => {
  const io = socketIO(server, {
    path: '/socket.io',
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  app.set('io', io);

  const chat = io.of('/chat');

  // io.use((socket, next) => {
  //   sessionOption(socket.request, socket.request.res, next);
  // });

  chat.on('connection', (socket) => {
    const req = socket.request;

    console.log('reqreqreqw', req.session);
    console.log('chat 네임스페이스에 접속');

    socket.on('con', (data) => {
      app.set('data', data);
      const roomId = data.roomId;
      const username = data.user.username;
      console.log('data', data);

      socket.join(roomId);
      socket.emit('create', {
        chat: `${username}님이 접속 하셨습니다.`,
      });

      socket.to(roomId).emit('join', {
        chat: `${username}님이 접속 하셨습니다.!`,
      });
    });

    socket.on('disconnect', () => {
      const data = app.get('data');
      console.log('chat 종료!!!!');
      data && socket.leave(data.roomId);
    });
  });
};

export default webSocket;
