<?php
header('Content-Type: application/json');
include '../config/koneksi.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['driverID']) || !isset($input['status'])) {
    echo json_encode(["success" => false, "error" => "Incomplete data."]);
    exit;
}

$driverID = $input['driverID'];
$status = $input['status'];
$stmt = $koneksi->prepare("UPDATE driver SET status = ? WHERE driverID = ?");
$stmt->bind_param("ss", $status, $driverID);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}
?>
