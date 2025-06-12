<?php
header("Content-Type: application/json");
require_once "../config/koneksi.php";

if (!isset($_GET['customerID'])) {
    echo json_encode(["error" => "customerID is required"]);
    exit;
}

$customerID = intval($_GET['customerID']);

$sql = "SELECT 
            d.driverID,
            d.driver_username,
            d.phone_number,
            d.number_plate,
            o.price
        FROM orders o
        INNER JOIN driver d ON o.driverID = d.driverID
        WHERE o.customerID = ? AND o.status = 'Confirmed'
        ORDER BY o.order_time DESC
        LIMIT 1";

$stmt = $koneksi->prepare($sql);
$stmt->bind_param("i", $customerID);
$stmt->execute();
$result = $stmt->get_result();

$data = $result->fetch_assoc();

if ($data) {
    echo json_encode($data);
} else {
    echo json_encode(["message" => "No confirmed orders found."]);
}
?>
