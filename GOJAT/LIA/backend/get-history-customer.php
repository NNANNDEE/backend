<?php
header('Content-Type: application/json');

require_once('../config/koneksi.php');

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID pelanggan tidak ditemukan dalam request.']);
    exit;
}

$customerId = intval($input['id']);

$query = "SELECT 
    o.orderID,
    d.driver_username AS driverName,
    o.order_time,
    o.price,
    o.status
FROM orders o
JOIN driver d ON o.driverID = d.driverID
WHERE o.customerID = ?";

$stmt = $koneksi->prepare($query);
$stmt->bind_param('i', $customerId);
$stmt->execute();
$result = $stmt->get_result();

$history = [];

while ($row = $result->fetch_assoc()) {
    $history[] = $row;
}

echo json_encode($history);

$stmt->close();
$koneksi->close();
