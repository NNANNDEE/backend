<?php
require_once('../config/koneksi.php');
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$orderID = $data['orderID'] ?? null;
$driverID = $data['driverID'] ?? null;
$status = $data['status'] ?? 'Confirmed'; // default jadi 'confirmed'

if (!$orderID || !$driverID) {
  echo json_encode(["success" => false, "message" => "Order ID atau Driver ID hilang"]);
  exit;
}

// Update status order jadi confirmed
$sql = "UPDATE orders SET status = ? WHERE orderID = ? AND driverID = ?";
$stmt = $koneksi->prepare($sql);
$stmt->bind_param("sii", $status, $orderID, $driverID);

if ($stmt->execute()) {
  echo json_encode(["success" => true]);
} else {
  echo json_encode(["success" => false, "message" => "Gagal update status"]);
}
?>
