const Discord = require('discord.js');
const COVID2News = require('../models/covid2News');

const insertIfNotExists = async (item, channels) => {
  return COVID2News.find({ title: item.title }).exec()
    .then(async (docs) => {
      if (!docs.length) {
        await COVID2News.create(item);
        return true;
      }
      return false;
    })
    .then(async (sendMsg) => {
      if (sendMsg) {
        const msg = new Discord.MessageEmbed()
          .setTitle(item.title)
          .setDescription(item.description)
          .setImage(item.image)
          .setColor('#1DA1F2')
          .addField('To read the full news click here:', item.fullUrl);
        channels.forEach(channel => channel.send(msg));
      }
    })
    .catch(error => console.log(error));
};

module.exports = insertIfNotExists;
