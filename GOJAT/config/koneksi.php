<?php
$host     = "localhost";   // atau bisa juga 127.0.0.1
$username = "root";        // username database
$password = "";            // password database (kosong jika di localhost default)
$database = "ojek_online"; // ganti dengan nama database kamu

// Membuat koneksi
$koneksi = new mysqli($host, $username, $password, $database);

// Cek koneksi
if ($koneksi->connect_error) {
    die("Koneksi gagal: " . $koneksi->connect_error);
}

 echo "Koneksi berhasil";
?>
