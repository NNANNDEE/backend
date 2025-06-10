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

// Query data customer
$sql = "SELECT customerID, customer_username, phone_number, email, customer_address FROM customer";
$result = mysqli_query($koneksi, $sql);

$customer = [];

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $customer[] = $row;
    }
    echo json_encode($customer);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Query failed"]);
}
