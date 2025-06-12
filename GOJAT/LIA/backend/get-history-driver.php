<?php
require_once('../config/koneksi.php');

header('Content-Type: application/json');

// Ambil semua order yang sudah selesai, lengkap dengan username customer-nya
$sql = "SELECT o.orderID, o.customerID, c.customer_username, o.order_time, o.price, o.status
        FROM orders o
        JOIN customer c ON o.customerID = c.customerID
        WHERE o.status = 'Confirmed'";

$result = $koneksi->query($sql);
$history = [];

while ($row = $result->fetch_assoc()) {
    $history[] = $row;
}

echo json_encode($history);
?>
