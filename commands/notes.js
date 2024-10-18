const { SlashCommandBuilder } = require('discord.js');
const notesService = require('../services/notesService');
const logger = require('../utils/logger');
const permissionService = require('../services/permissionService');

module.exports = {
  data: new SlashCommandBuilder()
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
    ),
  async execute(interaction) {
    try {
      await permissionService.checkPermissions(interaction, 'manageNotes');

      const subcommand = interaction.options.getSubcommand();

      switch (subcommand) {
        case 'add':
          const title = interaction.options.getString('title');
          const content = interaction.options.getString('content');

          const newNote = await notesService.addNote(title, content, interaction.user.id);

          await interaction.reply(`Successfully added note: ${title}`);

          logger.logCommand(interaction, `added note ${title}`);
          break;

        case 'search':
          const query = interaction.options.getString('query');

          const notes = await notesService.searchNotes(query, interaction.user.id);

          if (notes.length === 0) {
            await interaction.reply('No notes found for this query.');
            return;
          }

          const noteList = notes.map(note => `- ${note.title}: ${note.content}`).join('\n');

          await interaction.reply(`Here are the notes I found for your query "${query}":\n${noteList}`);

          logger.logCommand(interaction, `searched for notes with query ${query}`);
          break;

        case 'delete':
          const noteId = interaction.options.getString('id');

          await notesService.deleteNote(noteId, interaction.user.id);

          await interaction.reply(`Successfully deleted note with ID: ${noteId}`);

          logger.logCommand(interaction, `deleted note with ID ${noteId}`);
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