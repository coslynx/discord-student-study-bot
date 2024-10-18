const logger = require('./logger');

const handleError = (error, interaction, message) => {
  logger.logError(error, interaction || message);

  if (interaction) {
    interaction.reply({ content: 'An error occurred. Please try again later.', ephemeral: true });
  } else if (message) {
    message.reply('An error occurred. Please try again later.');
  }
};

module.exports = {
  handleError,
};