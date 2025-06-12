<?php
require_once('../config/koneksi.php');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON']);
    exit;
}

$driverId = $data['driverId'] ?? 0;
$order_time = $data['orderTime'] ?? '';
$price = $data['price'] ?? '';
$status = $data['status'] ?? '';
$customerId = $data['customerId'] ?? 0;

$sql = "INSERT INTO orders (customerID, driverID, order_time, price, status) VALUES (?, ?, ?, ?, ?)";
$stmt = $koneksi->prepare($sql);
$stmt->bind_param('iisss', $customerId, $driverId, $order_time, $price, $status);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to save data: ' . $stmt->error]);
}
?>