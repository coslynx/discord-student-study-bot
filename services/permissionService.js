const databaseService = require('./databaseService');

const checkPermissions = async (interaction, permission) => {
  try {
    const userId = interaction.user.id;
    const guildId = interaction.guild.id;

    const user = await databaseService.getUser(userId, guildId);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.permissions.includes(permission)) {
      return true;
    } else {
      throw new Error(`You do not have permission to manage ${permission}`);
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: error.message, ephemeral: true });
    return false;
  }
};

module.exports = {
  checkPermissions,
};