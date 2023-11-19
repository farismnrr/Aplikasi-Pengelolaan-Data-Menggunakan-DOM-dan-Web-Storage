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

// Get the modal and the button that opens it
const modal = document.getElementById('myModal');
const openModalButton = document.getElementById('open-modal');
const openModalButton2 = document.getElementById('open-modal2');

// Get the element to close the modal
const closeModalButton = document.getElementById('close-modal');

const submitModal = document.getElementById('submit-buku');

// When the user clicks the button, open the modal
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

// When the user clicks the close button, close the modal
closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none';
});

submitModal.addEventListener('click', function () {
    modal.style.display = 'none';
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const checkType = document.getElementById('input-buku-selesai');

    // Cek apakah ada status yang tersimpan di localStorage
    const isChecked = localStorage.getItem('checkTypeChecked') === 'true';

    // Setel status berdasarkan nilai yang tersimpan
    checkType.checked = isChecked;

    // Fungsi untuk mengupdate tampilan berdasarkan status
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

    // Tambahkan event listener untuk perubahan status
    checkType.addEventListener('click', () => {
        updateView();

        // Simpan status ke localStorage saat terjadi perubahan
        localStorage.setItem('checkTypeChecked', checkType.checked);
    });

    // Panggil fungsi updateView untuk menginisialisasi tampilan
    updateView();
});
