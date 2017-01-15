'use strict';

const 
    request = require('request'),
    config = require('config');

const GiphyApiKey = (process.env.GIPHY_API_KEY) ?
  (process.env.GIPHY_API_KEY) :
  config.get('giphyAPIKey');

const parameters = [
    {
        keyword: "animals",
        limit: 200
    },
    {
        keyword: "cute+animals",
        limit: 200
    },
    {
        keyword: "penquins",
        limit: 100
    },
    {
        keyword: "bunnies",
        limit: 100
    },
    {
        keyword: "puppies",
        limit: 100
    },
    {
        keyword: "elephants",
        limit: 100
    },
    {
        keyword: "hamsters",
        limit: 100
    },
    {
        keyword: "guinea+pigs",
        limit: 100
    },
    {
        keyword: "ducks",
        limit: 100
    },
    {
        keyword: "kitties",
        limit: 100
    },
    {
        keyword: "baby+elephants",
        limit: 50
    },
]

function FetchGifFromList(cb) {
    let selection = generateRandomeSelection(parameters)
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
            let randomImage = generateRandomeSelection(body["data"])
            return cb(randomImage.images.original.url)
        }
        return cb("https://media.giphy.com/media/hdEhU942MSM6Y/giphy.gif")
    })
}

function generateRandomeSelection(input) {
    let length = input.length
    let randomSelection = Math.round(Math.random() * length - 1)
    return input[randomSelection]
}

module.exports = FetchGifFromList
