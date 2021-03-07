//It calls at the top for each time refresh page the values stored in the localstorage fetched
showBooks();
//Add scrollbar to showed data and
let tableBody = document.getElementById('table');
tableBody.style.overflow = 'auto';
tableBody.style.height = '300px';

function showBooks() {
    //creating getbook varible which fetch data from books,books which stors values in localStorage
    let getBooks = localStorage.getItem('books');
    //bookObj
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }
    let rowData = "";
    //populating data with delete button
    bookObj.forEach(function (ele, index) {
        rowData += `
        <tr>
        <td>${ele.name}</td>
        <td>${ele.author}</td>
        <td>${ele.type}</td>
        <td><button id="${index}" onclick="deleteBook(this.id)" class="btn btn-primary">Delete Book</button></td>
        </tr>
        `
    })
    let tableBody = document.getElementById('tableBody');
    if (bookObj.length == 0) {
        tableBody.innerHTML = "";
    } else {
        tableBody.innerHTML = rowData;
    }

}
//Delete Book
function deleteBook(index) {
    let getBooks = localStorage.getItem('books');
    let bookObj;
    if (getBooks == null) {
        bookObj = [];
    } else {
        bookObj = JSON.parse(getBooks);
    }
    let bookName = bookObj[index].name;
    //deleteing the selected value 
    bookObj.splice(index, 1);
    //updating the localStorage after deletion
    localStorage.setItem("books", JSON.stringify(bookObj));
    //delete message
    let message = document.getElementById('message');
    let boldText = 'Deleted'
    message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                           <strong>${boldText} : </strong>The Book ${bookName} has been deleted.
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                          </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = "";
    }, 2000)
    showBooks();
}

//class Book
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    //passing the book obj
    add(book) {
        console.log(`Adding To UI`);
        let getBooks = localStorage.getItem('books');
        let bookObj;
        if (getBooks == null) {
            bookObj = [];
        } else {
            bookObj = JSON.parse(getBooks);
        }
        //push book object to new bookObj
        bookObj.push(book);

        localStorage.setItem("books", JSON.stringify(bookObj));
        showBooks();

    };
    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    };
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        } else {
            return true;
        }
    };
    show(type, displayMessage) {
        let boldText;
        if (type === 'success') {
            boldText = 'Success'
        } else {
            boldText = 'Error!'
        }
        let message = document.getElementById('message');
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                               <strong>${boldText} : </strong>${displayMessage}
                              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                              </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = "";
        }, 2000)
    };
}

//Add Submit event Listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);


    let display = new Display();

    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your Book has been successfully Added')
    } else {
        //Show Error
        display.show('danger', 'Sorry You can not add This Book.')
    }

    e.preventDefault();

}
