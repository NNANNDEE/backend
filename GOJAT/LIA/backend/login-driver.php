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
$password = $data['password'] ?? '';
$username = strtolower(trim($data['username'] ?? ''));


if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Incomplete data!']);
    exit;
}

// Ambil password hash dari database
$sql = "SELECT driverID, driver_username, age, phone_number, email, driver_address, type_of_vehicle, number_plate, password FROM driver WHERE driver_username = ?";
$stmt = $koneksi->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 0) {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Incorrect username or password']);
    $stmt->close();
    $koneksi->close();
    exit;
}

// Ambil hash password dari hasil query
$stmt->bind_result($driverID, $driver_username, $age, $phone_number, $email, $driver_address, $type_of_vehicle, $number_plate, $hashedPasswordFromDB);
$stmt->fetch();

// Verifikasi password
if (password_verify($password, $hashedPasswordFromDB)) {
    http_response_code(200);
    echo json_encode([
        'status' => 'success',
        'message' => 'Login successful',
        'data' => [
            'id' => $driverID,
            'username' => $driver_username,
            'phonenumber' => $phone_number,
            'address' => $driver_address,
            'vehicle' => $type_of_vehicle,
            'numberplate' => $number_plate,
            'email' => $email, 
            'age' => $age   
        ]
    ]);
    
} else {
    http_response_code(401);
    echo json_encode(['status' => 'error', 'message' => 'Incorrect username or password']);
}

$stmt->close();
$koneksi->close();
