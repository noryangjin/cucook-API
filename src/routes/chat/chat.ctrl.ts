import ChatRoom from '../../shemas/chatRoom';
import Chat from '../../shemas/chat';
import bcrypt from 'bcrypt';

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
    const hash = await bcrypt.hash(password, 12);

    const create = new ChatRoom({
      title,
      max,
      owner: user,
      password: hash,
    });

    await create.save();

    res.json('방 생성 완료');
  } catch (e) {
    next(e);
  }
};
