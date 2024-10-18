const mysql = require('mysql2');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('../config/database.config');

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

const getUser = async (userId, guildId) => {
  try {
    const [rows] = await pool.execute(
      'SELECT  FROM users WHERE user_id = ? AND guild_id = ?',
      [userId, guildId]
    );
    return rows[0];
  } catch (error) {
    console.error('Error getting user from database:', error);
    throw error;
  }
};

const getServer = async (guildId) => {
  try {
    const [rows] = await pool.execute('SELECT  FROM servers WHERE guild_id = ?', [guildId]);
    return rows[0];
  } catch (error) {
    console.error('Error getting server from database:', error);
    throw error;
  }
};

const createUser = async (userId, guildId, username, permissions) => {
  try {
    await pool.execute(
      'INSERT INTO users (user_id, guild_id, username, permissions) VALUES (?, ?, ?, ?)',
      [userId, guildId, username, permissions]
    );
    return true;
  } catch (error) {
    console.error('Error creating user in database:', error);
    throw error;
  }
};

const createServer = async (guildId) => {
  try {
    await pool.execute('INSERT INTO servers (guild_id) VALUES (?)', [guildId]);
    return true;
  } catch (error) {
    console.error('Error creating server in database:', error);
    throw error;
  }
};

const updateUser = async (userId, guildId, updates) => {
  try {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = keys
      .map((key, index) => `${key} = ?`)
      .join(', ');
    await pool.execute(
      `UPDATE users SET ${setClause} WHERE user_id = ? AND guild_id = ?`,
      [...values, userId, guildId]
    );
    return true;
  } catch (error) {
    console.error('Error updating user in database:', error);
    throw error;
  }
};

const updateServer = async (guildId, updates) => {
  try {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = keys
      .map((key, index) => `${key} = ?`)
      .join(', ');
    await pool.execute(`UPDATE servers SET ${setClause} WHERE guild_id = ?`, [...values, guildId]);
    return true;
  } catch (error) {
    console.error('Error updating server in database:', error);
    throw error;
  }
};

const deleteUser = async (userId, guildId) => {
  try {
    await pool.execute('DELETE FROM users WHERE user_id = ? AND guild_id = ?', [userId, guildId]);
    return true;
  } catch (error) {
    console.error('Error deleting user from database:', error);
    throw error;
  }
};

const deleteServer = async (guildId) => {
  try {
    await pool.execute('DELETE FROM servers WHERE guild_id = ?', [guildId]);
    return true;
  } catch (error) {
    console.error('Error deleting server from database:', error);
    throw error;
  }
};

const addNote = async (title, content, userId, guildId) => {
  try {
    const [rows] = await pool.execute(
      'INSERT INTO notes (title, content, user_id, guild_id) VALUES (?, ?, ?, ?)',
      [title, content, userId, guildId]
    );
    return rows.insertId;
  } catch (error) {
    console.error('Error adding note to database:', error);
    throw error;
  }
};

const getNotes = async (userId, guildId) => {
  try {
    const [rows] = await pool.execute(
      'SELECT  FROM notes WHERE user_id = ? AND guild_id = ?',
      [userId, guildId]
    );
    return rows;
  } catch (error) {
    console.error('Error getting notes from database:', error);
    throw error;
  }
};

const updateNote = async (noteId, updates) => {
  try {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = keys
      .map((key, index) => `${key} = ?`)
      .join(', ');
    await pool.execute(`UPDATE notes SET ${setClause} WHERE id = ?`, [...values, noteId]);
    return true;
  } catch (error) {
    console.error('Error updating note in database:', error);
    throw error;
  }
};

const deleteNote = async (noteId) => {
  try {
    await pool.execute('DELETE FROM notes WHERE id = ?', [noteId]);
    return true;
  } catch (error) {
    console.error('Error deleting note from database:', error);
    throw error;
  }
};

const addResource = async (url, topic, description, userId, guildId) => {
  try {
    const [rows] = await pool.execute(
      'INSERT INTO resources (url, topic, description, user_id, guild_id) VALUES (?, ?, ?, ?, ?)',
      [url, topic, description, userId, guildId]
    );
    return rows.insertId;
  } catch (error) {
    console.error('Error adding resource to database:', error);
    throw error;
  }
};

const getResources = async (guildId) => {
  try {
    const [rows] = await pool.execute('SELECT  FROM resources WHERE guild_id = ?', [guildId]);
    return rows;
  } catch (error) {
    console.error('Error getting resources from database:', error);
    throw error;
  }
};

const updateResource = async (resourceId, updates) => {
  try {
    const keys = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = keys
      .map((key, index) => `${key} = ?`)
      .join(', ');
    await pool.execute(`UPDATE resources SET ${setClause} WHERE id = ?`, [...values, resourceId]);
    return true;
  } catch (error) {
    console.error('Error updating resource in database:', error);
    throw error;
  }
};

const deleteResource = async (resourceId) => {
  try {
    await pool.execute('DELETE FROM resources WHERE id = ?', [resourceId]);
    return true;
  } catch (error) {
    console.error('Error deleting resource from database:', error);
    throw error;
  }
};

const createGroup = async (groupName, groupDescription, userId, guildId) => {
  try {
    const [rows] = await pool.execute(
      'INSERT INTO groups (name, description, creator_id, guild_id) VALUES (?, ?, ?, ?)',
      [groupName, groupDescription, userId, guildId]
    );
    return rows.insertId;
  } catch (error) {
    console.error('Error creating group in database:', error);
    throw error;
  }
};

const getGroup = async (groupId) => {
  try {
    const [rows] = await pool.execute('SELECT  FROM groups WHERE id = ?', [groupId]);
    return rows[0];
  } catch (error) {
    console.error('Error getting group from database:', error);
    throw error;
  }
};

const joinGroup = async (groupId, userId) => {
  try {
    await pool.execute('INSERT INTO group_members (group_id, user_id) VALUES (?, ?)', [groupId, userId]);
    return true;
  } catch (error) {
    console.error('Error joining group in database:', error);
    throw error;
  }
};

const leaveGroup = async (groupId, userId) => {
  try {
    await pool.execute('DELETE FROM group_members WHERE group_id = ? AND user_id = ?', [groupId, userId]);
    return true;
  } catch (error) {
    console.error('Error leaving group in database:', error);
    throw error;
  }
};

const getGroupMembers = async (groupId) => {
  try {
    const [rows] = await pool.execute(
      'SELECT user_id FROM group_members WHERE group_id = ?',
      [groupId]
    );
    return rows.map(row => row.user_id);
  } catch (error) {
    console.error('Error getting group members from database:', error);
    throw error;
  }
};

module.exports = {
  getUser,
  getServer,
  createUser,
  createServer,
  updateUser,
  updateServer,
  deleteUser,
  deleteServer,
  addNote,
  getNotes,
  updateNote,
  deleteNote,
  addResource,
  getResources,
  updateResource,
  deleteResource,
  createGroup,
  getGroup,
  joinGroup,
  leaveGroup,
  getGroupMembers,
};