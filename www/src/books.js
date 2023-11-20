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
