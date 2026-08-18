document.addEventListener('DOMContentLoaded', initApp);

const libraryContainer = document.getElementById('libraryContainer');
let library = [];

function initApp() {
    const dialog = document.getElementById("mydialog");
    const showButton = document.getElementById("showAddBook");
    const addButton = document.getElementById("addBook");
    const calcelButton = document.getElementById("cancelBook");


    const nameInput = document.getElementById("nameInputId");
    const genreInput = document.getElementById("genreInputId");
    const pageNumInput = document.getElementById("pageNumInputId");
    const descInput = document.getElementById("descInputId");


    // "Show the dialog" button opens the dialog modally
    showButton.addEventListener("click", () => {
        nameInput.value = "";
        genreInput.value = "";
        pageNumInput.value = "";
        descInput.value = "";
        dialog.showModal();
    });

    // "Close" button closes the dialog
    calcelButton.addEventListener("click", (event) => {
        event.preventDefault();
        dialog.close();
    });

    addButton.addEventListener("click", (event) => {
        event.preventDefault();
        const newBook = new Book(nameInput.value, genreInput.value, pageNumInput.value, descInput.value);
        newBook.addToPage();
        dialog.close();
    });

    const book1 = new Book('How to Shiba', 'horror', '3', 'If you know, you know! If you don\'t know, you don\'t wanna know!');
    book1.addToPage();
    const book2 = new Book('Dude did something', 'generic', '69', 'Dude did stuff. First it was hard, then it became easy. He got the girl. The end.');
    book2.addToPage();


};

function Book(name, genre, pageNum, desc) {
    if (!new.target) throw new Error("Invalid constructor call.");
    this.name = name;
    this.genre = genre;
    this.pageNum = pageNum;
    this.desc = desc;
    this.UUID = crypto.randomUUID();
}


Book.prototype.addToPage = function () {
    library.push(this);
    refreshBooks();
    console.log(library);
};

function refreshBooks() {
    libraryContainer.innerHTML = '';
    library.forEach ((book) => { 
        const wrapper = document.createElement('div');
        wrapper.id = book.UUID;
        wrapper.className = 'book-widget';
        const namep = document.createElement('h3');
        namep.innerText = book.name;
        const pageNump = document.createElement('div');
        pageNump.innerText = 'Pages: ' + book.pageNum
        const genrep = document.createElement('div');
        genrep.innerText = 'Genre: ' + book.genre
        const descp = document.createElement('div');
        descp.innerText = book.desc;
        const deleteButton = document.createElement('button');
        deleteButton.innerText = "X";
        deleteButton.className = "delete-button";
        deleteButton.onclick = onDeleteClick;
        wrapper.append(namep, pageNump, genrep, descp, deleteButton);
        libraryContainer.appendChild(wrapper);

    });
};

function onDeleteClick() {
    const deletedBookId = this.parentElement.id;
    const deletedBookIndex = library.findIndex((book) => { book.id == deletedBookId })
    library.splice(deletedBookIndex, 1);
    console.log(library);
    refreshBooks();
}


