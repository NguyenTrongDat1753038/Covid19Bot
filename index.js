const Discord = require('discord.js');
const crawl = require('./crawler/crawler');
require('dotenv').config();

const channel = "news"
const client = new Discord.Client();

client.on('error', console.error);

(async () => {
  await client.login(process.env.TOKEN);
  setInterval(() => {
    crawl(client, channel);
  }, 1000* 60 * 5 );
})();