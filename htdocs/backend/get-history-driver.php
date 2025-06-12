<?php
header('Content-Type: application/json');
require_once('../config/koneksi.php');

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'DriverID not found in request.']);
    exit;
}

$driverId = intval($input['id']);

$sql = "SELECT o.orderID, o.customerID, c.customer_username, o.order_time, o.price, o.status
        FROM orders o
        JOIN customer c ON o.customerID = c.customerID
        WHERE o.driverID = ? AND o.status = 'Confirmed'";

$stmt = $koneksi->prepare($sql);

if (!$stmt) {
    echo json_encode(['error' => 'Query prepare failed: ' . $koneksi->error]);
    exit;
}

$stmt->bind_param("i", $driverId);
$stmt->execute();
$result = $stmt->get_result();

$history = [];

while ($row = $result->fetch_assoc()) {
    $history[] = $row;
}

echo json_encode($history);

$stmt->close();
$koneksi->close();
?>
