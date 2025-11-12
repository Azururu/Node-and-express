import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  removeUser
} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
  const loggedUser = res.locals.user;
  try {
    if (loggedUser.role !== 'admin') {
      return res.status(401).send({message: 'No permission.'})
    }
    res.json(await listAllUsers());
  } catch (error) {
    return res.status(401).send({message: error.message});
  }
}

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  const loggedUser = res.locals.user;
  try {
    if (loggedUser.user_id !== userId && loggedUser.role !== 'admin') {
      return res.status(401).send({message: 'No permission.'})
    }
    const user = await findUserById(userId);
    if (!user) {
      return res.status(401).send({message: 'No user found.'})
    }
    res.status(200).json({message: 'User found.', user});
  } catch (error) {
    return res.status(500).send({message: error.message});
  }
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  if (result) {
    res.status(201);
    res.json({message: 'User added successfully'});
  } else {
    res.status(400).send('Could not add user');
  }
};

const putUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const loggedUser = res.locals.user;
  try {
    const user = await findUserById(userId);
    if (!user) return res.status(404).send('User not found');
    if (loggedUser.user_id !== userId && loggedUser.role !== 'admin') {
      return res.status(403).send('No permission');
    }
    console.log(req.body);
    const updateData = await updateUser(req.body, userId);
    res.status(200).json({ message: 'User item updated.', updateData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user.', error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const loggedUser = res.locals.user;
  try {
    const user = await findUserById(parseInt(req.params.id));
    if (!user) {
      return res.status(404).send('User not found');
    }
    if (loggedUser.user_id !== userId && loggedUser.role !== 'admin') {
      return res.status(401).send('No permission');
    }

    const result = await removeUser(userId, loggedUser.user_id, loggedUser.role);
    res.status(200).json({message: 'User removed successfully', result});
  } catch (error) {
    res.status(500).send('Error deleting user', {message: error.message});
  }
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
