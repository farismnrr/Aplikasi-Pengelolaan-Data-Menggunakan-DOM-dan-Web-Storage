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
    const tahun = document.getElementById('input-tahun').value;
    const waktu = document.getElementById('input-target').value;

    if (!judul || !penulis || !tahun || !waktu) {
        alert('Harap masukkan identitas buku!');
        return;
    }

    if (!checkType.checked) {
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
    window.location.href = 'index.html';
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
    const judulBuku = elemenBuku.querySelector('.judul-buku').innerText;
    const penulisBuku = elemenBuku.querySelector('.penulis-buku').innerText;
    const tahunBuku = elemenBuku.querySelector('.tahun-buku').innerText;
    const waktuBuku = elemenBuku.querySelector('.waktu-buku').innerText;

    const bukuBaru = buatListBaca(
        judulBuku,
        penulisBuku,
        tahunBuku,
        waktuBuku,
        true,
    );

    const listSelesai = document.getElementById(ID_LIST_SUDAH);
    const book = cariBuku(elemenBuku[ID_BUKU]);
    book.selesai = true;
    bukuBaru[ID_BUKU] = book.id;
    listSelesai.append(bukuBaru);
    elemenBuku.remove();
    updateDataToStorage();
}

function hapusBukuSelesai(elemenBuku) {
    const posisiBuku = cariIndeksBuku(elemenBuku[ID_BUKU]);
    list.splice(posisiBuku, 1);
    elemenBuku.remove();
    updateDataToStorage();
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
        hapusBukuSelesai(parent.parentElement);
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
    const judulBuku = elemenBuku.querySelector('.judul-buku').innerText;
    const penulisBuku = elemenBuku.querySelector('.penulis-buku').innerText;
    const tahunBuku = elemenBuku.querySelector('.tahun-buku').innerText;
    const waktuBuku = elemenBuku.querySelector('.waktu-buku').innerText;

    const bukuBaru = buatListBaca(
        judulBuku,
        penulisBuku,
        tahunBuku,
        waktuBuku,
        false,
    );
    const listBelumBaca = document.getElementById(ID_LIST_BELUM);

    const book = cariBuku(elemenBuku[ID_BUKU]);
    book.selesai = false;
    bukuBaru[ID_BUKU] = book.id;
    listBelumBaca.append(bukuBaru);
    elemenBuku.remove();

    updateDataToStorage();
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
    const tahun = document.getElementById('input-tahun').value;
    const waktu = document.getElementById('input-target').value;

    if (!judul || !penulis || !tahun || !waktu) {
        alert('Identitas buku tidak boleh kosong!');
        window.location.href = 'index.html';
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
