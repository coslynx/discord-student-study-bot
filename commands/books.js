const { SlashCommandBuilder } = require('discord.js');
const booksService = require('../services/booksService');
const logger = require('../utils/logger');
const permissionService = require('../services/permissionService');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('books')
    .setDescription('Search and discover books.')
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
    ),
  async execute(interaction) {
    try {
      await permissionService.checkPermissions(interaction, 'manageBooks');

      const subcommand = interaction.options.getSubcommand();

      switch (subcommand) {
        case 'search':
          const query = interaction.options.getString('query');

          const books = await booksService.searchBooks(query);

          if (books.length === 0) {
            await interaction.reply('No books found for this query.');
            return;
          }

          const bookList = books.map(book => `- ${book.title} by ${book.authors.join(', ')}`).join('\n');

          await interaction.reply(`Here are the books I found for your query \"${query}\":\n${bookList}`);

          logger.logCommand(interaction, `searched for books with query ${query}`);
          break;

        case 'recommend':
          // Implement book recommendation logic here
          // You can use OpenAI's API or other methods for recommending books based on user interests
          await interaction.reply('Book recommendation feature is coming soon!');
          logger.logCommand(interaction, 'requested book recommendations');
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