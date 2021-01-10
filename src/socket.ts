const socketIO = require('socket.io');
import { addUser, removeUser, getUser, getUsersInRoom } from './socket_user';

const webSocket = (server, app) => {
  const io = socketIO(server, {
    path: '/socket.io',
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  app.set('io', io);

  const chat = io.of('/chat');

  chat.on('connect', (socket) => {
    console.log('chat 네임스페이스 접속');
    socket.on('join', (data, callback) => {
      app.set('data', data);
      const room = data.roomId;
      const name = data.user.username;
      console.log(room, name);
      const { error, user } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);
      socket.join(user.room);
      socket.emit('message', {
        chat: `${name}님이 접속 하셨습니다!`,
      });
      socket.broadcast
        .to(user.room)
        .emit('message', { chat: `${name}님이 접속 하셨습니다!` });

      callback();
    });

    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
      chat.to(user.room).emit('message', { user: user.name, text: message });

      callback();
    });

    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
      if (user) {
        chat.to(user.room).emit('message', { text: `${user.name} has left.` });
        chat.to(user.room).emit('roomData', {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
        socket.leave(user.room);
      }
    });
  });
};

export default webSocket;
