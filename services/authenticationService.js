const databaseService = require('./databaseService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env.config');

const authenticate = async (interaction) => {
  try {
    const userId = interaction.user.id;
    const guildId = interaction.guild.id;

    const user = await databaseService.getUser(userId, guildId);

    if (!user) {
      throw new Error('User not found. Please register first.');
    }

    return true;
  } catch (error) {
    console.error('Error authenticating user:', error);
    await interaction.reply({ content: error.message, ephemeral: true });
    throw error;
  }
};

const registerUser = async (username, password, guildId) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = 'your_user_id'; // Implement logic to generate a unique user ID
    await databaseService.createUser(userId, guildId, username, hashedPassword);
    return true;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

const loginUser = async (username, password, guildId) => {
  try {
    const user = await databaseService.getUserByUsername(username, guildId);

    if (!user) {
      throw new Error('User not found.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect password.');
    }

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });

    return token;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

module.exports = {
  authenticate,
  registerUser,
  loginUser,
};