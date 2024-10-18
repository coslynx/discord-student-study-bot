const { SlashCommandBuilder } = require('discord.js');
const resourcesService = require('../services/resourcesService');
const logger = require('../utils/logger');
const permissionService = require('../services/permissionService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resources')
    .setDescription('Find and share study resources.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('search')
        .setDescription('Search for study resources by topic.')
        .addStringOption(option =>
          option
            .setName('topic')
            .setDescription('Topic of the resources')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('upload')
        .setDescription('Upload a study resource.')
        .addAttachmentOption(option =>
          option
            .setName('resource')
            .setDescription('The study resource to upload')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('topic')
            .setDescription('Topic of the resource')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('description')
            .setDescription('Description of the resource')
        )
    ),
  async execute(interaction) {
    try {
      await permissionService.checkPermissions(interaction, 'manageResources');

      const subcommand = interaction.options.getSubcommand();

      switch (subcommand) {
        case 'search':
          const topic = interaction.options.getString('topic');

          const resources = await resourcesService.getResourcesByTopic(topic);

          if (resources.length === 0) {
            await interaction.reply('No resources found for this topic.');
            return;
          }

          const resourceList = resources.map(resource => `- ${resource.title} (${resource.url})`).join('\n');

          await interaction.reply(`Here are the resources I found for the topic "${topic}":\n${resourceList}`);

          logger.logCommand(interaction, `searched for resources with topic ${topic}`);
          break;

        case 'upload':
          const resource = interaction.options.getAttachment('resource');
          const topic = interaction.options.getString('topic');
          const description = interaction.options.getString('description') || '';

          const uploadedResource = await resourcesService.uploadResource(
            resource.url,
            topic,
            description,
            interaction.user.id
          );

          await interaction.reply(`Successfully uploaded resource "${uploadedResource.title}" for the topic "${topic}"`);

          logger.logCommand(interaction, `uploaded resource ${resource.url} for topic ${topic}`);
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