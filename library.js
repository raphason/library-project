const bookshelf = document.getElementById("bookshelf-container");
let removeButtons;

/* Setting up Library and Book Object */

const myLibrary = [];

function Book(title, author) {
    this.title = title;
    this.author = author;
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

        let removeButton = document.createElement("button");
        let buttonText = document.createTextNode("Remove");
        removeButton.appendChild(buttonText);
        removeButton.classList.add("remove");
        removeButton.dataset.number = i;
        
        newBook.appendChild(removeButton);
        bookshelf.appendChild(newBook);
    }

    /* Add Event Listeners to Remove Book Buttons */
    removeButtons = document.getElementsByClassName("remove");
    for (i = 0; i < removeButtons.length; i++) {
        let currentButton = removeButtons[i];

        currentButton.addEventListener("click", function() {   
            removeBook(currentButton.dataset.number);
        });
    }
}

function removeBook(index) {
    let toRemove = document.getElementById(index);
    bookshelf.removeChild(toRemove);
    myLibrary.splice(index, 1);

    displayBooks();
}

hobbit = new Book("The Hobbit", "J.R.R Tolkien");
dune = new Book("Dune", "Frank Herbert");
addBookToLibrary(hobbit);
addBookToLibrary(dune);
displayBooks();