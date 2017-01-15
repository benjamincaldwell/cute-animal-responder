'use strict';

const 
    request = require('request'),
    config = require('config'),
    utilities = require("./utilities");

const parameters = [
    {
        keyword: "aww",
        limit: 100
    },
    {
        keyword: "daww",
        limit: 100
    },
    {
        keyword: "Floof",
        limit: 50
    },
    {
        keyword: "AnimalGIFs",
        limit: 100
    },
    {
        keyword: "awwgifs",
        limit: 100
    },
    {
        keyword: "birdpics",
        limit: 50
    },
    {
        keyword: "dogpictures",
        limit: 50
    },
    {
        keyword: "guineapigs",
        limit: 50
    },
    {
        keyword: "foxes",
        limit: 50
    },
    {
        keyword: "redpandas",
        limit: 75
    },
    {
        keyword: "koalas",
        limit: 50
    },
    {
        keyword: "Rabbits",
        limit: 50
    },
    {
        keyword: "kittengifs",
        limit: 50
    },
    {
        keyword: "puppygifs",
        limit: 75
    },
]

function FetchRedditImage(cb) {
    let selection = utilities.generateRandomeSelection(parameters)
    fetchGif(selection.keyword, selection.limit, cb)
}

function fetchGif (subreddit, limit, cb) {
    let options = {
        uri: `https://www.reddit.com/r/${subreddit}.json?limit=${limit}`,
        method: 'GET',
        json:true
    }
    request(options, function (error, response, body) {
        let randomImage
        while (!randomImage || randomImage.is_self || randomImage.startsWith("http://www.youtube.com") || randomImage.includes("imgur.com/a")) {
            randomImage = (utilities.generateRandomeSelection(body["data"]["children"])).data.url
        }

        let randomImageURL = utilities.processURL(randomImage)
        return cb(randomImageURL)
    })
}

module.exports = FetchRedditImage
