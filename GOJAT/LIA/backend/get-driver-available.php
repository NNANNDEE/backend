<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

// Sertakan koneksi ke database
require_once '../config/koneksi.php';

// Periksa koneksi
if (!$koneksi) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

// Ambil data driver dengan status 'available'
$sql = "SELECT 
            driverID, 
            driver_username, 
            phone_number, 
            number_plate, 
            email, 
            driver_address, 
            type_of_vehicle, 
            status 
        FROM driver 
        WHERE status = 'available'";

$result = mysqli_query($koneksi, $sql);

$drivers = [];

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $drivers[] = $row;
    }
    echo json_encode([
        "status" => "success",
        "data" => $drivers
    ]);
} else {
    echo json_encode([
        "status" => "success",
        "data" => []
    ]);
}

mysqli_close($koneksi);
