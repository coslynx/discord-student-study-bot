const databaseService = require('./databaseService');

const createGroup = async (groupName, groupDescription, userId, guildId) => {
  try {
    const [rows] = await databaseService.execute(
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
    const [rows] = await databaseService.execute('SELECT  FROM groups WHERE id = ?', [groupId]);
    return rows[0];
  } catch (error) {
    console.error('Error getting group from database:', error);
    throw error;
  }
};

const joinGroup = async (groupId, userId) => {
  try {
    await databaseService.execute('INSERT INTO group_members (group_id, user_id) VALUES (?, ?)', [groupId, userId]);
    return true;
  } catch (error) {
    console.error('Error joining group in database:', error);
    throw error;
  }
};

const leaveGroup = async (groupId, userId) => {
  try {
    await databaseService.execute('DELETE FROM group_members WHERE group_id = ? AND user_id = ?', [groupId, userId]);
    return true;
  } catch (error) {
    console.error('Error leaving group in database:', error);
    throw error;
  }
};

const getGroupMembers = async (groupId) => {
  try {
    const [rows] = await databaseService.execute(
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
  createGroup,
  getGroup,
  joinGroup,
  leaveGroup,
  getGroupMembers,
};