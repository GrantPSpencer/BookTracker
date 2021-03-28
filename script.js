'use strict'


//get booklist thumbnails
async function getThumbnail() {
    let responsejson = await fetch('https://openlibrary.org/api/books?bibkeys=ISBN:9780980200447&jscmd=data&format=json');
    let response = await responsejson.json();

    let isbn = Object.keys(response)[0];

    let cover = response[isbn].cover.medium;

    cover = String(cover);

    let images = document.getElementsByClassName('book-thumbnail');
    
    for (let image of images) {
        image.src = cover;
    }

    return cover;

}

getThumbnail();


// get large book cover
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





// highlight booklist books when clicked

let booklist = document.getElementById('booklist');

let selectedDiv; 

booklist.onclick = function(event) {
    let target = event.target
    target = target.closest('.booklist-book');
    if (target == null) return;
    if (target.tagName != 'div') return;


    highlight(target);
}

function highlight(div) {
    if (selectedDiv) {
        selectedDiv.classList.remove('selected');
    }
    selectedDiv = div;
    selectedDiv.classList.add('selected');
}


let add_book_button = document.createElement('button');
add_book_button.setAttribute('id','add-book-button');
let image = document.createElement('img');
image.src = 'icons/add-black-36dp.svg';

let add_phrase = document.createElement('p');
add_phrase.innerHTML = 'Add New Book';

add_book_button.appendChild(image);
add_book_button.appendChild(add_phrase);

booklist.appendChild(add_book_button);



//create popup add book window
/* <div id='add-book-window'>
<div id='isbn-search-wrapper'>
    <button class='remove-book-window'>x</button>
    <label for='isbn-search'>Search Book By ISBN</label>
    <br>
    <input id='isbn-search' type='text' placeholder='ISBN (eg., 9780674055445'>
</div>
<div id='new-book-wrapper'>
    <img src='Images/example-cover.jpeg'>
    <div id='new-book-info'>
        <p><b>Deng Xiaoping and the Transforming of China</b></p>
        <p>Ezra F. Vogel</p>
        <div id='new-book-confirmation'>
            <span>Is this the correct book?</span>
            <button id='new-book-no'>No</button>
            <button id='new-book-yes'>Yes</button>
        </div>
    </div>
</div> */

let add_book_window = document.createElement('div');
add_book_window.setAttribute('id','add-book-window');

add_book_window.innerHTML = `        <div id='isbn-search-wrapper'>
<button id='remove-book-window'>x</button>
<label for='isbn-search'>Search Book By ISBN</label>
<br>
<form id='isbn-search'>
    <input id='isbn-searchbar' type='text' placeholder='ISBN (eg., 9780674055445'>
    <button type='submit' class='search-submit'>Search</button>
</form>
</div>`;









// add book window buttons
// let new_book_yes = document.getElementById('new-book-yes');
// new_book_yes.onclick = function() {
//     let add_book_window = document.getElementById('add-book-window');
//     add_book_window.style.visibility = 'hidden';
// }

// let new_book_no = document.getElementById('new-book-no');
// new_book_no.onclick = function() {
//     let new_book_wrapper = document.getElementById('new-book-wrapper');
//     new_book_wrapper.innerHTML = '';
// }


add_book_button.onclick = function() {
    document.body.appendChild(add_book_window);
    let remove_book_window = document.getElementById('remove-book-window');
    remove_book_window.onclick = function() {
        add_book_window.remove();
    }
    
    let isbn_search_form = document.getElementById('isbn-search');
    isbn_search_form.addEventListener('submit', getBookDetails);

    async function getBookDetails(event) {
        let input = document.getElementById('isbn-searchbar');
        let isbn = input.value;
        let url = 'https://openlibrary.org/api/books?bibkeys=ISBN:'+String(isbn)+'&jscmd=data&format=json';
        alert(url);
        fetchISBN(url);
        event.preventDefault();
    }

    async function fetchISBN(url) {
        let responsejson = await fetch(url);
        let response = await responsejson.json();
        let isbn = Object.keys(response)[0];
        let authors = response[isbn].authors;
        let authors_string = '';
        for (let author of authors) {
            authors_string += String(author.name) + ' ';
        }
    
        alert(authors_string.trim());
        console.log(response);
        


    }
    
    
    // isbn_search_form.onsubmit = function(event) {
    //     let input = document.getElementById('isbn-searchbar');
    //     let isbn = input.value;
    //     // let url = 'https://openlibrary.org/api/books?bibkeys=ISBN:'+String(isbn)+'&jscmd=data&format=json';
    //     alert(isbn);
    //     return false;
    // }
}



