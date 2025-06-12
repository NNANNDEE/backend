<?php
$host     = "localhost";   // atau bisa juga 127.0.0.1
$username = "root";        // username database
$password = "";            // password database
$database = "ojek_online"; // nama database

// Membuat koneksi
$koneksi = new mysqli($host, $username, $password, $database);

// Cek koneksi
if ($koneksi->connect_error) {
    die("Connection failed. " . $koneksi->connect_error);
}
?>
