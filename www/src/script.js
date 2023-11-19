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
const openModalButton = document.getElementById('open-modal');
const openModalButton2 = document.getElementById('open-modal2');
const closeModalButton = document.getElementById('close-modal');
const submitModal = document.getElementById('submit-buku');

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

closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none';
});

submitModal.addEventListener('click', function () {
    modal.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
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

const resetButton = document.getElementById('resets');
resetButton.addEventListener('click', () => {
    hapusSemuaBuku();
});
