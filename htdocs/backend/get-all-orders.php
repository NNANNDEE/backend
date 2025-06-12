<?php
header('Content-Type: application/json');
require_once('../config/koneksi.php');

$sql = "SELECT orderID, driverID, customerID, order_time, price, status FROM orders ORDER BY order_time DESC";
$result = $koneksi->query($sql);

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);
?>
