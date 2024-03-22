const bookshelf = document.getElementById("bookshelf-container");
const newBookForm = document.getElementById("new-book-form");
let removeButtons;

/* Setting up Library and Book Object */

const myLibrary = [];

function Book(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
}

/* Book related methods */

function createBook(title, author, read=false) {
    newBook = new Book(title, author, read);

    return newBook;
}

/* Library-related methods */

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    bookshelf.innerHTML = '';

    /* Display Books and Remove Book Buttons */
    for (i = 0; i < myLibrary.length; i++) {
        let currentBook = myLibrary[i];
    
        let newBook = document.createElement("div");
        let bookText = document.createTextNode("'" + currentBook.title + "'" + " by " + currentBook.author);
        newBook.appendChild(bookText);
        newBook.classList.add("book");
        newBook.setAttribute("id", i.toString());
        newBook.style.backgroundColor = currentBook.read ? "thistle" : "lightgray";

        let removeButton = document.createElement("button");
        let removeText = document.createTextNode("X");
        removeButton.appendChild(removeText);
        removeButton.classList.add("remove-button");
        removeButton.dataset.number = i;

        let readButton = document.createElement("button");
        let readText = document.createTextNode(currentBook.read ? "Read" : "Not Read");
        readButton.appendChild(readText);
        readButton.classList.add("read-button");
        readButton.dataset.number = i;
        
        newBook.appendChild(removeButton);
        newBook.appendChild(readButton);
        bookshelf.appendChild(newBook);
    }

    /* Add Event Listeners to Remove Book and Read Buttons */
    removeButtons = document.getElementsByClassName("remove-button");
    for (i = 0; i < removeButtons.length; i++) {
        let currentButton = removeButtons[i];

        currentButton.addEventListener("click", function() {   
            removeBook(currentButton.dataset.number);
        });
    }

    readButtons = document.getElementsByClassName("read-button");
    for (i = 0; i < readButtons.length; i++) {
        let currentButton = readButtons[i];

        currentButton.addEventListener("click", function() {
            toggleReadStatus(currentButton.dataset.number);
        });
    }
}

function removeBook(index) {
    let toRemove = document.getElementById(index);
    bookshelf.removeChild(toRemove);
    myLibrary.splice(index, 1);

    displayBooks();
}

function toggleReadStatus(bookIndex) {
    currentBook = myLibrary[bookIndex];
    currentBook.read = currentBook.read ? false : true;

    displayBooks();
}

newBookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let read = document.getElementById("read").value;

    newBook = createBook(title, author, read);
    addBookToLibrary(newBook);
    displayBooks();
});

hobbit = new Book("The Hobbit", "J.R.R Tolkien", false);
dune = new Book("Dune", "Frank Herbert", true);
addBookToLibrary(hobbit);
addBookToLibrary(dune);
displayBooks();