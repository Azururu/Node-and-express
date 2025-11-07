const users = [
  {
    user_id: 2,
    name: 'Michael Herrera',
    username: 'micherrera',
    email: 'michael@metropolia.fi',
    role: 'user',
    password: 'f3kg3g0a03!',
  },
  {
    user_id: 1,
    name: 'Sebastian Padilla',
    username: 'sebastian-padilla',
    email: 'sebastian@metropolia.fi',
    role: 'user',
    password: 'fkejk31kl149g!@',
  }
];

const listAllUsers = () => {
  return users;
};

const findUserById = id => {
  return users.find(user => user.user_id === id);
};

const addUser = user => {
  const {name, username, email, role, password} = user;
  const newId = users[0].user_id + 1;
  users.unshift({user_id: newId, name, username, email, role, password});
  return {user_id: newId};
};

const updateUser = (data, id) => {
  const index = users.findIndex(user => user.user_id === id);
  users[index] = {
    ...users[index],
    ...data,
    user_id: id
  }
  return users[index];
}

const removeUser = id => {
  const index = users.findIndex(user => user.user_id === id);
  users.splice(index, 1);
  return true;
}

export {listAllUsers, findUserById, addUser, updateUser, removeUser};
