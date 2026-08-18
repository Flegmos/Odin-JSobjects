document.addEventListener('DOMContentLoaded', initApp);

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
}

let library = [];

Book.prototype.addToPage = function () {
    const wrapper = document.createElement('div');
    wrapper.id = crypto.randomUUID();
    wrapper.className = 'book-widget';
    const namep = document.createElement('h3');
    namep.innerText = this.name;
    const pageNump = document.createElement('div');
    pageNump.innerText = 'Pages: ' + this.pageNum
    const genrep = document.createElement('div');
    genrep.innerText = 'Genre: ' + this.genre
    const descp = document.createElement('div');
    descp.innerText = this.desc;
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "X";
    deleteButton.className = "delete-button";
    deleteButton.onclick = onDeleteClick;
    wrapper.append(namep, pageNump, genrep, descp, deleteButton);

    const target = document.getElementById('libraryContainer');
    target.appendChild(wrapper);

    library.push(this);
    console.log(library);
};

function onDeleteClick(){
    const deletedBookId = this.parentElement.id;
    const deletedBookIndex =  library.findIndex((book) => {book.id == deletedBookId})
    library.splice(deletedBookIndex,1);
    console.log(library);
    this.parentElement.remove();
}


