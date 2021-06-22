'use strict'

//get authors

async function getAuthors(isbn) {
    let url = 'https://openlibrary.org/api/books?bibkeys=ISBN:'+String(isbn)+'&jscmd=data&format=json';
    let responsejson = await fetch(url)
    let response = await responsejson.json();

    isbn = Object.keys(response)[0];
    let authorlist = response[isbn].authors;

    let authors_array = [];
    let authors = '';

    for (let i = 0; i < authorlist.length; i++) {
        authors_array.push(authorlist[i].name);
    }

    if (authors_array.length == 1) {
        authors = authors_array[0];
         return authors;
    } else {
        authors = authors_array.slice(0, authors_array.length - 1).join(', ');
        authors += ' and ' + authors_array[authors_array.length - 1];
        return authors;
    }
      
}

//get cover url
async function getCover(isbn, size) {
    let url = 'https://openlibrary.org/api/books?bibkeys=ISBN:'+String(isbn)+'&jscmd=data&format=json';
    let responsejson = await fetch(url)
    let response = await responsejson.json();

    isbn = Object.keys(response)[0];

    let cover;
    size = size.toLowerCase();
    switch (size) {
        case 0:
        case 'small':
            cover = response[isbn].cover.small;
            break;
        case 1:
        case 'medium':
            cover = response[isbn].cover.small;
            break;
        case 2:
        case 'large':
            cover = response[isbn].cover.small;
    }

   return cover;

      
}


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



let isbn_search_results = document.createElement('div');
isbn_search_results.setAttribute('id', 'isbn-search-results');
isbn_search_results.innerHTML = `    <div id='isbn-search-results'>
<img id = 'isbn-search-results-cover' src=''>
<div id='new-book-info'>
    <div id='new-book-confirmation'>
        <span>Is this the correct book?</span>
        <button id='new-book-no'>No</button>
        <button id='new-book-yes'>Yes</button>
    </div>
</div>
`





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


add_book_button.onclick = function(event) {
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
        
        let responsejson = await fetch(url);
        let response = await responsejson.json();

        isbn = Object.keys(response)[0];
        let thumbnail = response[isbn.cover.small]
        thumnail = String(thumbnail);

        let image = document.getElementById('isbn-search-results-cover');
        image.src = thumbnail;

        add_book_window.appendChild(isbn_search_results);
        
        
    }

 
        



    //create popup add book window
/*
<div id='isbn_search_details'>
    <img id = 'src=''>
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
    
    event.preventDefault();
    // isbn_search_form.onsubmit = function(event) {
    //     let input = document.getElementById('isbn-searchbar');
    //     let isbn = input.value;
    //     // let url = 'https://openlibrary.org/api/books?bibkeys=ISBN:'+String(isbn)+'&jscmd=data&format=json';
    //     alert(isbn);
    //     return false;
    // }
}



