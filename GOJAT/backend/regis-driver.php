<?php
header("Access-Control-Allow-Origin: *"); // atau ganti * dengan asal frontend jika ingin lebih aman
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
require_once '../config/koneksi.php'; // koneksi ke DB

// Cek apakah form disubmit
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Ambil data dari form
    $username = $_POST['username'];
    $email    = $_POST['email'];
    $phone    = $_POST['phone'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // amankan password

    // Query insert ke database
    $sql = "INSERT INTO driver (driver_username, driver_email, driver_phone, driver_password) VALUES (?, ?, ?, ?)";
    $stmt = $koneksi->prepare($sql);
    $stmt->bind_param("ssss", $username, $email, $phone, $password);

    if ($stmt->execute()) {
        echo "Registrasi berhasil!";
    } else {
        echo "Terjadi kesalahan: " . $stmt->error;
    }

    $stmt->close();
    $koneksi->close();
} else {
    echo "Akses tidak valid.";
}
?>
