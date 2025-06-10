<?php
require_once '../config/koneksi.php';

$query = "SELECT o.*, c.customer_username 
          FROM orders o 
          JOIN customer c ON o.customerID = c.customerID 
          WHERE o.status = 'Confirmed'";

$result = $koneksi->query($query);

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);
?>
