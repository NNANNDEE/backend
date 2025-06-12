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
$email    = trim($data['email'] ?? '');
$phone    = trim($data['phone'] ?? '');
$password = $data['password'] ?? '';

if (empty($username) || empty($email) || empty($phone) || empty($password)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Incomplete data!']);
    exit;
}


$sql = "SELECT customer_username FROM customer WHERE customer_username = ?";
$stmt = $koneksi->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'This username is already taken!']);
    $stmt->close();
    $koneksi->close();
    exit;
}
$stmt->close();

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);


$sql = "INSERT INTO customer (customer_username, email, phone_number, password) VALUES (?, ?, ?, ?)";
$stmt = $koneksi->prepare($sql);
$stmt->bind_param("ssss", $username, $email, $phone, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'SignUp successful']);
} else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Failed to save data: ' . $stmt->error]);
}

$stmt->close();
$koneksi->close();
?>
