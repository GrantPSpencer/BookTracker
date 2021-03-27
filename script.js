'use strict'

// const fetch = require('node-fetch');

async function getThumbnail() {
    let responsejson = await fetch('https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447&jscmd=data&format=json');
    let response = await responsejson.json();

    let isbn = Object.keys(response)[0];

    let cover = response[isbn].cover.medium;

    cover = String(cover);

    let image = document.getElementsByClassName('book-thumbnail');
    image[0].src = cover;

    return cover;

}

getThumbnail();

async function getBookCover() {
    let responsejson = await fetch('https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447&jscmd=data&format=json');
    let response = await responsejson.json();

    let isbn = Object.keys(response)[0];

    let cover = response[isbn].cover.large;

    cover = String(cover);

    let image = document.getElementById('book-cover');
    image.src = cover;

    return cover;
}

getBookCover();