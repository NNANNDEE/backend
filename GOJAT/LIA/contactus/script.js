function toggleDropdown(event) {
    event.stopPropagation();
    const dropdownMenu = document.getElementById('dropdownMenu');
    const dropbtn = document.querySelector('.dropbtn');
    const isOpen = dropdownMenu.style.display === 'block';
    if (isOpen) {
        dropdownMenu.style.display = 'none';
        dropbtn.classList.remove('active');
    } else {
        // Hapus .active dari nav-link lain
        document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
        dropdownMenu.style.display = 'block';
        dropbtn.classList.add('active');
    }
}

// Tutup dropdown jika klik di luar
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown')) {
        const menu = document.getElementById("dropdownMenu");
        const btn = document.querySelector(".dropbtn");
        menu.style.display = "none";
        btn.classList.remove("active");
    }
}

document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', function(event) {
        if (this.getAttribute('href') === '#') {
            event.preventDefault();
        }
        event.stopPropagation();
        document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
        document.querySelector('.dropbtn').classList.remove('active');
        this.classList.add('active');
        // Tutup dropdown
        document.getElementById('dropdownMenu').style.display = 'none';
    });
});

// Tambahkan ini untuk menutup dropdown jika klik link di dropdown
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('dropdownMenu').style.display = 'none';
        document.querySelector('.dropbtn').classList.remove('active');
    });
});