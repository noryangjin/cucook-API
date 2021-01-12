const users = [];

export const addUser = ({ id, name, room }) => {
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room)
    return { error: '유저 이름 또는 방 정보를 확인 해주세요' };
  if (existingUser) return { error: '이미 존재합니다.' };

  const user = { id, name, room };

  users.push(user);

  return { user };
};

export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

export const getUser = (id) => users.find((user) => user.id === id);
