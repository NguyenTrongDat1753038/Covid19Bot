const mongoose = require('mongoose');
const db = require('../db');

const newsSchema = mongoose.Schema({
  title: String,
  description: String,
  fullUrl: String,
  image: String,
});

const covid2News = mongoose.model('COVID2News', newsSchema);

module.exports = covid2News;
