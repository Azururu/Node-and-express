import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  removeUser
} from '../models/user-model.js';

const getUsers = async (req, res) => {
  res.json(await listAllUsers());
}

const getUserById = async (req, res) => {
  const user = await findUserById(parseInt(req.params.id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send('User not found');
  }
};

const postUser = async (req, res) => {
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'User added successfully'});
  } else {
    res.status(400).send('Could not add user');
  }
};

const putUser = async (req, res) => {
  const updateData = await updateUser(req.body, parseInt(req.params.id));
  if (updateData) {
    res.status(200)
    res.json({message: 'User item updated.'});
  } else {
    res.status(404).send('User not found');
  }
};

const deleteUser = async (req, res) => {
  const result = await removeUser(req.params.id);
  if (result) {
    res.status(200)
    res.json({message: 'User item deleted.'});
  } else {
    res.status(404).send('User not found');
  }
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
