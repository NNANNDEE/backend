<?php
include("../config/koneksi.php");

$id = $_GET['id'] ?? '';

if (!$id) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing driver ID']);
    exit;
}

$query = "SELECT * FROM driver WHERE driverID = ?";
$stmt = $koneksi->prepare($query);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$driver = $result->fetch_assoc();

header('Content-Type: application/json');
echo json_encode($driver);
?>
