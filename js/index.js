console.log(`Hello Library`)
//constructor
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Consructor
function Display() {

}

//Add Methods To Display prototype
Display.prototype.add = function (book) {
    console.log(`Adding To UI`);
    tableBody = document.getElementById('tableBody');
    let uiString = `
                   <tr>
                       <th>${book.name}</th>
                       <th>${book.author}</th>
                       <th>${book.type}</th>
                   </tr>`;
    tableBody.innerHTML += uiString;
};

//Display Clear Methods
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
};

//validate function
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    } else {
        return true;
    }
};

//show function
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                           <strong>Message : </strong>${displayMessage}
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
                          </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = "";
    }, 2000)
};

//Add Submit event Listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('submitted form')
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