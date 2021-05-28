const Discord = require('discord.js');
const Crawler = require('simplecrawler');
const cheerio = require('cheerio');
const insertIfNotExists = require('../database/controllers/covid2news');
const source = "https://tuoitre.vn/dich-covid-19-e576.htm"
module.exports = async (client, channel) => {
  const crawler = new Crawler(source);

  crawler.maxDepth = 1;

  crawler.on('crawlstart', () => {
    console.log('Crawler started at: ', new Date().toTimeString());
  });

  crawler.on('fetchcomplete', async (_, responseBuffer) => {
    const channels = client.guilds.cache.array().map(guild => guild.channels.cache.find(guild => guild.name === channel));
    const $ = cheerio.load(responseBuffer.toString());
    const items = $('.news-item');
    for (let i = items.length - 1; i >= 0; i -= 1) {
      let data = {
        title: $(items[i]).find('a').text(),
        description: $(items[i]).find('div.name-news > p').text(),
        fullUrl: "https://tuoitre.vn" + $(items[i]).find('a').attr('href'),
        image: $(items[i]).find('a > img').attr('src')
      };
      await insertIfNotExists(data, channels);
    }
  });

  crawler.on('fetchclienterror', (_, error) => {
    console.log(`fetchclienterror: ${error}`);
  });

  crawler.on('fetchtimeout', () => {
    console.log('fetchtimeout');
  });

  crawler.on('fetch404', () => {
    console.log('fetch404');
  });

  crawler.on('fetcherror', () => {
    console.log('fetcherror');
  });

  crawler.start();
};
