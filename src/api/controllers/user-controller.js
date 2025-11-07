import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  removeUser
} from '../models/user-model.js';

const getUsers = (req, res) => {
  res.json(listAllUsers());
}

const getUserById = (req, res) => {
  const user = findUserById(parseInt(req.params.id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('User not found');
  }
};

const postUser = (req, res) => {
  const result = addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'User added successfully'});
  } else {
    res.status(400).send('Could not add user');
  }
};

const putUser = (req, res) => {
  const updateData = updateUser(req.body, parseInt(req.params.id));
  if (updateData) {
    res.status(200)
    res.json({message: 'User item updated.'});
  } else {
    res.status(404).send('User not found');
  }
};

const deleteUser = (req, res) => {
  const result = removeUser(req.params.id);
  if (result) {
    res.status(200)
    res.json({message: 'User item deleted.'});
  } else {
    res.status(404).send('User not found');
  }
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
