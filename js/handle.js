function addBook() {
  /*
      @create new book model
      @asign all value to model
    */
  let createdBook = new book();
  createdBook.data.title = document.getElementById("inputBookTitle").value;
  createdBook.data.author = document.getElementById("inputBookAuthor").value;
  createdBook.data.year = document.getElementById("inputBookYear").value;
  createdBook.data.isComplete = document.getElementById(
    "inputBookIsComplete"
  ).checked;
  /*
      save book into localStorage
    */
  createdBook.save();
  // render new book value
  render();
}
let bookData = [];
function init() {
  // call this function
  let form = document.getElementById("inputBook");
  form.addEventListener("submit", addBook);
  // render book data
  render();
  //seacrh book on input
  document
    .getElementById("searchBookTitle")
    .addEventListener("input", findBook);
}
function getBook() {
  // get allbook data on localStorage
  if (localStorage.getItem("book")) {
    bookData = JSON.parse(localStorage.getItem("book"));
  }
}
function render(cmd) {
  // make element empty before render
  document.getElementById("completeBookshelfList").innerHTML = "";
  document.getElementById("incompleteBookshelfList").innerHTML = "";
  if (!cmd) {
    getBook();
    for (bookOne of bookData) {
      let a = new template(bookOne);
      if (bookOne.isComplete) {
        a.render("completeBookshelfList");
      } else {
        a.render("incompleteBookshelfList");
      }
    }
  } else {
    for (bookOne of cmd) {
      let a = new template(bookOne);
      if (bookOne.isComplete) {
        a.render("completeBookshelfList");
      } else {
        a.render("incompleteBookshelfList");
      }
    }
  }
}

function Delete(id) {
  swal({
    title: "Are you sure?",
    text: "Anda Ingin Menghapus Buku dari Rak?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      getBook();
      if (bookData.length == 0) {
        return;
      }
      const delBook = bookData.filter((e) => e.id != id);
      localStorage.setItem("book", JSON.stringify(delBook));
      render();
      swal("Anda telah menghapus buku dari Rak", {
        icon: "success",
      });
    } else {
      swal("Anda tidak jadi menghapus buku!");
    }
  });
}

function findBook() {
  let e = document.getElementById("searchBookTitle").value;
  let data = bookData.filter((a) => a.title.includes(e));
  render(data);
}
function changeIsComplete(id) {
  getBook();
  if (bookData.length == 0) {
    return;
  }
  let oneBook = bookData.find((e) => e.id == id);
  oneBook.isComplete = !oneBook.isComplete;
  let otherBook = bookData.filter((e) => e.id != id);
  otherBook.push(oneBook);
  bookData = otherBook;
  localStorage.setItem("book", JSON.stringify(bookData));
  render();
}
init();
