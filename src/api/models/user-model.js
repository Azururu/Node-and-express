import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const result = await promisePool.execute('SELECT * FROM wsk_users');
  const rows = result[0];
  return rows;
};

const findUserById = async id => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users WHERE user_id = ?', [id]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async user => {
  const {name, username, email, password, role} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)`;
  const params = [name, username, email, password, role];
  const result = await promisePool.execute(sql, params);
  console.log('result', result);
  if (result[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const updateUser = async (data, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [data, id]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
}

const removeUser = async id => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const sql = connection.format('DELETE FROM wsk_users WHERE user_id = ?', [id]);
    const [result] = await connection.execute(sql);

    if (result.affectedRows === 0) {
      return {message: 'User not deleted'};
    }

    await connection.commit();
    return {message: 'success'};
  } catch (error) {
    await connection.rollback();
    console.error(error);
    return {message: error.message};
  } finally {
    connection.release();
  }
};

export {listAllUsers, findUserById, addUser, updateUser, removeUser};
