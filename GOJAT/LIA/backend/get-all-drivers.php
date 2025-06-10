<?php
header('Content-Type: application/json');

// include koneksi (pastikan path-nya benar)
include '../config/koneksi.php';

// Periksa koneksi
if (!$koneksi) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Query data driver
$sql = "SELECT driverID, driver_username, phone_number, number_plate, email, driver_address, type_of_vehicle, status FROM driver";
$result = mysqli_query($koneksi, $sql);

$driver = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $driver[] = $row;
    }
    echo json_encode($driver);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Query failed"]);
}
