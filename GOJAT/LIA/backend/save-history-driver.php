<?php
require_once('../config/koneksi.php');

$data = json_decode(file_get_contents('php://input'), true);

$customerId = $data['customerId'] ?? 0;
$driverId = $data['driverId'] ?? 0;
$orderTime = $data['orderTime'] ?? '';
$price = $data['price'] ?? '';
$status = $data['status'] ?? '';

// if (!$customerId || !$driverId || !$orderTime || !$price || !$status) {
//     echo json_encode(['success' => false, 'message' => 'Data tidak lengkap']);
//     exit;
// }

// Simpan ke tabel history_driver
$sql = "INSERT INTO orders (customerID, driverID, order_time, price, status) VALUES (?, ?, ?, ?, ?)";
$stmt = $koneksi->prepare($sql);
$stmt->bind_param("iisss", $customerId, $driverId, $orderTime, $price, $status);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => $stmt->error]);
}
?>
