document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('submit-buku');
    submitForm.addEventListener('click', function (event) {
        event.preventDefault();
        tambahBuku();
        hapusForm();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener('ondatasaved', () => {
    console.log('Data berhasil disimpan');
});
document.addEventListener('ondataloaded', () => {
    refreshDataFromList();
});
