const { Client, Intents } = require('discord.js');
const commandHandler = require('../utils/commandHandler');
const logger = require('../utils/logger');

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message) {
    try {
      if (message.author.bot) return;

      if (message.content.startsWith('!study')) {
        await commandHandler.handleCommand(message);
        logger.logCommand(message);
      }
    } catch (error) {
      console.error(`Error in 'messageCreate' event:`, error);
    }
  },
};