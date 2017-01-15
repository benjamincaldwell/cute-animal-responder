'use strict';

exports.generateRandomeSelection = function (input) {
    let length = input.length
    let randomSelection = Math.round(Math.random() * (length - 1))
    return input[randomSelection]
}

exports.processURL = function (url) {
    url = decodeURI(url)
    url = url.replace(/&amp;/g, '&');
    if (url.startsWith("http://imgur.com")) {
        url += ".gif"
    }
    if (url.startsWith("http://imgur.com/gallery")) {
        url = url.replace("http://imgur.com/gallery", "http://i.imgur.com")
    }
    if (url.endsWith(".gifv")) {
        url = url.replace("gifv", "gif")
    }
    return url
}