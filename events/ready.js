const { Client, Intents } = require('discord.js');
const { token } = require('./config/env.config');
const logger = require('./utils/logger');
const commandHandler = require('./utils/commandHandler');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  logger.logEvent(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Helping students learn!', { type: 'STREAMING', url: 'https://www.twitch.tv/spectracodes' });
  
  // Load all commands
  const commands = client.commands;
  commands.forEach(command => client.application.commands.create(command.data));
});

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    try {
      await commandHandler.handleCommand(interaction);
      logger.logCommand(interaction);
    } catch (error) {
      console.error('Error executing command:', error);
      await interaction.reply({ content: 'An error occurred. Please try again later.', ephemeral: true });
    }
  }
});

client.login(token);