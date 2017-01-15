'use strict';

const 
    request = require('request'),
    config = require('config'),
    utilities = require('./utilities')

const GiphyApiKey = (process.env.GIPHY_API_KEY) ?
  (process.env.GIPHY_API_KEY) :
  config.get('giphyAPIKey');

const parameters = [
    {
        keyword: "animals",
        limit: 100
    },
    {
        keyword: "cute+animals",
        limit: 100
    },
    {
        keyword: "penquins",
        limit: 50
    },
    {
        keyword: "bunnies",
        limit: 50
    },
    {
        keyword: "puppies",
        limit: 50
    },
    {
        keyword: "elephants",
        limit: 50
    },
    {
        keyword: "hamsters",
        limit: 50
    },
    {
        keyword: "guinea+pigs",
        limit: 50
    },
    {
        keyword: "ducks",
        limit: 50
    },
    {
        keyword: "kitties",
        limit: 50
    },
    {
        keyword: "baby+elephants",
        limit: 25
    },
]

function FetchGifFromList(cb) {
    let selection = utilities.generateRandomeSelection(parameters)
    fetchGif(selection.keyword, selection.limit, cb)
}

function fetchGif (keyword, limit, cb) {
    let options = {
        uri: `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${GiphyApiKey}&limit=4${limit}`,
        method: 'GET',
        json:true
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let randomImage = utilities.generateRandomeSelection(body["data"])
            return cb(randomImage.images.original.url)
        }
        return cb("https://media.giphy.com/media/hdEhU942MSM6Y/giphy.gif")
    })
}

module.exports = FetchGifFromList
