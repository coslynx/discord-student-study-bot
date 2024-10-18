const { SlashCommandBuilder } = require('discord.js');
const commandHandler = require('../utils/commandHandler');
const logger = require('../utils/logger');
const authenticationService = require('../services/authenticationService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('study')
    .setDescription('Access study materials, manage notes, find books, and more!')
    .addSubcommand(subcommand =>
      subcommand
        .setName('help')
        .setDescription('View a list of available commands and their descriptions.')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('notes')
        .setDescription('Manage your study notes.')
        .addSubcommand(subcommand =>
          subcommand
            .setName('add')
            .setDescription('Add a new note.')
            .addStringOption(option =>
              option
                .setName('title')
                .setDescription('Title of the note')
                .setRequired(true)
            )
            .addStringOption(option =>
              option
                .setName('content')
                .setDescription('Content of the note')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
          subcommand
            .setName('search')
            .setDescription('Search for your notes.')
            .addStringOption(option =>
              option
                .setName('query')
                .setDescription('Search query for your notes')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
          subcommand
            .setName('delete')
            .setDescription('Delete a note.')
            .addStringOption(option =>
              option
                .setName('id')
                .setDescription('ID of the note to delete')
                .setRequired(true)
            )
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('books')
        .setDescription('Search for books.')
        .addSubcommand(subcommand =>
          subcommand
            .setName('search')
            .setDescription('Search for books by title or author.')
            .addStringOption(option =>
              option
                .setName('query')
                .setDescription('Search query for books')
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand =>
          subcommand
            .setName('recommend')
            .setDescription('Get recommendations for books based on your interests.')
        )
    )
    .addSubcommand(subcommand =>
      subcommand
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
        )
    )
    .addSubcommand(subcommand =>
      subcommand
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
        )
    ),
  async execute(interaction) {
    try {
      await authenticationService.authenticate(interaction);
      await commandHandler.handleCommand(interaction);
      logger.logCommand(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'An error occurred. Please try again later.', ephemeral: true });
    }
  },
};