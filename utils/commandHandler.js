const { Message, Interaction } = require('discord.js');
const notesService = require('../services/notesService');
const booksService = require('../services/booksService');
const resourcesService = require('../services/resourcesService');
const groupService = require('../services/groupService');
const logger = require('../utils/logger');
const permissionService = require('../services/permissionService');
const errorHandler = require('../utils/errorHandler');

const handleCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let message;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      message = interaction.options.getSubcommand();
    } else if (interactionOrMessage instanceof Message) {
      message = interactionOrMessage.content.split(' ')[1];
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    switch (message) {
      case 'notes':
        await handleNotesCommand(interactionOrMessage);
        break;
      case 'books':
        await handleBooksCommand(interactionOrMessage);
        break;
      case 'resources':
        await handleResourcesCommand(interactionOrMessage);
        break;
      case 'group':
        await handleGroupCommand(interactionOrMessage);
        break;
      default:
        throw new Error('Invalid command. Please refer to the help command for available options.');
    }
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleNotesCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let message;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      message = interaction.options.getSubcommand();
    } else if (interactionOrMessage instanceof Message) {
      message = interactionOrMessage.content.split(' ')[2];
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    switch (message) {
      case 'add':
        await handleNotesAddCommand(interactionOrMessage);
        break;
      case 'search':
        await handleNotesSearchCommand(interactionOrMessage);
        break;
      case 'delete':
        await handleNotesDeleteCommand(interactionOrMessage);
        break;
      default:
        throw new Error('Invalid note command. Please refer to the help command for available options.');
    }
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleNotesAddCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let title;
    let content;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      title = interaction.options.getString('title');
      content = interaction.options.getString('content');
    } else if (interactionOrMessage instanceof Message) {
      title = interactionOrMessage.content.split(' ')[3];
      content = interactionOrMessage.content.slice(interactionOrMessage.content.indexOf(title) + title.length).trim();
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    const newNote = await notesService.addNote(title, content, interaction.user.id);

    await interaction.reply(`Successfully added note: ${title}`);
    logger.logCommand(interaction, `added note ${title}`);
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleNotesSearchCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let query;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      query = interaction.options.getString('query');
    } else if (interactionOrMessage instanceof Message) {
      query = interactionOrMessage.content.slice(interactionOrMessage.content.indexOf('search') + 6).trim();
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    const notes = await notesService.searchNotes(query, interaction.user.id);

    if (notes.length === 0) {
      await interaction.reply('No notes found for this query.');
      return;
    }

    const noteList = notes.map(note => `- ${note.title}: ${note.content}`).join('\n');

    await interaction.reply(`Here are the notes I found for your query "${query}":\n${noteList}`);
    logger.logCommand(interaction, `searched for notes with query ${query}`);
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleNotesDeleteCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let noteId;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      noteId = interaction.options.getString('id');
    } else if (interactionOrMessage instanceof Message) {
      noteId = interactionOrMessage.content.split(' ')[3];
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    await notesService.deleteNote(noteId, interaction.user.id);

    await interaction.reply(`Successfully deleted note with ID: ${noteId}`);
    logger.logCommand(interaction, `deleted note with ID ${noteId}`);
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleBooksCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let message;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      message = interaction.options.getSubcommand();
    } else if (interactionOrMessage instanceof Message) {
      message = interactionOrMessage.content.split(' ')[2];
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    switch (message) {
      case 'search':
        await handleBooksSearchCommand(interactionOrMessage);
        break;
      case 'recommend':
        await handleBooksRecommendCommand(interactionOrMessage);
        break;
      default:
        throw new Error('Invalid book command. Please refer to the help command for available options.');
    }
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleBooksSearchCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let query;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      query = interaction.options.getString('query');
    } else if (interactionOrMessage instanceof Message) {
      query = interactionOrMessage.content.slice(interactionOrMessage.content.indexOf('search') + 6).trim();
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    const books = await booksService.searchBooks(query);

    if (books.length === 0) {
      await interaction.reply('No books found for this query.');
      return;
    }

    const bookList = books.map(book => `- ${book.title} by ${book.authors.join(', ')}`).join('\n');

    await interaction.reply(`Here are the books I found for your query "${query}":\n${bookList}`);
    logger.logCommand(interaction, `searched for books with query ${query}`);
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleBooksRecommendCommand = async (interactionOrMessage) => {
  try {
    await interaction.reply('Book recommendation feature is coming soon!');
    logger.logCommand(interaction, 'requested book recommendations');
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleResourcesCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let message;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      message = interaction.options.getSubcommand();
    } else if (interactionOrMessage instanceof Message) {
      message = interactionOrMessage.content.split(' ')[2];
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    switch (message) {
      case 'search':
        await handleResourcesSearchCommand(interactionOrMessage);
        break;
      case 'upload':
        await handleResourcesUploadCommand(interactionOrMessage);
        break;
      default:
        throw new Error('Invalid resource command. Please refer to the help command for available options.');
    }
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleResourcesSearchCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let topic;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      topic = interaction.options.getString('topic');
    } else if (interactionOrMessage instanceof Message) {
      topic = interactionOrMessage.content.slice(interactionOrMessage.content.indexOf('search') + 6).trim();
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    const resources = await resourcesService.getResourcesByTopic(topic);

    if (resources.length === 0) {
      await interaction.reply('No resources found for this topic.');
      return;
    }

    const resourceList = resources.map(resource => `- ${resource.title} (${resource.url})`).join('\n');

    await interaction.reply(`Here are the resources I found for the topic "${topic}":\n${resourceList}`);
    logger.logCommand(interaction, `searched for resources with topic ${topic}`);
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleResourcesUploadCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let resource;
    let topic;
    let description;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      resource = interaction.options.getAttachment('resource');
      topic = interaction.options.getString('topic');
      description = interaction.options.getString('description') || '';
    } else if (interactionOrMessage instanceof Message) {
      // Handle getting resource URL, topic, and description from message content
      // ... (Logic to extract information from the message) ...
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    const uploadedResource = await resourcesService.uploadResource(
      resource.url,
      topic,
      description,
      interaction.user.id
    );

    await interaction.reply(`Successfully uploaded resource "${uploadedResource.title}" for the topic "${topic}"`);
    logger.logCommand(interaction, `uploaded resource ${resource.url} for topic ${topic}`);
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleGroupCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let message;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      message = interaction.options.getSubcommand();
    } else if (interactionOrMessage instanceof Message) {
      message = interactionOrMessage.content.split(' ')[2];
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    switch (message) {
      case 'create':
        await handleGroupCreateCommand(interactionOrMessage);
        break;
      case 'join':
        await handleGroupJoinCommand(interactionOrMessage);
        break;
      case 'leave':
        await handleGroupLeaveCommand(interactionOrMessage);
        break;
      default:
        throw new Error('Invalid group command. Please refer to the help command for available options.');
    }
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleGroupCreateCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let groupName;
    let groupDescription;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      groupName = interaction.options.getString('name');
      groupDescription = interaction.options.getString('description');
    } else if (interactionOrMessage instanceof Message) {
      groupName = interactionOrMessage.content.split(' ')[3];
      groupDescription = interactionOrMessage.content.slice(interactionOrMessage.content.indexOf(groupName) + groupName.length).trim();
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    const createdGroup = await groupService.createGroup(groupName, groupDescription, interaction.user.id);

    await interaction.reply(`Successfully created group ${groupName}`);
    logger.logCommand(interaction, `created group ${groupName}`);
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleGroupJoinCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let groupId;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      groupId = interaction.options.getString('group_id');
    } else if (interactionOrMessage instanceof Message) {
      groupId = interactionOrMessage.content.split(' ')[3];
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    await groupService.joinGroup(groupId, interaction.user.id);

    await interaction.reply(`Successfully joined group with ID: ${groupId}`);
    logger.logCommand(interaction, `joined group ${groupId}`);
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

const handleGroupLeaveCommand = async (interactionOrMessage) => {
  try {
    let interaction;
    let groupId;

    if (interactionOrMessage instanceof Interaction) {
      interaction = interactionOrMessage;
      groupId = interaction.options.getString('group_id');
    } else if (interactionOrMessage instanceof Message) {
      groupId = interactionOrMessage.content.split(' ')[3];
    } else {
      throw new Error('Invalid input type. Expected Interaction or Message.');
    }

    await groupService.leaveGroup(groupId, interaction.user.id);

    await interaction.reply(`Successfully left group with ID: ${groupId}`);
    logger.logCommand(interaction, `left group ${groupId}`);
  } catch (error) {
    errorHandler.handleError(error, interaction, message);
  }
};

module.exports = {
  handleCommand,
};