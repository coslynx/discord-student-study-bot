const databaseService = require('./databaseService');

const addNote = async (title, content, userId, guildId) => {
  try {
    const [rows] = await databaseService.execute(
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
    const [rows] = await databaseService.execute(
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
    await databaseService.execute(
      `UPDATE notes SET ${setClause} WHERE id = ?`,
      [...values, noteId]
    );
    return true;
  } catch (error) {
    console.error('Error updating note in database:', error);
    throw error;
  }
};

const deleteNote = async (noteId) => {
  try {
    await databaseService.execute('DELETE FROM notes WHERE id = ?', [noteId]);
    return true;
  } catch (error) {
    console.error('Error deleting note from database:', error);
    throw error;
  }
};

const searchNotes = async (query, userId) => {
  try {
    const [rows] = await databaseService.execute(
      'SELECT  FROM notes WHERE user_id = ? AND MATCH(title, content) AGAINST (? IN BOOLEAN MODE)',
      [userId, query]
    );
    return rows;
  } catch (error) {
    console.error('Error searching notes:', error);
    throw error;
  }
};

module.exports = {
  addNote,
  getNotes,
  updateNote,
  deleteNote,
  searchNotes,
};