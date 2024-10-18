const { SlashCommandBuilder } = require('discord.js');
const commandHandler = require('../utils/commandHandler');
const logger = require('../utils/logger');
const authenticationService = require('../services/authenticationService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View a list of available commands and their descriptions.'),
  async execute(interaction) {
    try {
      await authenticationService.authenticate(interaction);
      const helpMessage = `Available Commands:\n\n`;

      // Generate command list dynamically
      const commands = interaction.client.commands;
      for (const command of commands.values()) {
        helpMessage += `- \`${command.data.name}\`: ${command.data.description}\n`;
      }

      await interaction.reply(helpMessage);
      logger.logCommand(interaction, 'requested help');
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'An error occurred. Please try again later.', ephemeral: true });
    }
  },
};