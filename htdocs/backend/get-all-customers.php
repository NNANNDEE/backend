<?php
header('Content-Type: application/json');
include '../config/koneksi.php';

if (!$koneksi) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

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
?>
