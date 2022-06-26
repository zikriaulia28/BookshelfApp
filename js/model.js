class book {
  constructor(title, author, year, isComplete) {
    this.data = {
      id: Date.now(),
      title,
      author,
      year,
      isComplete,
    };
    this.save = () => {
      let lib = localStorage.getItem("book");
      if (lib) {
        lib = JSON.parse(lib);
        lib.push(this.data);
        console.log(lib);
        localStorage.setItem("book", JSON.stringify(lib));
      } else {
        localStorage.setItem("book", JSON.stringify([this.data]));
      }
    };
  }
}
class template {
  constructor(data) {
    data.str = data.isComplete
      ? "Belum selesai di Baca"
      : "Sudah selesai di Baca";
    this.self =
      '<article class="book_item"><h3>' +
      data.title +
      "</h3><p>Penulis: " +
      data.author +
      "</p><p>Tahun: " +
      data.year +
      '</p><div class="action">' +
      '<button onclick="changeIsComplete(' +
      data.id +
      ')" class="green">' +
      data.str +
      "</button>" +
      '<button onclick="Delete(' +
      data.id +
      ')" class="red">Hapus buku</button></div></article>';
    this.remove = () => {
      this.self = "";
    };
    this.render = (el) => {
      document.getElementById(el).insertAdjacentHTML("beforeEnd", this.self);
    };
  }
}
