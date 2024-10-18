const databaseService = require('./databaseService');
const cloudinary = require('cloudinary').v2;

const uploadResource = async (url, topic, description, userId, guildId) => {
  try {
    // Check if the resource already exists in the database (optional)
    const existingResource = await databaseService.getResourceByURL(url, guildId);
    if (existingResource) {
      return existingResource;
    }

    // Upload the resource to Cloudinary (if applicable)
    const uploadedResource = await cloudinary.uploader.upload(url, {
      public_id: `${guildId}/${userId}/${topic}`,
      resource_type: 'auto',
    });

    // Create the resource in the database
    const resourceId = await databaseService.addResource(
      uploadedResource.secure_url, // Use the secure URL from Cloudinary
      topic,
      description,
      userId,
      guildId
    );

    return {
      id: resourceId,
      title: uploadedResource.original_filename, // Set the title from the uploaded file
      url: uploadedResource.secure_url, // Use the secure URL from Cloudinary
      description: description,
      topic: topic,
      userId: userId,
      guildId: guildId,
    };
  } catch (error) {
    console.error('Error uploading resource:', error);
    throw error;
  }
};

const getResourcesByTopic = async (topic, guildId) => {
  try {
    const resources = await databaseService.getResourcesByTopic(topic, guildId);
    return resources;
  } catch (error) {
    console.error('Error getting resources by topic:', error);
    throw error;
  }
};

module.exports = {
  uploadResource,
  getResourcesByTopic,
};