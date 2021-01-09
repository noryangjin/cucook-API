import ChatRoom from '../../shemas/chatRoom';
import Chat from '../../shemas/chat';
import bcrypt from 'bcrypt';
import Post from '../../shemas/post';

export const readRoomList = async (req, res, next) => {
  try {
    const roomList = await ChatRoom.find();

    res.json(roomList);
  } catch (e) {
    next(e);
  }
};

export const roomCreate = async (req, res, next) => {
  try {
    const { user } = req.session.passport;
    const { title, max, password } = req.body;
    const hash = password ? await bcrypt.hash(password, 12) : password;

    const create = new ChatRoom({
      title,
      max,
      owner: user,
      password: hash,
      participants: user,
    });

    const data = await create.save();

    res.json(data._id);
  } catch (e) {
    next(e);
  }
};

export const readRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { password } = req.body;

    const room = await ChatRoom.findById(roomId);
    const io = req.app.get('io');

    console.log('리드룸!!!!!!!!!!!!!11');

    if (!room) {
      res.sendStatus(404);
      return;
    }
    if (room['password'] && room['password'] !== password) {
      res.sendStatus(401);
      return;
    }
    const { rooms } = io.of('/chat').adapter;

    if (rooms && rooms[roomId] && room['max'] < rooms[roomId].length) {
      console.log('허용인원 초과!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1');
    }
  } catch (e) {
    next(e);
  }
};

export const roomJoin = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { user } = req.session.passport;

    const room = await ChatRoom.findById(roomId);
    if (!room) {
      return res.sendStatus(404);
    }

    if (room) {
      room['participants'].push(user);
      await room.save();
      res.json('방 참여');
    }
  } catch (e) {
    next(e);
  }
};

export const leaveRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const { user } = req.session.passport;

    const room = await ChatRoom.findById(roomId);

    if (!room) {
      return res.sendStatus(404);
    }

    if (room) {
      const index = room['participants'].indexOf(user);
      room['participants'].splice(index, 1);
      await room.save();
      res.json('방 Leave');
    }
  } catch (e) {
    next(e);
  }
};
