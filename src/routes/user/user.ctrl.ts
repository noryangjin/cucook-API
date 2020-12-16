import User from '../../shemas/user';

export const register = async (req, res) => {
  const { username, hashedPassword } = req.body;
  const regi = new User({
    username,
    hashedPassword,
  });
  try {
    await regi.save();
  } catch (e) {
    res.sendStatus(500);
  }
};
