const { format } = require('date-fns');
const { logLevels } = require('../config/env.config');

const logEvent = (message, level = logLevels.INFO) => {
  const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
};

const logCommand = (interaction, action = 'executed') => {
  const user = interaction.user;
  const command = interaction.commandName;
  const guild = interaction.guild;
  const channel = interaction.channel;
  const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  console.log(
    `[${timestamp}] [COMMAND] User: ${user.tag} (${user.id}) Guild: ${guild.name} (${guild.id}) Channel: ${channel.name} (${channel.id}) Command: ${command} (${action})`
  );
};

const logError = (error, interaction) => {
  const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  console.error(`[${timestamp}] [ERROR] ${error.message}`);
  if (interaction) {
    logCommand(interaction, 'error');
  }
};

module.exports = {
  logEvent,
  logCommand,
  logError,
};