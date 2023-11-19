const STORAGE_KEY = 'READING_LIST';

let list = [];

window.addEventListener('beforeunload', () => {
    localStorage.setItem('isButtonSelesaiChecked', true);
    localStorage.setItem('isButtonBelumSelesaiChecked', true);
});

function isStorageExist() /* boolean */ {
    if (typeof Storage === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(list);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event('ondatasaved'));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    if (data !== null) list = data;
    document.dispatchEvent(new Event('ondataloaded'));
}

function updateDataToStorage() {
    if (isStorageExist()) saveData();
}

function buatObjekBuku(judul, penulis, tahun, waktu, selesai) {
    return {
        id: +new Date(),
        judul,
        penulis,
        tahun,
        waktu,
        selesai,
    };
}

function cariBuku(idBuku) {
    for (book of list) {
        if (book.id === idBuku) return book;
    }
    return null;
}

function cariIndeksBuku(idBuku) {
    let index = 0;
    for (book of list) {
        if (book.id === idBuku) return index;

        index++;
    }

    return -1;
}

function refreshDataFromList() {
    const listBelumSelesai = document.getElementById(ID_LIST_BELUM);
    const listSelesai = document.getElementById(ID_LIST_SUDAH);
    const buttonBelumSelesai = document.getElementById('chk1');
    const buttonSelesai = document.getElementById('chk2');

    // Cek apakah ada status yang tersimpan di localStorage
    const isButtonBelumSelesaiChecked =
        localStorage.getItem('isButtonBelumSelesaiChecked') === 'true';
    const isButtonSelesaiChecked =
        localStorage.getItem('isButtonSelesaiChecked') === 'true';

    // Setel status berdasarkan nilai yang tersimpan
    buttonBelumSelesai.checked = isButtonBelumSelesaiChecked;
    buttonSelesai.checked = isButtonSelesaiChecked;

    // Fungsi untuk menambahkan buku ke daftar
    function addBookToList(book, listElement) {
        const bukuBaru = buatListBaca(
            book.judul,
            book.penulis,
            book.tahun,
            book.waktu,
            book.selesai,
        );
        bukuBaru[ID_BUKU] = book.id;
        listElement.append(bukuBaru);
    }

    // Tambahkan event listener untuk buttonSelesai
    buttonSelesai.addEventListener('click', () => {
        localStorage.setItem('isButtonSelesaiChecked', buttonSelesai.checked);
        if (buttonSelesai.checked) {
            document.getElementById(ID_LIST_SUDAH).style.display = 'block';
        } else {
            document.getElementById(ID_LIST_SUDAH).style.display = 'none';
        }
    });

    // Tambahkan event listener untuk buttonBelumSelesai
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

    // Panggil fungsi untuk menambahkan buku ke daftar sesuai status checkbox
    if (buttonSelesai.checked) {
        for (book of list) {
            if (book.selesai) {
                addBookToList(book, listSelesai);
            }
        }
    }

    if (buttonBelumSelesai.checked) {
        for (book of list) {
            if (!book.selesai) {
                addBookToList(book, listBelumSelesai);
            }
        }
    }
}
