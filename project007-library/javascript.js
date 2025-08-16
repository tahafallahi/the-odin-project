const library = document.querySelector(".library");
const addBookButton = document.querySelector(".new-book");
const closeButton = document.querySelector(".close-button");
const submitButton = document.querySelector(".submit");
const formDialog = document.querySelector("dialog");
const myLibrary = [];

addBookButton.addEventListener("click", function() {
    formDialog.showModal();
});

closeButton.addEventListener("click", function() {
    formDialog.close();
});

submitButton.addEventListener("click", function(event) {
    event.preventDefault()
    const form = new FormData(event.target.form);
    const array = [...form.entries()]
    addBookToLibrary(form.get("author"), form.get("title"), form.get("year"), form.get("page"), form.get("read"));
    formDialog.close();
    displayBooks();
});


function Book(author, title, year, pages, isRead) {
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.year = year;
    this.pages = pages;
    this.isRead = isRead;
};

Book.prototype.changeReadStatus = function () {
    this.isRead = this.isRead ? false : true;
}

function addBookToLibrary(author, title, year, pages, isRead) {
    myLibrary.push(new Book(author, title, year, pages, isRead));
};

function displayBooks() {
    library.innerHTML = "";
    myLibrary.forEach(function (item) {
        const book = document.createElement("div");
        const titleElem = document.createElement("h2");
        const descreptionElem = document.createElement("p");
        const readStatusButton = document.createElement("button");
        const removeButton = document.createElement("button");
        readStatusButton.addEventListener("click", function(){
            item.changeReadStatus();
            displayBooks()
        });
        removeButton.addEventListener("click", function() {
            removeBookFromLibrary(item.id)
            displayBooks();
        })
        titleElem.classList.toggle("title");
        descreptionElem.classList.toggle("descreption");
        readStatusButton.classList.toggle("read-status-button");
        removeButton.classList.toggle("remove-button");
        book.classList.toggle("book");
        titleElem.textContent = item.title;
        descreptionElem.textContent = `${item.title} by ${item.author}, ${item.pages} pages, ${item.isRead ? "read" : "not read yet"}.`;
        readStatusButton.textContent = item.isRead ? "Unread" : "Read";
        removeButton.textContent = "Remove";
        book.appendChild(titleElem);
        book.appendChild(descreptionElem);
        book.appendChild(readStatusButton);
        book.appendChild(removeButton);
        library.appendChild(book);
    });
};

function removeBookFromLibrary(id) {
    const index = myLibrary.findIndex(book => book.id == id)
    if (index !== -1){
        myLibrary.splice(index, 1)
    } else {
        throw Error("There is no item with that id in the array.");
    };
}
