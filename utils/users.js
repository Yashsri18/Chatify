let users = [];
export const userJoin = (id, username, room) => {
  const user = {
    socketId: id,
    room,
    username,
  };
  users.push(user);
  return user;
};

export const userLeave = (socketId) => {
  const index = users.findIndex((user) => user.socketId === socketId);
  if (index === -1) return;

  return users.splice(index, 1)[0];
};
export const getRoomUsers = (room) => users
  .filter((user) => user.room === room)
  .map((user) => ({ name: user.username }));

export const getCurrentUser = (id) => {
  return users.find((user) => user.socketId === id);
};
