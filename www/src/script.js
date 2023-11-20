const toggleMenuBtn = document.querySelector('.toggle-menu');
const menu = document.querySelector('.menu');

toggleMenuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});

const menuItems = document.querySelectorAll('.menu a');

menuItems.forEach((item) => {
    item.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

const toggleMenuBtn2 = document.querySelector('.search-button');
const menu2 = document.querySelector('.menu');

toggleMenuBtn2.addEventListener('click', () => {
    menu2.classList.remove('active');
});

const modal = document.getElementById('myModal');
const modal2 = document.getElementById('myModal2');
const openModalButton = document.getElementById('open-modal');
const openModalButton2 = document.getElementById('open-modal2');
const openModalButton3 = document.getElementById('resets');
const closeModalButton = document.getElementById('close-modal');
const submitModal = document.getElementById('submit-buku');
const submitTidak = document.getElementById('hapus-buku-tidak');
const resetButton = document.getElementById('hapus-buku-ya');
const resetButton2 = document.getElementById('hapus-buku-ya-2');

openModalButton.addEventListener('click', function () {
    document.getElementById('edit-buku').style.display = 'none';
    document.getElementById('submit-buku').style.display = 'block';
    document.getElementById('judul-edit').style.display = 'none';
    document.getElementById('judul-tambah').style.display = 'block';

    document.getElementById('input-judul').value = '';
    document.getElementById('input-penulis').value = '';
    document.getElementById('input-tahun').value = '';
    document.getElementById('input-target').value = '';

    modal.style.display = 'block';
});

openModalButton2.addEventListener('click', function () {
    document.getElementById('edit-buku').style.display = 'none';
    document.getElementById('submit-buku').style.display = 'block';
    document.getElementById('judul-edit').style.display = 'none';
    document.getElementById('judul-tambah').style.display = 'block';

    document.getElementById('input-judul').value = '';
    document.getElementById('input-penulis').value = '';
    document.getElementById('input-tahun').value = '';
    document.getElementById('input-target').value = '';

    modal.style.display = 'block';
});

openModalButton3.addEventListener('click', function () {
    document.getElementById('judul-hapus').style.display = 'none';
    document.getElementById('judul-reset').style.display = 'block';

    resetButton.style.display = 'block';
    resetButton2.style.display = 'none';
    modal2.style.display = 'block';
});

closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none';
    modal2.style.display = 'none';
});

submitModal.addEventListener('click', function () {
    modal.style.display = 'none';
});

submitTidak.addEventListener('click', function () {
    modal2.style.display = 'none';
});

resetButton.addEventListener('click', function () {
    hapusSemuaBuku();
    modal2.style.display = 'none';
    window.location.href = 'index.html';
});

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
    if (event.target === modal2) {
        modal2.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const checkType = document.getElementById('input-buku-selesai');

    const isChecked = localStorage.getItem('checkTypeChecked') === 'true';

    checkType.checked = isChecked;

    function updateView() {
        if (checkType.checked) {
            document.getElementById('tipe-buku').innerHTML =
                '<strong>Selesai Dibaca</strong>';
            document.getElementById('edit-tipe-buku').innerHTML =
                '<strong>Selesai Dibaca</strong>';
        } else {
            document.getElementById('tipe-buku').innerHTML =
                '<strong>Belum Dibaca</strong>';
            document.getElementById('edit-tipe-buku').innerHTML =
                '<strong>Belum Dibaca</strong>';
        }
    }

    checkType.addEventListener('click', () => {
        updateView();

        localStorage.setItem('checkTypeChecked', checkType.checked);
    });

    updateView();
});
