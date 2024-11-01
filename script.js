class Book {
    constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    }
}

const library = {
    books: [],
    
    addBook(book) {
        this.books.push(book);
    }
};

library.addBook(new Book("The Hobbit", "J.R.R. Tolkien", 295, "Not read"));
library.addBook(new Book("1984", "George Orwell", 328, "Read"));


function renderLibrary() {
    const display = document.getElementById('library-display');
    display.innerHTML = ''; 

    library.books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <p>Status: ${book.status}</p>
        <button onclick="editBook(${index})">Edit</button>
        <button onclick="deleteBook(${index})">Delete</button>
        `;
    display.appendChild(bookCard);
    });
}

function deleteBook(index) {
    library.books.splice(index, 1); 
    renderLibrary(); 
}

function editBook(index) {
    const book = library.books[index];

    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('pages').value = book.pages;
    document.getElementById('status').value = book.status;
    document.getElementById('book-form').setAttribute('data-edit-index', index);
}

document.getElementById('book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const status = document.getElementById('status').value;
    
    const editIndex = e.target.getAttribute('data-edit-index');
    if (editIndex !== null) {
        library.books[editIndex] = new Book(title, author, parseInt(pages), status);
        e.target.removeAttribute('data-edit-index'); // Reset editing mode
    } 
    else {
        const newBook = new Book(title, author, parseInt(pages), status);
        library.addBook(newBook);
    }

    e.target.reset();
    renderLibrary();
});

renderLibrary();
