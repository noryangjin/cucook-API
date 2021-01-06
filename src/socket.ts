const socketIO = require('socket.io');

const webSocket = (server, app, sessionOption) => {
  const io = socketIO(server, {
    path: '/socket.io',
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip =
      req.headers['x-forwarded-for'] ||
      (req.connection && req.connection.remoteAddress) ||
      '';

    console.log('새로운 클라이언트 접속', ip, socket.id);

    socket.on('error', (error) => {
      console.error(error);
    });

    socket.on('reply', (data) => {
      console.log(data);
      socket.emit('news', data);
    });
  });
};

export default webSocket;
