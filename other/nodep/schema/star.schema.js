const Schema = require('mongoose').Schema
module.exports = {
    name:    {
        type: String,
        unique: true,
        require: true
    },
    path: String,
    imgSrc: String,
    conut: Number,
    times: Number,
    _updated: { type: Date, default: Date.now },
  }