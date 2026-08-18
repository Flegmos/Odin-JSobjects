document.addEventListener('DOMContentLoaded', initApp);

function initApp() {

};

function Book(name , genre, pageNum, desc ) {
    if (!new.target) throw new Error("Invalid constructor call.");
    this.name = name;
    this.genre = genre;
    this.pageNum = pageNum;
    this.desc = desc;
}

let library = [];
let books = 0;

Book.prototype.addToPage = function ()  {
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
    wrapper.append(namep, pageNump, genrep, descp);

    const target = document.getElementById('libraryContainer');
    target.appendChild(wrapper);
    
    library[books] = this;
    books++;
    console.log(this,books)

    
};

const book1 = new Book ('How to Shiba', 'horror', '3', 'If you know, you know! If you don\'t know, you don\'t wanna know!');
book1.addToPage();
const book2 = new Book ('Dude did something', 'generic', '69', 'Dude did stuff. First it was hard, then it became easy. He got the girl. The end.');
book2.addToPage();
