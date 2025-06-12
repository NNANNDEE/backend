<?php
require_once '../config/koneksi.php';


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}


$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON input']);
    exit;
}

$start = trim($data['start'] ?? '');
$end = trim($data['end'] ?? '');
$pickupTime = trim($data['pickupTime'] ?? '');
$id = $data['custID'];

if (!$id) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Customer ID is required']);
    exit;
}


$status = "Confirmed"; // ubah ini


$sql = "INSERT INTO orders (pickUp_location, destination, order_time, status, customerID ) VALUES (?, ?, ?, ?, ?)";
$stmt = $koneksi->prepare($sql);
$stmt->bind_param("ssssi", $start, $end, $pickupTime, $status, $id);


if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'SignUp successful']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to save data: ' . $stmt->error]);
}

$stmt->close();
$koneksi->close();


