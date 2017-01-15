'use strict';

const 
    Flickr = require('flickrapi'),
    config = require('config');

const FlickrApiKey = (process.env.FLICKR_API_KEY) ?
  (process.env.FLICKR_API_KEY) :
  config.get("flickrAPIKey");

const FlickrApiSecret = (process.env.FLICKR_API_SECRET) ?
  (process.env.FLICKR_API_SECRET) :
  config.get("flickrAPISecret");

var flickr

Flickr.tokenOnly({
  api_key: FlickrApiKey,
  secret: FlickrApiSecret
}, function(error, flickr_in) {
  flickr = flickr_in
  fetchImage("animal", 10, console.log)
});



function fetchImage (keyword, limit, cb) {
    let options = {
        text: keyword.replace(" ", "+"),
        page: 1,
        per_page: limit
    }

    flickr.photos.search(options, function(err, result){
        if (!err) {
            console.log(result)
        }

    })
    // request(options, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         let image_count = body["data"].length
    //         let i = Math.random()
    //         let randomImage = Math.round(i * image_count - 1)
    //         console.log (randomImage)
    //         return cb(body["data"][randomImage].images.original.url)
    //     }
    //     return cb("https://media.giphy.com/media/hdEhU942MSM6Y/giphy.gif")
    // })
}

// module.exports = fetchGif
