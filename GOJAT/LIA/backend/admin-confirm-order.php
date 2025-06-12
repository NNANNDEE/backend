<?php
require_once '../config/koneksi.php'; // pastikan koneksi sudah benar

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['orderID'], $data['driverID'], $data['price'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Data tidak lengkap']);
    exit();
}

$orderID = $data['orderID'];
$driverID = $data['driverID'];
$price = $data['price'];

// Update order: set status = 'confirmed', driverID, price
$query = "UPDATE orders SET status = 'confirmed', driverID = ?, price = ? WHERE orderID = ?";
$stmt = $koneksi->prepare($query);
$stmt->bind_param("iii", $driverID, $price, $orderID);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Order dikonfirmasi']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Gagal mengupdate order']);
}

$stmt->close();
$koneksi->close();
?>
