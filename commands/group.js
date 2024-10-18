const { SlashCommandBuilder } = require('discord.js');
const groupService = require('../services/groupService');
const permissionService = require('../services/permissionService');
const logger = require('../utils/logger');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('group')
    .setDescription('Manage study groups.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('create')
        .setDescription('Create a new study group.')
        .addStringOption(option =>
          option
            .setName('name')
            .setDescription('Name of the study group')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('description')
            .setDescription('Description of the study group')
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('join')
        .setDescription('Join an existing study group.')
        .addStringOption(option =>
          option
            .setName('group_id')
            .setDescription('ID of the group to join')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('leave')
        .setDescription('Leave a study group.')
        .addStringOption(option =>
          option
            .setName('group_id')
            .setDescription('ID of the group to leave')
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    try {
      await permissionService.checkPermissions(interaction, 'manageGroups');

      const subcommand = interaction.options.getSubcommand();

      switch (subcommand) {
        case 'create':
          const groupName = interaction.options.getString('name');
          const groupDescription = interaction.options.getString('description');

          const createdGroup = await groupService.createGroup(groupName, groupDescription, interaction.user.id);

          await interaction.reply(`Successfully created group ${groupName}`);

          logger.logCommand(interaction, `created group ${groupName}`);
          break;

        case 'join':
          const groupId = interaction.options.getString('group_id');

          await groupService.joinGroup(groupId, interaction.user.id);

          await interaction.reply(`Successfully joined group with ID: ${groupId}`);

          logger.logCommand(interaction, `joined group ${groupId}`);
          break;

        case 'leave':
          const leaveGroupId = interaction.options.getString('group_id');

          await groupService.leaveGroup(leaveGroupId, interaction.user.id);

          await interaction.reply(`Successfully left group with ID: ${leaveGroupId}`);

          logger.logCommand(interaction, `left group ${leaveGroupId}`);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'An error occurred. Please try again later.', ephemeral: true });
    }
  },
};