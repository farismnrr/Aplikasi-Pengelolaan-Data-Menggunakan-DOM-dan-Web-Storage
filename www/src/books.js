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

function buatObjekBuku(tittle, author, year, time, isComplete) {
    return {
        id: +new Date(),
        tittle,
        author,
        year,
        time,
        isComplete,
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
