<?php
include("../config/koneksi.php"); // pastikan koneksi benar

$query = "SELECT o.*, c.customer_username AS customer_name 
          FROM orders o 
          JOIN customer c ON o.customerID = c.customerID
          WHERE o.status = 'Confirmed'
          ORDER BY o.orderID DESC";


$result = mysqli_query($koneksi, $query);

$orders = [];

while ($row = mysqli_fetch_assoc($result)) {
    $orders[] = $row;
}

header('Content-Type: application/json');
echo json_encode($orders);
?>
 