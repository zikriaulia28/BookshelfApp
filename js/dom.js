let buttonSave = setInterval(() => {
  let checked = document.getElementById("inputBookIsComplete").checked;
  //console.log(checked)
  if (checked) {
    document.getElementById("bookSubmit").innerHTML =
      "Masukkan Buku Ke Rak <span>Sudah selesai di baca<span>";
    //console.log(a.getElementByTagName("span"))
  } else {
    document.getElementById("bookSubmit").innerHTML =
      "Masukkan Buku Ke Rak <span>Belum selesai di baca<span>";
  }
}, 100);
