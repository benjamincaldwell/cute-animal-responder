'use strict';

const 
  FetchGifFromList = require('./giphy'),
  FetchRedditImage = require('./reddit'),
  utilities = require('./utilities');

const parameters = [
    FetchGifFromList,
    FetchRedditImage,
    FetchRedditImage,
    FetchRedditImage,
    FetchRedditImage
]

function FetchImageURL(cb) {
    return utilities.generateRandomeSelection(parameters)(cb)
}

module.exports = FetchImageURL