<?php
include '../config/koneksi.php';
header('Content-Type: application/json');

// Ambil ID customer dari GET atau POST
$customerID = $_GET['customerID'] ?? $_POST['customerID'] ?? null;

if (!$customerID) {
    echo json_encode(["error" => "customerID tidak dikirim."]);
    exit;
}

$sql = "SELECT o.*, d.driver_username, d.phone_number, d.number_plate
        FROM orders o
        LEFT JOIN driver d ON o.driverID = d.driverID
        WHERE o.customerID = ? AND o.status = 'confirmed'";

$stmt = $koneksi->prepare($sql);
$stmt->bind_param("i", $customerID);
$stmt->execute();
$result = $stmt->get_result();

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
