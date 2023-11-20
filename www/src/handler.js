const ID_LIST_BELUM = 'list-belum';
const ID_LIST_SUDAH = 'list-sudah';
const ID_BUKU = 'id-buku';

function buatListBaca(judulB, penulisB, tahunB, waktuB, selesai) {
    const judulBuku = document.createElement('h3');
    const judul = document.createElement('span');
    judul.classList.add('judul-buku');
    judul.innerText = judulB;
    judulBuku.append(judul);

    const penulisBuku = document.createElement('p');
    penulisBuku.innerText = 'Penulis : ';
    const penulis = document.createElement('span');
    penulis.classList.add('penulis-buku');
    penulis.innerText = penulisB;
    penulisBuku.append(penulis);

    const tahunBuku = document.createElement('p');
    tahunBuku.innerText = 'Tahun Terbit : ';
    const tahun = document.createElement('span');
    tahun.classList.add('tahun-buku');
    tahun.innerText = tahunB;
    tahunBuku.append(tahun);

    const waktuBuku = document.createElement('p');
    waktuBuku.innerText = 'Target Selesai : ';
    const waktu = document.createElement('span');
    waktu.classList.add('waktu-buku');
    waktu.innerText = waktuB;
    waktuBuku.append(waktu);

    const infoBuku = document.createElement('div');
    infoBuku.classList.add('info');
    infoBuku.append(judulBuku, penulisBuku, tahunBuku, waktuBuku);

    const aksiBuku = document.createElement('div');
    aksiBuku.classList.add('action');

    const container = document.createElement('article');
    container.classList.add('book-item');
    container.append(infoBuku, aksiBuku);

    if (selesai) {
        aksiBuku.append(buatTombolEdit(), buatTombolUndo(), buatTombolSampah());
    } else {
        aksiBuku.append(buatTombolEdit(), buatTombolCek(), buatTombolSampah());
    }

    return container;
}

function tambahBuku() {
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);
    const listSudahBaca = document.getElementById(ID_LIST_SUDAH);
    const checkType = document.getElementById('input-buku-selesai');

    const judul = document.getElementById('input-judul').value;
    const penulis = document.getElementById('input-penulis').value;
    const waktu = document.getElementById('input-target').value;
    const tahun = parseInt(document.getElementById('input-tahun').value);

    if (!judul || !penulis || !tahun || !waktu) {
        alert('Harap masukkan identitas buku!');
        return;
    } else if (!checkType.checked) {
        const listBaca = buatListBaca(judul, penulis, tahun, waktu, false);
        const objekBuku = buatObjekBuku(judul, penulis, tahun, waktu, false);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listBelumBaca.append(listBaca);
    } else {
        const listBaca = buatListBaca(judul, penulis, tahun, waktu, true);
        const objekBuku = buatObjekBuku(judul, penulis, tahun, waktu, true);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listSudahBaca.append(listBaca);
    }
    updateDataToStorage();
    tombolKembali();
}

function buatTombol(buttonTypeClass, eventListener) {
    const tombol = document.createElement('button');
    tombol.classList.add(buttonTypeClass);
    tombol.addEventListener('click', function (event) {
        eventListener(event);
    });
    return tombol;
}

function tambahBukuSelesai(elemenBuku) {
    const judul = elemenBuku.querySelector('.judul-buku').innerText;
    const penulis = elemenBuku.querySelector('.penulis-buku').innerText;
    const tahun = elemenBuku.querySelector('.tahun-buku').innerText;
    const waktu = elemenBuku.querySelector('.waktu-buku').innerText;
    const listSudahBaca = document.getElementById(ID_LIST_SUDAH);

    const listBaca = buatListBaca(judul, penulis, tahun, waktu, true);
    const objekBuku = buatObjekBuku(judul, penulis, tahun, waktu, true);

    listBaca[ID_BUKU] = objekBuku.id;
    list.push(objekBuku);
    listSudahBaca.append(listBaca);
    elemenBuku.remove();
    hapusBukuSelesai(elemenBuku);

    updateDataToStorage();
    tombolKembali();
}

function hapusBukuSelesai(elemenBuku) {
    const posisiBuku = cariIndeksBuku(elemenBuku[ID_BUKU]);
    list.splice(posisiBuku, 1);
    elemenBuku.remove();
    updateDataToStorage();
}

function hapusBukuSelesaiModal(elemenBuku) {
    document.getElementById('judul-reset').style.display = 'none';
    document.getElementById('judul-hapus').style.display = 'block';
    document.getElementById('close-modal');

    const modal2 = document.getElementById('myModal2');
    const resetButton = document.getElementById('hapus-buku-ya');
    const resetButton2 = document.getElementById('hapus-buku-ya-2');
    cariIndeksBuku(elemenBuku[ID_BUKU]);

    modal2.style.display = 'block';
    resetButton.style.display = 'none';
    resetButton2.style.display = 'block';

    resetButton2.addEventListener('click', function (event) {
        event.preventDefault();
        hapusBukuSelesai(elemenBuku);
        modal2.style.display = 'none';
        window.location.href = 'index.html';
    });
}

function buatTombolCek() {
    return buatTombol('checklist', function (event) {
        const parent = event.target.parentElement;
        tambahBukuSelesai(parent.parentElement);
    });
}

function buatTombolSampah() {
    return buatTombol('trash', function (event) {
        const parent = event.target.parentElement;
        hapusBukuSelesaiModal(parent.parentElement);
    });
}

function buatTombolUndo() {
    return buatTombol('undo', function (event) {
        const parent = event.target.parentElement;
        undoBukuSelesai(parent.parentElement);
    });
}

function buatTombolEdit() {
    return buatTombol('edit', function (event) {
        const parent = event.target.parentElement;
        editInfoBuku(parent.parentElement);
    });
}

function undoBukuSelesai(elemenBuku) {
    const judul = elemenBuku.querySelector('.judul-buku').innerText;
    const penulis = elemenBuku.querySelector('.penulis-buku').innerText;
    const tahun = elemenBuku.querySelector('.tahun-buku').innerText;
    const waktu = elemenBuku.querySelector('.waktu-buku').innerText;
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);

    const listBaca = buatListBaca(judul, penulis, tahun, waktu, false);
    const objekBuku = buatObjekBuku(judul, penulis, tahun, waktu, false);

    listBaca[ID_BUKU] = objekBuku.id;
    list.push(objekBuku);
    listBelumBaca.append(listBaca);
    elemenBuku.remove();
    hapusBukuSelesai(elemenBuku);

    updateDataToStorage();
    tombolKembali();
}

function editInfoBuku(elemenBuku) {
    document.getElementById('judul-tambah').style.display = 'none';
    document.getElementById('judul-edit').style.display = 'block';
    document.getElementById('submit-buku').style.display = 'none';
    document.getElementById('close-modal');

    const modal = document.getElementById('myModal');
    const editButton = document.getElementById('edit-buku');

    modal.style.display = 'block';
    editButton.style.display = 'block';

    document.getElementById('input-judul').value =
        elemenBuku.querySelector('.judul-buku').innerText;
    document.getElementById('input-penulis').value =
        elemenBuku.querySelector('.penulis-buku').innerText;
    document.getElementById('input-tahun').value =
        elemenBuku.querySelector('.tahun-buku').innerText;
    document.getElementById('input-target').value =
        elemenBuku.querySelector('.waktu-buku').innerText;

    editButton.addEventListener('click', function (event) {
        event.preventDefault();
        tambahBukuEdit(elemenBuku);
        modal.style.display = 'none';
    });
}

function tambahBukuEdit(elemenBuku) {
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);
    const listSudahBaca = document.getElementById(ID_LIST_SUDAH);
    const checkType = document.getElementById('input-buku-selesai');

    const judul = document.getElementById('input-judul').value;
    const penulis = document.getElementById('input-penulis').value;
    const waktu = document.getElementById('input-target').value;
    const tahun = parseInt(document.getElementById('input-tahun').value);

    if (!judul || !penulis || !tahun || !waktu) {
        alert('Identitas buku tidak boleh kosong!');
        return;
    } else if (!checkType.checked) {
        const listBaca = buatListBaca(judul, penulis, tahun, waktu, false);
        const objekBuku = buatObjekBuku(judul, penulis, tahun, waktu, false);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listBelumBaca.append(listBaca);
        elemenBuku.remove();
        hapusBukuSelesai(elemenBuku);
    } else {
        const listBaca = buatListBaca(judul, penulis, tahun, waktu, true);
        const objekBuku = buatObjekBuku(judul, penulis, tahun, waktu, true);
        listBaca[ID_BUKU] = objekBuku.id;
        list.push(objekBuku);
        listSudahBaca.append(listBaca);
        elemenBuku.remove();
        hapusBukuSelesai(elemenBuku);
    }
    updateDataToStorage();
    tombolKembali();
}

function tombolKembali() {
    document.getElementById('submit-buku').style.display = 'block';
    document.getElementById('edit-buku').style.display = 'none';
    window.location.href = 'index.html';
}

function search() {
    const searchInput = document
        .getElementById('search-input')
        .value.toLowerCase();
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);
    const listSudahBaca = document.getElementById(ID_LIST_SUDAH);

    searchBooksInList(listBelumBaca, searchInput);
    searchBooksInList(listSudahBaca, searchInput);
}

function searchBooksInList(bookList, searchTerm) {
    const books = bookList.getElementsByClassName('book-item');
    const buttonBelumSelesai = document.getElementById('chk1');
    const buttonSelesai = document.getElementById('chk2');

    for (const book of books) {
        const title = book.querySelector('.judul-buku').innerText.toLowerCase();

        if (title.includes(searchTerm)) {
            buttonBelumSelesai.checked = true;
            buttonSelesai.checked = true;
            book.style.display = 'flex';
        } else {
            book.style.display = 'none';
            document.getElementById('search-input').value = '';
        }
    }
}

function hapusSemuaBuku() {
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);
    const listSudahBaca = document.getElementById(ID_LIST_SUDAH);

    while (listBelumBaca.firstChild) {
        listBelumBaca.removeChild(listBelumBaca.firstChild);
    }

    while (listSudahBaca.firstChild) {
        listSudahBaca.removeChild(listSudahBaca.firstChild);
    }

    list = [];

    updateDataToStorage();
}

function refreshDataFromList() {
    const listBelumSelesai = document.getElementById(ID_LIST_BELUM);
    const listSelesai = document.getElementById(ID_LIST_SUDAH);
    const buttonBelumSelesai = document.getElementById('chk1');
    const buttonSelesai = document.getElementById('chk2');

    const isButtonBelumSelesaiChecked =
        localStorage.getItem('isButtonBelumSelesaiChecked') === 'true';
    const isButtonSelesaiChecked =
        localStorage.getItem('isButtonSelesaiChecked') === 'true';

    buttonBelumSelesai.checked = isButtonBelumSelesaiChecked;
    buttonSelesai.checked = isButtonSelesaiChecked;

    function addBookToList(book, listElement) {
        const bukuBaru = buatListBaca(
            book.tittle,
            book.author,
            book.year,
            book.time,
            book.isComplete,
        );
        bukuBaru[ID_BUKU] = book.id;
        listElement.append(bukuBaru);
    }

    buttonSelesai.addEventListener('click', () => {
        localStorage.setItem('isButtonSelesaiChecked', buttonSelesai.checked);
        if (buttonSelesai.checked) {
            document.getElementById(ID_LIST_SUDAH).style.display = 'block';
        } else {
            document.getElementById(ID_LIST_SUDAH).style.display = 'none';
        }
    });

    buttonBelumSelesai.addEventListener('click', () => {
        localStorage.setItem(
            'isButtonBelumSelesaiChecked',
            buttonBelumSelesai.checked,
        );
        if (buttonBelumSelesai.checked) {
            document.getElementById(ID_LIST_BELUM).style.display = 'block';
        } else {
            document.getElementById(ID_LIST_BELUM).style.display = 'none';
        }
    });

    if (buttonSelesai.checked) {
        for (book of list) {
            if (book.isComplete) {
                addBookToList(book, listSelesai);
            }
        }
    }

    if (buttonBelumSelesai.checked) {
        for (book of list) {
            if (!book.isComplete) {
                addBookToList(book, listBelumSelesai);
            }
        }
    }
}
