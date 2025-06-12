<?php
require_once '../config/koneksi.php'; 

header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['orderID'], $data['driverID'], $data['price'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Incomplete data']);
    exit();
}

$orderID = $data['orderID'];
$driverID = $data['driverID'];
$price = $data['price'];

$query = "UPDATE orders SET status = 'confirmed', driverID = ?, price = ? WHERE orderID = ?";
$stmt = $koneksi->prepare($query);
$stmt->bind_param("iii", $driverID, $price, $orderID);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Order confirmed']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to update order']);
}

$stmt->close();
$koneksi->close();
?>
