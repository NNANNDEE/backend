<?php
require '../config/koneksi.php'; // pastikan path ini benar

header('Content-Type: application/json');

$driverID = isset($_GET['driverID']) ? intval($_GET['driverID']) : 0;

if (!$driverID) {
    echo json_encode([]);
    exit;
}

// inner join (menggabungkan dua tabel yaitu : orders dan customer)
$query = "SELECT 
        orders.orderID,
        orders.customerID,
        orders.pickUp_location,
        orders.destination,
        orders.order_time,
        orders.price,
        orders.status,
        customer.customer_username
    FROM orders
    JOIN customer ON orders.customerID = customer.customerID
    WHERE orders.status = 'Confirmed' AND orders.driverID = ?
";

$stmt = $koneksi->prepare($query);
$stmt->bind_param("i", $driverID);
$stmt->execute();

$result = $stmt->get_result();
$orders = [];

while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode($orders);
?>
