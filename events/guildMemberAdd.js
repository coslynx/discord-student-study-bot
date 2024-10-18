const { Client, Intents } = require('discord.js');
const logger = require('../utils/logger');
const authenticationService = require('../services/authenticationService');

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  async execute(member) {
    try {
      // Log the new member's arrival
      logger.logEvent(`New member joined: ${member.user.tag} (${member.id})`);

      // Optionally send a welcome message
      const welcomeMessage = `Welcome to the server, ${member.user.tag}!`;
      await member.send(welcomeMessage);

      // Optionally automatically authenticate the new member
      await authenticationService.authenticate(member);

      // Optionally assign roles to the new member
      // const role = member.guild.roles.cache.find(r => r.name === 'New Member');
      // await member.roles.add(role);

    } catch (error) {
      console.error(`Error in 'guildMemberAdd' event:`, error);
    }
  },
};