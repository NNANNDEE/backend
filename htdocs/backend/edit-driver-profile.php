<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

require_once '../config/koneksi.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = strtolower(trim($data['username'] ?? ''));
$age    = trim($data['age'] ?? '');
$address    = trim($data['address'] ?? '');
$phone    = trim($data['phonenumber'] ?? '');
$email    = trim($data['email'] ?? '');
$vehicle = $data['vehicle'] ?? '';
$numberplate = $data['numberplate'] ?? '';
$driverID    = trim($data['id'] ?? '');

if (empty($username) || empty($age) || empty($address) || empty($phone) || empty($email) || empty($vehicle) || empty($numberplate)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Incomplete data!']);
    exit;
}

$sql = "UPDATE driver 
        SET driver_username = ?, age = ?, driver_address = ?, phone_number = ?, email = ?, type_of_vehicle = ?, number_plate = ? 
        WHERE driverID = ?";

$stmt = $koneksi->prepare($sql);
$stmt->bind_param("sisssssi", $username, $age, $address, $phone, $email, $vehicle, $numberplate, $driverID);

if($stmt->execute()) {
    http_response_code(200);
    echo json_encode(['status' => 'success', 'message' => 'Data update successful']);

} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to save data' . $stmt->error]);
}

$stmt->close();
$koneksi->close();
?>